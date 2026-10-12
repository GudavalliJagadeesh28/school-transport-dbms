-- School Transport Route and Student Pickup Management System
-- MySQL 8 / MariaDB 10.5+  |  Run:  mysql -u root -p < schema.sql
DROP DATABASE IF EXISTS school_transport;
CREATE DATABASE school_transport CHARACTER SET utf8mb4;
USE school_transport;

CREATE USER IF NOT EXISTS 'transport'@'localhost' IDENTIFIED BY 'transport123';
CREATE USER IF NOT EXISTS 'transport'@'127.0.0.1' IDENTIFIED BY 'transport123';
GRANT ALL ON school_transport.* TO 'transport'@'localhost';
GRANT ALL ON school_transport.* TO 'transport'@'127.0.0.1';
CREATE USER IF NOT EXISTS 'transport'@'%' IDENTIFIED BY 'transport123';
GRANT ALL ON school_transport.* TO 'transport'@'%';

-- ---------- Fleet and crew ----------
CREATE TABLE BUS (
  Bus_ID INT AUTO_INCREMENT PRIMARY KEY,
  Registration_Num VARCHAR(20) NOT NULL UNIQUE,
  Capacity INT NOT NULL CHECK (Capacity > 0),
  Model VARCHAR(50),
  Status VARCHAR(15) NOT NULL DEFAULT 'ACTIVE' CHECK (Status IN ('ACTIVE','MAINTENANCE'))
);
CREATE TABLE DRIVER (
  Driver_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(60) NOT NULL,
  License_Number VARCHAR(30) NOT NULL UNIQUE,
  License_Expiry DATE NOT NULL,
  Contact VARCHAR(20)
);
CREATE TABLE ATTENDANT (
  Attendant_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(60) NOT NULL,
  Contact VARCHAR(20)
);
CREATE TABLE MAINTENANCE_RECORD (
  Record_ID INT AUTO_INCREMENT PRIMARY KEY,
  Bus_ID INT NOT NULL,
  Service_Date DATE NOT NULL,
  Cost DECIMAL(10,2) NOT NULL CHECK (Cost >= 0),
  Description VARCHAR(200) NOT NULL,
  FOREIGN KEY (Bus_ID) REFERENCES BUS(Bus_ID)
);

-- ---------- Route network ----------
CREATE TABLE ROUTE (
  Route_ID INT AUTO_INCREMENT PRIMARY KEY,
  Route_Name VARCHAR(60) NOT NULL UNIQUE,
  Start_Point VARCHAR(80),
  End_Point VARCHAR(80)
);
CREATE TABLE STOP (
  Stop_ID INT AUTO_INCREMENT PRIMARY KEY,
  Stop_Name VARCHAR(60) NOT NULL UNIQUE,
  Location_Details VARCHAR(120)
);
CREATE TABLE ROUTE_SEQUENCE (
  Sequence_ID INT AUTO_INCREMENT PRIMARY KEY,
  Route_ID INT NOT NULL,
  Stop_ID INT NOT NULL,
  Stop_Order INT NOT NULL CHECK (Stop_Order > 0),
  Estimated_Time TIME NOT NULL,
  UNIQUE (Route_ID, Stop_ID),
  FOREIGN KEY (Route_ID) REFERENCES ROUTE(Route_ID),
  FOREIGN KEY (Stop_ID) REFERENCES STOP(Stop_ID)
);
CREATE TABLE BUS_ASSIGNMENT (
  Assignment_ID INT AUTO_INCREMENT PRIMARY KEY,
  Bus_ID INT NOT NULL,
  Route_ID INT NOT NULL,
  Driver_ID INT NOT NULL,
  Attendant_ID INT NOT NULL,
  Start_Date DATE NOT NULL,
  End_Date DATE NULL,
  Status VARCHAR(10) NOT NULL DEFAULT 'ACTIVE' CHECK (Status IN ('ACTIVE','ENDED')),
  FOREIGN KEY (Bus_ID) REFERENCES BUS(Bus_ID),
  FOREIGN KEY (Route_ID) REFERENCES ROUTE(Route_ID),
  FOREIGN KEY (Driver_ID) REFERENCES DRIVER(Driver_ID),
  FOREIGN KEY (Attendant_ID) REFERENCES ATTENDANT(Attendant_ID)
);

