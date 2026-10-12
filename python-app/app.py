"""School Transport Management System: Flask front-end on MySQL.
Every business rule lives in the database (constraints and triggers in schema.sql).
The app sends parameterized SQL and shows the database's own error messages."""
import os
from datetime import timedelta, date
import mysql.connector
from mysql.connector import Error
from flask import Flask, g, render_template, request, redirect, url_for, flash, session

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "change-me-in-production")
CFG = dict(host=os.environ.get("DB_HOST", "127.0.0.1"), port=int(os.environ.get("DB_PORT", "3306")),
           user=os.environ.get("DB_USER", "transport"), password=os.environ.get("DB_PASSWORD", "transport123"),
           database=os.environ.get("DB_NAME", "school_transport"))
SCHOOL = os.environ.get("SCHOOL_NAME", "Greenfield Public School")

# ---------------- database helpers ----------------
def db():
    if "db" not in g:
        g.db = mysql.connector.connect(**CFG)
    return g.db

@app.teardown_appcontext
def close_db(_):
    c = g.pop("db", None)
    if c is not None:
        c.close()

def q(sql, args=(), one=False):
    cur = db().cursor(dictionary=True)
    cur.execute(sql, args)
    rows = cur.fetchall()
    cur.close()
    return (rows[0] if rows else None) if one else rows

def friendly(e):
    if e.errno == 1451: return "Rejected by FOREIGN KEY: this record is still used by other records."
    if e.errno == 1452: return "Rejected by FOREIGN KEY: that student, route and stop combination is not valid (the stop must belong to the route)."
    if e.errno == 1062:
        m = e.msg or ""
        if "Registration_ID" in m: return "Rejected by UNIQUE (Registration_ID, Log_Date): a pickup log already exists for this student today."
        if "Route_ID" in m: return "Rejected by UNIQUE (Route_ID, Stop_ID): that stop is already on this route."
        return "Rejected by UNIQUE constraint: that value already exists."
    if e.errno in (4025, 3819): return "Rejected by CHECK constraint: a value is out of range."
    return e.msg or str(e)

def run(sql, args=(), ok="Saved."):
    """Execute one write. Show the database's verdict as a flash message."""
    try:
        cur = db().cursor()
        cur.execute(sql, args)
        db().commit()
        cur.close()
        flash(ok, "ok")
        return True
    except Error as e:
        db().rollback()
        flash(friendly(e), "err")
        return False

@app.template_filter("hm")
def hm(v):
    if isinstance(v, timedelta):
        s = int(v.total_seconds())
        return f"{s // 3600:02d}:{s % 3600 // 60:02d}"
    return v or ""

@app.template_filter("inr")
def inr(v):
    return "₹{:,.0f}".format(v or 0)

# ---------------- roles and navigation ----------------
NAV = {
    "admin": [("dashboard", "Dashboard"), ("routes", "Routes and stops"), ("assignments", "Bus assignments"),
              ("registrations", "Student registration"), ("fees", "Fees and payments"), ("maintenance", "Maintenance"),
              ("reports", "Reports"), ("data_page", "Master data"), ("tests", "Rule tests")],
    "driver": [("pickup", "Daily pickup")],
    "parent": [("parent", "My child")],
}
ALLOWED = {"driver": {"pickup", "pickup_mark"}, "parent": {"parent"}}
COMMON = {"static", "set_role", "index"}

@app.before_request
def guard():
    role = session.setdefault("role", "admin")
    ep = request.endpoint
    if ep in COMMON or role == "admin":
        return None
    if ep not in ALLOWED[role]:
        flash("That screen is not available for your role.", "err")
        return redirect(url_for(NAV[role][0][0]))

@app.context_processor
def inject():
    role = session.get("role", "admin")
    return dict(role=role, nav=NAV[role], school=SCHOOL, endpoint=request.endpoint)

@app.route("/role/<r>")
def set_role(r):
    if r in NAV:
        session["role"] = r
    return redirect(url_for(NAV[session["role"]][0][0]))

@app.route("/")
def index():
    return redirect(url_for(NAV[session.get("role", "admin")][0][0]))

def back(default):
    return redirect(request.referrer or url_for(default))

