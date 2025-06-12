// import React, { useState, useEffect } from "react";
// import "./AdminHome.css";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/plug.png";

// const Home = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [showResults, setShowResults] = useState(false);

//   // Mock search data - replace with your actual data or API call
//   const searchableItems = [
//     { name: "Contract Jobs", path: "/ContractJobs", category: "CORE", icon: "fa-file-contract" },
//     { name: "Internal Projects", path: "/internalprojects", category: "CORE", icon: "fa-project-diagram" },
//     { name: "Purchases", path: "/purchasesdata", category: "TRANSACTIONS", icon: "fa-shopping-cart" },
//     { name: "Bills", path: "/BillsTab", category: "TRANSACTIONS", icon: "fa-file-invoice" },
//     { name: "Invoices", path: "/InvoiceDashboard", category: "TRANSACTIONS", icon: "fa-file-invoice-dollar" },
//     { name: "Time Tracker", path: "/TimeTracker", category: "ACTIVITY", icon: "fa-clock" },
//     { name: "Scheduling", path: "/CalendarView", category: "ACTIVITY", icon: "fa-calendar-alt" },
//     { name: "Tasks", path: "/Tasks", category: "ACTIVITY", icon: "fa-tasks" },
//     { name: "Dashboard", path: "/dashboard", category: "INSIGHTS", icon: "fa-tachometer-alt" },
//     { name: "Reports", path: "/ReportsPage", category: "INSIGHTS", icon: "fa-chart-bar" },
//     { name: "Leads", path: "/leadopportunities", category: "INSIGHTS", icon: "fa-user" },
//     { name: "Clients", path: "/ClientsData", category: "COMPANY", icon: "fa-users" },
//     { name: "Vendors", path: "/vendorspage", category: "COMPANY", icon: "fa-truck" },
//     { name: "Catalog", path: "/CataLog", category: "COMPANY", icon: "fa-tags" },
//   ];

//   // Handle search functionality
//   const handleSearch = () => {
//     if (!searchQuery.trim()) {
//       setShowResults(false);
//       return;
//     }

//     const results = searchableItems.filter(item =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.category.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     setSearchResults(results);
//     setShowResults(true);
//   };

//   // Handle Enter key press
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   // Navigate to selected result
//   const handleResultClick = (path) => {
//     navigate(path);
//     setShowResults(false);
//     setSearchQuery("");
//   };

//   // Close results when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest('.search-container')) {
//         setShowResults(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="admin-home-container">
//       {/* Hero Section */}
//       <div className="hero-section py-5">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-lg-8 mx-auto text-center">
//               <div className="d-flex flex-wrap justify-content-center align-items-center mb-4 gap-3">
//                 <img src={logo} alt="BonBon Logo" className="hero-logo" />
//                 <h1 className="hero-title m-0">
//                   Welcome to <span className="gradient-text">BonBon</span>
//                 </h1>
//               </div>
//               <p className="hero-subtitle mb-4">
//                 Your complete business management solution
//               </p>

//               {/* Search Bar with Results */}
//               <div className="search-container mx-auto mb-5 position-relative">
//                 <div className="input-group">
//                   <input
//                     type="text"
//                     className="form-control search-input"
//                     placeholder="Search across all modules..."
//                     value={searchQuery}
//                     onChange={(e) => {
//                       setSearchQuery(e.target.value);
//                       if (e.target.value === "") {
//                         setShowResults(false);
//                       } else {
//                         handleSearch();
//                       }
//                     }}
//                     onKeyPress={handleKeyPress}
//                     onFocus={() => searchQuery && setShowResults(true)}
//                   />
//                   <button
//                     className="btn btn-primary search-btn"
//                     onClick={handleSearch}
//                   >
//                     <i className="fas fa-search"></i>
//                   </button>
//                 </div>

