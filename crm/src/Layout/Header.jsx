// import React, { useState, useRef, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// // FontAwesome (fa)
// import { FaHome, FaUserFriends, FaClipboardList, FaReceipt, FaShoppingCart } from 'react-icons/fa';

// // Bootstrap (bs)
// import { BsSearch, BsList } from 'react-icons/bs';
// ;

// import {
//     FaBell,
//     FaUser,
//     FaCogs,
//     FaRegBell,
//     FaTimes,
//     FaCommentDots,
//     FaMapMarkerAlt,
//     FaDollarSign,
//     FaFileAlt,
//     FaProjectDiagram,
//     FaHandHoldingUsd,
//     FaFileInvoice,
//     FaClock,
//     FaCalendarAlt,
//     FaTasks,
//     FaUserTie,
//     FaTruck,
//     FaCube,
// } from "react-icons/fa";
// import "./Header.css";
// import { Button, Modal, Form } from "react-bootstrap";
// import bonbonlogo from "../assets/Supplyblack.png";

// const Header = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const wrapperRef = useRef(null);
//     const navigate = useNavigate();
//     const handleClickOutside = (event) => {
//         if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//             setIsOpen(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     const recentItems = [

//     ];
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//     const [showMobileMenu, setShowMobileMenu] = useState(false);
//     const [showMobileAddNew, setShowMobileAddNew] = useState(false);
//     const [showNotificationModal, setShowNotificationModal] = useState(false);
//     const [emailAlert, setEmailAlert] = useState(true);
//     const [activityAlert, setActivityAlert] = useState(true);
//     const [showActivityPanel, setShowActivityPanel] = useState(false);
//     const [isAdmin] = useState(true); // Default to true for demo purposes

//     const dropdownRef = useRef(null);
//     const profileRef = useRef(null);
//     const mobileMenuRef = useRef(null);

//     // Toggle Dropdown
//     const toggleDropdown = () => {
//         setShowDropdown((prev) => !prev);
//         setShowProfileDropdown(false);
//     };

//     // Toggle Profile Dropdown
//     const toggleProfileDropdown = () => {
//         setShowProfileDropdown((prev) => !prev);
//         setShowDropdown(false);
//     };

//     // Toggle Mobile Menu
//     const toggleMobileMenu = () => {
//         setShowMobileMenu((prev) => !prev);
//         setShowDropdown(false);
//         setShowProfileDropdown(false);
//     };

//     // Close dropdowns when clicked outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setShowDropdown(false);
//             }
//             if (profileRef.current && !profileRef.current.contains(event.target)) {
//                 setShowProfileDropdown(false);
//             }
//             if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
//                 setShowMobileMenu(false);
//                 setShowMobileAddNew(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     return (
//         <>
//             <header className="position-relative p-2 p-md-3 border-bottom d-flex justify-content-between align-items-center bg-white">
//                 {/* Left Section */}
//                 <div className="d-flex align-items-center gap-3">
//                     {/* Mobile Menu Toggle */}
//                     <button
//                         className="d-md-none btn btn-light border-0"
//                         onClick={toggleMobileMenu}
//                     >
//                         <BsList size={24} />
//                     </button>

//                     <Link to="/home">
//                         <div className="fw-bold fs-4 d-flex align-items-center text-primary">
//                             <img
//                                 src={bonbonlogo}
//                                 alt="logo"
//                                 style={{ height: 38, width: "auto", maxWidth: 170, objectFit: "contain" }}
//                             />
//                         </div>
//                     </Link>

//                     {/* Search Bar - Hidden on mobile */}
//                     <div className="position-relative" ref={wrapperRef}>
//                         <div className="input-group d-none d-md-flex">
//                             <span className="input-group-text bg-white border-end-0">
//                                 <BsSearch />
//                             </span>
//                             <input
//                                 type="text"
//                                 className="form-control border-start-0"
//                                 placeholder="Search or jump to..."
//                                 style={{ maxWidth: "200px" }}
//                                 onFocus={() => setIsOpen(true)}
//                             />
//                         </div>