# ---------------- dashboard ----------------
@app.route("/dashboard")
def dashboard():
    kpi = q("""SELECT (SELECT COUNT(*) FROM TRANSPORT_REGISTRATION WHERE Status='ACTIVE') AS students,
               (SELECT COALESCE(SUM(b.Capacity),0) FROM BUS_ASSIGNMENT ba JOIN BUS b ON b.Bus_ID=ba.Bus_ID WHERE ba.Status='ACTIVE')
               - (SELECT COUNT(*) FROM TRANSPORT_REGISTRATION tr WHERE tr.Status='ACTIVE'
                  AND tr.Route_ID IN (SELECT Route_ID FROM BUS_ASSIGNMENT WHERE Status='ACTIVE')) AS seats,
               (SELECT COUNT(*) FROM PICKUP_LOG WHERE Log_Date=CURDATE() AND Status IN ('PICKED_UP','LATE')) AS picked,
               (SELECT COUNT(*) FROM PICKUP_LOG WHERE Log_Date=CURDATE() AND Status='ABSENT') AS absent,
               (SELECT COALESCE(SUM(Due),0) FROM V_FEE_STATUS) AS dues""", one=True)
    util = q("SELECT * FROM V_ROUTE_UTILIZATION ORDER BY Route_ID")
    lic = q("""SELECT Name, License_Expiry, License_Expiry < CURDATE() AS expired FROM DRIVER
               WHERE License_Expiry < DATE_ADD(CURDATE(), INTERVAL 90 DAY) ORDER BY License_Expiry""")
    return render_template("dashboard.html", kpi=kpi, util=util, lic=lic, today=date.today())

# ---------------- routes and stops ----------------
@app.route("/routes")
def routes():
    rs = q("SELECT * FROM ROUTE ORDER BY Route_ID")
    for r in rs:
        r["stops"] = q("""SELECT rs.Sequence_ID, rs.Stop_Order, rs.Estimated_Time, s.Stop_Name,
                          (SELECT COUNT(*) FROM TRANSPORT_REGISTRATION tr WHERE tr.Route_ID=rs.Route_ID
                           AND tr.Stop_ID=rs.Stop_ID AND tr.Status='ACTIVE') AS students
                          FROM ROUTE_SEQUENCE rs JOIN STOP s ON s.Stop_ID=rs.Stop_ID
                          WHERE rs.Route_ID=%s ORDER BY rs.Stop_Order""", (r["Route_ID"],))
        r["bus"] = q("""SELECT b.Registration_Num FROM BUS_ASSIGNMENT ba JOIN BUS b ON b.Bus_ID=ba.Bus_ID
                        WHERE ba.Route_ID=%s AND ba.Status='ACTIVE'""", (r["Route_ID"],), one=True)
    return render_template("routes.html", routes=rs, stops=q("SELECT * FROM STOP ORDER BY Stop_Name"))

@app.post("/routes/<int:rid>/stops")
def route_stop_add(rid):
    nxt = q("SELECT COALESCE(MAX(Stop_Order),0)+1 AS n FROM ROUTE_SEQUENCE WHERE Route_ID=%s", (rid,), one=True)["n"]
    run("INSERT INTO ROUTE_SEQUENCE (Route_ID, Stop_ID, Stop_Order, Estimated_Time) VALUES (%s,%s,%s,%s)",
        (rid, request.form["stop"], nxt, request.form["time"]), "Stop added.")
    return back("routes")

@app.post("/routes/seq/<int:sid>/<action>")
def route_stop_edit(sid, action):
    row = q("SELECT * FROM ROUTE_SEQUENCE WHERE Sequence_ID=%s", (sid,), one=True)
    if action == "time":
        run("UPDATE ROUTE_SEQUENCE SET Estimated_Time=%s WHERE Sequence_ID=%s", (request.form["time"], sid))
    elif action == "remove":
        run("DELETE FROM ROUTE_SEQUENCE WHERE Sequence_ID=%s", (sid,), "Stop removed.")
    elif action in ("up", "down"):
        up = action == "up"
        nb = q(f"""SELECT * FROM ROUTE_SEQUENCE WHERE Route_ID=%s AND Stop_Order {'<' if up else '>'} %s
                   ORDER BY Stop_Order {'DESC' if up else 'ASC'} LIMIT 1""", (row["Route_ID"], row["Stop_Order"]), one=True)
        if nb:
            run("""UPDATE ROUTE_SEQUENCE SET Stop_Order = CASE Sequence_ID WHEN %s THEN %s WHEN %s THEN %s END
                   WHERE Sequence_ID IN (%s, %s)""",
                (sid, nb["Stop_Order"], nb["Sequence_ID"], row["Stop_Order"], sid, nb["Sequence_ID"]), "Order updated.")
    return back("routes")