//                 {/* Search Results Dropdown */}
//                 {showResults && (
//                   <div className="search-results-dropdown">
//                     {searchResults.length > 0 ? (
//                       <ul className="list-group">
//                         {searchResults.map((item, index) => (
//                           <li
//                             key={index}
//                             className="list-group-item search-result-item"
//                             onClick={() => handleResultClick(item.path)}
//                           >
//                             <div className="d-flex align-items-center">
//                               <div className={`menu-icon-sm bg-${getCategoryColor(item.category)} me-3`}>
//                                 <i className={`fas ${item.icon}`}></i>
//                               </div>
//                               <div className="d-flex flex-column">
//                                 <span className="result-title">{item.name}</span>
//                                 <small className="text-muted">{item.category}</small>
//                               </div>
//                             </div>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <div className="search-no-results">
//                         <i className="fas fa-search me-2"></i>
//                         No results found for "{searchQuery}"
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="main-content py-5">
//         <div className="container">
//           <div className="row mb-5">
//             <div className="col-12 text-center">
//               <h2 className="section-title">Jump right into</h2>
//               <p className="section-subtitle">
//                 Access all business modules from one place
//               </p>
//             </div>
//           </div>

//           {/* Menu Cards */}
//           <div className="row g-4 justify-content-center">
//             {/* CORE */}
//             <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
//               <div className="category-card">
//                 <h3 className="category-title">CORE</h3>
//                 <div className="menu-items">
//                   <Link to="/ContractJobs" className="menu-item">
//                     <div className="menu-icon bg-primary">
//                       <i className="fas fa-file-contract"></i>
//                     </div>
//                     <span className="menu-text">Contract Jobs</span>
//                   </Link>
//                   <Link to="/internalprojects" className="menu-item">
//                     <div className="menu-icon bg-primary">
//                       <i className="fas fa-project-diagram"></i>
//                     </div>
//                     <span className="menu-text">Internal Projects</span>
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             {/* TRANSACTIONS */}
//             <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
//               <div className="category-card">
//                 <h3 className="category-title">TRANSACTIONS</h3>
//                 <div className="menu-items">
//                   <Link to="/purchasesdata" className="menu-item">
//                     <div className="menu-icon bg-primary">
//                       <i className="fas fa-shopping-cart"></i>
//                     </div>
//                     <span className="menu-text">Purchases</span>
//                   </Link>
//                   <Link to="/BillsTab" className="menu-item">
//                     <div className="menu-icon bg-primary">
//                       <i className="fas fa-file-invoice"></i>
//                     </div>
//                     <div className="d-flex justify-content-between align-items-center w-100">
//                       <span className="menu-text">Bills</span>
//                       <span className="badge bg-warning text-dark badge-pill">2 Due</span>
//                     </div>
//                   </Link>
//                   <Link to="/InvoiceDashboard" className="menu-item">
//                     <div className="menu-icon bg-primary">
//                       <i className="fas fa-file-invoice-dollar"></i>
//                     </div>
//                     <div className="d-flex justify-content-between align-items-center w-100">
//                       <span className="menu-text">Invoices</span>
//                       <span className="badge bg-warning text-dark badge-pill">2 Due</span>
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             {/* ACTIVITY */}
//             <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
//               <div className="category-card">
//                 <h3 className="category-title">ACTIVITY</h3>
//                 <div className="menu-items">
//                   <Link to="/TimeTracker" className="menu-item">
//                     <div className="menu-icon bg-info">
//                       <i className="fas fa-clock"></i>
//                     </div>
//                     <span className="menu-text">Time Tracker</span>
//                   </Link>
//                   <Link to="/CalendarView" className="menu-item">
//                     <div className="menu-icon bg-info">
//                       <i className="fas fa-calendar-alt"></i>
//                     </div>
//                     <span className="menu-text">Scheduling</span>
//                   </Link>
//                   <Link to="/Tasks" className="menu-item">
//                     <div className="menu-icon bg-info">
//                       <i className="fas fa-tasks"></i>
//                     </div>
//                     <span className="menu-text">Tasks</span>
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             {/* INSIGHTS */}
//             <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
//               <div className="category-card">
//                 <h3 className="category-title">INSIGHTS</h3>
//                 <div className="menu-items">
//                   <Link to="/dashboard" className="menu-item">
//                     <div className="menu-icon bg-purple">
//                       <i className="fas fa-tachometer-alt"></i>
//                     </div>
//                     <span className="menu-text">Dashboard</span>
//                   </Link>
//                   <Link to="/ReportsPage" className="menu-item">
//                     <div className="menu-icon bg-purple">
//                       <i className="fas fa-chart-bar"></i>
//                     </div>
//                     <span className="menu-text">Reports</span>
//                   </Link>
//                   <Link to="/leadopportunities" className="menu-item">
//                     <div className="menu-icon bg-purple">
//                       <i className="fas fa-user"></i>
//                     </div>
//                     <span className="menu-text">Leads</span>
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             {/* COMPANY */}
//             <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
//               <div className="category-card">
//                 <h3 className="category-title">COMPANY</h3>
//                 <div className="menu-items">
//                   <Link to="/ClientsData" className="menu-item">
//                     <div className="menu-icon bg-orange">
//                       <i className="fas fa-users"></i>
//                     </div>
//                     <span className="menu-text">Clients</span>
//                   </Link>
//                   <Link to="/vendorspage" className="menu-item">
//                     <div className="menu-icon bg-orange">
//                       <i className="fas fa-truck"></i>
//                     </div>
//                     <span className="menu-text">Vendors</span>
//                   </Link>
//                   <Link to="/CataLog" className="menu-item">
//                     <div className="menu-icon bg-orange">
//                       <i className="fas fa-tags"></i>
//                     </div>
//                     <span className="menu-text">Catalog</span>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Stats Section */}
//       <div className="quick-stats py-4 bg-light">
//         <div className="container">
//           <div className="row g-3">
//             <div className="col-md-3 col-6">
//               <div className="stat-card">
//                 <div className="stat-icon bg-primary">
//                   <i className="fas fa-file-contract"></i>
//                 </div>
//                 <div className="stat-content">
//                   <h3>24</h3>
//                   <p>Active Contracts</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-3 col-6">
//               <div className="stat-card">
//                 <div className="stat-icon bg-warning">
//                   <i className="fas fa-exclamation-circle"></i>
//                 </div>
//                 <div className="stat-content">
//                   <h3>5</h3>
//                   <p>Pending Tasks</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-3 col-6">
//               <div className="stat-card">
//                 <div className="stat-icon bg-danger">
//                   <i className="fas fa-file-invoice-dollar"></i>
//                 </div>
//                 <div className="stat-content">
//                   <h3>2</h3>
//                   <p>Overdue Invoices</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-3 col-6">
//               <div className="stat-card">
//                 <div className="stat-icon bg-primary">
//                   <i className="fas fa-calendar-check"></i>
//                 </div>
//                 <div className="stat-content">
//                   <h3>7</h3>
//                   <p>Upcoming Meetings</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Helper function to get category color
//   function getCategoryColor(category) {
//     switch(category) {
//       case 'CORE': return 'primary';
//       case 'TRANSACTIONS': return 'primary';
//       case 'ACTIVITY': return 'info';
//       case 'INSIGHTS': return 'purple';
//       case 'COMPANY': return 'orange';
//       default: return 'secondary';
//     }
//   }
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/plug.png";
import "./AdminHome.css";
import HeroSection from "./HeroSection";
import MainContent from "./MainContent";
import QuickStats from "./QuickStats";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const searchableItems = [
    { name: "Contract Jobs", path: "/ContractJobs", category: "CORE", icon: "fa-file-contract" },
    { name: "Internal Projects", path: "/internalprojects", category: "CORE", icon: "fa-project-diagram" },
    { name: "Purchases", path: "/purchasesdata", category: "TRANSACTIONS", icon: "fa-shopping-cart" },
    { name: "Bills", path: "/BillsTab", category: "TRANSACTIONS", icon: "fa-file-invoice" },
    { name: "Invoices", path: "/InvoiceDashboard", category: "TRANSACTIONS", icon: "fa-file-invoice-dollar" },
    { name: "Time Tracker", path: "/TimeTracker", category: "ACTIVITY", icon: "fa-clock" },
    { name: "Scheduling", path: "/CalendarView", category: "ACTIVITY", icon: "fa-calendar-alt" },
    { name: "Tasks", path: "/Tasks", category: "ACTIVITY", icon: "fa-tasks" },
    { name: "Dashboard", path: "/dashboard", category: "INSIGHTS", icon: "fa-tachometer-alt" },
    { name: "Reports", path: "/ReportsPage", category: "INSIGHTS", icon: "fa-chart-bar" },
    { name: "Leads", path: "/leadopportunities", category: "INSIGHTS", icon: "fa-user" },
    { name: "Clients", path: "/ClientsData", category: "COMPANY", icon: "fa-users" },
    { name: "Vendors", path: "/vendorspage", category: "COMPANY", icon: "fa-truck" },
    { name: "Catalog", path: "/CataLog", category: "COMPANY", icon: "fa-tags" },
  ];

  const menuData = [
    {
      title: "CORE",
      col: "col-xl-2 col-lg-3 col-md-4 col-sm-6",
      items: [
        {
          to: "/ContractJobs",
          iconClass: { name: "fa-file-contract", bg: "bg-primary" },
          text: "Contract Jobs",
        },
        {
          to: "/internalprojects",
          iconClass: { name: "fa-project-diagram", bg: "bg-primary" },
          text: "Internal Projects",
        },
      ],
    },
    {
      title: "TRANSACTIONS",
      col: "col-xl-3 col-lg-4 col-md-4 col-sm-6",
      items: [
        {
          to: "/purchasesdata",
          iconClass: { name: "fa-shopping-cart", bg: "bg-primary" },
          text: "Purchases",
        },
        {
          to: "/BillsTab",
          iconClass: { name: "fa-file-invoice", bg: "bg-primary" },
          text: "Bills",
          badge: "2 Due",
        },
        {
          to: "/InvoiceDashboard",
          iconClass: { name: "fa-file-invoice-dollar", bg: "bg-primary" },
          text: "Invoices",
          badge: "2 Due",
        },
      ],
    },
    {
      title: "ACTIVITY",
      col: "col-xl-2 col-lg-3 col-md-4 col-sm-6",
      items: [
        {
          to: "/TimeTracker",
          iconClass: { name: "fa-clock", bg: "bg-info" },
          text: "Time Tracker",
        },
        {
          to: "/CalendarView",
          iconClass: { name: "fa-calendar-alt", bg: "bg-info" },
          text: "Scheduling",
        },
        {
          to: "/Tasks",
          iconClass: { name: "fa-tasks", bg: "bg-info" },
          text: "Tasks",
        },
      ],
    },
    {
      title: "INSIGHTS",
      col: "col-xl-2 col-lg-3 col-md-4 col-sm-6",
      items: [
        {
          to: "/dashboard",
          iconClass: { name: "fa-tachometer-alt", bg: "bg-purple" },
          text: "Dashboard",
        },
        {
          to: "/ReportsPage",
          iconClass: { name: "fa-chart-bar", bg: "bg-purple" },
          text: "Reports",
        },
        {
          to: "/leadopportunities",
          iconClass: { name: "fa-user", bg: "bg-purple" },
          text: "Leads",
        },
      ],
    },
    {
      title: "COMPANY",
      col: "col-xl-2 col-lg-3 col-md-4 col-sm-6",
      items: [
        {
          to: "/ClientsData",
          iconClass: { name: "fa-users", bg: "bg-orange" },
          text: "Clients",
        },
        {
          to: "/vendorspage",
          iconClass: { name: "fa-truck", bg: "bg-orange" },
          text: "Vendors",
        },
        {
          to: "/CataLog",
          iconClass: { name: "fa-tags", bg: "bg-orange" },
          text: "Catalog",
        },
      ],
    },
  ];

  const stats = [
    { icon: "fa-file-contract", bgColor: "bg-primary", count: 24, label: "Active Contracts" },
    { icon: "fa-exclamation-circle", bgColor: "bg-warning", count: 5, label: "Pending Tasks" },
    { icon: "fa-file-invoice-dollar", bgColor: "bg-danger", count: 2, label: "Overdue Invoices" },
    { icon: "fa-calendar-check", bgColor: "bg-primary", count: 7, label: "Upcoming Meetings" },
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setShowResults(false);
      return;
    }

    const results = searchableItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
    setShowResults(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleResultClick = (path) => {
    navigate(path);
    setShowResults(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="admin-home-container">
      <HeroSection logo={logo} searchQuery={searchQuery} setSearchQuery={setSearchQuery} showResults={showResults} setShowResults={setShowResults} searchResults={searchResults} handleResultClick={handleResultClick} handleKeyPress={handleKeyPress} handleSearch={handleSearch} />
      <MainContent menuData={menuData} />
      <QuickStats stats={stats} />
    </div>
  );
};

export default Home;