//                         {isOpen && (
//                             <div className="position-absolute bg-white border rounded shadow p-2" style={{ width: "300px", top: "100%", zIndex: 10 }}>
//                                 <div className="mb-2">
//                                     <strong>Jump to section</strong>
//                                     <ul className="list-unstyled ps-2 mt-1">
//                                         <li>
//                                             <Link to="/home" className="text-decoration-none text-dark d-flex align-items-center gap-2">
//                                                 <FaHome /> Home
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link to="/BillsTab" className="text-decoration-none text-dark d-flex align-items-center gap-2">
//                                                 <FaReceipt /> Bills
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link to="/ClientsData" className="text-decoration-none text-dark d-flex align-items-center gap-2">
//                                                 <FaUserFriends /> Clients
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link to="/ContractJobs" className="text-decoration-none text-dark d-flex align-items-center gap-2">
//                                                 <FaClipboardList /> Contract Jobs
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link to="/InvoiceDashboard" className="text-decoration-none text-dark d-flex align-items-center gap-2">
//                                                 <FaFileInvoice /> Invoices
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link to="/purchasesData" className="text-decoration-none text-dark d-flex align-items-center gap-2">
//                                                 <FaShoppingCart /> Purchases
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link to="/VendorsPage" className="text-decoration-none text-dark d-flex align-items-center gap-2">
//                                                 <FaTruck /> Vendors
//                                             </Link>
//                                         </li>
//                                     </ul>
//                                 </div>
//                                 <div>
//                                     <strong>Recently viewed</strong> <span className="text-primary" style={{ cursor: 'pointer' }}>Clear recent</span>
//                                     <ul className="list-unstyled ps-2 mt-1">
//                                         {recentItems.map((item, idx) => (
//                                             <li key={idx}>{item}</li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Add New Button - Hidden on mobile */}
//                     <div className="position-relative d-none d-md-block" ref={dropdownRef}>
//                         <button
//                             className="btn custom-add-btn d-flex align-items-center px-3 py-1"
//                             onClick={toggleDropdown}
//                         >
//                             Add new <span style={{ fontSize: "0.75rem" }}>▼</span>
//                         </button>


//                         {showDropdown && (
//                             <div
//                                 className="position-absolute bg-white shadow p-3 mt-2 rounded"
//                                 style={{
//                                     zIndex: 1050,
//                                     width: "600px",
//                                     display: "grid",
//                                     gridTemplateColumns: "repeat(4, 1fr)",
//                                     gap: "1rem",
//                                     top: "100%",
//                                 }}
//                             >
//                                 {/* Core */}
//                                 <div>
//                                     <h6 className="text-uppercase text-muted small">Core</h6>
//                                     <Link to="/ContractJobs" className="text-dark text-decoration-none d-block mb-2">
//                                         <FaFileAlt className="me-2" /> Contract job
//                                     </Link>
//                                     <Link to="/InternalProjects" className="text-dark text-decoration-none d-block mb-2">
//                                         <FaProjectDiagram className="me-2" /> Internal project
//                                     </Link>
//                                 </div>

//                                 {/* Transactions */}
//                                 <div>
//                                     <h6 className="text-uppercase text-muted small">Transactions</h6>
//                                     <Link to="/purchasesData" className="text-dark text-decoration-none d-block mb-2">
//                                         <FaHandHoldingUsd className="me-2" /> Purchase
//                                     </Link>
//                                     <Link to="/BillsTab" className="text-dark text-decoration-none d-block mb-2">
//                                         <FaFileInvoice className="me-2" /> Bill
//                                     </Link>
//                                     <Link to="/InvoiceDashboard" className="text-dark text-decoration-none d-block mb-2">
//                                         <FaFileInvoice className="me-2" /> Invoice
//                                     </Link>
//                                 </div>