# ---------------- bus assignments ----------------
@app.route("/assignments")
def assignments():
    rows = q("""SELECT ba.Assignment_ID, r.Route_Name, b.Registration_Num, d.Name AS Driver, a.Name AS Attendant,
                ba.Start_Date, ba.End_Date, ba.Status FROM BUS_ASSIGNMENT ba JOIN ROUTE r ON r.Route_ID=ba.Route_ID
                JOIN BUS b ON b.Bus_ID=ba.Bus_ID JOIN DRIVER d ON d.Driver_ID=ba.Driver_ID
                JOIN ATTENDANT a ON a.Attendant_ID=ba.Attendant_ID ORDER BY ba.Status, ba.Assignment_ID DESC""")
    return render_template("assignments.html", rows=rows, routes=q("SELECT * FROM ROUTE"), buses=q("SELECT * FROM BUS"),
                           drivers=q("SELECT * FROM DRIVER"), atts=q("SELECT * FROM ATTENDANT"), today=date.today())

@app.post("/assignments/add")
def assignment_add():
    f = request.form
    run("""INSERT INTO BUS_ASSIGNMENT (Bus_ID, Route_ID, Driver_ID, Attendant_ID, Start_Date, Status)
           VALUES (%s,%s,%s,%s,CURDATE(),'ACTIVE')""", (f["bus"], f["route"], f["driver"], f["att"]), "Assignment saved.")
    return back("assignments")

@app.post("/assignments/<int:aid>/end")
def assignment_end(aid):
    run("UPDATE BUS_ASSIGNMENT SET Status='ENDED', End_Date=CURDATE() WHERE Assignment_ID=%s", (aid,), "Assignment ended.")
    return back("assignments")

# ---------------- registrations ----------------
@app.route("/registrations")
def registrations():
    rows = q("""SELECT tr.Registration_ID, s.Name, s.Grade, r.Route_Name, st.Stop_Name, tr.Status, tr.Start_Date
                FROM TRANSPORT_REGISTRATION tr JOIN STUDENT s ON s.Student_ID=tr.Student_ID JOIN ROUTE r ON r.Route_ID=tr.Route_ID
                JOIN STOP st ON st.Stop_ID=tr.Stop_ID ORDER BY tr.Status, r.Route_Name, s.Name""")
    free = q("""SELECT * FROM STUDENT WHERE Student_ID NOT IN
                (SELECT Student_ID FROM TRANSPORT_REGISTRATION WHERE Status='ACTIVE') ORDER BY Name""")
    rts = q("SELECT Route_ID, Route_Name, Enrolled, Capacity FROM V_ROUTE_UTILIZATION ORDER BY Route_ID")
    stops = q("""SELECT st.Stop_ID, st.Stop_Name, GROUP_CONCAT(rs.Route_ID) AS routes FROM STOP st
                 JOIN ROUTE_SEQUENCE rs ON rs.Stop_ID=st.Stop_ID GROUP BY st.Stop_ID, st.Stop_Name ORDER BY st.Stop_Name""")
    return render_template("registrations.html", rows=rows, free=free, rts=rts, stops=stops)

@app.post("/registrations/add")
def registration_add():
    f = request.form
    run("INSERT INTO TRANSPORT_REGISTRATION (Student_ID, Route_ID, Stop_ID, Start_Date) VALUES (%s,%s,%s,CURDATE())",
        (f["student"], f["route"], f["stop"]), "Registration saved.")
    return back("registrations")

@app.post("/registrations/<int:rid>/deactivate")
def registration_off(rid):
    run("UPDATE TRANSPORT_REGISTRATION SET Status='INACTIVE' WHERE Registration_ID=%s", (rid,), "Registration deactivated.")
    return back("registrations")

# ---------------- fees ----------------
@app.route("/fees")
def fees():
    return render_template("fees.html", dues=q("SELECT * FROM V_FEE_STATUS ORDER BY Route_ID, Student"),
        regs=q("""SELECT tr.Registration_ID, s.Name FROM TRANSPORT_REGISTRATION tr JOIN STUDENT s ON s.Student_ID=tr.Student_ID
                  WHERE tr.Status='ACTIVE' ORDER BY s.Name"""), plans=q("SELECT * FROM FEE_PLAN"), today=date.today())

