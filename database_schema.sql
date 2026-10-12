-- ============================================================================
-- School Transport Management System (STMS)
-- DBMS Project-Based Learning (PBL) Schema Specification
-- Author: Gudavalli Jagadeesh
-- Database Engine: MySQL 8.0+ / MariaDB / PostgreSQL Compatible
-- ============================================================================

CREATE DATABASE IF NOT EXISTS school_transport_db;
USE school_transport_db;

-- ----------------------------------------------------------------------------
-- 1. DROP EXISTING OBJECTS (FOR RE-RUNNABILITY)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS PICKUP_LOG;
DROP TABLE IF EXISTS PAYMENT;
DROP TABLE IF EXISTS FEE_PLAN;
DROP TABLE IF EXISTS TRANSPORT_REGISTRATION;
DROP TABLE IF EXISTS MAINTENANCE_RECORD;
DROP TABLE IF EXISTS BUS_ASSIGNMENT;
DROP TABLE IF EXISTS ROUTE_SEQUENCE;
DROP TABLE IF EXISTS ROUTE;
DROP TABLE IF EXISTS STOP;
DROP TABLE IF EXISTS DRIVER;
DROP TABLE IF EXISTS ATTENDANT;
DROP TABLE IF EXISTS STUDENT;
DROP TABLE IF EXISTS BUS;

-- ----------------------------------------------------------------------------
-- 2. DDL TABLE DEFINITIONS (NORMALIZED TO 3NF)
-- ----------------------------------------------------------------------------

-- Table 1: BUS
-- Physical vehicle fleet registry and capacity thresholds.
CREATE TABLE BUS (
    bus_id INT AUTO_INCREMENT PRIMARY KEY,
    reg_no VARCHAR(20) NOT NULL UNIQUE,
    capacity INT NOT NULL,
    model VARCHAR(50) NOT NULL,
    status ENUM('ACTIVE', 'MAINTENANCE') NOT NULL DEFAULT 'ACTIVE',
    CONSTRAINT chk_bus_capacity CHECK (capacity > 0)
);

-- Table 2: STOP
-- Master directory of official transit stops and landmarks.
CREATE TABLE STOP (
    stop_id INT AUTO_INCREMENT PRIMARY KEY,
    stop_name VARCHAR(100) NOT NULL UNIQUE
);

-- Table 3: ROUTE
-- Designated transit corridors with origin, terminus, and school arrival goals.
CREATE TABLE ROUTE (
    route_id INT AUTO_INCREMENT PRIMARY KEY,
    route_name VARCHAR(100) NOT NULL,
    start_point VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL DEFAULT 'School Campus',
    arrival_time TIME NOT NULL
);

-- Table 4: ROUTE_SEQUENCE
-- Composite entity defining the ordered itinerary of stops along each route.
CREATE TABLE ROUTE_SEQUENCE (
    route_id INT NOT NULL,
    stop_id INT NOT NULL,
    stop_order INT NOT NULL,
    scheduled_time TIME NOT NULL,
    PRIMARY KEY (route_id, stop_id),
    CONSTRAINT fk_seq_route FOREIGN KEY (route_id) REFERENCES ROUTE(route_id) ON DELETE CASCADE,
    CONSTRAINT fk_seq_stop FOREIGN KEY (stop_id) REFERENCES STOP(stop_id) ON DELETE RESTRICT,
    CONSTRAINT chk_stop_order CHECK (stop_order > 0)
);

-- Table 5: DRIVER
-- Transport crew members holding commercial heavy vehicle licenses.
CREATE TABLE DRIVER (
    driver_id INT AUTO_INCREMENT PRIMARY KEY,
    driver_name VARCHAR(100) NOT NULL,
    license_no VARCHAR(30) NOT NULL UNIQUE,
    license_expiry DATE NOT NULL
);

-- Table 6: ATTENDANT
-- Student safety chaperones assisting boarding on each vehicle.
CREATE TABLE ATTENDANT (
    attendant_id INT AUTO_INCREMENT PRIMARY KEY,
    attendant_name VARCHAR(100) NOT NULL
);

