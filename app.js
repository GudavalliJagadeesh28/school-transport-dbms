/**
 * RouteWise — School Transport Management System
 * Production-Grade Interactive Prototype Application Logic
 */

// ============================================================================
// DEFAULT SEED DATA (ALIGNED WITH DBMS 13-TABLE SCHEMA)
// ============================================================================

const INITIAL_STATE = {
  routes: [
    {
      id: "R-01",
      name: "Siddipet — School Campus",
      origin: "Old Bus Stand, Siddipet",
      destination: "Northfield Academy Campus",
      busId: "TS15 UA 1234",
      driver: "Ramesh Kumar",
      driverPhone: "+91 98765 43210",
      attendant: "Lakshmi Bai",
      studentsCount: 34,
      capacity: 40,
      status: "On schedule",
      color: "#4f46e5",
      time: "07:15 AM",
      currentSpeed: "38 km/h",
      nextStop: "Hospital Chowrasta",
      eta: "6 mins",
      progress: 65,
      stops: [
        { order: 1, name: "Old Bus Stand", time: "07:15 AM", landmark: "Near Main Depot", status: "completed" },
        { order: 2, name: "Market Road Junction", time: "07:30 AM", landmark: "Opp. Vegetable Market", status: "completed" },
        { order: 3, name: "Hospital Chowrasta", time: "07:45 AM", landmark: "Govt Civil Hospital", status: "current" },
        { order: 4, name: "Northfield Campus Gate", time: "08:05 AM", landmark: "Main Academic Block", status: "upcoming" }
      ]
    },
    {
      id: "R-02",
      name: "Gajwel — School Campus",
      origin: "Gajwel Main Road",
      destination: "Northfield Academy Campus",
      busId: "TS15 UB 5678",
      driver: "Suresh Reddy",
      driverPhone: "+91 91234 56780",
      attendant: "Sita Sharma",
      studentsCount: 28,
      capacity: 35,
      status: "On schedule",
      color: "#10b981",
      time: "07:10 AM",
      currentSpeed: "42 km/h",
      nextStop: "Railway Gate Crossing",
      eta: "11 mins",
      progress: 50,
      stops: [
        { order: 1, name: "Gajwel Main Road", time: "07:10 AM", landmark: "Near IOC Petrol Pump", status: "completed" },
        { order: 2, name: "Temple Circle", time: "07:25 AM", landmark: "Front of Shiva Temple", status: "completed" },
        { order: 3, name: "Railway Gate Crossing", time: "07:40 AM", landmark: "Beside Level Crossing", status: "current" },
        { order: 4, name: "Northfield Campus Gate", time: "08:00 AM", landmark: "Main Academic Block", status: "upcoming" }
      ]
    },
    {
      id: "R-03",
      name: "Dubbak — School Campus",
      origin: "Dubbak Cross Road",
      destination: "Northfield Academy Campus",
      busId: "TS15 UC 9012",
      driver: "Venu Gopal",
      driverPhone: "+91 90909 09090",
      attendant: "Raju Nayak",
      studentsCount: 16,
      capacity: 18,
      status: "Delayed",
      color: "#f59e0b",
      time: "07:20 AM",
      currentSpeed: "22 km/h",
      nextStop: "Lake View Park",
      eta: "14 mins",
      progress: 35,
      stops: [
        { order: 1, name: "Dubbak Cross Road", time: "07:20 AM", landmark: "Near Police Station", status: "completed" },
        { order: 2, name: "Lake View Park", time: "07:35 AM", landmark: "Next to Boating Point", status: "current" },
        { order: 3, name: "Northfield Campus Gate", time: "07:55 AM", landmark: "Main Academic Block", status: "upcoming" }
      ]
    },
    {
      id: "R-04",
      name: "Cheriyal — School Campus",
      origin: "Cheriyal Town Center",
      destination: "Northfield Academy Campus",
      busId: "TS15 UD 3456",
      driver: "Mahesh Babu",
      driverPhone: "+91 99887 76655",
      attendant: "Kavitha Devi",
      studentsCount: 24,
      capacity: 30,
      status: "Active",
      color: "#3b82f6",
      time: "07:05 AM",
      currentSpeed: "35 km/h",
      nextStop: "High School Circle",
      eta: "8 mins",
      progress: 75,
      stops: [
        { order: 1, name: "Cheriyal Town Center", time: "07:05 AM", landmark: "Panchayat Office", status: "completed" },
        { order: 2, name: "High School Circle", time: "07:25 AM", landmark: "ZPHS Grounds", status: "current" },
        { order: 3, name: "Bypass Junction", time: "07:45 AM", landmark: "Highway Flyover", status: "upcoming" },
        { order: 4, name: "Northfield Campus Gate", time: "08:10 AM", landmark: "Main Academic Block", status: "upcoming" }
      ]
    }
  ],

  buses: [
    {
      id: "TS15 UA 1234",
      model: "Tata Starbus Ultra",
      capacity: 40,
      assignedRoute: "R-01",
      driver: "Ramesh Kumar",
      driverLicense: "TS0120190001234",
      licenseExpiry: "2030-12-31",
      licenseValid: true,
      attendant: "Lakshmi Bai",
      odometer: "28,450 km",
      fuel: "78%",
      status: "Active",
      lastService: "15 Sep 2026",
      nextService: "15 Dec 2026"
    },
    {
      id: "TS15 UB 5678",
      model: "Ashok Leyland Sunshine",
      capacity: 35,
      assignedRoute: "R-02",
      driver: "Suresh Reddy",
      driverLicense: "TS0120180005678",
      licenseExpiry: "2029-06-30",
      licenseValid: true,
      attendant: "Sita Sharma",
      odometer: "34,120 km",
      fuel: "65%",
      status: "Active",
      lastService: "02 Oct 2026",
      nextService: "02 Jan 2027"
    },
    {
      id: "TS15 UC 9012",
      model: "Force Traveller Mini",
      capacity: 18,
      assignedRoute: "R-03",
      driver: "Venu Gopal",
      driverLicense: "TS0120200004321",
      licenseExpiry: "2031-01-20",
      licenseValid: true,
      attendant: "Raju Nayak",
      odometer: "19,800 km",
      fuel: "82%",
      status: "Active",
      lastService: "20 Aug 2026",
      nextService: "20 Nov 2026"
    },
    {
      id: "TS15 UD 3456",
      model: "Eicher Skyline Pro",
      capacity: 30,
      assignedRoute: "R-04",
      driver: "Mahesh Babu",
      driverLicense: "TS0120150009999",
      licenseExpiry: "2024-03-15", // Expired licence! Business rule flag
      licenseValid: false,
      attendant: "Kavitha Devi",
      odometer: "48,900 km",
      fuel: "40%",
      status: "Service Due",
      lastService: "10 Jun 2026",
      nextService: "10 Oct 2026 (Overdue)"
    }
  ],

  students: [
    {
      id: "ST-0241",
      name: "Anil Kumar",
      grade: "Grade 8",
      routeId: "R-01",
      routeName: "R-01 · Siddipet",
      pickupStop: "Old Bus Stand",
      parentName: "K. Mohan Kumar",
      parentContact: "+91 91111 11111",
      pickupStatus: "Picked up",
      pickupTime: "07:16 AM",
      feePlan: "Term Plan",
      feeAmount: 4500,
      feePaid: 4500,
      feeDue: 0,
      feeStatus: "Paid"
    },
    {
      id: "ST-0242",
      name: "Priya Sharma",
      grade: "Grade 9",
      routeId: "R-01",
      routeName: "R-01 · Siddipet",
      pickupStop: "Market Road Junction",
      parentName: "S. Sharma",
      parentContact: "+91 92222 22222",
      pickupStatus: "Picked up",
      pickupTime: "07:31 AM",
      feePlan: "Annual Plan",
      feeAmount: 12000,
      feePaid: 12000,
      feeDue: 0,
      feeStatus: "Paid"
    },
    {
      id: "ST-0243",
      name: "Kiran Goud",
      grade: "Grade 7",
      routeId: "R-01",
      routeName: "R-01 · Siddipet",
      pickupStop: "Hospital Chowrasta",
      parentName: "M. Goud",
      parentContact: "+91 93333 33333",
      pickupStatus: "Pending",
      pickupTime: "-",
      feePlan: "Monthly Plan",
      feeAmount: 1500,
      feePaid: 0,
      feeDue: 1500,
      feeStatus: "Pending"
    },
    {
      id: "ST-0244",
      name: "Divya Teja",
      grade: "Grade 6",
      routeId: "R-02",
      routeName: "R-02 · Gajwel",
      pickupStop: "Gajwel Main Road",
      parentName: "B. Venkatesh",
      parentContact: "+91 94444 44444",
      pickupStatus: "Picked up",
      pickupTime: "07:12 AM",
      feePlan: "Term Plan",
      feeAmount: 4500,
      feePaid: 4500,
      feeDue: 0,
      feeStatus: "Paid"
    },
    {
      id: "ST-0245",
      name: "Rahul Varma",
      grade: "Grade 10",
      routeId: "R-02",
      routeName: "R-02 · Gajwel",
      pickupStop: "Temple Circle",
      parentName: "V. R. Varma",
      parentContact: "+91 95555 55555",
      pickupStatus: "Picked up",
      pickupTime: "07:27 AM",
      feePlan: "Term Plan",
      feeAmount: 4500,
      feePaid: 2000,
      feeDue: 2500,
      feeStatus: "Partial"
    },
    {
      id: "ST-0246",
      name: "Sneha Reddy",
      grade: "Grade 8",
      routeId: "R-02",
      routeName: "R-02 · Gajwel",
      pickupStop: "Railway Gate Crossing",
      parentName: "P. R. Reddy",
      parentContact: "+91 96666 66666",
      pickupStatus: "Absent",
      pickupTime: "-",
      feePlan: "Annual Plan",
      feeAmount: 12000,
      feePaid: 12000,
      feeDue: 0,
      feeStatus: "Paid"
    },
    {
      id: "ST-0247",
      name: "Arjun Rao",
      grade: "Grade 5",
      routeId: "R-03",
      routeName: "R-03 · Dubbak",
      pickupStop: "Dubbak Cross Road",
      parentName: "K. C. Rao",
      parentContact: "+91 97777 77777",
      pickupStatus: "Picked up",
      pickupTime: "07:22 AM",
      feePlan: "Monthly Plan",
      feeAmount: 1500,
      feePaid: 1500,
      feeDue: 0,
      feeStatus: "Paid"
    },
    {
      id: "ST-0248",
      name: "Meena Joshi",
      grade: "Grade 7",
      routeId: "R-03",
      routeName: "R-03 · Dubbak",
      pickupStop: "Lake View Park",
      parentName: "A. Joshi",
      parentContact: "+91 98888 88888",
      pickupStatus: "Late",
      pickupTime: "07:38 AM",
      feePlan: "Term Plan",
      feeAmount: 4500,
      feePaid: 0,
      feeDue: 4500,
      feeStatus: "Pending"
    },
    {
      id: "ST-0249",
      name: "Varun Yadav",
      grade: "Grade 9",
      routeId: "R-04",
      routeName: "R-04 · Cheriyal",
      pickupStop: "Cheriyal Town Center",
      parentName: "R. Yadav",
      parentContact: "+91 91010 10101",
      pickupStatus: "Picked up",
      pickupTime: "07:07 AM",
      feePlan: "Term Plan",
      feeAmount: 4500,
      feePaid: 4500,
      feeDue: 0,
      feeStatus: "Paid"
    },
    {
      id: "ST-0250",
      name: "Nisha Patel",
      grade: "Grade 6",
      routeId: "R-04",
      routeName: "R-04 · Cheriyal",
      pickupStop: "High School Circle",
      parentName: "H. Patel",
      parentContact: "+91 92020 20202",
      pickupStatus: "Pending",
      pickupTime: "-",
      feePlan: "Monthly Plan",
      feeAmount: 1500,
      feePaid: 0,
      feeDue: 1500,
      feeStatus: "Pending"
    },
    {
      id: "ST-0251",
      name: "Aanya Sen",
      grade: "Grade 4",
      routeId: "R-01",
      routeName: "R-01 · Siddipet",
      pickupStop: "Market Road Junction",
      parentName: "D. Sen",
      parentContact: "+91 93030 30303",
      pickupStatus: "Picked up",
      pickupTime: "07:32 AM",
      feePlan: "Term Plan",
      feeAmount: 4500,
      feePaid: 4500,
      feeDue: 0,
      feeStatus: "Paid"
    },
    {
      id: "ST-0252",
      name: "Kabir Mehta",
      grade: "Grade 3",
      routeId: "R-02",
      routeName: "R-02 · Gajwel",
      pickupStop: "Temple Circle",
      parentName: "N. Mehta",
      parentContact: "+91 94040 40404",
      pickupStatus: "Picked up",
      pickupTime: "07:28 AM",
      feePlan: "Annual Plan",
      feeAmount: 12000,
      feePaid: 6000,
      feeDue: 6000,
      feeStatus: "Partial"
    }
  ],

  notifications: [
    {
      id: 1,
      type: "danger",
      title: "Driver License Expiry Alert",
      desc: "Mahesh Babu (Bus TS15 UD 3456) license expired on 15 Mar 2024. Trigger will reject trip assignment.",
      time: "10 mins ago"
    },
    {
      id: 2,
      type: "warning",
      title: "Route 03 Traffic Delay",
      desc: "Dubbak Route running 14 mins behind schedule due to highway construction.",
      time: "25 mins ago"
    },
    {
      id: 3,
      type: "info",
      title: "Quarterly Maintenance Due",
      desc: "Bus TS15 UD 3456 has crossed 48,000 km. Service check required this week.",
      time: "1 hour ago"
    }
  ]
};

