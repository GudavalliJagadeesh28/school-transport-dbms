# RouteWise — School Transport Management System (Prototype)

A modern, responsive, multi-role front-end prototype designed for the **School Transport Route & Student Pickup Management System** DBMS Project-Based Learning (PBL) curriculum.

---

## 🌟 Key Features & Modules

### 1. 👥 Multi-Role Portal Switcher
Switch instantly between all three primary stakeholders via the top bar:
- **Admin Workspace:** Complete administrative control over buses, routes, driver licensing, fee ledgers, and student registries.
- **Driver Companion View:** Handheld trip assistant displaying approaching stops, student manifest checklist (with tap-to-mark boarding), delay notifications, and emergency SOS triggers.
- **Parent & Student Portal:** Real-time bus radar tracker, child boarding status, driver contact card, and transport fee payment receipts.

### 2. 🗺️ Live Bus Tracking & Radar
- Animated SVG transit vector map with moving vehicle telemetry.
- Heads-Up Display (HUD) showing GPS speed, passenger load, and next-stop ETA countdown.
- Interactive route selector supporting Route 01 (Siddipet), Route 02 (Gajwel), Route 03 (Dubbak), and Route 04 (Cheriyal).
- Step-by-step ordered stop timeline linked to the `ROUTE_SEQUENCE` relational table.

### 3. 👨‍🎓 Student Directory (Full CRUD)
- Comprehensive student directory with search by name, student ID, grade, and bus stop.
- Route and status filters.
- **Register Student Modal:** Enforces bus capacity constraints (`CHECK (Capacity > 0)`).
- Edit student contacts and remove inactive registrations with automatic count recalculation.

### 4. 🛣️ Routes & Stops Sequence Builder
- Real-time bus capacity utilization progress bars with warning triggers when exceeding 90% load.
- Interactive stop sequencing and landmark previews.
- **Add New Route Modal:** Assign origin, destination, and bus vehicle.

### 5. 🚌 Fleet & Crew Management
- Vehicle inventory displaying plate numbers, model, odometer, and fuel levels.
- **Database Trigger Enforcement:** Visual warning badges for expired driver licenses (`License_Expiry` trigger) and overdue vehicle maintenance.
- Log maintenance and reassign driver controls.

### 6. 📋 Pickup Attendance Register
- Live digital boarding register for morning and evening trips.
- Toggle individual student statuses (`Picked up`, `Late`, `Absent`, `Pending`) or use batch buttons (`Mark All Picked Up`, `Mark All Absent`).
- Real-time reactivity updates the Dashboard KPI completion rate and Donut Chart segments dynamically!

### 7. 💳 Fees & Billing Ledger
- Overview of total invoiced fees, collected revenue, and outstanding student balances.
- **Record Payment Modal:** Choose payment mode (UPI, Netbanking, Card, Cash) and generate transaction receipt IDs.

### 8. 📊 Analytical Reports & CSV Export
Directly fulfills the Review 2 & 3 DBMS query objectives with one-click CSV export:
1. **Bus Capacity Utilization Report:** Enrolled students vs. vehicle seating limits.
2. **Fee Defaulters Report:** Students with outstanding fee balances for automated reminder notices.
3. **Daily Pickup & Absenteeism Log:** Attendance timestamps and boarding audit.
4. **Fleet & Crew Compliance Audit:** License expiration dates and vehicle maintenance schedules.

### 9. 🗄️ DBMS 13-Table Spec Modal
Interactive architectural review modal detailing:
- 13 Normalized Relational Tables (3NF): `BUS`, `ROUTE`, `STOP`, `ROUTE_SEQUENCE`, `DRIVER`, `ATTENDANT`, `STUDENT`, `TRANSPORT_REGISTRATION`, `PICKUP_LOG`, `FEE_PLAN`, `PAYMENT`, `MAINTENANCE_RECORD`, and `BUS_ASSIGNMENT`.
- Business rules enforced by SQL triggers (Capacity limit, single active assignment, licence verification, unique daily pickup logs).

---

## 🚀 How to Run

1. Open the `school_transport_prototype` directory.
2. Double-click `index.html` to launch directly in any modern browser (Chrome, Edge, Firefox, Safari).
3. No installation, server, or build step required.

> **Tip:** You can also run a quick local HTTP server using Python:
> ```bash
> python -m http.server 8000
> ```
> Then visit `http://localhost:8000` in your browser.

---

## 💾 Local Storage Persistence
All actions performed in the prototype (registering a student, recording a fee payment, changing attendance, or adding routes) are saved to your browser's `localStorage`. You can restore original seed data at any time using the **"Reset Demo Data"** link in the footer.