//                                 {/* Activity */}
//                                 <div>
//                                     <h6 className="text-uppercase text-muted small">Activity</h6>
//                                     <Link to="/TimeTracker" className="text-dark text-decoration-none d-block mb-2">
//                                         <FaClock className="me-2" /> Time
//                                     </Link>
//                                     <Link to="/CalendarView" className="text-dark text-decoration-none d-block mb-2">
//                                         <FaCalendarAlt className="me-2" /> Allocation
//                                     </Link>
//                                     <Link to="/Tasks" className="text-dark text-decoration-none d-block mb-2">
//                                         <FaTasks className="me-2" /> Task
//                                     </Link>
//                                 </div>

//                                 {/* Company */}
//                                 <div>
//                                     <h6 className="text-uppercase text-muted small">Company</h6>
//                                     <Link to="/ClientsData" className="text-dark text-decoration-none d-block mb-2">
//                                         <FaUserTie className="me-2" /> Client
//                                     </Link>
//                                     <Link to="/VendorsPage" className="text-dark text-decoration-none d-block mb-2">
//                                         <FaTruck className="me-2" /> Vendor
//                                     </Link>
//                                     <Link to="/CataLog" className="text-dark text-decoration-none d-block mb-2">
//                                         <FaCube className="me-2" /> Product
//                                     </Link>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Right Section */}
//                 <div className="d-flex align-items-center gap-3" ref={profileRef}>
//                     {/* Home Button - Hidden on mobile */}
//                     <Link to="/home" className="d-none d-md-block">
//                         <Button className="custom-add-btn py-1">
//                             Home
//                         </Button>
//                     </Link>

//                     {/* Bell Icon */}
//                     <div className="position-relative" style={{ cursor: "pointer" }}>
//                         <FaBell size={20} onClick={() => setShowActivityPanel(true)} />
//                         <span
//                             className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
//                             style={{ fontSize: "0.6rem" }}
//                         >
//                             3
//                         </span>
//                     </div>

//                     {/* Profile Icon */}
//                     <div
//                         className="bg-dark rounded-circle d-flex align-items-center justify-content-center"
//                         style={{ width: 32, height: 32, cursor: "pointer" }}
//                         onClick={toggleProfileDropdown}
//                     >
//                         <FaUser color="#fff" size={16} />
//                     </div>

//                     {/* Profile Dropdown */}
//                     {showProfileDropdown && (
//                         <div
//                             className="position-absolute end-0 mt-5 me-3 p-3 bg-white shadow rounded"
//                             style={{
//                                 width: "280px",
//                                 zIndex: 100,
//                                 top: "20%",
//                             }}
//                         >
//                             <div className="d-flex align-items-center mb-3">
//                                 <div
//                                     className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
//                                     style={{ width: 36, height: 36 }}
//                                 >
//                                     SM
//                                 </div>
//                                 <div className="ms-2">
//                                     <strong>Adamo</strong>
//                                 </div>
//                             </div>

//                             <hr />

//                             <div className="mb-2 small text-muted">ACCOUNT</div>

//                             <Link to="/adminsection" className="text-dark text-decoration-none">
//                                 <div className="mb-1">
//                                     <FaCogs className="me-2" /> Admin section
//                                 </div>
//                             </Link>

//                             {/* Notification settings - only for admins */}
//                             {isAdmin && (
//                                 <button
//                                     className="mb-1 btn btn-link text-dark text-decoration-none p-0"
//                                     style={{ fontSize: "1rem" }}
//                                     onClick={() => setShowNotificationModal(true)}
//                                     type="button"
//                                 >
//                                     <FaRegBell className="me-2" /> Notification settings
//                                 </button>
//                             )}

