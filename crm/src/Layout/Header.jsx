import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsSearch, BsList } from "react-icons/bs";
import {
  FaBell,
  FaUser,
  FaLock,
  FaCogs,
  FaRegBell,
  FaQuestionCircle,
  FaBook,
  FaFileContract,
  FaShieldAlt,
  FaFileAlt,
  FaProjectDiagram,
  FaHandHoldingUsd,
  FaFileInvoice,
  FaClock,
  FaCalendarAlt,
  FaTasks,
  FaUserTie,
  FaTruck,
  FaCube,
  FaBriefcase,
  FaTimes,
} from "react-icons/fa";

import "./Header.css";
import { Button } from "react-bootstrap";
import bonbonlogo from "../assets/Supplyblack.png";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef();
  const profileRef = useRef();
  const mobileMenuRef = useRef();

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
  };

  // Close dropdowns when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="position-relative p-2 p-md-3 border-bottom d-flex justify-content-between align-items-center bg-white">
        {/* Left Section */}
        <div className="d-flex align-items-center gap-3">
          {/* Mobile Menu Toggle */}
          <button
            className="d-md-none btn btn-light border-0"
            onClick={toggleMobileMenu}
          >
            <BsList size={24} />
          </button>

          <div className="fw-bold fs-4 d-flex align-items-center text-primary">
            <img
              src={bonbonlogo}
              alt="logo"
              style={{ height: 38, width: "auto", maxWidth: 170, objectFit: "contain" }}
            />
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="input-group d-none d-md-flex">
            <span className="input-group-text bg-white border-end-0">
              <BsSearch />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search or jump to..."
              style={{ maxWidth: "200px" }}
            />
          </div>

          {/* Add New Button - Hidden on mobile */}
          <div className="position-relative d-none d-md-block" ref={dropdownRef}>
            <button
              className="btn btn-outline-dark d-flex align-items-center px-3 py-1"
              onClick={toggleDropdown}
              style={{ fontSize: "0.9rem", gap: "0.4rem", whiteSpace: "nowrap" }}
            >
              Add new <span style={{ fontSize: "0.75rem" }}>▼</span>
            </button>

            {showDropdown && (
              <div
                className="position-absolute bg-white shadow p-3 mt-2 rounded"
                style={{
                  zIndex: 1050,
                  width: "600px",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "1rem",
                  top: "100%",
                }}
              >
                {/* Core */}
                <div>
                  <h6 className="text-uppercase text-muted small">Core</h6>
                  <Link to="/ContractJobs" className="text-dark text-decoration-none d-block mb-2">
                    <FaFileAlt className="me-2" /> Contract job
                  </Link>
                  <Link to="/InternalProjects" className="text-dark text-decoration-none d-block mb-2">
                    <FaProjectDiagram className="me-2" /> Internal project
                  </Link>
                </div>

                {/* Transactions */}
                <div>
                  <h6 className="text-uppercase text-muted small">Transactions</h6>
                  <Link to="/purchasesData" className="text-dark text-decoration-none d-block mb-2">
                    <FaHandHoldingUsd className="me-2" /> Purchase
                  </Link>
                  <Link to="/BillsTab" className="text-dark text-decoration-none d-block mb-2">
                    <FaFileInvoice className="me-2" /> Bill
                  </Link>
                  <Link to="/InvoiceDashboard" className="text-dark text-decoration-none d-block mb-2">
                    <FaFileInvoice className="me-2" /> Invoice
                  </Link>
                </div>

                {/* Activity */}
                <div>
                  <h6 className="text-uppercase text-muted small">Activity</h6>
                  <Link to="/TimeTracker" className="text-dark text-decoration-none d-block mb-2">
                    <FaClock className="me-2" /> Time
                  </Link>
                  <Link to="/CalendarView" className="text-dark text-decoration-none d-block mb-2">
                    <FaCalendarAlt className="me-2" /> Allocation
                  </Link>
                  <Link to="/Tasks" className="text-dark text-decoration-none d-block mb-2">
                    <FaTasks className="me-2" /> Task
                  </Link>
                </div>

                {/* Company */}
                <div>
                  <h6 className="text-uppercase text-muted small">Company</h6>
                  <Link to="/ClientsData" className="text-dark text-decoration-none d-block mb-2">
                    <FaUserTie className="me-2" /> Client
                  </Link>
                  <Link to="/VendorsPage" className="text-dark text-decoration-none d-block mb-2">
                    <FaTruck className="me-2" /> Vendor
                  </Link>
                  <Link to="/CataLog" className="text-dark text-decoration-none d-block mb-2">
                    <FaCube className="me-2" /> Product
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="d-flex align-items-center gap-3" ref={profileRef}>
          {/* Home Button - Hidden on mobile */}
          <Link to="/home" className="d-none d-md-block">
            <Button className="btn btn-secondary bg-light text-dark border border-dark py-1">
              Home
            </Button>
          </Link>
          
          {/* Bell Icon */}
          <div className="position-relative">
            <FaBell size={20} />
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.6rem" }}
            >
              3
            </span>
          </div>

          {/* Profile Icon */}
          <div
            className="bg-dark rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: 32, height: 32, cursor: "pointer" }}
            onClick={toggleProfileDropdown}
          >
            <FaUser color="#fff" size={16} />
          </div>

          {/* Profile Dropdown */}
          {showProfileDropdown && (
            <div
              className="position-absolute end-0 mt-5 me-3 p-3 bg-white shadow rounded"
              style={{
                width: "280px",
                zIndex: 100,
                top: "100%",
              }}
            >
              <div className="d-flex align-items-center mb-3">
                <div
                  className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: 36, height: 36 }}
                >
                  sM
                </div>
                <div className="ms-2">
                  <strong>simon Mashiah</strong>
                </div>
              </div>

              <hr />

              <div className="mb-2 small text-muted">ACCOUNT</div>
              <p className="mb-1">
                <FaLock className="me-2" /> Change password
              </p>

              <Link to="/adminsection">
                <div className="mb-1">
                  <FaCogs className="me-2" /> Admin section
                </div>
              </Link>

              <p className="mb-1">
                <FaRegBell className="me-2" /> Notification settings
              </p>

              <div className="mt-3 mb-2 small text-muted">SUPPORT</div>
              <p className="mb-1">
                <FaQuestionCircle className="me-2" /> Video tutorials
              </p>
              <p className="mb-1">
                <FaBook className="me-2" /> Documentation
              </p>

              <div className="mt-3 mb-2 small text-muted">ABOUT KNOWIFY</div>
              <p className="mb-1">
                <FaFileContract className="me-2" /> Terms of service
              </p>
              <p className="mb-3">
                <FaShieldAlt className="me-2" /> Privacy policy
              </p>
              <Link to="/">
                <button className="btn btn-success w-100">Log out</button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div
          ref={mobileMenuRef}
          className="position-fixed top-0 start-0 w-100 h-100 bg-white z-index-1050 p-3"
          style={{ zIndex: 1050, overflowY: 'auto' }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <img
              src={bonbonlogo}
              alt="logo"
              style={{ height: 38, width: "auto", maxWidth: 170, objectFit: "contain" }}
            />
            <button
              className="btn btn-light border-0"
              onClick={toggleMobileMenu}
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Mobile Search */}
          <div className="input-group mb-4">
            <span className="input-group-text bg-white border-end-0">
              <BsSearch />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search or jump to..."
            />
          </div>

          {/* Mobile Menu Items */}
          <div className="mb-4">
            <Link to="/home" className="text-decoration-none" onClick={() => setShowMobileMenu(false)}>
              <div className="d-flex align-items-center p-3 border-bottom">
                <Button className="btn btn-secondary bg-light text-dark border border-dark py-1 w-100 text-start">
                  Home
                </Button>
              </div>
            </Link>

            <div className="p-3 border-bottom">
              <button
                className="btn btn-outline-dark d-flex align-items-center justify-content-between px-3 py-2 w-100"
                onClick={toggleDropdown}
                style={{ fontSize: "0.9rem", gap: "0.4rem" }}
              >
                Add new <span style={{ fontSize: "0.75rem" }}>▼</span>
              </button>

              {showDropdown && (
                <div
                  className="bg-white p-3 mt-2 rounded"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "1rem",
                  }}
                >
                  {/* Core */}
                  <div>
                    <h6 className="text-uppercase text-muted small">Core</h6>
                    <Link to="/ContractJobs" className="text-dark text-decoration-none d-block mb-2" onClick={() => setShowMobileMenu(false)}>
                      <FaFileAlt className="me-2" /> Contract job
                    </Link>
                    <Link to="/InternalProjects" className="text-dark text-decoration-none d-block mb-2" onClick={() => setShowMobileMenu(false)}>
                      <FaProjectDiagram className="me-2" /> Internal project
                    </Link>
                  </div>

                  {/* Transactions */}
                  <div>
                    <h6 className="text-uppercase text-muted small">Transactions</h6>
                    <Link to="/purchasesData" className="text-dark text-decoration-none d-block mb-2" onClick={() => setShowMobileMenu(false)}>
                      <FaHandHoldingUsd className="me-2" /> Purchase
                    </Link>
                    <Link to="/BillsTab" className="text-dark text-decoration-none d-block mb-2" onClick={() => setShowMobileMenu(false)}>
                      <FaFileInvoice className="me-2" /> Bill
                    </Link>
                    <Link to="/InvoiceDashboard" className="text-dark text-decoration-none d-block mb-2" onClick={() => setShowMobileMenu(false)}>
                      <FaFileInvoice className="me-2" /> Invoice
                    </Link>
                  </div>

                  {/* Activity */}
                  <div>
                    <h6 className="text-uppercase text-muted small">Activity</h6>
                    <Link to="/TimeTracker" className="text-dark text-decoration-none d-block mb-2" onClick={() => setShowMobileMenu(false)}>
                      <FaClock className="me-2" /> Time
                    </Link>
                    <Link to="/CalendarView" className="text-dark text-decoration-none d-block mb-2" onClick={() => setShowMobileMenu(false)}>
                      <FaCalendarAlt className="me-2" /> Allocation
                    </Link>
                    <Link to="/Tasks" className="text-dark text-decoration-none d-block mb-2" onClick={() => setShowMobileMenu(false)}>
                      <FaTasks className="me-2" /> Task
                    </Link>
                  </div>

                  {/* Company */}
                  <div>
                    <h6 className="text-uppercase text-muted small">Company</h6>
                    <Link to="/ClientsData" className="text-dark text-decoration-none d-block mb-2" onClick={() => setShowMobileMenu(false)}>
                      <FaUserTie className="me-2" /> Client
                    </Link>
                    <Link to="/VendorsPage" className="text-dark text-decoration-none d-block mb-2" onClick={() => setShowMobileMenu(false)}>
                      <FaTruck className="me-2" /> Vendor
                    </Link>
                    <Link to="/CataLog" className="text-dark text-decoration-none d-block mb-2" onClick={() => setShowMobileMenu(false)}>
                      <FaCube className="me-2" /> Product
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Profile Section in Mobile Menu */}
          <div className="border-top pt-3">
            <div className="d-flex align-items-center mb-3">
              <div
                className="bg-dark rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: 40, height: 40 }}
              >
                <FaUser color="#fff" size={18} />
              </div>
              <div className="ms-3">
                <strong>simon Mashiah</strong>
              </div>
            </div>

            <div className="mb-2 small text-muted">ACCOUNT</div>
            <p className="mb-2 ps-3">
              <FaLock className="me-2" /> Change password
            </p>

            <Link to="/adminsection" className="text-decoration-none text-dark" onClick={() => setShowMobileMenu(false)}>
              <div className="mb-2 ps-3">
                <FaCogs className="me-2" /> Admin section
              </div>
            </Link>

            <p className="mb-2 ps-3">
              <FaRegBell className="me-2" /> Notification settings
            </p>

            <div className="mt-3 mb-2 small text-muted">SUPPORT</div>
            <p className="mb-2 ps-3">
              <FaQuestionCircle className="me-2" /> Video tutorials
            </p>
            <p className="mb-2 ps-3">
              <FaBook className="me-2" /> Documentation
            </p>

            <div className="mt-3 mb-2 small text-muted">ABOUT KNOWIFY</div>
            <p className="mb-2 ps-3">
              <FaFileContract className="me-2" /> Terms of service
            </p>
            <p className="mb-3 ps-3">
              <FaShieldAlt className="me-2" /> Privacy policy
            </p>
            
            <Link to="/" className="text-decoration-none" onClick={() => setShowMobileMenu(false)}>
              <button className="btn btn-success w-100">Log out</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;