-- Table 7: BUS_ASSIGNMENT
-- Relational pairing binding vehicle, route, driver, and attendant.
CREATE TABLE BUS_ASSIGNMENT (
    assignment_id INT AUTO_INCREMENT PRIMARY KEY,
    bus_id INT NOT NULL,
    route_id INT NOT NULL,
    driver_id INT NOT NULL,
    attendant_id INT NOT NULL,
    status ENUM('ACTIVE', 'ENDED') NOT NULL DEFAULT 'ACTIVE',
    CONSTRAINT fk_asgn_bus FOREIGN KEY (bus_id) REFERENCES BUS(bus_id),
    CONSTRAINT fk_asgn_route FOREIGN KEY (route_id) REFERENCES ROUTE(route_id),
    CONSTRAINT fk_asgn_driver FOREIGN KEY (driver_id) REFERENCES DRIVER(driver_id),
    CONSTRAINT fk_asgn_attendant FOREIGN KEY (attendant_id) REFERENCES ATTENDANT(attendant_id)
);

-- Table 8: STUDENT
-- Student academic records.
CREATE TABLE STUDENT (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    grade VARCHAR(10) NOT NULL,
    parent_contact VARCHAR(20) NOT NULL
);

-- Table 9: TRANSPORT_REGISTRATION
-- Student subscriptions mapped to designated routes and specific pickup stops.
CREATE TABLE TRANSPORT_REGISTRATION (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    route_id INT NOT NULL,
    stop_id INT NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    start_date DATE NOT NULL,
    CONSTRAINT fk_reg_student FOREIGN KEY (student_id) REFERENCES STUDENT(student_id),
    CONSTRAINT fk_reg_route_stop FOREIGN KEY (route_id, stop_id) REFERENCES ROUTE_SEQUENCE(route_id, stop_id)
);

-- Table 10: FEE_PLAN
-- Transport fee tariff schedules.
CREATE TABLE FEE_PLAN (
    plan_id INT AUTO_INCREMENT PRIMARY KEY,
    plan_name VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    billing_cycle ENUM('Monthly', 'Quarterly', 'Yearly') NOT NULL DEFAULT 'Monthly',
    CONSTRAINT chk_plan_amount CHECK (amount > 0)
);

-- Table 11: PAYMENT
-- Financial ledger of payments credited towards student transport registrations.
CREATE TABLE PAYMENT (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    registration_id INT NOT NULL,
    plan_id INT NOT NULL,
    amount_paid DECIMAL(10, 2) NOT NULL,
    payment_date DATE NOT NULL,
    CONSTRAINT fk_pay_reg FOREIGN KEY (registration_id) REFERENCES TRANSPORT_REGISTRATION(registration_id),
    CONSTRAINT fk_pay_plan FOREIGN KEY (plan_id) REFERENCES FEE_PLAN(plan_id),
    CONSTRAINT chk_pay_amount CHECK (amount_paid > 0)
);

-- Table 12: PICKUP_LOG
-- Daily operational boarding register.
CREATE TABLE PICKUP_LOG (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    registration_id INT NOT NULL,
    trip_date DATE NOT NULL,
    boarding_time TIME NULL,
    status ENUM('PICKED_UP', 'LATE', 'ABSENT') NOT NULL,
    CONSTRAINT uq_reg_date UNIQUE (registration_id, trip_date),
    CONSTRAINT fk_log_reg FOREIGN KEY (registration_id) REFERENCES TRANSPORT_REGISTRATION(registration_id)
);

-- Table 13: MAINTENANCE_RECORD
-- Vehicle workshop servicing, inspection, and repair expenditures.
CREATE TABLE MAINTENANCE_RECORD (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    bus_id INT NOT NULL,
    service_date DATE NOT NULL,
    cost DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    description TEXT NOT NULL,
    CONSTRAINT fk_maint_bus FOREIGN KEY (bus_id) REFERENCES BUS(bus_id),
    CONSTRAINT chk_maint_cost CHECK (cost >= 0)
);

-- ----------------------------------------------------------------------------
-- 3. SQL TRIGGERS (INTEGRITY & TRANSACTIONAL BUSINESS CONSTRAINTS)
-- ----------------------------------------------------------------------------

DELIMITER $$

-- Trigger 1: Enforce Bus Seating Capacity on Student Registration
CREATE TRIGGER trg_check_bus_capacity
BEFORE INSERT ON TRANSPORT_REGISTRATION
FOR EACH ROW
BEGIN
    DECLARE v_bus_capacity INT;
    DECLARE v_active_enrolled INT;

    -- Retrieve seating capacity of the vehicle currently active on this route
    SELECT b.capacity INTO v_bus_capacity
    FROM BUS_ASSIGNMENT a
    JOIN BUS b ON a.bus_id = b.bus_id
    WHERE a.route_id = NEW.route_id AND a.status = 'ACTIVE'
    LIMIT 1;

    -- Count active students already registered for this route
    SELECT COUNT(*) INTO v_active_enrolled
    FROM TRANSPORT_REGISTRATION
    WHERE route_id = NEW.route_id AND status = 'ACTIVE';

    IF v_bus_capacity IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Rejected: No bus is currently assigned to this route.';
    ELSEIF v_active_enrolled >= v_bus_capacity THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Rejected by capacity trigger: Bus assigned to this route is full.';
    END IF;