-- ---------- Students and billing ----------
CREATE TABLE STUDENT (
  Student_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(60) NOT NULL,
  Grade VARCHAR(10) NOT NULL,
  Parent_Contact VARCHAR(20)
);
CREATE TABLE TRANSPORT_REGISTRATION (
  Registration_ID INT AUTO_INCREMENT PRIMARY KEY,
  Student_ID INT NOT NULL,
  Route_ID INT NOT NULL,
  Stop_ID INT NOT NULL,
  Status VARCHAR(10) NOT NULL DEFAULT 'ACTIVE' CHECK (Status IN ('ACTIVE','INACTIVE')),
  Start_Date DATE NOT NULL,
  FOREIGN KEY (Student_ID) REFERENCES STUDENT(Student_ID),
  FOREIGN KEY (Route_ID, Stop_ID) REFERENCES ROUTE_SEQUENCE(Route_ID, Stop_ID)
);
CREATE TABLE PICKUP_LOG (
  Log_ID INT AUTO_INCREMENT PRIMARY KEY,
  Registration_ID INT NOT NULL,
  Log_Date DATE NOT NULL,
  Pickup_Time TIME NULL,
  Status VARCHAR(10) NOT NULL CHECK (Status IN ('PICKED_UP','LATE','ABSENT')),
  UNIQUE (Registration_ID, Log_Date),
  FOREIGN KEY (Registration_ID) REFERENCES TRANSPORT_REGISTRATION(Registration_ID)
);
CREATE TABLE FEE_PLAN (
  Plan_ID INT AUTO_INCREMENT PRIMARY KEY,
  Plan_Name VARCHAR(40) NOT NULL UNIQUE,
  Amount DECIMAL(10,2) NOT NULL CHECK (Amount > 0),
  Billing_Cycle VARCHAR(15) NOT NULL CHECK (Billing_Cycle IN ('Monthly','Quarterly','Yearly'))
);
CREATE TABLE PAYMENT (
  Payment_ID INT AUTO_INCREMENT PRIMARY KEY,
  Registration_ID INT NOT NULL,
  Plan_ID INT NOT NULL,
  Amount_Paid DECIMAL(10,2) NOT NULL CHECK (Amount_Paid > 0),
  Payment_Date DATE NOT NULL,
  FOREIGN KEY (Registration_ID) REFERENCES TRANSPORT_REGISTRATION(Registration_ID),
  FOREIGN KEY (Plan_ID) REFERENCES FEE_PLAN(Plan_ID)
);

-- ---------- Business rules as triggers ----------
DELIMITER //
CREATE TRIGGER trg_registration_bi BEFORE INSERT ON TRANSPORT_REGISTRATION
FOR EACH ROW
BEGIN
  DECLARE cap INT DEFAULT NULL;
  DECLARE n INT DEFAULT 0;
  IF NEW.Status = 'ACTIVE' THEN
    IF EXISTS (SELECT 1 FROM TRANSPORT_REGISTRATION WHERE Student_ID = NEW.Student_ID AND Status = 'ACTIVE') THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rejected by registration trigger: this student already has an active registration.';
    END IF;
    SELECT b.Capacity INTO cap FROM BUS_ASSIGNMENT ba JOIN BUS b ON b.Bus_ID = ba.Bus_ID
      WHERE ba.Route_ID = NEW.Route_ID AND ba.Status = 'ACTIVE' LIMIT 1;
    IF cap IS NULL THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rejected by registration trigger: no bus is actively assigned to this route.';
    END IF;
    SELECT COUNT(*) INTO n FROM TRANSPORT_REGISTRATION WHERE Route_ID = NEW.Route_ID AND Status = 'ACTIVE';
    IF n >= cap THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rejected by capacity trigger: the bus on this route is full.';
    END IF;
  END IF;