@app.post("/fees/add")
def payment_add():
    f = request.form
    run("INSERT INTO PAYMENT (Registration_ID, Plan_ID, Amount_Paid, Payment_Date) VALUES (%s,%s,%s,%s)",
        (f["reg"], f["plan"], f["amount"], f["date"]), "Payment recorded.")
    return back("fees")

# ---------------- maintenance ----------------
@app.route("/maintenance")
def maintenance():
    rows = q("""SELECT m.Record_ID, b.Registration_Num, m.Service_Date, m.Description, m.Cost FROM MAINTENANCE_RECORD m
                JOIN BUS b ON b.Bus_ID=m.Bus_ID ORDER BY m.Service_Date DESC""")
    return render_template("maintenance.html", rows=rows, buses=q("SELECT * FROM BUS"), today=date.today())

@app.post("/maintenance/add")
def maintenance_add():
    f = request.form
    run("INSERT INTO MAINTENANCE_RECORD (Bus_ID, Service_Date, Cost, Description) VALUES (%s,%s,%s,%s)",
        (f["bus"], f["date"], f["cost"] or 0, f["desc"]), "Service record saved.")
    return back("maintenance")

@app.post("/maintenance/<int:mid>/delete")
def maintenance_delete(mid):
    run("DELETE FROM MAINTENANCE_RECORD WHERE Record_ID=%s", (mid,), "Record deleted.")
    return back("maintenance")

# ---------------- reports ----------------
@app.route("/reports")
def reports():
    d = request.args.get("d") or date.today().isoformat()
    return render_template("reports.html", d=d,
        util=q("SELECT * FROM V_ROUTE_UTILIZATION WHERE Capacity IS NOT NULL ORDER BY Route_ID"),
        unpaid=q("SELECT * FROM V_FEE_STATUS WHERE Due > 0 ORDER BY Due DESC"),
        asg=q("""SELECT r.Route_Name, d.Name AS Driver, a.Name AS Attendant, b.Registration_Num FROM BUS_ASSIGNMENT ba
                 JOIN ROUTE r ON r.Route_ID=ba.Route_ID JOIN DRIVER d ON d.Driver_ID=ba.Driver_ID
                 JOIN ATTENDANT a ON a.Attendant_ID=ba.Attendant_ID JOIN BUS b ON b.Bus_ID=ba.Bus_ID
                 WHERE ba.Status='ACTIVE' ORDER BY r.Route_Name"""),
        absent=q("""SELECT s.Name, r.Route_Name, st.Stop_Name FROM PICKUP_LOG p
                    JOIN TRANSPORT_REGISTRATION tr ON tr.Registration_ID=p.Registration_ID JOIN STUDENT s ON s.Student_ID=tr.Student_ID
                    JOIN ROUTE r ON r.Route_ID=tr.Route_ID JOIN STOP st ON st.Stop_ID=tr.Stop_ID
                    WHERE p.Status='ABSENT' AND p.Log_Date=%s ORDER BY r.Route_Name, s.Name""", (d,)))

# ---------------- driver: daily pickup ----------------
@app.route("/pickup")
def pickup():
    drivers = q("SELECT Driver_ID, Name FROM DRIVER ORDER BY Name")
    did = request.args.get("driver", type=int) or (drivers[0]["Driver_ID"] if drivers else 0)
    asg = q("""SELECT ba.Route_ID, r.Route_Name, b.Registration_Num FROM BUS_ASSIGNMENT ba JOIN ROUTE r ON r.Route_ID=ba.Route_ID
               JOIN BUS b ON b.Bus_ID=ba.Bus_ID WHERE ba.Driver_ID=%s AND ba.Status='ACTIVE'""", (did,), one=True)
    stops = []
    if asg:
        rows = q("""SELECT tr.Registration_ID, s.Name, s.Grade, st.Stop_Name, rs.Stop_Order, rs.Estimated_Time, pl.Status, pl.Pickup_Time
                    FROM TRANSPORT_REGISTRATION tr JOIN STUDENT s ON s.Student_ID=tr.Student_ID
                    JOIN ROUTE_SEQUENCE rs ON rs.Route_ID=tr.Route_ID AND rs.Stop_ID=tr.Stop_ID JOIN STOP st ON st.Stop_ID=tr.Stop_ID
                    LEFT JOIN PICKUP_LOG pl ON pl.Registration_ID=tr.Registration_ID AND pl.Log_Date=CURDATE()
                    WHERE tr.Route_ID=%s AND tr.Status='ACTIVE' ORDER BY rs.Stop_Order, s.Name""", (asg["Route_ID"],))
        for r in rows:
            if not stops or stops[-1]["name"] != r["Stop_Name"]:
                stops.append(dict(name=r["Stop_Name"], time=r["Estimated_Time"], kids=[]))
            stops[-1]["kids"].append(r)
    return render_template("pickup.html", drivers=drivers, did=did, asg=asg, stops=stops)

