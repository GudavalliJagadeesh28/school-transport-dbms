# School Transport Management System (DBMS Prototype)

An interactive, responsive single-page web prototype for the **School Transport Management System**, simulating a complete database-backed transport management platform for schools.

This prototype enforces relational DBMS constraints and business rules on the client side (simulating MySQL triggers, foreign keys, unique constraints, and check constraints), complete with automatic browser persistence (`localStorage`).

---

## 🌟 Key Features & Modules

### 1. 👥 Multi-Role Portal Switcher
Switch instantly between all three primary stakeholders via the sidebar:
- **Admin Workspace:** Complete administrative control over buses, routes, driver licensing, fee ledgers, student registries, maintenance, reports, and rule validation tests.
- **Driver Companion View:** Handheld daily pickup register for route drivers to mark students as *Picked up*, *Late*, or *Absent* with automated timestamps.
- **Parent & Student Portal:** Dedicated view for parents showing child pickup time, stop timeline, bus registration, driver contact card, and payment receipt history.

### 2. 🗄️ Relational DBMS Triggers & Constraints Simulation
All business logic mirrors strict SQL schema constraints and database triggers:
- **Bus Capacity Trigger:** Enforces seating limits (`CHECK (Capacity > 0)`) and prevents over-capacity student enrollments on active bus routes.
- **Composite Foreign Key:** Guarantees that stops assigned to a student strictly belong to the selected route sequence.
- **Unique Constraint (`UNIQUE(Registration_ID, Date)`):** Prevents duplicate daily pickup logs for a student on the same calendar date.
- **Driver License Expiry Validation:** Automatically detects and rejects assignments for drivers whose licenses have expired.
- **Single Active Assignment Rule:** Ensures a vehicle, driver, or attendant cannot be actively assigned to multiple concurrent routes.
- **Referential Integrity on Deletion:** Rejects deletion of stops or routes currently referenced by active student registrations.

### 3. 📊 Analytical Reports
Directly satisfies DBMS project reporting requirements:
1. **Capacity Utilization Report:** Enrolled student counts vs. bus seating limits per route.
2. **Unpaid Fees / Balance Due Report:** Identifies student balances and fee plan payment progress.
3. **Driver & Crew Route Assignments:** Current driver, attendant, and bus vehicle mapping.
4. **Daily Pickup & Absenteeism Log:** Audit log of all absent students for the day.

### 4. 🧪 Interactive Constraint Rule Tests
Includes a dedicated **Rule tests** view that tests database constraint rejections against bad inputs:
- Over-capacity registration attempt
- Second active assignment attempt
- Expired driver license assignment attempt
- Duplicate daily pickup log attempt
- Stop outside route mapping attempt

---

## 🚀 How to Run

1. Simply double-click [`index.html`](index.html) or [`School Transport Management System.html`](School%20Transport%20Management%20System.html) in any modern web browser (Chrome, Edge, Firefox, Safari).
2. No installation, server, or npm build steps required!
3. **Data Persistence:** All edits (modifying master data, reordering stops, recording payments, logging attendance) are saved automatically in `localStorage`.
4. **Reset Sample Data:** Click **"Reset sample data"** in the sidebar at any time to restore the original seed data.