END//

CREATE TRIGGER trg_assignment_bi BEFORE INSERT ON BUS_ASSIGNMENT
FOR EACH ROW
BEGIN
  DECLARE exp DATE;
  DECLARE bst VARCHAR(15);
  IF NEW.Status = 'ACTIVE' THEN
    SELECT License_Expiry INTO exp FROM DRIVER WHERE Driver_ID = NEW.Driver_ID;
    IF exp < CURDATE() THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rejected by assignment trigger: the driver''s license has expired.';
    END IF;
    SELECT Status INTO bst FROM BUS WHERE Bus_ID = NEW.Bus_ID;
    IF bst <> 'ACTIVE' THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rejected by assignment trigger: this bus is under maintenance.';
    END IF;
    IF EXISTS (SELECT 1 FROM BUS_ASSIGNMENT WHERE Bus_ID = NEW.Bus_ID AND Status = 'ACTIVE') THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rejected by assignment trigger: this bus already has an active assignment.';
    END IF;
    IF EXISTS (SELECT 1 FROM BUS_ASSIGNMENT WHERE Driver_ID = NEW.Driver_ID AND Status = 'ACTIVE') THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rejected by assignment trigger: this driver already has an active assignment.';
    END IF;
    IF EXISTS (SELECT 1 FROM BUS_ASSIGNMENT WHERE Attendant_ID = NEW.Attendant_ID AND Status = 'ACTIVE') THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rejected by assignment trigger: this attendant already has an active assignment.';
    END IF;
    IF EXISTS (SELECT 1 FROM BUS_ASSIGNMENT WHERE Route_ID = NEW.Route_ID AND Status = 'ACTIVE') THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rejected by assignment trigger: this route already has an active assignment.';
    END IF;
  END IF;
END//

CREATE TRIGGER trg_bus_bu BEFORE UPDATE ON BUS
FOR EACH ROW
BEGIN
  DECLARE n INT DEFAULT 0;
  DECLARE rid INT DEFAULT NULL;
  SELECT Route_ID INTO rid FROM BUS_ASSIGNMENT WHERE Bus_ID = OLD.Bus_ID AND Status = 'ACTIVE' LIMIT 1;
  IF rid IS NOT NULL THEN
    SELECT COUNT(*) INTO n FROM TRANSPORT_REGISTRATION WHERE Route_ID = rid AND Status = 'ACTIVE';
    IF NEW.Capacity < n THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rejected by capacity trigger: more students are enrolled than the new capacity allows.';
    END IF;
    IF NEW.Status <> 'ACTIVE' THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rejected: end this bus''s active assignment before setting it to maintenance.';
    END IF;
  END IF;
END//
DELIMITER ;

-- ---------- Views used by the reports ----------
CREATE VIEW V_ROUTE_UTILIZATION AS
SELECT r.Route_ID, r.Route_Name, b.Registration_Num, b.Capacity, COUNT(tr.Registration_ID) AS Enrolled
FROM ROUTE r
LEFT JOIN BUS_ASSIGNMENT ba ON ba.Route_ID = r.Route_ID AND ba.Status = 'ACTIVE'
LEFT JOIN BUS b ON b.Bus_ID = ba.Bus_ID
LEFT JOIN TRANSPORT_REGISTRATION tr ON tr.Route_ID = r.Route_ID AND tr.Status = 'ACTIVE'
GROUP BY r.Route_ID, r.Route_Name, b.Registration_Num, b.Capacity;