@app.post("/pickup/mark")
def pickup_mark():
    f = request.form
    run("""INSERT INTO PICKUP_LOG (Registration_ID, Log_Date, Pickup_Time, Status)
           VALUES (%s, CURDATE(), IF(%s='ABSENT', NULL, CURTIME()), %s)""",
        (f["reg"], f["status"], f["status"]), "Pickup logged.")
    return redirect(url_for("pickup", driver=f["driver"]))

# ---------------- parent: read-only ----------------
@app.route("/parent")
def parent():
    kids = q("""SELECT tr.Registration_ID, s.Name FROM TRANSPORT_REGISTRATION tr JOIN STUDENT s ON s.Student_ID=tr.Student_ID
                WHERE tr.Status='ACTIVE' ORDER BY s.Name""")
    rid = request.args.get("reg", type=int) or (kids[0]["Registration_ID"] if kids else 0)
    me = q("""SELECT tr.*, s.Name, s.Grade, s.Parent_Contact, r.Route_Name FROM TRANSPORT_REGISTRATION tr
              JOIN STUDENT s ON s.Student_ID=tr.Student_ID JOIN ROUTE r ON r.Route_ID=tr.Route_ID WHERE tr.Registration_ID=%s""", (rid,), one=True)
    if not me:
        return render_template("parent.html", kids=kids, me=None)
    return render_template("parent.html", kids=kids, me=me, rid=rid,
        stops=q("""SELECT st.Stop_ID, st.Stop_Name, rs.Estimated_Time FROM ROUTE_SEQUENCE rs JOIN STOP st ON st.Stop_ID=rs.Stop_ID
                   WHERE rs.Route_ID=%s ORDER BY rs.Stop_Order""", (me["Route_ID"],)),
        crew=q("""SELECT b.Registration_Num, d.Name AS Driver FROM BUS_ASSIGNMENT ba JOIN BUS b ON b.Bus_ID=ba.Bus_ID
                  JOIN DRIVER d ON d.Driver_ID=ba.Driver_ID WHERE ba.Route_ID=%s AND ba.Status='ACTIVE'""", (me["Route_ID"],), one=True),
        today_log=q("SELECT * FROM PICKUP_LOG WHERE Registration_ID=%s AND Log_Date=CURDATE()", (rid,), one=True),
        fee=q("SELECT * FROM V_FEE_STATUS WHERE Registration_ID=%s", (rid,), one=True),
        pays=q("""SELECT p.Payment_Date, fp.Plan_Name, p.Amount_Paid FROM PAYMENT p JOIN FEE_PLAN fp ON fp.Plan_ID=p.Plan_ID
                  WHERE p.Registration_ID=%s ORDER BY p.Payment_Date DESC""", (rid,)))

# ---------------- master data (generic CRUD) ----------------
ENT = {
    "students": ("STUDENT", "Student_ID", "Students", "student", [("Name", "Name", "text"), ("Grade", "Grade", "text"), ("Parent_Contact", "Parent contact", "text")]),
    "buses": ("BUS", "Bus_ID", "Buses", "bus", [("Registration_Num", "Registration no.", "text"), ("Capacity", "Capacity", "number"), ("Model", "Model", "text"), ("Status", "Status", ["ACTIVE", "MAINTENANCE"])]),
    "drivers": ("DRIVER", "Driver_ID", "Drivers", "driver", [("Name", "Name", "text"), ("License_Number", "Licence no.", "text"), ("License_Expiry", "Licence expiry", "date"), ("Contact", "Contact", "text")]),
    "attendants": ("ATTENDANT", "Attendant_ID", "Attendants", "attendant", [("Name", "Name", "text"), ("Contact", "Contact", "text")]),
    "plans": ("FEE_PLAN", "Plan_ID", "Fee plans", "fee plan", [("Plan_Name", "Plan name", "text"), ("Amount", "Amount (₹)", "number"), ("Billing_Cycle", "Billing cycle", ["Monthly", "Quarterly", "Yearly"])]),
    "routes": ("ROUTE", "Route_ID", "Routes", "route", [("Route_Name", "Route name", "text"), ("Start_Point", "Start point", "text"), ("End_Point", "End point", "text")]),
    "stops": ("STOP", "Stop_ID", "Stops", "stop", [("Stop_Name", "Stop name", "text"), ("Location_Details", "Location details", "text")]),
}