// ============================================================================
// APP CONTROLLER & STATE MANAGER
// ============================================================================

class RouteWiseApp {
  constructor() {
    this.storageKey = "routewise_transport_v2";
    this.loadState();
    this.currentRole = "admin"; // 'admin' | 'driver' | 'parent'
    this.currentPage = "dashboard";
    this.activeTrackingRoute = "R-01";
    this.toastTimer = null;
    this.init();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        this.data = JSON.parse(saved);
      } else {
        this.data = JSON.parse(JSON.stringify(INITIAL_STATE));
        this.persist();
      }
    } catch (e) {
      this.data = JSON.parse(JSON.stringify(INITIAL_STATE));
    }
  }

  persist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
  }

  resetData() {
    this.data = JSON.parse(JSON.stringify(INITIAL_STATE));
    this.persist();
    this.toast("Default prototype data restored successfully.");
    this.render();
  }

  init() {
    this.setupListeners();
    this.updateClock();
    setInterval(() => this.updateClock(), 30000);
    this.render();
  }

  updateClock() {
    const clockEl = document.getElementById("liveTimeClock");
    if (clockEl) {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " · " + now.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' });
    }
  }

  // ==========================================================================
  // EVENT LISTENERS & NAVIGATION
  // ==========================================================================

  setupListeners() {
    // Navigation Clicks
    document.addEventListener("click", (e) => {
      const navItem = e.target.closest("[data-page]");
      if (navItem) {
        e.preventDefault();
        this.navigateTo(navItem.dataset.page);
        return;
      }

      const roleBtn = e.target.closest("[data-role]");
      if (roleBtn) {
        e.preventDefault();
        this.switchRole(roleBtn.dataset.role);
        return;
      }

      const gotoBtn = e.target.closest("[data-goto]");
      if (gotoBtn) {
        e.preventDefault();
        this.navigateTo(gotoBtn.dataset.goto);
        return;
      }

      const trackBtn = e.target.closest("[data-track-route]");
      if (trackBtn) {
        e.preventDefault();
        this.activeTrackingRoute = trackBtn.dataset.trackRoute;
        this.navigateTo("tracking");
        return;
      }

      // Close modal on backdrop click
      if (e.target.classList.contains("modal-backdrop")) {
        this.closeModal();
      }

      // Close drawer on backdrop click
      if (e.target.classList.contains("drawer-backdrop")) {
        this.closeDrawer();
      }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const sidebar = document.getElementById("sidebar");
    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
      });
    }

    // Notifications Button
    const notifBtn = document.getElementById("notificationBtn");
    if (notifBtn) {
      notifBtn.addEventListener("click", () => this.openDrawer());
    }

    const drawerCloseBtn = document.getElementById("drawerCloseBtn");
    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener("click", () => this.closeDrawer());
    }

    // DBMS Spec Modal
    const dbmsBtn = document.getElementById("openDbmsSpecBtn");
    if (dbmsBtn) {
      dbmsBtn.addEventListener("click", () => this.openDbmsModal());
    }

    // Escape Key to close modal/drawer
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeModal();
        this.closeDrawer();
      }
    });
  }

  switchRole(role) {
    this.currentRole = role;
    document.querySelectorAll("[data-role]").forEach(b => {
      b.classList.toggle("active", b.dataset.role === role);
    });

    const sidebar = document.getElementById("sidebar");
    if (role === "admin") {
      sidebar.style.display = "flex";
      this.toast("Switched to Administrator Workspace.");
    } else if (role === "driver") {
      this.toast("Switched to Driver Companion Interface.");
    } else if (role === "parent") {
      this.toast("Switched to Parent & Student Portal.");
    }

    this.render();
  }

  navigateTo(page) {
    this.currentPage = page;
    const sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.remove("open");

    document.querySelectorAll(".nav-item").forEach(b => {
      b.classList.toggle("active", b.dataset.page === page);
    });

    this.render();
  }

  // ==========================================================================
  // RENDER DISPATCHER
  // ==========================================================================

  render() {
    const mainContainer = document.getElementById("mainContentArea");
    if (!mainContainer) return;

    // Update Breadcrumb & Header
    this.updateHeaderMeta();

    if (this.currentRole === "driver") {
      mainContainer.innerHTML = this.renderDriverPortal();
      this.attachDriverListeners();
      return;
    }

    if (this.currentRole === "parent") {
      mainContainer.innerHTML = this.renderParentPortal();
      this.attachParentListeners();
      return;
    }

    // Admin Views
    switch (this.currentPage) {
      case "dashboard":
        mainContainer.innerHTML = this.renderDashboard();
        this.attachDashboardListeners();
        break;
      case "tracking":
        mainContainer.innerHTML = this.renderLiveTracking();
        this.attachTrackingListeners();
        break;
      case "students":
        mainContainer.innerHTML = this.renderStudentsDirectory();
        this.attachStudentsListeners();
        break;
      case "routes":
        mainContainer.innerHTML = this.renderRoutesManager();
        this.attachRoutesListeners();
        break;
      case "fleet":
        mainContainer.innerHTML = this.renderFleetManager();
        this.attachFleetListeners();
        break;
      case "attendance":
        mainContainer.innerHTML = this.renderAttendanceRegister();
        this.attachAttendanceListeners();
        break;
      case "fees":
        mainContainer.innerHTML = this.renderFeesLedger();
        this.attachFeesListeners();
        break;
      case "reports":
        mainContainer.innerHTML = this.renderReportsAnalytics();
        this.attachReportsListeners();
        break;
      default:
        mainContainer.innerHTML = this.renderDashboard();
        this.attachDashboardListeners();
    }
  }

  updateHeaderMeta() {
    const crumb = document.getElementById("crumbTitle");
    const eyebrow = document.getElementById("pageEyebrow");
    const heading = document.getElementById("pageHeading");
    const subheading = document.getElementById("pageSubheading");
    const actionContainer = document.getElementById("pageHeaderActions");

    if (!crumb || !heading) return;

    if (this.currentRole === "driver") {
      crumb.textContent = "Driver View";
      eyebrow.innerHTML = `<span></span> TRIP COMPANION`;
      heading.textContent = "Bus TS15 UA 1234 · Morning Run";
      subheading.textContent = "Driver Ramesh Kumar | Route 01 (Siddipet — School Campus)";
      actionContainer.innerHTML = `<button class="btn btn-outline" id="driverRefreshTripBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg> Sync Trip</button>`;
      return;
    }

    if (this.currentRole === "parent") {
      crumb.textContent = "Parent Portal";
      eyebrow.innerHTML = `<span></span> PARENT PASS`;
      heading.textContent = "Welcome, K. Mohan Kumar";
      subheading.textContent = "Monitoring Anil Kumar · Grade 8 · Route 01 (Siddipet)";
      actionContainer.innerHTML = `<button class="btn btn-primary" id="parentPayFeeHeaderBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg> Transport Card</button>`;
      return;
    }

    const titles = {
      dashboard: ["Dashboard", "TRANSPORT OVERVIEW", "Good morning, Administrator", "Real-time transport operations, fleet readiness, and student safety status."],
      tracking: ["Live Tracking", "GPS TELEMETRY", "Live Fleet Radar & Tracking", "Real-time bus tracking, stop arrival ETAs, and road safety metrics."],
      students: ["Students", "STUDENT DIRECTORY", "Student Transport Registry", "Manage enrolled students, stop allocations, and emergency parent contacts."],
      routes: ["Routes & Stops", "NETWORK TOPOLOGY", "Routes & Stop Sequences", "Configured bus transit routes, stop orders, and capacity thresholds."],
      fleet: ["Fleet & Crew", "ASSET MANAGEMENT", "Vehicles, Drivers & Crew", "Manage buses, drivers, attendants, license validation, and service schedules."],
      attendance: ["Attendance", "DAILY OPERATIONS", "Pickup Attendance Register", "Daily boarding logs submitted by attendants and drivers at each bus stop."],
      fees: ["Fees & Billing", "FINANCE & ACCOUNTS", "Transport Fees & Ledger", "Fee payment collection, student billing plans, and outstanding ledger balance."],
      reports: ["Reports", "DATA & AUDIT", "Reports & Analytics", "Analytical query exports mirroring DBMS Project-Based Learning objectives."]
    };

    const info = titles[this.currentPage] || titles.dashboard;
    crumb.textContent = info[0];
    eyebrow.innerHTML = `<span></span> ${info[1]}`;
    heading.textContent = info[2];
    subheading.textContent = info[3];

    // Primary action buttons per page
    if (this.currentPage === "students") {
      actionContainer.innerHTML = `
        <button class="btn btn-secondary" id="exportStudentCsvBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg> Export CSV</button>
        <button class="btn btn-primary" id="addStudentModalBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add Student</button>
      `;
    } else if (this.currentPage === "routes") {
      actionContainer.innerHTML = `
        <button class="btn btn-primary" id="addRouteModalBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> New Route</button>
      `;
    } else if (this.currentPage === "fleet") {
      actionContainer.innerHTML = `
        <button class="btn btn-primary" id="addVehicleModalBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add Vehicle</button>
      `;
    } else if (this.currentPage === "attendance") {
      actionContainer.innerHTML = `
        <button class="btn btn-secondary" id="batchMarkAllPresentBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"/></svg> Mark All Picked Up</button>
        <button class="btn btn-primary" id="saveAttendanceBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Save Register</button>
      `;
    } else if (this.currentPage === "fees") {
      actionContainer.innerHTML = `
        <button class="btn btn-primary" id="recordPaymentModalBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> Record Payment</button>
      `;
    } else {
      actionContainer.innerHTML = `
        <button class="btn btn-secondary" id="globalExportReportBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg> Export Report</button>
        <button class="btn btn-primary" id="dashboardAddStudentBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Register Student</button>
      `;
    }
  }

  // ==========================================================================
  // VIEW: ADMIN DASHBOARD
  // ==========================================================================

  renderDashboard() {
    const totalStudents = this.data.students.length;
    const totalCapacity = this.data.buses.reduce((acc, b) => acc + b.capacity, 0);
    const activeRoutes = this.data.routes.length;
    
    // Picked up counts
    const pickedUpCount = this.data.students.filter(s => s.pickupStatus === "Picked up").length;
    const lateCount = this.data.students.filter(s => s.pickupStatus === "Late").length;
    const absentCount = this.data.students.filter(s => s.pickupStatus === "Absent").length;
    const pendingCount = this.data.students.filter(s => s.pickupStatus === "Pending").length;
    const completionPct = totalStudents > 0 ? Math.round((pickedUpCount / totalStudents) * 100) : 0;

    // Fees calculation
    const totalBilled = this.data.students.reduce((acc, s) => acc + s.feeAmount, 0);
    const totalCollected = this.data.students.reduce((acc, s) => acc + s.feePaid, 0);
    const totalDue = this.data.students.reduce((acc, s) => acc + s.feeDue, 0);
    const feePct = totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 0;

    // Dynamic Donut Gradient
    const p1 = (pickedUpCount / totalStudents) * 100;
    const p2 = p1 + (lateCount / totalStudents) * 100;
    const p3 = p2 + (absentCount / totalStudents) * 100;

    return `
      <!-- Top 4 KPIs -->
      <section class="stats-overview-grid">
        <article class="stat-card">
          <div class="stat-card-top">
            <span class="stat-card-label">Enrolled Students</span>
            <div class="stat-card-icon primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
          </div>
          <div class="stat-card-value">${totalStudents} <small>students</small></div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill primary" style="width: 100%;"></div>
          </div>
          <div class="stat-card-bottom">
            <span class="trend-badge up">↗ 100% Registered</span>
            <span>Across 4 zones</span>
          </div>
        </article>

        <article class="stat-card">
          <div class="stat-card-top">
            <span class="stat-card-label">Active Bus Routes</span>
            <div class="stat-card-icon emerald">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10"/><path d="M7 12h10"/><path d="M7 17h10"/></svg>
            </div>
          </div>
          <div class="stat-card-value">${activeRoutes} <small>routes</small></div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill emerald" style="width: 85%;"></div>
          </div>
          <div class="stat-card-bottom">
            <span class="trend-badge up">● 3 On-Time</span>
            <span>1 Delay reported</span>
          </div>
        </article>

        <article class="stat-card">
          <div class="stat-card-top">
            <span class="stat-card-label">Today's Pickup Rate</span>
            <div class="stat-card-icon blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
          </div>
          <div class="stat-card-value">${completionPct}% <small>boarded</small></div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill blue" style="width: ${completionPct}%;"></div>
          </div>
          <div class="stat-card-bottom">
            <span class="trend-badge up">✓ ${pickedUpCount} boarded</span>
            <span>${absentCount} absent</span>
          </div>
        </article>

        <article class="stat-card">
          <div class="stat-card-top">
            <span class="stat-card-label">Fees Collection Rate</span>
            <div class="stat-card-icon amber">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
          </div>
          <div class="stat-card-value">₹${totalCollected.toLocaleString()} <small>/ ₹${totalBilled.toLocaleString()}</small></div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill amber" style="width: ${feePct}%;"></div>
          </div>
          <div class="stat-card-bottom">
            <span class="trend-badge neutral">${feePct}% Collected</span>
            <span style="color: var(--amber-600); font-weight: 700;">₹${totalDue.toLocaleString()} Due</span>
          </div>
        </article>
      </section>

      <!-- Main Operational Grid -->
      <section class="dashboard-grid-main">
        <!-- Live Route Activity Panel -->
        <article class="panel">
          <div class="panel-header">
            <div class="panel-title-group">
              <h2>Live Route & Fleet Status</h2>
              <p>Real-time tracking of morning scheduled school runs</p>
            </div>
            <button class="btn btn-sm btn-secondary" data-goto="routes">View All Routes →</button>
          </div>
          <div class="panel-body" style="padding: 0;">
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Route / Area</th>
                    <th>Assigned Bus & Driver</th>
                    <th>Capacity Load</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.data.routes.map(r => `
                    <tr>
                      <td>
                        <div class="route-badge">
                          <span class="route-num-box" style="background:${r.color}15; color:${r.color}">${r.id}</span>
                          <div class="route-info-meta">
                            <strong>${r.name}</strong>
                            <small>${r.origin}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <strong>${r.busId}</strong>
                        <div style="font-size:0.75rem; color:var(--slate-500);">${r.driver} · ${r.driverPhone}</div>
                      </td>
                      <td>
                        <div style="display:flex; align-items:center; gap:8px;">
                          <strong style="font-size:0.85rem;">${r.studentsCount} / ${r.capacity}</strong>
                          <span style="font-size:0.72rem; color:var(--slate-400);">(${Math.round((r.studentsCount/r.capacity)*100)}%)</span>
                        </div>
                        <div class="progress-bar-container" style="margin-top:4px; height:4px; width:120px;">
                          <div class="progress-bar-fill ${r.studentsCount > r.capacity * 0.9 ? 'amber' : 'emerald'}" style="width:${Math.round((r.studentsCount/r.capacity)*100)}%;"></div>
                        </div>
                      </td>
                      <td>
                        <span class="badge ${r.status === 'On schedule' ? 'badge-success' : r.status === 'Delayed' ? 'badge-warning' : 'badge-info'}">
                          <span class="badge-dot"></span> ${r.status}
                        </span>
                      </td>
                      <td>
                        <button class="btn btn-sm btn-outline" data-track-route="${r.id}">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
                          Track
                        </button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
          <div class="panel-footer">
            <span>Enforcing DBMS constraint: <strong>Capacity > 0 & 1 Active Bus Assignment</strong></span>
            <button class="btn btn-sm btn-outline" data-goto="tracking">Open Full Live Radar →</button>
          </div>
        </article>

        <!-- Pickup Snapshot Donut Panel -->
        <article class="panel">
          <div class="panel-header">
            <div class="panel-title-group">
              <h2>Pickup Completion</h2>
              <p>Attendance submitted by bus attendants</p>
            </div>
            <span class="badge badge-primary">TODAY</span>
          </div>
          <div class="panel-body">
            <div class="donut-showcase-wrap">
              <div class="donut-chart-circle" style="background: conic-gradient(
                var(--emerald-500) 0% ${p1}%,
                var(--amber-500) ${p1}% ${p2}%,
                var(--rose-500) ${p2}% ${p3}%,
                var(--slate-300) ${p3}% 100%
              );">
                <div class="donut-chart-center">
                  <strong>${completionPct}%</strong>
                  <span>Boarded</span>
                </div>
              </div>

              <div class="donut-legend-stack">
                <div class="donut-legend-row">
                  <span class="donut-legend-label">
                    <span class="legend-color-dot" style="background:var(--emerald-500);"></span>
                    Picked Up
                  </span>
                  <strong>${pickedUpCount}</strong>
                </div>
                <div class="donut-legend-row">
                  <span class="donut-legend-label">
                    <span class="legend-color-dot" style="background:var(--amber-500);"></span>
                    Late Picked
                  </span>
                  <strong>${lateCount}</strong>
                </div>
                <div class="donut-legend-row">
                  <span class="donut-legend-label">
                    <span class="legend-color-dot" style="background:var(--rose-500);"></span>
                    Absent
                  </span>
                  <strong>${absentCount}</strong>
                </div>
                <div class="donut-legend-row">
                  <span class="donut-legend-label">
                    <span class="legend-color-dot" style="background:var(--slate-300);"></span>
                    Pending
                  </span>
                  <strong>${pendingCount}</strong>
                </div>
              </div>
            </div>

            <div class="callout-info-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <div>Pickup data is synced live with PICKUP_LOG. Parents receive an automated SMS upon boarding.</div>
            </div>

            <button class="btn btn-outline" style="width:100%; margin-top:16px;" data-goto="attendance">
              Open Boarding Attendance Register →
            </button>
          </div>
        </article>
      </section>

      <!-- Bottom Operational Grid -->
      <section class="dashboard-grid-bottom">
        <!-- Attention Needed Panel -->
        <article class="panel">
          <div class="panel-header">
            <div class="panel-title-group">
              <h2>Operations & Compliance Alerts</h2>
              <p>Database trigger warnings and maintenance notices</p>
            </div>
            <span class="badge badge-danger">${this.data.notifications.length} Action Items</span>
          </div>
          <div class="panel-body">
            <div class="attention-items-list">
              ${this.data.notifications.map(n => `
                <div class="attention-item-row">
                  <div class="attention-icon-box ${n.type === 'danger' ? 'rose' : n.type === 'warning' ? 'amber' : 'purple'}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      ${n.type === 'danger' 
                        ? '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>' 
                        : n.type === 'warning' 
                        ? '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>' 
                        : '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'}
                    </svg>
                  </div>
                  <div class="attention-text-content">
                    <strong>${n.title}</strong>
                    <p>${n.desc}</p>
                  </div>
                  <button class="action-circle-btn" data-goto="${n.type === 'danger' ? 'fleet' : n.type === 'warning' ? 'routes' : 'fleet'}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </button>
                </div>
              `).join("")}
            </div>
          </div>
        </article>

        <!-- Quick Actions Panel -->
        <article class="panel">
          <div class="panel-header">
            <div class="panel-title-group">
              <h2>Quick Actions</h2>
              <p>Shortcuts for everyday transport tasks</p>
            </div>
          </div>
          <div class="panel-body">
            <div class="quick-actions-grid">
              <button class="quick-action-tile" id="qaRegisterStudent">
                <div class="quick-tile-icon primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <div class="quick-tile-copy">
                  <strong>Register Student</strong>
                  <small>Assign route & stop</small>
                </div>
              </button>

              <button class="quick-action-tile" data-goto="attendance">
                <div class="quick-tile-icon emerald">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div class="quick-tile-copy">
                  <strong>Take Attendance</strong>
                  <small>Update student pickup</small>
                </div>
              </button>

              <button class="quick-action-tile" data-goto="fees">
                <div class="quick-tile-icon amber">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <div class="quick-tile-copy">
                  <strong>Record Payment</strong>
                  <small>Issue fee receipt</small>
                </div>
              </button>

              <button class="quick-action-tile" data-goto="reports">
                <div class="quick-tile-icon blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <div class="quick-tile-copy">
                  <strong>Generate Audit</strong>
                  <small>Export DBMS reports</small>
                </div>
              </button>
            </div>

            <div style="margin-top: 16px; padding: 12px; background: var(--slate-50); border: 1px dashed var(--slate-300); border-radius: var(--radius-md); display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="font-size:0.8rem; color:var(--slate-800);">Need to reset demo records?</strong>
                <div style="font-size:0.72rem; color:var(--slate-500);">Restores initial 13-table seed state</div>
              </div>
              <button class="btn btn-sm btn-danger" id="resetDataBtn">Reset Demo</button>
            </div>
          </div>
        </article>
      </section>
    `;
  }

  attachDashboardListeners() {
    const regBtn = document.getElementById("dashboardAddStudentBtn");
    if (regBtn) regBtn.addEventListener("click", () => this.openAddStudentModal());

    const qaReg = document.getElementById("qaRegisterStudent");
    if (qaReg) qaReg.addEventListener("click", () => this.openAddStudentModal());

    const exportBtn = document.getElementById("globalExportReportBtn");
    if (exportBtn) exportBtn.addEventListener("click", () => this.exportCsv("Enrolled Students", this.data.students));

    const resetBtn = document.getElementById("resetDataBtn");
    if (resetBtn) resetBtn.addEventListener("click", () => {
      if (confirm("Reset prototype to clean initial seed data?")) {
        this.resetData();
      }
    });
  }

  // ==========================================================================
  // VIEW: LIVE BUS TRACKING & MAP
  // ==========================================================================

  renderLiveTracking() {
    const route = this.data.routes.find(r => r.id === this.activeTrackingRoute) || this.data.routes[0];
    const bus = this.data.buses.find(b => b.id === route.busId) || this.data.buses[0];

    return `
      <div class="tracking-layout-grid">
        <!-- Interactive Map Visual Canvas -->
        <div class="map-card-canvas">
          <div class="map-card-toolbar">
            <div class="route-selector-tabs">
              ${this.data.routes.map(r => `
                <button class="route-tab-pill ${r.id === this.activeTrackingRoute ? 'active' : ''}" data-select-track-route="${r.id}">
                  Route ${r.id} · ${r.name.split('—')[0].trim()}
                </button>
              `).join("")}
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="live-pulse-dot"></span>
              <span style="font-size:0.78rem; font-weight:700; color:var(--emerald-600);">LIVE TELEMETRY ACTIVE</span>
            </div>
          </div>

          <div class="svg-map-viewport">
            <div class="map-grid-overlay"></div>

            <!-- Heads-Up Display Overlay -->
            <div class="map-hud-overlay">
              <div class="map-hud-metric">
                <strong>${route.busId}</strong>
                <small>Assigned Vehicle</small>
              </div>
              <div class="map-hud-divider"></div>
              <div class="map-hud-metric">
                <strong style="color:var(--emerald-600);">${route.currentSpeed}</strong>
                <small>GPS Speed</small>
              </div>
              <div class="map-hud-divider"></div>
              <div class="map-hud-metric">
                <strong style="color:var(--primary);">${route.eta}</strong>
                <small>Next Stop ETA</small>
              </div>
              <div class="map-hud-divider"></div>
              <div class="map-hud-metric">
                <strong>${route.studentsCount} / ${route.capacity}</strong>
                <small>Passengers</small>
              </div>
            </div>

            <!-- Stylized Animated Vector Route Map -->
            <svg viewBox="0 0 800 440" style="width:100%; height:100%; overflow:visible;">
              <defs>
                <linearGradient id="routeLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.8"/>
                  <stop offset="100%" stop-color="#10b981" stop-opacity="0.8"/>
                </linearGradient>
                <filter id="busGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#4f46e5" flood-opacity="0.4"/>
                </filter>
              </defs>

              <!-- Curving Main Highway Route -->
              <path d="M 80 340 C 200 320, 260 210, 400 230 C 520 250, 600 130, 720 110" 
                    fill="none" stroke="#cbd5e1" stroke-width="12" stroke-linecap="round"/>
              <path d="M 80 340 C 200 320, 260 210, 400 230 C 520 250, 600 130, 720 110" 
                    fill="none" stroke="url(#routeLineGrad)" stroke-width="6" stroke-linecap="round" stroke-dasharray="8 6"/>

              <!-- Stop 1 -->
              <g transform="translate(80, 340)">
                <circle r="14" fill="#ffffff" stroke="#10b981" stroke-width="4"/>
                <circle r="6" fill="#10b981"/>
                <text x="0" y="32" font-size="12" font-weight="700" fill="#1e293b" text-anchor="middle">Stop 1: ${route.stops[0] ? route.stops[0].name : 'Origin'}</text>
                <text x="0" y="46" font-size="10" fill="#64748b" text-anchor="middle">07:15 AM · Picked Up (12)</text>
              </g>

              <!-- Stop 2 -->
              <g transform="translate(290, 240)">
                <circle r="14" fill="#ffffff" stroke="#10b981" stroke-width="4"/>
                <circle r="6" fill="#10b981"/>
                <text x="0" y="32" font-size="12" font-weight="700" fill="#1e293b" text-anchor="middle">Stop 2: ${route.stops[1] ? route.stops[1].name : 'Stop 2'}</text>
                <text x="0" y="46" font-size="10" fill="#64748b" text-anchor="middle">07:30 AM · Picked Up (10)</text>
              </g>

              <!-- Bus Animated Location Indicator -->
              <g transform="translate(460, 215)" filter="url(#busGlow)">
                <circle r="22" fill="#4f46e5" opacity="0.2">
                  <animate attributeName="r" values="20;32;20" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite"/>
                </circle>
                <rect x="-18" y="-12" width="36" height="24" rx="6" fill="#4f46e5"/>
                <rect x="-14" y="-8" width="8" height="16" rx="2" fill="#ffffff" opacity="0.9"/>
                <rect x="-2" y="-8" width="6" height="16" rx="1" fill="#ffffff" opacity="0.9"/>
                <rect x="8" y="-8" width="6" height="16" rx="1" fill="#ffffff" opacity="0.9"/>
                <circle cx="-10" cy="14" r="3.5" fill="#1e293b"/>
                <circle cx="10" cy="14" r="3.5" fill="#1e293b"/>
                <text x="0" y="-18" font-size="11" font-weight="800" fill="#4f46e5" text-anchor="middle">BUS ${route.busId}</text>
              </g>

              <!-- Stop 3 (Next Stop) -->
              <g transform="translate(560, 160)">
                <circle r="14" fill="#ffffff" stroke="#4f46e5" stroke-width="4"/>
                <circle r="6" fill="#4f46e5"/>
                <text x="0" y="32" font-size="12" font-weight="700" fill="#1e293b" text-anchor="middle">Stop 3: ${route.stops[2] ? route.stops[2].name : 'Stop 3'}</text>
                <text x="0" y="46" font-size="10" fill="#4f46e5" font-weight="700" text-anchor="middle">ETA: ${route.eta} (Next)</text>
              </g>

              <!-- Campus Final Destination -->
              <g transform="translate(720, 110)">
                <circle r="16" fill="#ffffff" stroke="#3b82f6" stroke-width="5"/>
                <circle r="7" fill="#3b82f6"/>
                <text x="0" y="34" font-size="12" font-weight="800" fill="#1e293b" text-anchor="middle">School Campus</text>
                <text x="0" y="48" font-size="10" fill="#64748b" text-anchor="middle">Arrival: 08:05 AM</text>
              </g>
            </svg>
          </div>
        </div>

        <!-- Right Side Telemetry & Sequence Panel -->
        <div class="tracking-sidebar-panel">
          <!-- Bus Details Card -->
          <div class="bus-live-card">
            <div class="bus-card-header">
              <span class="bus-number-tag">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10"/><path d="M7 12h10"/><path d="M7 17h10"/></svg>
                ${bus.id}
              </span>
              <span class="badge ${bus.status === 'Active' ? 'badge-success' : 'badge-warning'}">${bus.status}</span>
            </div>

            <div class="bus-driver-row">
              <div class="driver-avatar-circle">${bus.driver.split(' ').map(x=>x[0]).join('')}</div>
              <div class="driver-info-block">
                <strong>${bus.driver}</strong>
                <small>Driver Lic: ${bus.driverLicense}</small>
                <div style="font-size:0.72rem; color:var(--primary); font-weight:600;">Attendant: ${bus.attendant}</div>
              </div>
            </div>

            <div class="telemetry-metrics-grid">
              <div class="telemetry-metric-box">
                <strong style="color:var(--emerald-600);">${route.currentSpeed}</strong>
                <small>Current Speed</small>
              </div>
              <div class="telemetry-metric-box">
                <strong>${bus.fuel}</strong>
                <small>Fuel Level</small>
              </div>
              <div class="telemetry-metric-box">
                <strong style="color:var(--primary);">${route.studentsCount} / ${bus.capacity}</strong>
                <small>Current Load</small>
              </div>
              <div class="telemetry-metric-box">
                <strong>${bus.odometer}</strong>
                <small>Odometer</small>
              </div>
            </div>

            <div style="display:flex; gap:8px;">
              <a href="tel:${route.driverPhone}" class="btn btn-secondary btn-sm" style="flex:1;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Call Driver
              </a>
              <button class="btn btn-outline btn-sm" id="sendRouteAlertBtn">
                Send Notification
              </button>
            </div>
          </div>

          <!-- Stop Sequence Timeline -->
          <div class="sequence-timeline-card">
            <div class="sequence-timeline-title">
              <span>Ordered Stop Sequence</span>
              <span style="font-size:0.72rem; color:var(--slate-400); font-weight:600;">ROUTE_SEQUENCE Table</span>
            </div>

            <div class="timeline-stops-list">
              ${route.stops.map(st => `
                <div class="timeline-stop-item ${st.status}">
                  <div class="timeline-stop-node"></div>
                  <div class="timeline-stop-meta">
                    <strong>Stop ${st.order}: ${st.name}</strong>
                    <span>${st.time}</span>
                  </div>
                  <div class="timeline-stop-sub">${st.landmark}</div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachTrackingListeners() {
    document.querySelectorAll("[data-select-track-route]").forEach(btn => {
      btn.addEventListener("click", () => {
        this.activeTrackingRoute = btn.dataset.selectTrackRoute;
        this.render();
      });
    });

    const alertBtn = document.getElementById("sendRouteAlertBtn");
    if (alertBtn) {
      alertBtn.addEventListener("click", () => {
        this.toast(`Broadcast SMS sent to all parents on ${this.activeTrackingRoute}.`);
      });
    }
  }

  // ==========================================================================
  // VIEW: STUDENTS DIRECTORY
  // ==========================================================================

  renderStudentsDirectory() {
    return `
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title-group">
            <h2>Registered Students</h2>
            <p>Full student directory mapped to TRANSPORT_REGISTRATION</p>
          </div>
          <div class="filter-select-group">
            <select class="filter-dropdown" id="studentRouteFilter">
              <option value="ALL">All Routes (4)</option>
              ${this.data.routes.map(r => `<option value="${r.id}">Route ${r.id} · ${r.name.split('—')[0].trim()}</option>`).join("")}
            </select>
            <select class="filter-dropdown" id="studentStatusFilter">
              <option value="ALL">All Boarding Status</option>
              <option value="Picked up">Picked up</option>
              <option value="Pending">Pending</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
        </div>

        <div class="panel-body" style="padding: 16px 22px;">
          <div class="filter-toolbar-row">
            <div class="search-input-group">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" class="search-input-field" id="studentSearchQuery" placeholder="Search by student name, ID or parent...">
            </div>
            <div style="font-size:0.8rem; color:var(--slate-500);">
              Showing <strong id="studentFilteredCount">${this.data.students.length}</strong> registered students
            </div>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Student Info</th>
                  <th>ID / Roll</th>
                  <th>Grade</th>
                  <th>Assigned Route & Stop</th>
                  <th>Parent / Emergency Contact</th>
                  <th>Boarding Status</th>
                  <th>Fee Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="studentTableBody">
                ${this.renderStudentRows(this.data.students)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  renderStudentRows(studentsList) {
    if (!studentsList || studentsList.length === 0) {
      return `<tr><td colspan="8" style="text-align:center; padding:32px; color:var(--slate-400);">No students match your query.</td></tr>`;
    }

    return studentsList.map(s => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:34px; height:34px; border-radius:50%; background:var(--primary-light); color:var(--primary); font-weight:700; font-size:0.85rem; display:flex; align-items:center; justify-content:center;">
              ${s.name.split(' ').map(x=>x[0]).join('')}
            </div>
            <div>
              <strong>${s.name}</strong>
              <div style="font-size:0.72rem; color:var(--slate-400);">Parent: ${s.parentName}</div>
            </div>
          </div>
        </td>
        <td><span style="font-family:monospace; font-weight:700; color:var(--slate-600);">${s.id}</span></td>
        <td><span class="badge badge-neutral">${s.grade}</span></td>
        <td>
          <strong>${s.routeName}</strong>
          <div style="font-size:0.74rem; color:var(--slate-500);">${s.pickupStop}</div>
        </td>
        <td>
          <strong>${s.parentContact}</strong>
        </td>
        <td>
          <span class="badge ${s.pickupStatus === 'Picked up' ? 'badge-success' : s.pickupStatus === 'Late' ? 'badge-warning' : s.pickupStatus === 'Absent' ? 'badge-danger' : 'badge-neutral'}">
            <span class="badge-dot"></span> ${s.pickupStatus}
          </span>
        </td>
        <td>
          <span class="badge ${s.feeStatus === 'Paid' ? 'badge-success' : s.feeStatus === 'Partial' ? 'badge-warning' : 'badge-danger'}">
            ${s.feeStatus}
          </span>
        </td>
        <td>
          <div style="display:flex; gap:6px;">
            <button class="btn btn-sm btn-secondary" data-edit-student="${s.id}" title="Edit Student">Edit</button>
            <button class="btn btn-sm btn-danger" data-delete-student="${s.id}" title="Delete">✕</button>
          </div>
        </td>
      </tr>
    `).join("");
  }

  attachStudentsListeners() {
    const searchInput = document.getElementById("studentSearchQuery");
    const routeFilter = document.getElementById("studentRouteFilter");
    const statusFilter = document.getElementById("studentStatusFilter");
    const tbody = document.getElementById("studentTableBody");
    const countEl = document.getElementById("studentFilteredCount");

    const filterHandler = () => {
      const q = searchInput ? searchInput.value.toLowerCase().trim() : "";
      const routeVal = routeFilter ? routeFilter.value : "ALL";
      const statusVal = statusFilter ? statusFilter.value : "ALL";

      const filtered = this.data.students.filter(s => {
        const matchesQuery = s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.parentName.toLowerCase().includes(q) || s.pickupStop.toLowerCase().includes(q);
        const matchesRoute = routeVal === "ALL" || s.routeId === routeVal;
        const matchesStatus = statusVal === "ALL" || s.pickupStatus === statusVal;
        return matchesQuery && matchesRoute && matchesStatus;
      });

      if (tbody) tbody.innerHTML = this.renderStudentRows(filtered);
      if (countEl) countEl.textContent = filtered.length;
    };

    if (searchInput) searchInput.addEventListener("input", filterHandler);
    if (routeFilter) routeFilter.addEventListener("change", filterHandler);
    if (statusFilter) statusFilter.addEventListener("change", filterHandler);

    // Modal Triggers
    const addBtn = document.getElementById("addStudentModalBtn");
    if (addBtn) addBtn.addEventListener("click", () => this.openAddStudentModal());

    const exportBtn = document.getElementById("exportStudentCsvBtn");
    if (exportBtn) exportBtn.addEventListener("click", () => this.exportCsv("Enrolled Students", this.data.students));

    // Delete Student
    document.addEventListener("click", (e) => {
      const delBtn = e.target.closest("[data-delete-student]");
      if (delBtn) {
        const sid = delBtn.dataset.deleteStudent;
        if (confirm(`Remove student ${sid} from transport registration?`)) {
          this.data.students = this.data.students.filter(s => s.id !== sid);
          this.persist();
          this.toast(`Student ${sid} removed.`);
          this.render();
        }
      }

      const editBtn = e.target.closest("[data-edit-student]");
      if (editBtn) {
        const sid = editBtn.dataset.editStudent;
        const st = this.data.students.find(s => s.id === sid);
        if (st) {
          const newPhone = prompt(`Update parent phone for ${st.name}:`, st.parentContact);
          if (newPhone) {
            st.parentContact = newPhone.trim();
            this.persist();
            this.toast(`Updated contact for ${st.name}`);
            this.render();
          }
        }
      }
    });
  }

  // ==========================================================================
  // VIEW: ROUTES & STOPS MANAGER
  // ==========================================================================

  renderRoutesManager() {
    return `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div class="panel">
          <div class="panel-header">
            <div class="panel-title-group">
              <h2>Active Transit Routes & Sequences</h2>
              <p>Relational mapping across ROUTE, STOP, and ROUTE_SEQUENCE tables</p>
            </div>
            <button class="btn btn-primary" id="openAddRouteModalBtn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Route
            </button>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(360px, 1fr)); gap:20px;">
          ${this.data.routes.map(r => {
            const pct = Math.round((r.studentsCount / r.capacity) * 100);
            return `
              <div class="panel">
                <div class="panel-header">
                  <div class="route-badge">
                    <span class="route-num-box" style="background:${r.color}15; color:${r.color};">${r.id}</span>
                    <div class="route-info-meta">
                      <strong>${r.name}</strong>
                      <small>${r.time} Departure</small>
                    </div>
                  </div>
                  <span class="badge ${r.status === 'On schedule' ? 'badge-success' : 'badge-warning'}">${r.status}</span>
                </div>
                <div class="panel-body">
                  <div style="margin-bottom:14px; font-size:0.83rem; color:var(--slate-600);">
                    <div><strong>Origin:</strong> ${r.origin}</div>
                    <div><strong>Destination:</strong> ${r.destination}</div>
                    <div style="margin-top:4px;"><strong>Vehicle:</strong> ${r.busId} · Driver: ${r.driver}</div>
                  </div>

                  <div style="margin-bottom:16px;">
                    <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:4px;">
                      <span>Bus Capacity Load</span>
                      <strong>${r.studentsCount} / ${r.capacity} Seats (${pct}%)</strong>
                    </div>
                    <div class="progress-bar-container" style="height:6px;">
                      <div class="progress-bar-fill ${pct >= 90 ? 'amber' : 'emerald'}" style="width:${pct}%;"></div>
                    </div>
                    ${pct >= 90 ? `<div style="font-size:0.72rem; color:var(--amber-600); margin-top:4px;">⚠️ Nearing capacity trigger threshold (Max: ${r.capacity})</div>` : ''}
                  </div>

                  <strong style="font-size:0.8rem; color:var(--slate-700); display:block; margin-bottom:8px;">Stops & Timeline</strong>
                  <div class="timeline-stops-list" style="padding-left:18px;">
                    ${r.stops.map(st => `
                      <div class="timeline-stop-item ${st.status}">
                        <div class="timeline-stop-node" style="left:-18px; width:12px; height:12px;"></div>
                        <div class="timeline-stop-meta">
                          <strong style="font-size:0.8rem;">${st.order}. ${st.name}</strong>
                          <span style="font-size:0.72rem;">${st.time}</span>
                        </div>
                        <div class="timeline-stop-sub" style="font-size:0.7rem;">${st.landmark}</div>
                      </div>
                    `).join("")}
                  </div>

                  <div style="margin-top:18px; display:flex; gap:8px;">
                    <button class="btn btn-outline btn-sm" style="flex:1;" data-track-route="${r.id}">Track Live →</button>
                    <button class="btn btn-secondary btn-sm" data-manage-stops="${r.id}">Add Stop</button>
                  </div>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  attachRoutesListeners() {
    const addBtn = document.getElementById("openAddRouteModalBtn");
    if (addBtn) addBtn.addEventListener("click", () => this.openAddRouteModal());

    document.addEventListener("click", (e) => {
      const stopBtn = e.target.closest("[data-manage-stops]");
      if (stopBtn) {
        const rid = stopBtn.dataset.manageStops;
        const stopName = prompt(`Add a new intermediate stop to ${rid}:`);
        if (stopName) {
          const r = this.data.routes.find(x => x.id === rid);
          if (r) {
            r.stops.push({
              order: r.stops.length + 1,
              name: stopName.trim(),
              time: "07:50 AM",
              landmark: "New Added Stop",
              status: "upcoming"
            });
            this.persist();
            this.toast(`Added stop "${stopName}" to Route ${rid}`);
            this.render();
          }
        }
      }
    });
  }

  // ==========================================================================
  // VIEW: FLEET & CREW MANAGER
  // ==========================================================================

  renderFleetManager() {
    return `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div class="panel">
          <div class="panel-header">
            <div class="panel-title-group">
              <h2>Fleet Vehicles & Driver Crew</h2>
              <p>Enforcing driver license validity triggers and vehicle capacity limits</p>
            </div>
            <button class="btn btn-primary" id="openAddVehicleModalBtn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Vehicle
            </button>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:20px;">
          ${this.data.buses.map(b => `
            <div class="panel">
              <div class="panel-header">
                <div>
                  <strong style="font-size:1.1rem; color:var(--slate-900);">${b.id}</strong>
                  <div style="font-size:0.75rem; color:var(--slate-500);">${b.model}</div>
                </div>
                <span class="badge ${b.status === 'Active' ? 'badge-success' : 'badge-danger'}">${b.status}</span>
              </div>
              <div class="panel-body">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px;">
                  <div style="background:var(--slate-50); padding:10px; border-radius:var(--radius-sm); border:1px solid var(--slate-200);">
                    <small style="color:var(--slate-400); font-size:0.7rem;">Capacity</small>
                    <div style="font-weight:800; font-size:1rem; color:var(--slate-900);">${b.capacity} Seats</div>
                  </div>
                  <div style="background:var(--slate-50); padding:10px; border-radius:var(--radius-sm); border:1px solid var(--slate-200);">
                    <small style="color:var(--slate-400); font-size:0.7rem;">Odometer</small>
                    <div style="font-weight:800; font-size:1rem; color:var(--slate-900);">${b.odometer}</div>
                  </div>
                </div>

                <div style="border-top:1px solid var(--slate-100); padding-top:12px; margin-bottom:14px;">
                  <strong style="font-size:0.8rem; color:var(--slate-700);">Assigned Crew</strong>
                  <div style="display:flex; align-items:center; justify-content:space-between; margin-top:6px;">
                    <div>
                      <strong style="font-size:0.85rem; color:var(--slate-800);">${b.driver}</strong>
                      <div style="font-size:0.72rem; color:var(--slate-500);">Lic: ${b.driverLicense}</div>
                    </div>
                    ${b.licenseValid 
                      ? `<span class="badge badge-success" title="License valid until ${b.licenseExpiry}">✓ Valid License</span>` 
                      : `<span class="badge badge-danger" title="Expired: ${b.licenseExpiry}">⚠️ Expired Lic</span>`}
                  </div>
                  <div style="margin-top:6px; font-size:0.75rem; color:var(--slate-500);">
                    Attendant: <strong style="color:var(--slate-700);">${b.attendant}</strong>
                  </div>
                </div>

                <div style="border-top:1px solid var(--slate-100); padding-top:10px; font-size:0.76rem; color:var(--slate-500);">
                  <div>Next Maintenance: <strong style="color:${b.status === 'Service Due' ? 'var(--rose-600)' : 'var(--slate-700)'};">${b.nextService}</strong></div>
                  <div>Current Fuel: <strong>${b.fuel}</strong></div>
                </div>

                <div style="margin-top:14px; display:flex; gap:8px;">
                  <button class="btn btn-secondary btn-sm" style="flex:1;" data-log-service="${b.id}">Log Service</button>
                  <button class="btn btn-outline btn-sm" data-reassign-crew="${b.id}">Reassign</button>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  attachFleetListeners() {
    const addBtn = document.getElementById("openAddVehicleModalBtn");
    if (addBtn) addBtn.addEventListener("click", () => this.openAddVehicleModal());

    document.addEventListener("click", (e) => {
      const srvBtn = e.target.closest("[data-log-service]");
      if (srvBtn) {
        const bid = srvBtn.dataset.logService;
        const bus = this.data.buses.find(x => x.id === bid);
        if (bus) {
          bus.status = "Active";
          bus.lastService = new Date().toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' });
          bus.nextService = "Scheduled in 90 Days";
          this.persist();
          this.toast(`Service logged for bus ${bid}. Status set to Active.`);
          this.render();
        }
      }

      const reBtn = e.target.closest("[data-reassign-crew]");
      if (reBtn) {
        const bid = reBtn.dataset.reassignCrew;
        const newDriver = prompt(`Enter new driver name for ${bid}:`);
        if (newDriver) {
          const bus = this.data.buses.find(x => x.id === bid);
          if (bus) {
            bus.driver = newDriver.trim();
            this.persist();
            this.toast(`Reassigned driver for ${bid} to ${newDriver}`);
            this.render();
          }
        }
      }
    });
  }

  // ==========================================================================
  // VIEW: PICKUP ATTENDANCE REGISTER
  // ==========================================================================

  renderAttendanceRegister() {
    return `
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title-group">
            <h2>Daily Student Boarding Register</h2>
            <p>Live pickup status entries submitted for PICKUP_LOG table</p>
          </div>
          <div class="filter-select-group">
            <select class="filter-dropdown" id="attRouteFilter">
              <option value="ALL">All Routes (4)</option>
              ${this.data.routes.map(r => `<option value="${r.id}">Route ${r.id} · ${r.name.split('—')[0].trim()}</option>`).join("")}
            </select>
          </div>
        </div>

        <div class="panel-body" style="padding: 16px 22px;">
          <div class="filter-toolbar-row">
            <div class="search-input-group">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" class="search-input-field" id="attSearchQuery" placeholder="Filter student list...">
            </div>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-sm btn-secondary" id="attMarkAllPresent">Mark All Picked Up</button>
              <button class="btn btn-sm btn-danger" id="attMarkAllAbsent">Mark All Absent</button>
            </div>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>ID</th>
                  <th>Grade</th>
                  <th>Assigned Route</th>
                  <th>Stop</th>
                  <th>Pickup Status</th>
                  <th>Boarding Time</th>
                </tr>
              </thead>
              <tbody id="attTableBody">
                ${this.data.students.map(s => `
                  <tr data-student-row="${s.id}">
                    <td><strong>${s.name}</strong></td>
                    <td><span style="font-family:monospace;">${s.id}</span></td>
                    <td>${s.grade}</td>
                    <td>${s.routeName}</td>
                    <td>${s.pickupStop}</td>
                    <td>
                      <select class="form-input-control att-status-select" data-student-id="${s.id}" style="padding:4px 8px; font-size:0.8rem; width:130px;">
                        <option value="Picked up" ${s.pickupStatus === 'Picked up' ? 'selected' : ''}>✓ Picked up</option>
                        <option value="Late" ${s.pickupStatus === 'Late' ? 'selected' : ''}>⏱ Late</option>
                        <option value="Absent" ${s.pickupStatus === 'Absent' ? 'selected' : ''}>✕ Absent</option>
                        <option value="Pending" ${s.pickupStatus === 'Pending' ? 'selected' : ''}>● Pending</option>
                      </select>
                    </td>
                    <td>
                      <span class="boarding-time-badge" style="font-family:monospace; font-size:0.75rem; color:var(--slate-500);">
                        ${s.pickupTime || '-'}
                      </span>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  attachAttendanceListeners() {
    const saveBtn = document.getElementById("saveAttendanceBtn");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        document.querySelectorAll(".att-status-select").forEach(sel => {
          const sid = sel.dataset.studentId;
          const val = sel.value;
          const st = this.data.students.find(s => s.id === sid);
          if (st) {
            st.pickupStatus = val;
            if (val === "Picked up" && st.pickupTime === "-") {
              const now = new Date();
              st.pickupTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
          }
        });
        this.persist();
        this.toast("Attendance register saved to session storage.");
        this.render();
      });
    }

    const markAllPresent = document.getElementById("attMarkAllPresent");
    if (markAllPresent) {
      markAllPresent.addEventListener("click", () => {
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.data.students.forEach(s => {
          s.pickupStatus = "Picked up";
          s.pickupTime = now;
        });
        this.persist();
        this.toast("All students marked as Picked Up.");
        this.render();
      });
    }

    const markAllAbsent = document.getElementById("attMarkAllAbsent");
    if (markAllAbsent) {
      markAllAbsent.addEventListener("click", () => {
        this.data.students.forEach(s => {
          s.pickupStatus = "Absent";
          s.pickupTime = "-";
        });
        this.persist();
        this.toast("All students marked as Absent.");
        this.render();
      });
    }
  }

  // ==========================================================================
  // VIEW: FEES & BILLING LEDGER
  // ==========================================================================

  renderFeesLedger() {
    const totalBilled = this.data.students.reduce((acc, s) => acc + s.feeAmount, 0);
    const totalCollected = this.data.students.reduce((acc, s) => acc + s.feePaid, 0);
    const totalDue = this.data.students.reduce((acc, s) => acc + s.feeDue, 0);

    return `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <!-- Top Summary Cards -->
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:18px;">
          <div class="panel" style="padding:18px;">
            <span style="font-size:0.75rem; font-weight:700; color:var(--slate-400); text-transform:uppercase;">Total Invoiced Fees</span>
            <div style="font-family:var(--font-heading); font-size:1.8rem; font-weight:800; color:var(--slate-900); margin-top:4px;">
              ₹${totalBilled.toLocaleString()}
            </div>
            <div style="font-size:0.75rem; color:var(--slate-500); margin-top:4px;">Expected for Term 1</div>
          </div>

          <div class="panel" style="padding:18px;">
            <span style="font-size:0.75rem; font-weight:700; color:var(--emerald-600); text-transform:uppercase;">Total Collected</span>
            <div style="font-family:var(--font-heading); font-size:1.8rem; font-weight:800; color:var(--emerald-600); margin-top:4px;">
              ₹${totalCollected.toLocaleString()}
            </div>
            <div style="font-size:0.75rem; color:var(--slate-500); margin-top:4px;">${Math.round((totalCollected/totalBilled)*100)}% of total dues collected</div>
          </div>

          <div class="panel" style="padding:18px;">
            <span style="font-size:0.75rem; font-weight:700; color:var(--amber-600); text-transform:uppercase;">Outstanding Dues</span>
            <div style="font-family:var(--font-heading); font-size:1.8rem; font-weight:800; color:var(--amber-600); margin-top:4px;">
              ₹${totalDue.toLocaleString()}
            </div>
            <div style="font-size:0.75rem; color:var(--slate-500); margin-top:4px;">Across ${this.data.students.filter(s => s.feeDue > 0).length} student accounts</div>
          </div>
        </div>

        <!-- Ledger Table Panel -->
        <div class="panel">
          <div class="panel-header">
            <div class="panel-title-group">
              <h2>Student Fee Accounts & Payments</h2>
              <p>Relational mapping to FEE_PLAN and PAYMENT tables</p>
            </div>
            <button class="btn btn-primary" id="openPaymentModalDirectBtn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Record Payment
            </button>
          </div>

          <div class="panel-body" style="padding:0;">
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>ID</th>
                    <th>Assigned Route</th>
                    <th>Billing Plan</th>
                    <th>Total Plan Fee</th>
                    <th>Amount Paid</th>
                    <th>Balance Due</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.data.students.map(s => `
                    <tr>
                      <td><strong>${s.name}</strong></td>
                      <td><span style="font-family:monospace;">${s.id}</span></td>
                      <td>${s.routeName}</td>
                      <td><span class="badge badge-neutral">${s.feePlan}</span></td>
                      <td>₹${s.feeAmount.toLocaleString()}</td>
                      <td style="color:var(--emerald-600); font-weight:700;">₹${s.feePaid.toLocaleString()}</td>
                      <td style="color:${s.feeDue > 0 ? 'var(--rose-600)' : 'var(--slate-500)'}; font-weight:700;">₹${s.feeDue.toLocaleString()}</td>
                      <td>
                        <span class="badge ${s.feeStatus === 'Paid' ? 'badge-success' : s.feeStatus === 'Partial' ? 'badge-warning' : 'badge-danger'}">
                          ${s.feeStatus}
                        </span>
                      </td>
                      <td>
                        <button class="btn btn-sm ${s.feeDue > 0 ? 'btn-primary' : 'btn-secondary'}" data-pay-student="${s.id}">
                          ${s.feeDue > 0 ? 'Pay Dues' : 'Receipt'}
                        </button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachFeesListeners() {
    const directPay = document.getElementById("openPaymentModalDirectBtn");
    if (directPay) directPay.addEventListener("click", () => this.openRecordPaymentModal());

    const headerPay = document.getElementById("recordPaymentModalBtn");
    if (headerPay) headerPay.addEventListener("click", () => this.openRecordPaymentModal());

    document.addEventListener("click", (e) => {
      const payBtn = e.target.closest("[data-pay-student]");
      if (payBtn) {
        const sid = payBtn.dataset.payStudent;
        this.openRecordPaymentModal(sid);
      }
    });
  }

  // ==========================================================================
  // VIEW: REPORTS & ANALYTICS
  // ==========================================================================

  renderReportsAnalytics() {
    return `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div class="panel">
          <div class="panel-header">
            <div class="panel-title-group">
              <h2>Analytical Queries & Export Center</h2>
              <p>Directly fulfilling Review 2 & 3 DBMS reporting queries</p>
            </div>
            <button class="btn btn-secondary" onclick="window.print()">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
              Print Summary
            </button>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:20px;">
          <!-- Report 1 -->
          <div class="panel">
            <div class="panel-body">
              <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                <div class="stat-card-icon primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10"/><path d="M7 12h10"/><path d="M7 17h10"/></svg>
                </div>
                <div>
                  <h3 style="font-size:1.05rem; font-weight:700;">1. Bus Capacity Utilization Report</h3>
                  <small style="color:var(--slate-500);">SELECT Route, Bus, Capacity, Count(Students) GROUP BY Route</small>
                </div>
              </div>
              <p style="font-size:0.8rem; color:var(--slate-600); margin-bottom:14px;">
                Compares enrolled students against assigned bus seating limits to ensure safety regulations are met.
              </p>
              <button class="btn btn-primary btn-sm" id="expReportCapacity">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                Export CSV Report
              </button>
            </div>
          </div>

          <!-- Report 2 -->
          <div class="panel">
            <div class="panel-body">
              <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                <div class="stat-card-icon amber">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <div>
                  <h3 style="font-size:1.05rem; font-weight:700;">2. Outstanding Fee Defaulters</h3>
                  <small style="color:var(--slate-500);">SELECT Student, Route, Amount_Due WHERE Amount_Due > 0</small>
                </div>
              </div>
              <p style="font-size:0.8rem; color:var(--slate-600); margin-bottom:14px;">
                Generates a list of all registrations with pending balances for automated SMS reminder notices.
              </p>
              <button class="btn btn-primary btn-sm" id="expReportFees">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                Export CSV Report
              </button>
            </div>
          </div>

          <!-- Report 3 -->
          <div class="panel">
            <div class="panel-body">
              <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                <div class="stat-card-icon emerald">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <div>
                  <h3 style="font-size:1.05rem; font-weight:700;">3. Daily Pickup & Absenteeism Log</h3>
                  <small style="color:var(--slate-500);">SELECT Student, Route, Pickup_Status, Log_Date FROM PICKUP_LOG</small>
                </div>
              </div>
              <p style="font-size:0.8rem; color:var(--slate-600); margin-bottom:14px;">
                Complete daily register audit of boarded vs absent students for safety reporting.
              </p>
              <button class="btn btn-primary btn-sm" id="expReportAttendance">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                Export CSV Report
              </button>
            </div>
          </div>

          <!-- Report 4 -->
          <div class="panel">
            <div class="panel-body">
              <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                <div class="stat-card-icon blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                </div>
                <div>
                  <h3 style="font-size:1.05rem; font-weight:700;">4. Fleet & Crew Compliance Audit</h3>
                  <small style="color:var(--slate-500);">SELECT Bus, Driver, License_Expiry, Maintenance_Status</small>
                </div>
              </div>
              <p style="font-size:0.8rem; color:var(--slate-600); margin-bottom:14px;">
                Audits single active assignment integrity, driver license validity and vehicle inspection dates.
              </p>
              <button class="btn btn-primary btn-sm" id="expReportFleet">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                Export CSV Report
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachReportsListeners() {
    const r1 = document.getElementById("expReportCapacity");
    if (r1) {
      r1.addEventListener("click", () => {
        const rows = this.data.routes.map(r => ({
          Route: r.name,
          Bus_Registration: r.busId,
          Driver: r.driver,
          Enrolled_Students: r.studentsCount,
          Total_Capacity: r.capacity,
          Utilization_Percent: Math.round((r.studentsCount/r.capacity)*100) + "%"
        }));
        this.exportCsv("Capacity_Utilization_Report", rows);
      });
    }

    const r2 = document.getElementById("expReportFees");
    if (r2) {
      r2.addEventListener("click", () => {
        const rows = this.data.students.filter(s => s.feeDue > 0).map(s => ({
          Student_ID: s.id,
          Student_Name: s.name,
          Grade: s.grade,
          Route: s.routeName,
          Parent_Contact: s.parentContact,
          Total_Amount: s.feeAmount,
          Paid: s.feePaid,
          Outstanding_Balance: s.feeDue
        }));
        this.exportCsv("Fee_Defaulters_Report", rows);
      });
    }

    const r3 = document.getElementById("expReportAttendance");
    if (r3) {
      r3.addEventListener("click", () => {
        const rows = this.data.students.map(s => ({
          Student_ID: s.id,
          Student_Name: s.name,
          Route: s.routeName,
          Pickup_Stop: s.pickupStop,
          Status: s.pickupStatus,
          Boarding_Time: s.pickupTime,
          Date: new Date().toLocaleDateString("en-CA")
        }));
        this.exportCsv("Pickup_Attendance_Log", rows);
      });
    }

    const r4 = document.getElementById("expReportFleet");
    if (r4) {
      r4.addEventListener("click", () => {
        const rows = this.data.buses.map(b => ({
          Bus_Number: b.id,
          Model: b.model,
          Capacity: b.capacity,
          Driver: b.driver,
          Driver_License: b.driverLicense,
          License_Expiry: b.licenseExpiry,
          License_Valid: b.licenseValid ? "YES" : "EXPIRED",
          Attendant: b.attendant,
          Status: b.status,
          Next_Service: b.nextService
        }));
        this.exportCsv("Fleet_Crew_Compliance_Report", rows);
      });
    }
  }

  // ==========================================================================
  // VIEW: ROLE PORTAL - DRIVER COMPANION VIEW
  // ==========================================================================

  renderDriverPortal() {
    const route = this.data.routes[0];
    const bus = this.data.buses[0];
    const routeStudents = this.data.students.filter(s => s.routeId === route.id);
    const boarded = routeStudents.filter(s => s.pickupStatus === "Picked up").length;

    return `
      <div class="driver-portal-wrap">
        <div class="driver-banner-card">
          <div class="driver-banner-top">
            <div class="driver-route-hero">
              <h2>${bus.id} · Route 01</h2>
              <p>${route.name}</p>
            </div>
            <button class="driver-sos-btn" id="driverSosBtn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              EMERGENCY SOS
            </button>
          </div>

          <div class="driver-quick-trip-stats">
            <div class="driver-stat-pill">
              <strong>${route.nextStop}</strong>
              <small>Approaching Stop</small>
            </div>
            <div class="driver-stat-pill">
              <strong>${boarded} / ${routeStudents.length}</strong>
              <small>Students Boarded</small>
            </div>
            <div class="driver-stat-pill">
              <strong>${route.currentSpeed}</strong>
              <small>Speedometer</small>
            </div>
          </div>
        </div>

        <div class="driver-manifest-panel">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div>
              <h3 style="font-size:1.1rem; font-weight:700;">Student Boarding Manifest</h3>
              <p style="font-size:0.78rem; color:var(--slate-500);">Tap to mark student boarded or absent at stop</p>
            </div>
            <button class="btn btn-sm btn-outline" id="driverReportDelayBtn">
              ⏱ Report Delay
            </button>
          </div>

          <div>
            ${routeStudents.map(s => `
              <div class="driver-student-row">
                <div class="driver-student-profile">
                  <div style="width:36px; height:36px; border-radius:50%; background:var(--primary-light); color:var(--primary); font-weight:800; display:flex; align-items:center; justify-content:center;">
                    ${s.name.split(' ').map(x=>x[0]).join('')}
                  </div>
                  <div>
                    <strong style="font-size:0.9rem; color:var(--slate-900);">${s.name}</strong>
                    <div style="font-size:0.75rem; color:var(--slate-500);">${s.pickupStop} · ${s.grade}</div>
                  </div>
                </div>

                <div class="driver-action-buttons">
                  <button class="btn btn-sm ${s.pickupStatus === 'Picked up' ? 'btn-success' : 'btn-secondary'}" data-driver-mark-boarded="${s.id}">
                    ${s.pickupStatus === 'Picked up' ? '✓ Boarded' : 'Board'}
                  </button>
                  <button class="btn btn-sm ${s.pickupStatus === 'Absent' ? 'btn-danger' : 'btn-secondary'}" data-driver-mark-absent="${s.id}">
                    Absent
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }

  attachDriverListeners() {
    const sosBtn = document.getElementById("driverSosBtn");
    if (sosBtn) {
      sosBtn.addEventListener("click", () => {
        alert("🚨 EMERGENCY SOS BROADCAST: Alert sent to Admin Control and Campus Security with current GPS coordinates.");
        this.toast("Emergency SOS sent to control center.");
      });
    }

    const delayBtn = document.getElementById("driverReportDelayBtn");
    if (delayBtn) {
      delayBtn.addEventListener("click", () => {
        const mins = prompt("Enter estimated delay in minutes:", "10");
        if (mins) {
          this.toast(`Delay notice of ${mins} mins broadcasted to route parents.`);
        }
      });
    }

    document.addEventListener("click", (e) => {
      const bBtn = e.target.closest("[data-driver-mark-boarded]");
      if (bBtn) {
        const sid = bBtn.dataset.driverMarkBoarded;
        const st = this.data.students.find(s => s.id === sid);
        if (st) {
          st.pickupStatus = "Picked up";
          st.pickupTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          this.persist();
          this.toast(`${st.name} marked as Boarded.`);
          this.render();
        }
      }

      const aBtn = e.target.closest("[data-driver-mark-absent]");
      if (aBtn) {
        const sid = aBtn.dataset.driverMarkAbsent;
        const st = this.data.students.find(s => s.id === sid);
        if (st) {
          st.pickupStatus = "Absent";
          st.pickupTime = "-";
          this.persist();
          this.toast(`${st.name} marked as Absent.`);
          this.render();
        }
      }
    });
  }

  // ==========================================================================
  // VIEW: ROLE PORTAL - PARENT PORTAL VIEW
  // ==========================================================================

  renderParentPortal() {
    // Child is Anil Kumar
    const child = this.data.students.find(s => s.id === "ST-0241") || this.data.students[0];
    const route = this.data.routes.find(r => r.id === child.routeId) || this.data.routes[0];
    const bus = this.data.buses.find(b => b.id === route.busId) || this.data.buses[0];

    return `
      <div class="parent-portal-wrap">
        <div class="parent-child-card">
          <div class="parent-child-header">
            <div style="display:flex; align-items:center; gap:16px;">
              <div class="child-avatar-box">
                ${child.name.split(' ').map(x=>x[0]).join('')}
              </div>
              <div class="child-meta">
                <strong>${child.name}</strong>
                <p>Roll No: ${child.id} · ${child.grade} · Northfield Academy</p>
              </div>
            </div>
            <span class="badge ${child.pickupStatus === 'Picked up' ? 'badge-success' : 'badge-warning'}" style="font-size:0.85rem; padding:6px 12px;">
              <span class="badge-dot"></span> Status: ${child.pickupStatus}
            </span>
          </div>

          <div class="live-bus-tracking-banner">
            <div class="live-banner-content">
              <h3>Live School Bus Tracking</h3>
              <p>Bus <strong>${bus.id}</strong> approaching <strong>${route.nextStop}</strong></p>
              <div style="font-size:0.75rem; color:#2563eb; margin-top:6px;">
                Boarded at: <strong>${child.pickupStop} (${child.pickupTime})</strong>
              </div>
            </div>
            <div class="eta-big-counter">
              <strong>${route.eta}</strong>
              <small>ARRIVAL AT CAMPUS</small>
            </div>
          </div>

          <div class="parent-info-cards-grid">
            <div class="parent-subcard">
              <h4>Transport Crew & Vehicle</h4>
              <div style="display:flex; flex-direction:column; gap:8px;">
                <div>Bus Model: <strong>${bus.model} (${bus.id})</strong></div>
                <div>Driver: <strong>${bus.driver}</strong></div>
                <div>Attendant: <strong>${bus.attendant}</strong></div>
                <div style="margin-top:8px;">
                  <a href="tel:${bus.driverLicense}" class="btn btn-secondary btn-sm" style="width:100%;">
                    📞 Call Bus Driver
                  </a>
                </div>
              </div>
            </div>

            <div class="parent-subcard">
              <h4>Transport Fee & Account</h4>
              <div style="display:flex; flex-direction:column; gap:8px;">
                <div>Billing Plan: <strong>${child.feePlan}</strong></div>
                <div>Total Plan Fee: <strong>₹${child.feeAmount.toLocaleString()}</strong></div>
                <div>Current Balance: <strong style="color:${child.feeDue > 0 ? 'var(--rose-600)' : 'var(--emerald-600)'};">₹${child.feeDue.toLocaleString()}</strong></div>
                <div style="margin-top:8px;">
                  ${child.feeDue > 0 
                    ? `<button class="btn btn-primary btn-sm" style="width:100%;" id="parentPayFeeBtn">Pay Outstanding Fee (₹${child.feeDue})</button>` 
                    : `<button class="btn btn-secondary btn-sm" style="width:100%;" id="parentDownloadReceiptBtn">Download Fee Receipt</button>`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachParentListeners() {
    const payBtn = document.getElementById("parentPayFeeBtn");
    if (payBtn) {
      payBtn.addEventListener("click", () => {
        this.openRecordPaymentModal("ST-0241");
      });
    }

    const recBtn = document.getElementById("parentDownloadReceiptBtn");
    if (recBtn) {
      recBtn.addEventListener("click", () => {
        this.toast("Downloading Transport Fee Slip for Anil Kumar...");
      });
    }
  }

  // ==========================================================================
  // MODALS & DRAWERS
  // ==========================================================================

  openAddStudentModal() {
    const modalBackdrop = document.getElementById("modalBackdrop");
    const modalBox = document.getElementById("modalBoxContainer");
    if (!modalBackdrop || !modalBox) return;

    modalBox.innerHTML = `
      <div class="modal-header">
        <div>
          <h3>Register New Student</h3>
          <p>Add student to database and assign transport route & stop</p>
        </div>
        <button class="modal-close-btn" id="modalDismissBtn">✕</button>
      </div>

      <form id="addStudentModalForm">
        <div class="modal-body">
          <div class="form-grid-layout">
            <div class="form-group-full">
              <label class="form-field-label">
                Student Full Name
                <input type="text" name="name" class="form-input-control" required placeholder="e.g. Ananya Reddy">
              </label>
            </div>

            <div>
              <label class="form-field-label">
                Roll Number / Student ID
                <input type="text" name="id" class="form-input-control" required placeholder="e.g. ST-0253">
              </label>
            </div>

            <div>
              <label class="form-field-label">
                Class / Grade
                <select name="grade" class="form-input-control" required>
                  <option value="Grade 1">Grade 1</option>
                  <option value="Grade 2">Grade 2</option>
                  <option value="Grade 3">Grade 3</option>
                  <option value="Grade 4">Grade 4</option>
                  <option value="Grade 5">Grade 5</option>
                  <option value="Grade 6">Grade 6</option>
                  <option value="Grade 7">Grade 7</option>
                  <option value="Grade 8">Grade 8</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                </select>
              </label>
            </div>

            <div class="form-group-full">
              <label class="form-field-label">
                Assigned Transit Route
                <select name="routeId" class="form-input-control" id="modalRouteSelect" required>
                  ${this.data.routes.map(r => `<option value="${r.id}">Route ${r.id} · ${r.name} (${r.studentsCount}/${r.capacity} seats)</option>`).join("")}
                </select>
              </label>
            </div>

            <div class="form-group-full">
              <label class="form-field-label">
                Boarding Bus Stop
                <input type="text" name="pickupStop" class="form-input-control" required placeholder="e.g. Old Bus Stand, Siddipet">
              </label>
            </div>

            <div>
              <label class="form-field-label">
                Parent / Guardian Name
                <input type="text" name="parentName" class="form-input-control" required placeholder="e.g. K. Srinivas">
              </label>
            </div>

            <div>
              <label class="form-field-label">
                Emergency Mobile Contact
                <input type="tel" name="parentContact" class="form-input-control" required placeholder="+91 98765 43210">
              </label>
            </div>

            <div class="form-group-full">
              <label class="form-field-label">
                Transport Fee Plan
                <select name="feePlan" class="form-input-control" required>
                  <option value="Term Plan">Term Plan (₹4,500 / term)</option>
                  <option value="Annual Plan">Annual Plan (₹12,000 / year)</option>
                  <option value="Monthly Plan">Monthly Plan (₹1,500 / month)</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="modalCancelBtn">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Student Registration</button>
        </div>
      </form>
    `;

    modalBackdrop.classList.add("open");

    document.getElementById("modalDismissBtn").onclick = () => this.closeModal();
    document.getElementById("modalCancelBtn").onclick = () => this.closeModal();

    document.getElementById("addStudentModalForm").onsubmit = (e) => {
      e.preventDefault();
      const form = new FormData(e.target);
      const sid = form.get("id").trim();

      if (this.data.students.some(s => s.id.toLowerCase() === sid.toLowerCase())) {
        alert("A student with this Student ID already exists.");
        return;
      }

      const routeObj = this.data.routes.find(r => r.id === form.get("routeId"));
      if (routeObj && routeObj.studentsCount >= routeObj.capacity) {
        alert(`Database Trigger Error: Bus capacity exceeded (${routeObj.capacity} max seats).`);
        return;
      }

      const plan = form.get("feePlan");
      const planCost = plan === "Annual Plan" ? 12000 : plan === "Term Plan" ? 4500 : 1500;

      const newStudent = {
        id: sid,
        name: form.get("name").trim(),
        grade: form.get("grade"),
        routeId: form.get("routeId"),
        routeName: routeObj ? `Route ${routeObj.id} · ${routeObj.name.split('—')[0].trim()}` : "Route 01",
        pickupStop: form.get("pickupStop").trim(),
        parentName: form.get("parentName").trim(),
        parentContact: form.get("parentContact").trim(),
        pickupStatus: "Pending",
        pickupTime: "-",
        feePlan: plan,
        feeAmount: planCost,
        feePaid: 0,
        feeDue: planCost,
        feeStatus: "Pending"
      };

      if (routeObj) {
        routeObj.studentsCount++;
      }

      this.data.students.unshift(newStudent);
      this.persist();
      this.closeModal();
      this.toast(`Student ${newStudent.name} registered successfully.`);
      this.render();
    };
  }

  openRecordPaymentModal(preselectedStudentId = null) {
    const modalBackdrop = document.getElementById("modalBackdrop");
    const modalBox = document.getElementById("modalBoxContainer");
    if (!modalBackdrop || !modalBox) return;

    modalBox.innerHTML = `
      <div class="modal-header">
        <div>
          <h3>Record Transport Fee Payment</h3>
          <p>Issue receipt and update student ledger balance</p>
        </div>
        <button class="modal-close-btn" id="modalDismissBtn">✕</button>
      </div>

      <form id="recordPaymentModalForm">
        <div class="modal-body">
          <div class="form-grid-layout">
            <div class="form-group-full">
              <label class="form-field-label">
                Select Student Account
                <select name="studentId" class="form-input-control" id="payStudentSelect" required>
                  ${this.data.students.map(s => `
                    <option value="${s.id}" ${s.id === preselectedStudentId ? 'selected' : ''}>
                      ${s.name} (${s.id}) · Due: ₹${s.feeDue.toLocaleString()}
                    </option>
                  `).join("")}
                </select>
              </label>
            </div>

            <div>
              <label class="form-field-label">
                Payment Amount (₹)
                <input type="number" name="amount" class="form-input-control" required value="4500" min="100">
              </label>
            </div>

            <div>
              <label class="form-field-label">
                Payment Mode
                <select name="mode" class="form-input-control" required>
                  <option value="UPI / QR">UPI (GPay / PhonePe / Paytm)</option>
                  <option value="Net Banking">Net Banking</option>
                  <option value="Credit / Debit Card">Credit / Debit Card</option>
                  <option value="Cash">Cash at School Counter</option>
                </select>
              </label>
            </div>

            <div class="form-group-full">
              <label class="form-field-label">
                Reference / Transaction Receipt ID
                <input type="text" name="refId" class="form-input-control" required value="PAY-${Math.floor(100000 + Math.random() * 900000)}">
              </label>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="modalCancelBtn">Cancel</button>
          <button type="submit" class="btn btn-primary">Process & Issue Receipt</button>
        </div>
      </form>
    `;

    modalBackdrop.classList.add("open");

    document.getElementById("modalDismissBtn").onclick = () => this.closeModal();
    document.getElementById("modalCancelBtn").onclick = () => this.closeModal();

    document.getElementById("recordPaymentModalForm").onsubmit = (e) => {
      e.preventDefault();
      const form = new FormData(e.target);
      const sid = form.get("studentId");
      const amt = Number(form.get("amount"));
      const ref = form.get("refId");

      const st = this.data.students.find(s => s.id === sid);
      if (st) {
        st.feePaid += amt;
        st.feeDue = Math.max(0, st.feeAmount - st.feePaid);
        st.feeStatus = st.feeDue === 0 ? "Paid" : "Partial";
        this.persist();
        this.closeModal();
        this.toast(`Payment of ₹${amt.toLocaleString()} recorded for ${st.name}. Ref: ${ref}`);
        this.render();
      }
    };
  }

  openAddRouteModal() {
    const modalBackdrop = document.getElementById("modalBackdrop");
    const modalBox = document.getElementById("modalBoxContainer");
    if (!modalBackdrop || !modalBox) return;

    modalBox.innerHTML = `
      <div class="modal-header">
        <div>
          <h3>Create New Transit Route</h3>
          <p>Add new route to ROUTE and assign vehicle</p>
        </div>
        <button class="modal-close-btn" id="modalDismissBtn">✕</button>
      </div>

      <form id="addRouteModalForm">
        <div class="modal-body">
          <div class="form-grid-layout">
            <div>
              <label class="form-field-label">
                Route ID
                <input type="text" name="id" class="form-input-control" required placeholder="e.g. R-05">
              </label>
            </div>

            <div>
              <label class="form-field-label">
                Route Name
                <input type="text" name="name" class="form-input-control" required placeholder="e.g. Medak — School Campus">
              </label>
            </div>

            <div>
              <label class="form-field-label">
                Starting Point / Origin
                <input type="text" name="origin" class="form-input-control" required placeholder="e.g. Medak Collectorate">
              </label>
            </div>

            <div>
              <label class="form-field-label">
                Morning Departure Time
                <input type="text" name="time" class="form-input-control" required placeholder="07:00 AM">
              </label>
            </div>

            <div class="form-group-full">
              <label class="form-field-label">
                Assign Bus Vehicle
                <select name="busId" class="form-input-control" required>
                  ${this.data.buses.map(b => `<option value="${b.id}">${b.id} (${b.model} - ${b.capacity} seats)</option>`).join("")}
                </select>
              </label>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="modalCancelBtn">Cancel</button>
          <button type="submit" class="btn btn-primary">Create Route</button>
        </div>
      </form>
    `;

    modalBackdrop.classList.add("open");
    document.getElementById("modalDismissBtn").onclick = () => this.closeModal();
    document.getElementById("modalCancelBtn").onclick = () => this.closeModal();

    document.getElementById("addRouteModalForm").onsubmit = (e) => {
      e.preventDefault();
      const form = new FormData(e.target);
      const newRoute = {
        id: form.get("id").trim(),
        name: form.get("name").trim(),
        origin: form.get("origin").trim(),
        destination: "Northfield Academy Campus",
        busId: form.get("busId"),
        driver: "Assigned Driver",
        driverPhone: "+91 99999 88888",
        attendant: "Assigned Attendant",
        studentsCount: 0,
        capacity: 35,
        status: "Active",
        color: "#6366f1",
        time: form.get("time").trim(),
        currentSpeed: "30 km/h",
        nextStop: "Town Center",
        eta: "15 mins",
        progress: 10,
        stops: [
          { order: 1, name: form.get("origin").trim(), time: form.get("time").trim(), landmark: "Origin", status: "completed" },
          { order: 2, name: "Northfield Campus Gate", time: "08:15 AM", landmark: "Main Academic Block", status: "upcoming" }
        ]
      };

      this.data.routes.push(newRoute);
      this.persist();
      this.closeModal();
      this.toast(`Route ${newRoute.id} created successfully.`);
      this.render();
    };
  }

  openAddVehicleModal() {
    const modalBackdrop = document.getElementById("modalBackdrop");
    const modalBox = document.getElementById("modalBoxContainer");
    if (!modalBackdrop || !modalBox) return;

    modalBox.innerHTML = `
      <div class="modal-header">
        <div>
          <h3>Add Vehicle to Fleet</h3>
          <p>Register bus with BUS and BUS_ASSIGNMENT tables</p>
        </div>
        <button class="modal-close-btn" id="modalDismissBtn">✕</button>
      </div>

      <form id="addVehicleModalForm">
        <div class="modal-body">
          <div class="form-grid-layout">
            <div>
              <label class="form-field-label">
                Registration Plate Number
                <input type="text" name="id" class="form-input-control" required placeholder="e.g. TS15 UE 9999">
              </label>
            </div>

            <div>
              <label class="form-field-label">
                Vehicle Make & Model
                <input type="text" name="model" class="form-input-control" required placeholder="e.g. Tata Starbus 40S">
              </label>
            </div>

            <div>
              <label class="form-field-label">
                Seating Capacity
                <input type="number" name="capacity" class="form-input-control" required value="36" min="10" max="60">
              </label>
            </div>

            <div>
              <label class="form-field-label">
                Driver Name
                <input type="text" name="driver" class="form-input-control" required placeholder="e.g. Prakash Rao">
              </label>
            </div>

            <div>
              <label class="form-field-label">
                Driver License Number
                <input type="text" name="driverLicense" class="form-input-control" required placeholder="e.g. TS0120220008888">
              </label>
            </div>

            <div>
              <label class="form-field-label">
                License Expiry Date
                <input type="date" name="licenseExpiry" class="form-input-control" required value="2030-01-01">
              </label>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="modalCancelBtn">Cancel</button>
          <button type="submit" class="btn btn-primary">Add Vehicle to Fleet</button>
        </div>
      </form>
    `;

    modalBackdrop.classList.add("open");
    document.getElementById("modalDismissBtn").onclick = () => this.closeModal();
    document.getElementById("modalCancelBtn").onclick = () => this.closeModal();

    document.getElementById("addVehicleModalForm").onsubmit = (e) => {
      e.preventDefault();
      const form = new FormData(e.target);
      const newBus = {
        id: form.get("id").trim(),
        model: form.get("model").trim(),
        capacity: Number(form.get("capacity")),
        assignedRoute: "Unassigned",
        driver: form.get("driver").trim(),
        driverLicense: form.get("driverLicense").trim(),
        licenseExpiry: form.get("licenseExpiry"),
        licenseValid: true,
        attendant: "Duty Attendant",
        odometer: "1,200 km",
        fuel: "95%",
        status: "Active",
        lastService: "Recent",
        nextService: "In 90 Days"
      };

      this.data.buses.push(newBus);
      this.persist();
      this.closeModal();
      this.toast(`Bus ${newBus.id} added to fleet.`);
      this.render();
    };
  }

  openDbmsModal() {
    const modalBackdrop = document.getElementById("modalBackdrop");
    const modalBox = document.getElementById("modalBoxContainer");
    if (!modalBackdrop || !modalBox) return;

    modalBox.innerHTML = `
      <div class="modal-header">
        <div>
          <h3>Database Architecture & Review Presentation Spec</h3>
          <p>Review 1, 2, and 3 Relational Model & Active Triggers</p>
        </div>
        <button class="modal-close-btn" id="modalDismissBtn">✕</button>
      </div>

      <div class="modal-body" style="max-height:65vh; overflow-y:auto;">
        <h4 style="font-size:0.9rem; font-weight:700; color:var(--slate-800); margin-bottom:10px;">13 Normalized Relational Tables (3NF)</h4>
        <div class="dbms-spec-grid">
          <div class="dbms-spec-card">
            <h4>1. BUS &amp; ROUTE</h4>
            <p>Bus fleet master, plate IDs, capacities, and geographic routes with origin and destination.</p>
            <div class="sql-badge-list">
              <span class="sql-badge">BUS</span>
              <span class="sql-badge">ROUTE</span>
              <span class="sql-badge">STOP</span>
              <span class="sql-badge">ROUTE_SEQUENCE</span>
            </div>
          </div>

          <div class="dbms-spec-card">
            <h4>2. CREW &amp; ASSIGNMENT</h4>
            <p>Driver licenses, expiry validation, attendants, and assignment history.</p>
            <div class="sql-badge-list">
              <span class="sql-badge">DRIVER</span>
              <span class="sql-badge">ATTENDANT</span>
              <span class="sql-badge">BUS_ASSIGNMENT</span>
            </div>
          </div>

          <div class="dbms-spec-card">
            <h4>3. STUDENTS &amp; PICKUPS</h4>
            <p>Registration records, assigned stops, and daily boarding attendance logs.</p>
            <div class="sql-badge-list">
              <span class="sql-badge">STUDENT</span>
              <span class="sql-badge">TRANSPORT_REGISTRATION</span>
              <span class="sql-badge">PICKUP_LOG</span>
            </div>
          </div>

          <div class="dbms-spec-card">
            <h4>4. BILLING &amp; MAINTENANCE</h4>
            <p>Fee plans, student payment records, and fleet maintenance histories.</p>
            <div class="sql-badge-list">
              <span class="sql-badge">FEE_PLAN</span>
              <span class="sql-badge">PAYMENT</span>
              <span class="sql-badge">MAINTENANCE_RECORD</span>
            </div>
          </div>
        </div>

        <h4 style="font-size:0.9rem; font-weight:700; color:var(--slate-800); margin:18px 0 10px;">Database-Enforced Business Rules (Triggers)</h4>
        <ul style="font-size:0.8rem; color:var(--slate-600); line-height:1.6; padding-left:20px;">
          <li><strong>Bus Capacity Limit:</strong> <code>BEFORE INSERT</code> trigger on <code>TRANSPORT_REGISTRATION</code> verifies enrolled students do not exceed bus seat capacity.</li>
          <li><strong>Single Active Registration:</strong> Prevents enrolling a student across conflicting bus routes simultaneously.</li>
          <li><strong>Single Active Assignment:</strong> Ensures a bus, driver, or attendant cannot be actively assigned to multiple trips at the same time.</li>
          <li><strong>Driver License Validation:</strong> Rejects trip assignment if driver license has expired.</li>
          <li><strong>One Pickup Log Per Day:</strong> <code>UNIQUE(Registration_ID, Log_Date)</code> prevents duplicate attendance entries.</li>
        </ul>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="modalCloseSpecBtn">Understood</button>
      </div>
    `;

    modalBackdrop.classList.add("open");
    document.getElementById("modalDismissBtn").onclick = () => this.closeModal();
    document.getElementById("modalCloseSpecBtn").onclick = () => this.closeModal();
  }

  closeModal() {
    const modalBackdrop = document.getElementById("modalBackdrop");
    if (modalBackdrop) modalBackdrop.classList.remove("open");
  }

  openDrawer() {
    const drawerBackdrop = document.getElementById("drawerBackdrop");
    if (drawerBackdrop) drawerBackdrop.classList.add("open");
  }

  closeDrawer() {
    const drawerBackdrop = document.getElementById("drawerBackdrop");
    if (drawerBackdrop) drawerBackdrop.classList.remove("open");
  }

  // ==========================================================================
  // UTILITIES: TOAST & CSV EXPORT
  // ==========================================================================

  toast(msg) {
    const toastContainer = document.getElementById("toastContainer");
    if (!toastContainer) return;

    const toastBox = document.createElement("div");
    toastBox.className = "toast-message-box";
    toastBox.innerHTML = `<span class="toast-icon-dot"></span><span>${msg}</span>`;
    toastContainer.appendChild(toastBox);

    setTimeout(() => toastBox.classList.add("show"), 20);

    setTimeout(() => {
      toastBox.classList.remove("show");
      setTimeout(() => toastBox.remove(), 300);
    }, 3200);
  }

  exportCsv(filename, rows) {
    if (!rows || rows.length === 0) {
      this.toast("No records to export.");
      return;
    }

    const headers = Object.keys(rows[0]);
    const csvContent = [
      headers.join(","),
      ...rows.map(row => headers.map(h => `"${String(row[h] || '').replace(/"/g, '""')}"`).join(","))
    ].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    this.toast(`CSV exported: ${filename}.csv`);
  }
}

// Instantiate on DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  window.routeWiseApp = new RouteWiseApp();
});