END$$

-- Trigger 2: Prevent Assignment of Drivers with Expired Licenses
CREATE TRIGGER trg_check_driver_license
BEFORE INSERT ON BUS_ASSIGNMENT
FOR EACH ROW
BEGIN
    DECLARE v_license_exp DATE;

    SELECT license_expiry INTO v_license_exp
    FROM DRIVER
    WHERE driver_id = NEW.driver_id;

    IF v_license_exp < CURRENT_DATE() THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Rejected: Driver license has expired.';
    END IF;
END$$

-- Trigger 3: Prevent Multiple Active Assignments for Bus, Driver, or Attendant
CREATE TRIGGER trg_check_duplicate_assignment
BEFORE INSERT ON BUS_ASSIGNMENT
FOR EACH ROW
BEGIN
    IF NEW.status = 'ACTIVE' THEN
        IF EXISTS (SELECT 1 FROM BUS_ASSIGNMENT WHERE bus_id = NEW.bus_id AND status = 'ACTIVE') THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rejected: Bus already has an active assignment.';
        END IF;

        IF EXISTS (SELECT 1 FROM BUS_ASSIGNMENT WHERE driver_id = NEW.driver_id AND status = 'ACTIVE') THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rejected: Driver already has an active assignment.';
        END IF;

        IF EXISTS (SELECT 1 FROM BUS_ASSIGNMENT WHERE attendant_id = NEW.attendant_id AND status = 'ACTIVE') THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rejected: Attendant already has an active assignment.';
        END IF;

        IF EXISTS (SELECT 1 FROM BUS_ASSIGNMENT WHERE route_id = NEW.route_id AND status = 'ACTIVE') THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rejected: Route already has an active assignment.';
        END IF;
    END IF;
END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- 4. SAMPLE SEED DATA INSERTION
-- ----------------------------------------------------------------------------

-- Seed Buses
INSERT INTO BUS (bus_id, reg_no, capacity, model, status) VALUES
(1, 'TS-09-UA-1021', 8, 'Tata Starbus', 'ACTIVE'),
(2, 'TS-09-UB-4410', 6, 'Ashok Leyland Viking', 'ACTIVE'),
(3, 'TS-09-UC-7782', 10, 'Eicher Skyline', 'ACTIVE'),
(4, 'TS-09-UD-3305', 8, 'Tata Starbus', 'ACTIVE');

-- Seed Stops
INSERT INTO STOP (stop_id, stop_name) VALUES
(1, 'Bus Stand'),
(2, 'Housing Colony'),
(3, 'Market Yard'),
(4, 'Temple Circle'),
(5, 'Lake View'),
(6, 'Clock Tower'),
(7, 'Railway Gate'),
(8, 'Hospital Road'),
(9, 'Garden Park'),
(10, 'Mill Junction'),
(11, 'Polytechnic Gate');

-- Seed Routes
INSERT INTO ROUTE (route_id, route_name, start_point, destination, arrival_time) VALUES
(1, 'Green Valley', 'Bus Stand', 'School Campus', '07:50:00'),
(2, 'Lakeview', 'Lake View', 'School Campus', '07:50:00'),
(3, 'Old Town', 'Garden Park', 'School Campus', '07:50:00');

-- Seed Route Sequence (Ordered Itinerary)
INSERT INTO ROUTE_SEQUENCE (route_id, stop_id, stop_order, scheduled_time) VALUES
(1, 1, 1, '07:05:00'),
(1, 2, 2, '07:15:00'),
(1, 3, 3, '07:25:00'),
(1, 4, 4, '07:35:00'),
(2, 5, 1, '07:00:00'),
(2, 6, 2, '07:12:00'),
(2, 7, 3, '07:24:00'),
(2, 8, 4, '07:36:00'),
(3, 9, 1, '07:10:00'),
(3, 10, 2, '07:22:00'),
(3, 11, 3, '07:34:00');