-- Expected plan = the plan of the latest payment, or the cheapest plan if nothing is paid yet.
CREATE VIEW V_FEE_STATUS AS
SELECT tr.Registration_ID, tr.Student_ID, s.Name AS Student, tr.Route_ID, r.Route_Name,
       fp.Plan_Name, fp.Amount AS Plan_Amount,
       COALESCE(SUM(p.Amount_Paid), 0) AS Paid,
       GREATEST(fp.Amount - COALESCE(SUM(p.Amount_Paid), 0), 0) AS Due
FROM TRANSPORT_REGISTRATION tr
JOIN STUDENT s ON s.Student_ID = tr.Student_ID
JOIN ROUTE r ON r.Route_ID = tr.Route_ID
JOIN FEE_PLAN fp ON fp.Plan_ID = COALESCE(
     (SELECT p2.Plan_ID FROM PAYMENT p2 WHERE p2.Registration_ID = tr.Registration_ID
      ORDER BY p2.Payment_Date DESC, p2.Payment_ID DESC LIMIT 1),
     (SELECT MIN(Plan_ID) FROM FEE_PLAN))
LEFT JOIN PAYMENT p ON p.Registration_ID = tr.Registration_ID
WHERE tr.Status = 'ACTIVE'
GROUP BY tr.Registration_ID, tr.Student_ID, s.Name, tr.Route_ID, r.Route_Name, fp.Plan_Name, fp.Amount;

-- ---------- Sample data ----------
INSERT INTO BUS (Registration_Num, Capacity, Model) VALUES
 ('TS-09-UA-1021', 8, 'Tata Starbus'), ('TS-09-UB-4410', 6, 'Ashok Leyland Viking'),
 ('TS-09-UC-7782', 10, 'Eicher Skyline'), ('TS-09-UD-3305', 8, 'Tata Starbus');
INSERT INTO DRIVER (Name, License_Number, License_Expiry, Contact) VALUES
 ('Ramesh Kumar','TS0920110045', DATE_ADD(CURDATE(), INTERVAL 300 DAY), '98480 11001'),
 ('Suresh Reddy','TS0920090871', DATE_ADD(CURDATE(), INTERVAL 50 DAY),  '98480 11002'),
 ('Anil Goud',   'TS0920080233', DATE_SUB(CURDATE(), INTERVAL 150 DAY), '98480 11003'),
 ('Kiran Rao',   'TS0920150619', DATE_ADD(CURDATE(), INTERVAL 600 DAY), '98480 11004'),
 ('Mohan Lal',   'TS0920180402', DATE_ADD(CURDATE(), INTERVAL 800 DAY), '98480 11005');
INSERT INTO ATTENDANT (Name, Contact) VALUES
 ('Lakshmi Devi','98490 22001'),('Padma Rani','98490 22002'),('Savitri Bai','98490 22003'),('Radha Krishna','98490 22004');
INSERT INTO ROUTE (Route_Name, Start_Point, End_Point) VALUES
 ('Green Valley','Bus Stand','School Campus'),('Lakeview','Lake View','School Campus'),
 ('Old Town','Garden Park','School Campus'),('Hilltop','Garden Park','School Campus');
INSERT INTO STOP (Stop_Name, Location_Details) VALUES
 ('Bus Stand','Main bus depot gate'),('Housing Colony','Phase 1 entrance'),('Market Yard','Near the weekly market'),
 ('Temple Circle','Opposite the temple'),('Lake View','Lakeside road'),('Clock Tower','Central junction'),
 ('Railway Gate','Level crossing'),('Hospital Road','Beside the civil hospital'),('Garden Park','Park main gate'),
 ('Mill Junction','Old mill crossing'),('Polytechnic Gate','College road');
INSERT INTO ROUTE_SEQUENCE (Route_ID, Stop_ID, Stop_Order, Estimated_Time) VALUES
 (1,1,1,'07:05'),(1,2,2,'07:15'),(1,3,3,'07:25'),(1,4,4,'07:35'),
 (2,5,1,'07:00'),(2,6,2,'07:12'),(2,7,3,'07:24'),(2,8,4,'07:36'),
 (3,9,1,'07:10'),(3,10,2,'07:22'),(3,11,3,'07:34'),
 (4,9,1,'07:15'),(4,10,2,'07:25');