//                             {/* <Link to="/" className="text-decoration-none"> */}
//                             <button className="btn btn-primary w-100"
//                                 onClick={() => {
//                                     localStorage.clear();
//                                     setTimeout(() => {
//                                         navigate('/');
//                                     }, 1000);
//                                 }}>Log out</button>
//                             {/* </Link> */}
//                         </div>
//                     )}
//                 </div>
//             </header>

//             {/* Notification Activity Panel (Right Drawer) */}
//             <Modal
//                 show={showActivityPanel}
//                 onHide={() => setShowActivityPanel(false)}
//                 dialogClassName="modal-dialog-slideout"
//                 contentClassName="border-0"
//                 backdropClassName="bg-dark bg-opacity-25"
//                 centered={false}
//                 style={{ pointerEvents: "auto" }}
//                 animation={false}
//             >
//                 <div
//                     className="bg-white"
//                     style={{
//                         width: 370,
//                         minHeight: "100vh",
//                         maxHeight: "100vh",
//                         position: "fixed",
//                         top: 0,
//                         right: 0,
//                         borderTopRightRadius: 0,
//                         borderBottomRightRadius: 0,
//                         borderTopLeftRadius: "1rem",
//                         borderBottomLeftRadius: "1rem",
//                         boxShadow: "0 0 24px 0 rgba(0,0,0,0.12)",
//                         overflowY: "auto",
//                         zIndex: 2000,
//                     }}
//                 >
//                     <div className="d-flex justify-content-end p-3">
//                         <Button
//                             variant="link"
//                             className="text-dark fs-3 p-0"
//                             onClick={() => setShowActivityPanel(false)}
//                             aria-label="Close"
//                         >
//                             <FaTimes />
//                         </Button>
//                     </div>
//                     <div className="px-4">
//                         {/* Top image */}
//                         <img
//                             src={bonbonlogo}
//                             alt="Welcome"
//                             className="img-fluid rounded mb-4"
//                             style={{ width: "100%", maxHeight: 110, objectFit: "cover" }}
//                         />
//                         {/* Activity List (empty state) */}
//                         <div className="mb-4">
//                             <div className="d-flex flex-column align-items-start gap-4">
//                                 <div className="d-flex align-items-center gap-3">
//                                     <FaCommentDots size={20} className="text-secondary" />
//                                     <div style={{ width: 180, height: 16, background: "#f3f3f3", borderRadius: 4 }} />
//                                 </div>
//                                 <div className="d-flex align-items-center gap-3">
//                                     <FaMapMarkerAlt size={20} className="text-secondary" />
//                                     <div style={{ width: 140, height: 16, background: "#f3f3f3", borderRadius: 4 }} />
//                                 </div>
//                                 <div className="d-flex align-items-center gap-3">
//                                     <FaDollarSign size={20} className="text-secondary" />
//                                     <div style={{ width: 120, height: 16, background: "#f3f3f3", borderRadius: 4 }} />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="text-center mt-5">
//                             <h6 className="fw-bold mb-2">No activity yet</h6>
//                             <div className="text-muted" style={{ fontSize: "0.97rem" }}>
//                                 In this panel you will receive notifications related to your work,
//                                 such as proposals signed by customers or purchases requiring your approval.
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Modal>