-- Seed Drivers
INSERT INTO DRIVER (driver_id, driver_name, license_no, license_expiry) VALUES
(1, 'Ramesh Kumar', 'TS0920110045', '2027-03-14'),
(2, 'Suresh Reddy', 'TS0920090871', '2026-12-01'),
(3, 'Anil Goud', 'TS0920080233', '2026-05-10'), -- Expired
(4, 'Kiran Rao', 'TS0920150619', '2028-08-22');

-- Seed Attendants
INSERT INTO ATTENDANT (attendant_id, attendant_name) VALUES
(1, 'Lakshmi Devi'),
(2, 'Padma Rani'),
(3, 'Savitri Bai'),
(4, 'Radha Krishna');

-- Seed Assignments
INSERT INTO BUS_ASSIGNMENT (assignment_id, bus_id, route_id, driver_id, attendant_id, status) VALUES
(1, 1, 1, 1, 1, 'ACTIVE'),
(2, 2, 2, 2, 2, 'ACTIVE'),
(3, 3, 3, 4, 3, 'ACTIVE');

-- Seed Students
INSERT INTO STUDENT (student_id, student_name, grade, parent_contact) VALUES
(1, 'Aarav Sharma', '6', '+91 98480 10100'),
(2, 'Diya Reddy', '7', '+91 98480 10137'),
(3, 'Vihaan Rao', '5', '+91 98480 10174'),
(4, 'Ananya Goud', '8', '+91 98480 10211'),
(5, 'Rohan Patel', '9', '+91 98480 10248'),
(6, 'Isha Nair', '6', '+91 98480 10285'),
(7, 'Kabir Singh', '7', '+91 98480 10322'),
(8, 'Meera Iyer', '5', '+91 98480 10359'),
(9, 'Arjun Das', '8', '+91 98480 10396'),
(10, 'Saanvi Gupta', '10', '+91 98480 10433'),
(11, 'Advik Verma', '6', '+91 98480 10470'),
(12, 'Myra Khan', '9', '+91 98480 10507'),
(13, 'Reyansh Joshi', '7', '+91 98480 10544'),
(14, 'Kiara Menon', '8', '+91 98480 10581'),
(15, 'Ishaan Yadav', '5', '+91 98480 10618'),
(16, 'Tara Bose', '6', '+91 98480 10655'),
(17, 'Dev Malhotra', '9', '+91 98480 10692'),
(18, 'Navya Pillai', '7', '+91 98480 10729');

-- Seed Registrations (Route 1: 6/8, Route 2: 6/6 Full, Route 3: 3/10)
INSERT INTO TRANSPORT_REGISTRATION (registration_id, student_id, route_id, stop_id, status, start_date) VALUES
(1, 1, 1, 1, 'ACTIVE', '2026-06-10'),
(2, 2, 1, 2, 'ACTIVE', '2026-06-10'),
(3, 3, 1, 3, 'ACTIVE', '2026-06-10'),
(4, 4, 1, 4, 'ACTIVE', '2026-06-10'),
(5, 5, 1, 1, 'ACTIVE', '2026-06-10'),
(6, 6, 1, 2, 'ACTIVE', '2026-06-10'),
(7, 7, 2, 5, 'ACTIVE', '2026-06-10'),
(8, 8, 2, 6, 'ACTIVE', '2026-06-10'),
(9, 9, 2, 7, 'ACTIVE', '2026-06-10'),
(10, 10, 2, 8, 'ACTIVE', '2026-06-10'),
(11, 11, 2, 5, 'ACTIVE', '2026-06-10'),
(12, 12, 2, 6, 'ACTIVE', '2026-06-10'),
(13, 13, 3, 9, 'ACTIVE', '2026-06-10'),
(14, 14, 3, 10, 'ACTIVE', '2026-06-10'),
(15, 15, 3, 11, 'ACTIVE', '2026-06-10');

-- Seed Fee Plans
INSERT INTO FEE_PLAN (plan_id, plan_name, amount, billing_cycle) VALUES
(1, 'Monthly', 1500.00, 'Monthly'),
(2, 'Term', 4200.00, 'Quarterly');

-- Seed Payments
INSERT INTO PAYMENT (payment_id, registration_id, plan_id, amount_paid, payment_date) VALUES
(1, 1, 1, 1500.00, '2026-10-01'),
(2, 2, 2, 4200.00, '2026-10-02'),
(3, 3, 1, 800.00, '2026-10-03'), -- Defaulter (Due: 700)
(4, 4, 1, 1500.00, '2026-10-04'),
(5, 7, 2, 4200.00, '2026-10-01'),
(6, 8, 1, 1500.00, '2026-10-02'),
(7, 9, 1, 1500.00, '2026-10-03'),
(8, 13, 1, 1500.00, '2026-10-04');