INSERT INTO BUS_ASSIGNMENT (Bus_ID, Route_ID, Driver_ID, Attendant_ID, Start_Date, Status) VALUES
 (1,1,1,1,CURDATE(),'ACTIVE'),(2,2,2,2,CURDATE(),'ACTIVE'),(3,3,4,3,CURDATE(),'ACTIVE');
INSERT INTO STUDENT (Name, Grade, Parent_Contact) VALUES
 ('Aarav Sharma','6','+91 98480 10100'),('Diya Reddy','7','+91 98480 10137'),('Vihaan Rao','5','+91 98480 10174'),
 ('Ananya Goud','8','+91 98480 10211'),('Rohan Patel','9','+91 98480 10248'),('Isha Nair','6','+91 98480 10285'),
 ('Kabir Singh','7','+91 98480 10322'),('Meera Iyer','5','+91 98480 10359'),('Arjun Das','8','+91 98480 10396'),
 ('Saanvi Gupta','10','+91 98480 10433'),('Advik Verma','6','+91 98480 10470'),('Myra Khan','9','+91 98480 10507'),
 ('Reyansh Joshi','7','+91 98480 10544'),('Kiara Menon','8','+91 98480 10581'),('Ishaan Yadav','5','+91 98480 10618'),
 ('Tara Bose','6','+91 98480 10655'),('Dev Malhotra','9','+91 98480 10692'),('Navya Pillai','7','+91 98480 10729');
INSERT INTO TRANSPORT_REGISTRATION (Student_ID, Route_ID, Stop_ID, Start_Date) VALUES
 (1,1,1,'2026-06-10'),(2,1,2,'2026-06-10'),(3,1,2,'2026-06-10'),(4,1,3,'2026-06-10'),(5,1,4,'2026-06-10'),(6,1,1,'2026-06-10'),
 (7,2,5,'2026-06-10'),(8,2,6,'2026-06-10'),(9,2,6,'2026-06-10'),(10,2,7,'2026-06-10'),(11,2,8,'2026-06-10'),(12,2,5,'2026-06-10'),
 (13,3,9,'2026-06-10'),(14,3,10,'2026-06-10'),(15,3,11,'2026-06-10');
INSERT INTO FEE_PLAN (Plan_Name, Amount, Billing_Cycle) VALUES ('Monthly',1500,'Monthly'),('Term',4200,'Quarterly');
INSERT INTO PAYMENT (Registration_ID, Plan_ID, Amount_Paid, Payment_Date) VALUES
 (1,1,1500,CURDATE()),(2,2,4200,CURDATE()),(3,1,800,CURDATE()),(4,1,1500,CURDATE()),
 (7,2,4200,CURDATE()),(8,1,1500,CURDATE()),(9,1,1500,CURDATE()),(13,1,1500,CURDATE());
INSERT INTO PICKUP_LOG (Registration_ID, Log_Date, Pickup_Time, Status) VALUES
 (1,CURDATE(),'07:06','PICKED_UP'),(2,CURDATE(),'07:21','LATE'),(3,CURDATE(),NULL,'ABSENT'),(6,CURDATE(),'07:07','PICKED_UP');
INSERT INTO MAINTENANCE_RECORD (Bus_ID, Service_Date, Cost, Description) VALUES
 (2,DATE_SUB(CURDATE(), INTERVAL 24 DAY),6400,'Brake pad replacement'),(1,DATE_SUB(CURDATE(), INTERVAL 43 DAY),2200,'Oil and filter service'),
 (3,DATE_SUB(CURDATE(), INTERVAL 92 DAY),9800,'Clutch overhaul');
