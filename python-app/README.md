# School Transport Management System (Python + MySQL)

Flask front-end on a 13-table MySQL database, built from the DBMS Review 1, 2 and 3 designs.
Every business rule is enforced inside the database (constraints and triggers). The app sends parameterized SQL
and shows the database's own error message when a rule rejects an action.

## Setup
1. Install MySQL 8 (MariaDB 10.5+ also works) and Python 3.10+.
2. Create the database, sample data and the `transport` user:
   `mysql -u root -p < schema.sql`
3. Install the packages: `pip install -r requirements.txt`
4. Run the app: `python app.py`, then open http://127.0.0.1:5000

Optional environment variables: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `SCHOOL_NAME`, `SECRET_KEY`.
Change the default password `transport123` (in `schema.sql` and `DB_PASSWORD`) before any real use.

## Files
- `schema.sql`: 13 tables, 3 triggers, 2 views (`V_ROUTE_UTILIZATION`, `V_FEE_STATUS`) and sample data
- `app.py`: routes, SQL queries and role handling
- `templates/`: one page per screen

## Roles
Switch role with the Admin / Driver / Parent buttons in the sidebar.
Admin sees every screen, Driver sees Daily pickup, Parent sees a read-only child view.
This is a role selector for demonstration, not a login system. Add authentication before real use.

## Business rules and where they live
| Rule | Enforced by |
|---|---|
| Bus capacity limit | `CHECK (Capacity > 0)`, `trg_registration_bi`, `trg_bus_bu` |
| One active assignment per bus, driver, attendant and route | `trg_assignment_bi` |
| Valid driver license | `License_Expiry` column checked in `trg_assignment_bi` |
| One pickup log per student per day | `UNIQUE (Registration_ID, Log_Date)` |
| Stop must belong to the route | composite `FOREIGN KEY (Route_ID, Stop_ID)` to `ROUTE_SEQUENCE` |

The **Rule tests** screen attempts one bad insert per rule against the live database and rolls each back.

## Reports
Capacity utilization, unpaid fees, driver assignments and absent students (by date) are on the Reports screen.
The first two read from the views in `schema.sql`.