-- Seed Daily Pickup Logs
INSERT INTO PICKUP_LOG (log_id, registration_id, trip_date, boarding_time, status) VALUES
(1, 1, '2026-10-12', '07:06:00', 'PICKED_UP'),
(2, 2, '2026-10-12', '07:21:00', 'LATE'),
(3, 3, '2026-10-12', NULL, 'ABSENT'),
(4, 6, '2026-10-12', '07:27:00', 'PICKED_UP');

-- Seed Maintenance Records
INSERT INTO MAINTENANCE_RECORD (record_id, bus_id, service_date, cost, description) VALUES
(1, 2, '2026-09-18', 6400.00, 'Brake pad replacement'),
(2, 1, '2026-08-30', 2200.00, 'Oil and filter service'),
(3, 3, '2026-07-12', 9800.00, 'Clutch overhaul');

-- ----------------------------------------------------------------------------
-- 5. ANALYTICAL QUERIES (DBMS REVIEW 2 & 3 REQUIREMENTS)
-- ----------------------------------------------------------------------------

-- Query 1: Vehicle Capacity Utilization Analysis
SELECT 
    r.route_name AS 'Route Name',
    b.reg_no AS 'Bus Plate',
    b.capacity AS 'Capacity',
    COUNT(tr.registration_id) AS 'Enrolled Students',
    ROUND((COUNT(tr.registration_id) / b.capacity) * 100, 1) AS 'Utilization (%)'
FROM ROUTE r
JOIN BUS_ASSIGNMENT ba ON r.route_id = ba.route_id AND ba.status = 'ACTIVE'
JOIN BUS b ON ba.bus_id = b.bus_id
LEFT JOIN TRANSPORT_REGISTRATION tr ON r.route_id = tr.route_id AND tr.status = 'ACTIVE'
GROUP BY r.route_id, b.bus_id;

-- Query 2: Fee Defaulters Report (Outstanding Balances)
SELECT 
    s.student_name AS 'Student',
    s.grade AS 'Grade',
    r.route_name AS 'Route',
    fp.plan_name AS 'Plan',
    fp.amount AS 'Billed Amount',
    IFNULL(SUM(p.amount_paid), 0) AS 'Paid Amount',
    (fp.amount - IFNULL(SUM(p.amount_paid), 0)) AS 'Balance Due'
FROM TRANSPORT_REGISTRATION tr
JOIN STUDENT s ON tr.student_id = s.student_id
JOIN ROUTE r ON tr.route_id = r.route_id
CROSS JOIN FEE_PLAN fp ON fp.plan_id = 1
LEFT JOIN PAYMENT p ON tr.registration_id = p.registration_id
WHERE tr.status = 'ACTIVE'
GROUP BY tr.registration_id, fp.plan_id
HAVING Balance_Due > 0;

-- Query 3: Live Driver & Crew Deployment Log
SELECT 
    r.route_name AS 'Route',
    b.reg_no AS 'Assigned Bus',
    d.driver_name AS 'Driver',
    d.license_expiry AS 'License Expiry',
    att.attendant_name AS 'Attendant'
FROM BUS_ASSIGNMENT ba
JOIN ROUTE r ON ba.route_id = r.route_id
JOIN BUS b ON ba.bus_id = b.bus_id
JOIN DRIVER d ON ba.driver_id = d.driver_id
JOIN ATTENDANT att ON ba.attendant_id = att.attendant_id
WHERE ba.status = 'ACTIVE';

-- Query 4: Daily Boarding & Absenteeism Log
SELECT 
    pl.trip_date AS 'Date',
    s.student_name AS 'Student',
    r.route_name AS 'Route',
    st.stop_name AS 'Stop',
    pl.boarding_time AS 'Time Boarded',
    pl.status AS 'Boarding Status'
FROM PICKUP_LOG pl
JOIN TRANSPORT_REGISTRATION tr ON pl.registration_id = tr.registration_id
JOIN STUDENT s ON tr.student_id = s.student_id
JOIN ROUTE r ON tr.route_id = r.route_id
JOIN STOP st ON tr.stop_id = st.stop_id
WHERE pl.trip_date = CURRENT_DATE();