//             {/* Notification Settings Modal */}
//             <Modal
//                 show={showNotificationModal}
//                 onHide={() => setShowNotificationModal(false)}
//                 centered
//                 backdrop="static"
//                 size="md"
//             >
//                 <Modal.Body className="p-4">
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                         <h5 className="fw-bold mb-0">Notification settings</h5>
//                         <Button
//                             variant="link"
//                             className="text-dark fs-4 p-0"
//                             onClick={() => setShowNotificationModal(false)}
//                             aria-label="Close"
//                         >
//                             <FaTimes />
//                         </Button>
//                     </div>
//                     <div className="border-bottom mb-3 pb-2">
//                         <span className="fw-semibold" style={{ borderBottom: "2px solid #009688", paddingBottom: 2 }}>General</span>
//                     </div>
//                     <div className="mb-2" style={{ color: "#444" }}>
//                         Set up your notification preferences for comments, mentions, tasks and scheduling alerts
//                     </div>
//                     <Form>
//                         <div className="form-check form-switch mb-3">
//                             <Form.Check
//                                 type="switch"
//                                 id="email-alert-switch"
//                                 label={
//                                     <span>
//                                         <span className="fw-semibold">Email</span>
//                                         <br />
//                                         <span className="text-muted small">You receive an email with the full message</span>
//                                     </span>
//                                 }
//                                 checked={emailAlert}
//                                 onChange={() => setEmailAlert(!emailAlert)}
//                             />
//                         </div>
//                         <div className="form-check form-switch mb-3">
//                             <Form.Check
//                                 type="switch"
//                                 id="activity-alert-switch"
//                                 label={
//                                     <span>
//                                         <span className="fw-semibold">Activity alert</span>
//                                         <br />
//                                         <span className="text-muted small">You receive an alert in the side panel or activity feed</span>
//                                     </span>
//                                 }
//                                 checked={activityAlert}
//                                 onChange={() => setActivityAlert(!activityAlert)}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <a href="#" className="text-primary fw-semibold small text-decoration-none">
//                                 Learn more about notifications
//                             </a>
//                         </div>
//                         <div className="d-flex justify-content-end gap-2">
//                             <Button variant="light" onClick={() => setShowNotificationModal(false)}>
//                                 Cancel
//                             </Button>
//                             <Button variant="primary" onClick={() => setShowNotificationModal(false)}>
//                                 Save changes
//                             </Button>
//                         </div>
//                     </Form>
//                 </Modal.Body>
//             </Modal>

//             {/* Mobile Menu */}
//             {showMobileMenu && (
//                 <div
//                     ref={mobileMenuRef}
//                     className="position-fixed top-0 start-0 w-100 h-100 bg-white z-index-1050 p-3"
//                     style={{ zIndex: 1050, overflowY: 'auto' }}
//                 >
//                     <div className="d-flex justify-content-between align-items-center mb-4">
//                         <img
//                             src={bonbonlogo}
//                             alt="logo"
//                             style={{ height: 38, width: "auto", maxWidth: 170, objectFit: "contain" }}
//                         />
//                         <button
//                             className="btn btn-light border-0"
//                             onClick={() => {
//                                 setShowMobileMenu(false);
//                                 setShowMobileAddNew(false);
//                             }}
//                         >
//                             <FaTimes size={24} />
//                         </button>
//                     </div>

//                     {/* Mobile Search */}
//                     <div className="position-relative" ref={wrapperRef}>
//                         {/* Desktop Search Bar */}
//                         <div className="input-group d-none d-md-flex">
//                             <span className="input-group-text bg-white border-end-0">
//                                 <BsSearch />
//                             </span>
//                             <input
//                                 type="text"
//                                 className="form-control border-start-0"
//                                 placeholder="Search or jump to..."
//                                 style={{ maxWidth: "200px" }}
//                                 onFocus={() => setIsOpen(true)}
//                             />
//                         </div>

//                         {/* Mobile Search Bar */}
//                         <div className="d-flex d-md-none align-items-center mb-3">
//                             <button
//                                 className="btn btn-light w-100 me-2"
//                                 style={{ border: "1px solid #ddd", flex: 1 }}
//                                 onClick={() => setIsOpen((v) => !v)}
//                                 aria-label="Open search"
//                             >
//                                 <div className="d-flex align-items-center justify-content-center w-100">
//                                     <BsSearch className="me-2" />
//                                     <span style={{ flex: 1, textAlign: "left" }}>Search or jump to...</span>
//                                 </div>
//                             </button>
//                         </div>

