# 📖 School Transport Management System — Data Dictionary & Tables Specification

This document provides the formal **Data Dictionary**, **Relational Schema Specifications**, and **Complete Seed Data Tables** for the School Transport Management System (STMS).

---

## 📑 Entity Index
1. [`BUS`](#1-bus-table)
2. [`STOP`](#2-stop-table)
3. [`ROUTE`](#3-route-table)
4. [`ROUTE_SEQUENCE`](#4-route_sequence-table)
5. [`DRIVER`](#5-driver-table)
6. [`ATTENDANT`](#6-attendant-table)
7. [`BUS_ASSIGNMENT`](#7-bus_assignment-table)
8. [`STUDENT`](#8-student-table)
9. [`TRANSPORT_REGISTRATION`](#9-transport_registration-table)
10. [`FEE_PLAN`](#10-fee_plan-table)
11. [`PAYMENT`](#11-payment-table)
12. [`PICKUP_LOG`](#12-pickup_log-table)
13. [`MAINTENANCE_RECORD`](#13-maintenance_record-table)

---

## 1. `BUS` Table
Stores vehicle assets, passenger seating capacity, and operational status.

### Schema Definition
| Column Name | Data Type | Nullable | Key | Default | Constraints / Rules | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `bus_id` | INT | NO | **PK** | AUTO_INC | Unique identifier | Primary Key |
| `reg_no` | VARCHAR(20) | NO | **UK** | None | `UNIQUE` | Vehicle plate number (e.g. TS-09-UA-1021) |
| `capacity` | INT | NO | None | None | `CHECK (capacity > 0)` | Total passenger seating capacity |
| `model` | VARCHAR(50) | NO | None | None | None | Bus manufacturer and model |
| `status` | ENUM | NO | None | `'ACTIVE'` | `'ACTIVE' \| 'MAINTENANCE'` | Current operational status |

### Sample Data
| bus_id | reg_no | capacity | model | status |
| :--- | :--- | :--- | :--- | :--- |
| 1 | TS-09-UA-1021 | 8 | Tata Starbus | ACTIVE |
| 2 | TS-09-UB-4410 | 6 | Ashok Leyland Viking | ACTIVE |
| 3 | TS-09-UC-7782 | 10 | Eicher Skyline | ACTIVE |
| 4 | TS-09-UD-3305 | 8 | Tata Starbus | ACTIVE |

---

## 2. `STOP` Table
Official directory of transit boarding points and campus checkpoints.

### Schema Definition
| Column Name | Data Type | Nullable | Key | Default | Constraints / Rules | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `stop_id` | INT | NO | **PK** | AUTO_INC | Unique identifier | Primary Key |
| `stop_name` | VARCHAR(100) | NO | **UK** | None | `UNIQUE` | Landmark or junction name |

### Sample Data
| stop_id | stop_name |
| :--- | :--- |
| 1 | Bus Stand |
| 2 | Housing Colony |
| 3 | Market Yard |
| 4 | Temple Circle |
| 5 | Lake View |
| 6 | Clock Tower |
| 7 | Railway Gate |
| 8 | Hospital Road |
| 9 | Garden Park |
| 10 | Mill Junction |
| 11 | Polytechnic Gate |

---

## 3. `ROUTE` Table
Transit corridors defined by origin terminal, destination, and expected arrival time.

### Schema Definition
| Column Name | Data Type | Nullable | Key | Default | Constraints / Rules | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `route_id` | INT | NO | **PK** | AUTO_INC | Unique identifier | Primary Key |
| `route_name` | VARCHAR(100) | NO | None | None | None | Route designation |
| `start_point` | VARCHAR(100) | NO | None | None | None | Origin landmark |
| `destination` | VARCHAR(100) | NO | None | `'School Campus'` | None | Terminal destination |
| `arrival_time` | TIME | NO | None | None | Format `HH:MM:SS` | Scheduled school arrival target |

### Sample Data
| route_id | route_name | start_point | destination | arrival_time |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Green Valley | Bus Stand | School Campus | 07:50:00 |
| 2 | Lakeview | Lake View | School Campus | 07:50:00 |
| 3 | Old Town | Garden Park | School Campus | 07:50:00 |

---

## 4. `ROUTE_SEQUENCE` Table
Normalized bridge table representing the ordered sequence and scheduled arrival times of stops on a route.

### Schema Definition
| Column Name | Data Type | Nullable | Key | Default | Constraints / Rules | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `route_id` | INT | NO | **PK, FK** | None | References `ROUTE(route_id)` | Part of Composite Primary Key |
| `stop_id` | INT | NO | **PK, FK** | None | References `STOP(stop_id)` | Part of Composite Primary Key |
| `stop_order` | INT | NO | None | None | `CHECK (stop_order > 0)` | Chronological order on route |
| `scheduled_time` | TIME | NO | None | None | Format `HH:MM:SS` | Expected bus arrival timestamp |

### Sample Data
| route_id | stop_id | stop_name (Lookup) | stop_order | scheduled_time |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 1 | Bus Stand | 1 | 07:05:00 |
| 1 | 2 | Housing Colony | 2 | 07:15:00 |
| 1 | 3 | Market Yard | 3 | 07:25:00 |
| 1 | 4 | Temple Circle | 4 | 07:35:00 |
| 2 | 5 | Lake View | 1 | 07:00:00 |
| 2 | 6 | Clock Tower | 2 | 07:12:00 |
| 2 | 7 | Railway Gate | 3 | 07:24:00 |
| 2 | 8 | Hospital Road | 4 | 07:36:00 |
| 3 | 9 | Garden Park | 1 | 07:10:00 |
| 3 | 10 | Mill Junction | 2 | 07:22:00 |
| 3 | 11 | Polytechnic Gate | 3 | 07:34:00 |

---

## 5. `DRIVER` Table
Licensed transport crew operating the school vehicles.

### Schema Definition
| Column Name | Data Type | Nullable | Key | Default | Constraints / Rules | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `driver_id` | INT | NO | **PK** | AUTO_INC | Unique identifier | Primary Key |
| `driver_name` | VARCHAR(100) | NO | None | None | None | Driver full legal name |
| `license_no` | VARCHAR(30) | NO | **UK** | None | `UNIQUE` | Driving license number |
| `license_expiry` | DATE | NO | None | None | Checked by trigger | Date after which driving is illegal |

### Sample Data
| driver_id | driver_name | license_no | license_expiry | License Status (As of Oct 2026) |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Ramesh Kumar | TS0920110045 | 2027-03-14 | Active |
| 2 | Suresh Reddy | TS0920090871 | 2026-12-01 | Expiring Soon |
| 3 | Anil Goud | TS0920080233 | 2026-05-10 | **EXPIRED** (Rejected by Trigger) |
| 4 | Kiran Rao | TS0920150619 | 2028-08-22 | Active |

---

## 6. `ATTENDANT` Table
Safety chaperones ensuring safe child boarding and alighting.

### Schema Definition
| Column Name | Data Type | Nullable | Key | Default | Constraints / Rules | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `attendant_id` | INT | NO | **PK** | AUTO_INC | Unique identifier | Primary Key |
| `attendant_name` | VARCHAR(100) | NO | None | None | None | Attendant full name |

### Sample Data
| attendant_id | attendant_name |
| :--- | :--- |
| 1 | Lakshmi Devi |
| 2 | Padma Rani |
| 3 | Savitri Bai |
| 4 | Radha Krishna |

---

## 7. `BUS_ASSIGNMENT` Table
Relational allocation binding vehicle, driver, attendant, and route together.

### Schema Definition
| Column Name | Data Type | Nullable | Key | Default | Constraints / Rules | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `assignment_id` | INT | NO | **PK** | AUTO_INC | Unique identifier | Primary Key |
| `bus_id` | INT | NO | **FK** | None | References `BUS(bus_id)` | Vehicle assigned |
| `route_id` | INT | NO | **FK** | None | References `ROUTE(route_id)` | Route assigned |
| `driver_id` | INT | NO | **FK** | None | References `DRIVER(driver_id)` | Pilot assigned |
| `attendant_id` | INT | NO | **FK** | None | References `ATTENDANT(attendant_id)` | Chaperone assigned |
| `status` | ENUM | NO | None | `'ACTIVE'` | `'ACTIVE' \| 'ENDED'` | Assignment lifecycle state |

### Sample Data
| assignment_id | bus_id | route_id | driver_id | attendant_id | status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 1 (TS-09-UA-1021) | 1 (Green Valley) | 1 (Ramesh Kumar) | 1 (Lakshmi Devi) | ACTIVE |
| 2 | 2 (TS-09-UB-4410) | 2 (Lakeview) | 2 (Suresh Reddy) | 2 (Padma Rani) | ACTIVE |
| 3 | 3 (TS-09-UC-7782) | 3 (Old Town) | 4 (Kiran Rao) | 3 (Savitri Bai) | ACTIVE |

---

## 8. `STUDENT` Table
Master student registry.

### Schema Definition
| Column Name | Data Type | Nullable | Key | Default | Constraints / Rules | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `student_id` | INT | NO | **PK** | AUTO_INC | Unique identifier | Primary Key |
| `student_name` | VARCHAR(100) | NO | None | None | None | Student full name |
| `grade` | VARCHAR(10) | NO | None | None | E.g. `'5'`, `'6'`, `'10'` | Class or Grade level |
| `parent_contact` | VARCHAR(20) | NO | None | None | Format `+91 ...` | Emergency guardian phone number |

### Sample Data
| student_id | student_name | grade | parent_contact |
| :--- | :--- | :--- | :--- |
| 1 | Aarav Sharma | 6 | +91 98480 10100 |
| 2 | Diya Reddy | 7 | +91 98480 10137 |
| 3 | Vihaan Rao | 5 | +91 98480 10174 |
| 4 | Ananya Goud | 8 | +91 98480 10211 |
| 5 | Rohan Patel | 9 | +91 98480 10248 |
| 6 | Isha Nair | 6 | +91 98480 10285 |
| 7 | Kabir Singh | 7 | +91 98480 10322 |
| 8 | Meera Iyer | 5 | +91 98480 10359 |
| 9 | Arjun Das | 8 | +91 98480 10396 |
| 10 | Saanvi Gupta | 10 | +91 98480 10433 |
| 11 | Advik Verma | 6 | +91 98480 10470 |
| 12 | Myra Khan | 9 | +91 98480 10507 |
| 13 | Reyansh Joshi | 7 | +91 98480 10544 |
| 14 | Kiara Menon | 8 | +91 98480 10581 |
| 15 | Ishaan Yadav | 5 | +91 98480 10618 |
| 16 | Tara Bose | 6 | +91 98480 10655 |
| 17 | Dev Malhotra | 9 | +91 98480 10692 |
| 18 | Navya Pillai | 7 | +91 98480 10729 |

---

## 9. `TRANSPORT_REGISTRATION` Table
Active transport subscriptions linking students to specific routes and boarding points.

### Schema Definition
| Column Name | Data Type | Nullable | Key | Default | Constraints / Rules | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `registration_id` | INT | NO | **PK** | AUTO_INC | Unique identifier | Primary Key |
| `student_id` | INT | NO | **FK** | None | References `STUDENT(student_id)` | Registered student |
| `route_id` | INT | NO | **FK** | None | References `ROUTE(route_id)` | Assigned transit route |
| `stop_id` | INT | NO | **FK** | None | References `STOP(stop_id)` | Boarding location |
| `status` | ENUM | NO | None | `'ACTIVE'` | `'ACTIVE' \| 'INACTIVE'` | Subscription status |
| `start_date` | DATE | NO | None | None | Format `YYYY-MM-DD` | Subscription inception date |

### Sample Data
| reg_id | student_name (Lookup) | route_name (Lookup) | stop_name (Lookup) | status | start_date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Aarav Sharma | Green Valley (Route 1) | Bus Stand | ACTIVE | 2026-06-10 |
| 2 | Diya Reddy | Green Valley (Route 1) | Housing Colony | ACTIVE | 2026-06-10 |
| 3 | Vihaan Rao | Green Valley (Route 1) | Market Yard | ACTIVE | 2026-06-10 |
| 4 | Ananya Goud | Green Valley (Route 1) | Temple Circle | ACTIVE | 2026-06-10 |
| 5 | Rohan Patel | Green Valley (Route 1) | Bus Stand | ACTIVE | 2026-06-10 |
| 6 | Isha Nair | Green Valley (Route 1) | Housing Colony | ACTIVE | 2026-06-10 |
| 7 | Kabir Singh | Lakeview (Route 2) | Lake View | ACTIVE | 2026-06-10 |
| 8 | Meera Iyer | Lakeview (Route 2) | Clock Tower | ACTIVE | 2026-06-10 |
| 9 | Arjun Das | Lakeview (Route 2) | Railway Gate | ACTIVE | 2026-06-10 |
| 10 | Saanvi Gupta | Lakeview (Route 2) | Hospital Road | ACTIVE | 2026-06-10 |
| 11 | Advik Verma | Lakeview (Route 2) | Lake View | ACTIVE | 2026-06-10 |
| 12 | Myra Khan | Lakeview (Route 2) | Clock Tower | ACTIVE | 2026-06-10 |
| 13 | Reyansh Joshi | Old Town (Route 3) | Garden Park | ACTIVE | 2026-06-10 |
| 14 | Kiara Menon | Old Town (Route 3) | Mill Junction | ACTIVE | 2026-06-10 |
| 15 | Ishaan Yadav | Old Town (Route 3) | Polytechnic Gate | ACTIVE | 2026-06-10 |

---

## 10. `FEE_PLAN` Table
Catalog of standard transport tariffs and billing schedules.

### Schema Definition
| Column Name | Data Type | Nullable | Key | Default | Constraints / Rules | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `plan_id` | INT | NO | **PK** | AUTO_INC | Unique identifier | Primary Key |
| `plan_name` | VARCHAR(50) | NO | None | None | None | E.g. `'Monthly'`, `'Term'` |
| `amount` | DECIMAL(10,2) | NO | None | None | `CHECK (amount > 0)` | Tariff amount in INR (₹) |
| `billing_cycle` | ENUM | NO | None | `'Monthly'` | `'Monthly' \| 'Quarterly' \| 'Yearly'` | Payment recurring cadence |

### Sample Data
| plan_id | plan_name | amount (₹) | billing_cycle |
| :--- | :--- | :--- | :--- |
| 1 | Monthly | ₹1,500.00 | Monthly |
| 2 | Term | ₹4,200.00 | Quarterly |

---

## 11. `PAYMENT` Table
Financial transaction history of fees collected against subscriptions.

### Schema Definition
| Column Name | Data Type | Nullable | Key | Default | Constraints / Rules | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `payment_id` | INT | NO | **PK** | AUTO_INC | Unique identifier | Primary Key |
| `registration_id` | INT | NO | **FK** | None | References `TRANSPORT_REGISTRATION` | Student subscription |
| `plan_id` | INT | NO | **FK** | None | References `FEE_PLAN` | Fee plan credited |
| `amount_paid` | DECIMAL(10,2) | NO | None | None | `CHECK (amount_paid > 0)` | Value paid in INR (₹) |
| `payment_date` | DATE | NO | None | None | Format `YYYY-MM-DD` | Transaction receipt date |

### Sample Data
| payment_id | reg_id | Student (Lookup) | Plan | Amount Paid (₹) | Payment Date | Balance Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 1 | Aarav Sharma | Monthly (1500) | ₹1,500.00 | 2026-10-01 | Paid in Full |
| 2 | 2 | Diya Reddy | Term (4200) | ₹4,200.00 | 2026-10-02 | Paid in Full |
| 3 | 3 | Vihaan Rao | Monthly (1500) | ₹800.00 | 2026-10-03 | **₹700 Due** (Defaulter) |
| 4 | 4 | Ananya Goud | Monthly (1500) | ₹1,500.00 | 2026-10-04 | Paid in Full |
| 5 | 7 | Kabir Singh | Term (4200) | ₹4,200.00 | 2026-10-01 | Paid in Full |
| 6 | 8 | Meera Iyer | Monthly (1500) | ₹1,500.00 | 2026-10-02 | Paid in Full |
| 7 | 9 | Arjun Das | Monthly (1500) | ₹1,500.00 | 2026-10-03 | Paid in Full |
| 8 | 13 | Reyansh Joshi | Monthly (1500) | ₹1,500.00 | 2026-10-04 | Paid in Full |

---

## 12. `PICKUP_LOG` Table
Daily trip attendance register tracking student boarding events.

### Schema Definition
| Column Name | Data Type | Nullable | Key | Default | Constraints / Rules | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `log_id` | INT | NO | **PK** | AUTO_INC | Unique identifier | Primary Key |
| `registration_id` | INT | NO | **FK** | None | References `TRANSPORT_REGISTRATION` | Student subscription |
| `trip_date` | DATE | NO | None | None | Format `YYYY-MM-DD` | Calendar trip date |
| `boarding_time` | TIME | YES | None | NULL | NULL if absent | Time boarded vehicle |
| `status` | ENUM | NO | None | None | `'PICKED_UP' \| 'LATE' \| 'ABSENT'` | Boarding outcome |

> **Unique Constraint:** `UNIQUE (registration_id, trip_date)` ensures a student cannot be logged multiple times on the same date.

### Sample Data
| log_id | reg_id | Student (Lookup) | Trip Date | Boarding Time | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 1 | Aarav Sharma | 2026-10-12 | 07:06:00 | PICKED_UP |
| 2 | 2 | Diya Reddy | 2026-10-12 | 07:21:00 | LATE |
| 3 | 3 | Vihaan Rao | 2026-10-12 | *NULL* | ABSENT |
| 4 | 6 | Isha Nair | 2026-10-12 | 07:27:00 | PICKED_UP |

---

## 13. `MAINTENANCE_RECORD` Table
Workshop servicing, mechanical inspection, and repair cost ledger per vehicle.

### Schema Definition
| Column Name | Data Type | Nullable | Key | Default | Constraints / Rules | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `record_id` | INT | NO | **PK** | AUTO_INC | Unique identifier | Primary Key |
| `bus_id` | INT | NO | **FK** | None | References `BUS(bus_id)` | Vehicle serviced |
| `service_date` | DATE | NO | None | None | Format `YYYY-MM-DD` | Date work performed |
| `cost` | DECIMAL(10,2) | NO | None | 0.00 | `CHECK (cost >= 0)` | Repair bill in INR (₹) |
| `description` | TEXT | NO | None | None | None | Work summary (parts, labor) |

### Sample Data
| record_id | bus_id | Vehicle Plate | Service Date | Cost (₹) | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 2 | TS-09-UB-4410 | 2026-09-18 | ₹6,400.00 | Brake pad replacement |
| 2 | 1 | TS-09-UA-1021 | 2026-08-30 | ₹2,200.00 | Oil and filter service |
| 3 | 3 | TS-09-UC-7782 | 2026-07-12 | ₹9,800.00 | Clutch overhaul |