@app.route("/data", defaults={"key": "students"})
@app.route("/data/<key>")
def data_page(key):
    if key not in ENT:
        return redirect(url_for("data_page", key="students"))
    t, pk, title, single, cols = ENT[key]
    rows = q(f"SELECT * FROM {t} ORDER BY {pk}")
    return render_template("data.html", key=key, ent=ENT, title=title, single=single, cols=cols, pk=pk, rows=rows)

@app.post("/data/<key>/add")
def data_add(key):
    t, pk, title, single, cols = ENT[key]
    names = ",".join(c[0] for c in cols)
    run(f"INSERT INTO {t} ({names}) VALUES ({','.join(['%s'] * len(cols))})",
        [request.form.get(c[0]) or None for c in cols], f"{single.capitalize()} added.")
    return redirect(url_for("data_page", key=key))

@app.post("/data/<key>/<int:rid>/save")
def data_save(key, rid):
    t, pk, title, single, cols = ENT[key]
    run(f"UPDATE {t} SET {','.join(c[0] + '=%s' for c in cols)} WHERE {pk}=%s",
        [request.form.get(c[0]) or None for c in cols] + [rid])
    return redirect(url_for("data_page", key=key))

@app.post("/data/<key>/<int:rid>/delete")
def data_delete(key, rid):
    t, pk, *_ = ENT[key]
    run(f"DELETE FROM {t} WHERE {pk}=%s", (rid,), "Deleted.")
    return redirect(url_for("data_page", key=key))

# ---------------- rule tests ----------------
TESTS = [
    ("Over-capacity registration", "Register a student on Lakeview, whose bus is full",
     "INSERT INTO TRANSPORT_REGISTRATION (Student_ID, Route_ID, Stop_ID, Start_Date) VALUES (16,2,5,CURDATE())"),
    ("Second active assignment", "Assign bus TS-09-UA-1021, already active on Green Valley",
     "INSERT INTO BUS_ASSIGNMENT (Bus_ID, Route_ID, Driver_ID, Attendant_ID, Start_Date, Status) VALUES (1,4,5,4,CURDATE(),'ACTIVE')"),
    ("Expired driver license", "Assign Anil Goud, whose license has expired",
     "INSERT INTO BUS_ASSIGNMENT (Bus_ID, Route_ID, Driver_ID, Attendant_ID, Start_Date, Status) VALUES (4,4,3,4,CURDATE(),'ACTIVE')"),
    ("Duplicate pickup log", "Log the same student twice on one date",
     "INSERT INTO PICKUP_LOG (Registration_ID, Log_Date, Pickup_Time, Status) VALUES (1,CURDATE(),NULL,'ABSENT')"),
    ("Stop outside route", "Map a student to a stop that is not on Green Valley",
     "INSERT INTO TRANSPORT_REGISTRATION (Student_ID, Route_ID, Stop_ID, Start_Date) VALUES (16,1,9,CURDATE())"),
]

@app.route("/tests")
def tests():
    results = []
    for name, action, sql in TESTS:
        try:
            cur = db().cursor()
            cur.execute(sql)
            outcome = (False, "The database accepted this row, so the rule did not fire.")
        except Error as e:
            outcome = (True, friendly(e))
        finally:
            db().rollback()  # tests never leave data behind
        results.append(dict(name=name, action=action, ok=outcome[0], msg=outcome[1]))
    return render_template("tests.html", results=results)

if __name__ == "__main__":
    app.run(debug=os.environ.get("FLASK_DEBUG") == "1", host=os.environ.get("HOST", "127.0.0.1"), port=int(os.environ.get("PORT", "5000")))