//                         {isOpen && (
//                             <div
//                                 className="position-absolute bg-white border rounded shadow p-3 w-100"
//                                 style={{
//                                     maxWidth: "100%", // Ensures it adapts to screen size
//                                     top: "100%",
//                                     left: 0,
//                                     zIndex: 10,
//                                 }}
//                             >
//                                 <div className="mb-3">
//                                     <strong>Jump to section</strong>
//                                     <ul className="list-unstyled ps-2 mt-2">
//                                         <li>
//                                             <Link
//                                                 to="/home"
//                                                 className="text-decoration-none text-dark d-flex align-items-center gap-2"
//                                                 onClick={() => setIsOpen(false)}
//                                             >
//                                                 <FaHome /> Home
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link
//                                                 to="/BillsTab"
//                                                 className="text-decoration-none text-dark d-flex align-items-center gap-2"
//                                                 onClick={() => setIsOpen(false)}
//                                             >
//                                                 <FaReceipt /> Bills
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link
//                                                 to="/ClientsData"
//                                                 className="text-decoration-none text-dark d-flex align-items-center gap-2"
//                                                 onClick={() => setIsOpen(false)}
//                                             >
//                                                 <FaUserFriends /> Clients
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link
//                                                 to="/ContractJobs"
//                                                 className="text-decoration-none text-dark d-flex align-items-center gap-2"
//                                                 onClick={() => setIsOpen(false)}
//                                             >
//                                                 <FaClipboardList /> Contract Jobs
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link
//                                                 to="/InvoiceDashboard"
//                                                 className="text-decoration-none text-dark d-flex align-items-center gap-2"
//                                                 onClick={() => setIsOpen(false)}
//                                             >
//                                                 <FaFileInvoice /> Invoices
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link
//                                                 to="/purchasesData"
//                                                 className="text-decoration-none text-dark d-flex align-items-center gap-2"
//                                                 onClick={() => setIsOpen(false)}
//                                             >
//                                                 <FaShoppingCart /> Purchases
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link
//                                                 to="/VendorsPage"
//                                                 className="text-decoration-none text-dark d-flex align-items-center gap-2"
//                                                 onClick={() => setIsOpen(false)}
//                                             >
//                                                 <FaTruck /> Vendors
//                                             </Link>
//                                         </li>
//                                     </ul>
//                                 </div>

//                                 <div className="mt-3">
//                                     <strong>Recently viewed</strong>{" "}
//                                     <span
//                                         className="text-primary"
//                                         style={{ cursor: "pointer" }}
//                                         onClick={() => console.log("Clear recent clicked")}
//                                     >
//                                         Clear recent
//                                     </span>
//                                     <ul className="list-unstyled ps-2 mt-2">
//                                         {recentItems.map((item, idx) => (
//                                             <li key={idx}>{item}</li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </div>

//                         )}
//                     </div>

//                     {/* Mobile Menu Items */}
//                     <div className="mb-4">
//                         <div className="d-flex flex-column gap-3">
//                             <Link
//                                 to="/home"
//                                 className="text-decoration-none"
//                                 onClick={() => setShowMobileMenu(false)}
//                             >
//                                 <Button className="custom-add-btn py-1 w-100 text-aling-center">
//                                     Home
//                                 </Button>
//                             </Link>
//                             {!showMobileAddNew ? (
//                                 <button
//                                     className="btn custom-add-btn w-100"
//                                     onClick={() => setShowMobileAddNew(true)}
//                                 >
//                                     Add new
//                                 </button>
//                             ) : (
//                                 <div className="p-3 border rounded bg-light mt-2">
//                                     <button
//                                         className="btn btn-light border-0 d-lg-none"
//                                         onClick={() => {
//                                             setShowMobileMenu(false);
//                                             setShowMobileAddNew(false);
//                                         }}
//                                     >
//                                         <FaTimes size={24} />
//                                     </button>

