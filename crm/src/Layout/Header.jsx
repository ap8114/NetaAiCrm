import React, { useState, useRef, useEffect } from "react";
import {
    FaBell, FaUser, FaLock, FaCogs, FaRegBell, FaQuestionCircle,
    FaBook, FaFileContract, FaShieldAlt, FaFileAlt, FaProjectDiagram,
    FaHandHoldingUsd, FaFileInvoice, FaClock, FaCalendarAlt, FaTasks,
    FaUserTie, FaTruck, FaCube, FaBriefcase
} from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import "./Header.css";

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const dropdownRef = useRef();
    const profileRef = useRef();

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
        setShowProfileDropdown(false);
    };

    const toggleProfileDropdown = () => {
        setShowProfileDropdown((prev) => !prev);
        setShowDropdown(false);
    };

    // Close dropdowns when clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                profileRef.current && !profileRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
                setShowProfileDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="position-relative p-3 border-bottom d-flex justify-content-between align-items-center bg-white">
            {/* Left Section */}
            <div className="d-flex align-items-center gap-3">
                <div className="fw-bold fs-4 d-flex align-items-center text-primary">
                    <span className="text-primary me-1">N</span>
                    <span className="text-secondary">ETA</span>
                </div>

                {/* Search Bar */}
                <div className="input-group">
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

                {/* Add New Button */}
                <div className="position-relative" ref={dropdownRef}>
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
                            <div>
                                <h6 className="text-uppercase text-muted small">Core</h6>
                                <p><FaFileAlt className="me-2" />Contract job</p>
                                <p><FaProjectDiagram className="me-2" />Internal project</p>
                            </div>
                            <div>
                                <h6 className="text-uppercase text-muted small">Transactions</h6>
                                <p><FaHandHoldingUsd className="me-2" />Purchase</p>
                                <p><FaFileInvoice className="me-2" />Bill</p>
                                <p><FaFileInvoice className="me-2" />Invoice</p>
                            </div>
                            <div>
                                <h6 className="text-uppercase text-muted small">Activity</h6>
                                <p><FaClock className="me-2" />Time</p>
                                <p><FaCalendarAlt className="me-2" />Allocation</p>
                                <p><FaTasks className="me-2" />Task</p>
                            </div>
                            <div>
                                <h6 className="text-uppercase text-muted small">Company</h6>
                                <p><FaUserTie className="me-2" />Client</p>
                                <p><FaTruck className="me-2" />Vendor</p>
                                <p><FaCube className="me-2" />Product</p>
                                <p><FaBriefcase className="me-2" />Service</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Section */}
            <div className="d-flex align-items-center gap-3" ref={profileRef}>
                <div className="position-relative">
                    <FaBell size={20} />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.6rem" }}>
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
                            top: "20%",
                        }}
                    >
                        <div className="d-flex align-items-center mb-3">
                            <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: 36, height: 36 }}>
                                sM
                            </div>
                            <div className="ms-2">
                                <strong>simon Mashiah</strong>
                            </div>
                        </div>

                        <hr />

                        <div className="mb-2 small text-muted">ACCOUNT</div>
                        <p className="mb-1"><FaLock className="me-2" /> Change password</p>

                       <Link to="/adminsection">
                       <p className="mb-1"><FaCogs className="me-2" /> Admin section</p>
                       </Link> 
                        <p className="mb-1"><FaRegBell className="me-2" /> Notification settings</p>

                        <div className="mt-3 mb-2 small text-muted">SUPPORT</div>
                        <p className="mb-1"><FaQuestionCircle className="me-2" /> Video tutorials</p>
                        <p className="mb-1"><FaBook className="me-2" /> Documentation</p>

                        <div className="mt-3 mb-2 small text-muted">ABOUT KNOWIFY</div>
                        <p className="mb-1"><FaFileContract className="me-2" /> Terms of service</p>
                        <p className="mb-3"><FaShieldAlt className="me-2" /> Privacy policy</p>

                        <button className="btn btn-success w-100">Log out</button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