//                                     {/* Core */}
//                                     <div>
//                                         <h6 className="text-uppercase text-muted small">Core</h6>
//                                         <Link to="/ContractJobs" className="text-dark text-decoration-none d-block mb-2" onClick={() => { setShowMobileMenu(false); setShowMobileAddNew(false); }}>
//                                             <FaFileAlt className="me-2" /> Contract job
//                                         </Link>
//                                         <Link to="/InternalProjects" className="text-dark text-decoration-none d-block mb-2" onClick={() => { setShowMobileMenu(false); setShowMobileAddNew(false); }}>
//                                             <FaProjectDiagram className="me-2" /> Internal project
//                                         </Link>
//                                     </div>
//                                     {/* Transactions */}
//                                     <div>
//                                         <h6 className="text-uppercase text-muted small">Transactions</h6>
//                                         <Link to="/purchasesData" className="text-dark text-decoration-none d-block mb-2" onClick={() => { setShowMobileMenu(false); setShowMobileAddNew(false); }}>
//                                             <FaHandHoldingUsd className="me-2" /> Purchase
//                                         </Link>
//                                         <Link to="/BillsTab" className="text-dark text-decoration-none d-block mb-2" onClick={() => { setShowMobileMenu(false); setShowMobileAddNew(false); }}>
//                                             <FaFileInvoice className="me-2" /> Bill
//                                         </Link>
//                                         <Link to="/InvoiceDashboard" className="text-dark text-decoration-none d-block mb-2" onClick={() => { setShowMobileMenu(false); setShowMobileAddNew(false); }}>
//                                             <FaFileInvoice className="me-2" /> Invoice
//                                         </Link>
//                                     </div>
//                                     {/* Activity */}
//                                     <div>
//                                         <h6 className="text-uppercase text-muted small">Activity</h6>
//                                         <Link to="/TimeTracker" className="text-dark text-decoration-none d-block mb-2" onClick={() => { setShowMobileMenu(false); setShowMobileAddNew(false); }}>
//                                             <FaClock className="me-2" /> Time
//                                         </Link>
//                                         <Link to="/CalendarView" className="text-dark text-decoration-none d-block mb-2" onClick={() => { setShowMobileMenu(false); setShowMobileAddNew(false); }}>
//                                             <FaCalendarAlt className="me-2" /> Allocation
//                                         </Link>
//                                         <Link to="/Tasks" className="text-dark text-decoration-none d-block mb-2" onClick={() => { setShowMobileMenu(false); setShowMobileAddNew(false); }}>
//                                             <FaTasks className="me-2" /> Task
//                                         </Link>
//                                     </div>
//                                     {/* Company */}
//                                     <div>
//                                         <h6 className="text-uppercase text-muted small">Company</h6>
//                                         <Link to="/ClientsData" className="text-dark text-decoration-none d-block mb-2" onClick={() => { setShowMobileMenu(false); setShowMobileAddNew(false); }}>
//                                             <FaUserTie className="me-2" /> Client
//                                         </Link>
//                                         <Link to="/VendorsPage" className="text-dark text-decoration-none d-block mb-2" onClick={() => { setShowMobileMenu(false); setShowMobileAddNew(false); }}>
//                                             <FaTruck className="me-2" /> Vendor
//                                         </Link>
//                                         <Link to="/CataLog" className="text-dark text-decoration-none d-block mb-2" onClick={() => { setShowMobileMenu(false); setShowMobileAddNew(false); }}>
//                                             <FaCube className="me-2" /> Product
//                                         </Link>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Profile Section in Mobile Menu */}
//                     <div className="border-top pt-3">
//                         <div className="d-flex align-items-center mb-3">
//                             <div
//                                 className="bg-dark rounded-circle d-flex justify-content-center align-items-center"
//                                 style={{ width: 40, height: 40 }}
//                             >
//                                 <FaUser color="#fff" size={18} />
//                             </div>
//                             <div className="ms-3">
//                                 <strong>Adamo</strong>
//                             </div>
//                         </div>

//                         <div className="mb-2 small text-muted">ACCOUNT</div>

//                         <Link to="/adminsection" className="text-decoration-none text-dark" onClick={() => setShowMobileMenu(false)}>
//                             <div className="mb-2 ps-3">
//                                 <FaCogs className="me-2" /> Admin section
//                             </div>
//                         </Link>

//                         {/* Notification settings - only for admins */}
//                         {isAdmin && (
//                             <div className="mb-2 ps-3">
//                                 <FaRegBell className="me-2" /> Notification settings
//                             </div>
//                         )}

//                         <Link to="/" className="text-decoration-none" onClick={() => setShowMobileMenu(false)}>
//                             <button className="btn btn-primary w-100">Log out</button>
//                         </Link>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Header;
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUserFriends, FaClipboardList, FaReceipt, FaShoppingCart } from 'react-icons/fa';
import { BsSearch, BsList } from 'react-icons/bs';
import { FaBell, FaUser, FaCogs, FaRegBell, FaTimes, FaCommentDots, FaMapMarkerAlt, FaDollarSign, FaFileAlt, FaProjectDiagram, FaHandHoldingUsd, FaFileInvoice, FaClock, FaCalendarAlt, FaTasks, FaUserTie, FaTruck, FaCube } from "react-icons/fa";
import { Button, Modal, Form } from "react-bootstrap";
import bonbonlogo from "../assets/Supplyblack.png";
import "./Header.css";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import ActivityPanel from "./ActivityPanel";
import NotificationSettingsModal from "./NotificationSettingModal";
import MobileMenu from "./MobileMenu";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showMobileAddNew, setShowMobileAddNew] = useState(false);
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [emailAlert, setEmailAlert] = useState(true);
    const [activityAlert, setActivityAlert] = useState(true);
    const [showActivityPanel, setShowActivityPanel] = useState(false);
    const [isAdmin] = useState(true); // Default to true for demo purposes

    const navigate = useNavigate();
    const wrapperRef = useRef(null);
    const dropdownRef = useRef(null);
    const profileRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
        setShowProfileDropdown(false);
    };

    const toggleProfileDropdown = () => {
        setShowProfileDropdown((prev) => !prev);
        setShowDropdown(false);
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu((prev) => !prev);
        setShowDropdown(false);
        setShowProfileDropdown(false);
    };

    return (
        <>
            <header className="position-relative p-2 p-md-3 border-bottom d-flex justify-content-between align-items-center bg-white">
                <LeftSection
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    toggleMobileMenu={toggleMobileMenu}
                    toggleDropdown={toggleDropdown}
                    showDropdown={showDropdown}
                    dropdownRef={dropdownRef}
                    wrapperRef={wrapperRef}
                    bonbonlogo={bonbonlogo}
                />
                <RightSection
                    toggleProfileDropdown={toggleProfileDropdown}
                    showProfileDropdown={showProfileDropdown}
                    isAdmin={isAdmin}
                    setShowActivityPanel={setShowActivityPanel}
                    navigate={navigate}
                    profileRef={profileRef}
                />
            </header>

            <ActivityPanel
                showActivityPanel={showActivityPanel}
                setShowActivityPanel={setShowActivityPanel}
                bonbonlogo={bonbonlogo}
            />

            <NotificationSettingsModal
                showNotificationModal={showNotificationModal}
                setShowNotificationModal={setShowNotificationModal}
                emailAlert={emailAlert}
                setEmailAlert={setEmailAlert}
                activityAlert={activityAlert}
                setActivityAlert={setActivityAlert}
            />

            {showMobileMenu && (
                <MobileMenu
                    bonbonlogo={bonbonlogo}
                    mobileMenuRef={mobileMenuRef}
                    setShowMobileMenu={setShowMobileMenu}
                    showMobileAddNew={showMobileAddNew}
                    setShowMobileAddNew={setShowMobileAddNew}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    wrapperRef={wrapperRef}
                />
            )}
        </>
    );
};

export default Header;