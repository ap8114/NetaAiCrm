import React, { useState, useEffect, useRef } from 'react';
import "./AdminSection.css";
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp, FaCopy, FaBold, FaItalic } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../slices/userSlice';
import AlertBox from '../AlertBox';

const initialUsers = [
    {
        id: 1,
        name: "Al Jardine",
        role: "Laborer",
        access: "No access",
        manager: "simon Mashiah",
        onboarding: false,
    },
    {
        id: 2,
        name: "Brian Wilson",
        role: "Owner",
        access: "Regular",
        manager: "",
        onboarding: false,
    },
    {
        id: 3,
        name: "Bruce Johnston",
        role: "Laborer",
        access: "No access",
        manager: "",
        onboarding: false,
    },
    {
        id: 4,
        name: "Carl Wilson",
        role: "Laborer",
        access: "No access",
        manager: "",
        onboarding: false,
    },
    {
        id: 5,
        name: "David Marks",
        role: "Laborer",
        access: "No access",
        manager: "",
        onboarding: false,
    },
    {
        id: 6,
        name: "Dennis Wilson",
        role: "Foreman",
        access: "No access",
        manager: "",
        onboarding: false,
    },
    {
        id: 7,
        name: "Mike Love",
        role: "Laborer",
        access: "No access",
        manager: "",
        onboarding: false,
    },
    {
        id: 8,
        name: "simon Mashiah",
        role: "Office manager",
        access: "Regular",
        manager: "",
        onboarding: true,
    },
];

const initialRoles = [
    { role: "CEO", billing: "Hourly", billingRate: 0, budgetRate: "" },
    { role: "Employee", billing: "Hourly", billingRate: 0, budgetRate: "" },
    { role: "Foreman", billing: "Hourly", billingRate: 75, budgetRate: 50 },
    { role: "Laborer", billing: "Hourly", billingRate: 60, budgetRate: 40 },
    { role: "Office manager", billing: "Hourly", billingRate: 0, budgetRate: "" },
    { role: "Owner", billing: "Hourly", billingRate: 150, budgetRate: 100 },
];

const initialResourceCost = [
    {
        name: "David Marks",
        role: "Laborer",
        pay: 35,
        payType: "per hour",
        benefits: 2,
        taxes: 7,
        insurance: 8,
        union: 0,
        other: 0,
        costPerHour: 42.25,
    },
    {
        name: "Bruce Johnston",
        role: "Laborer",
        pay: 24,
        payType: "per hour",
        benefits: 2,
        taxes: 7,
        insurance: 8,
        union: 0,
        other: 0,
        costPerHour: 29.6,
    },
    {
        name: "Al Jardine",
        role: "Laborer",
        pay: 34,
        payType: "per hour",
        benefits: 2,
        taxes: 7,
        insurance: 8,
        union: 0,
        other: 0,
        costPerHour: 41.1,
    },
    {
        name: "Carl Wilson",
        role: "Laborer",
        pay: 30,
        payType: "per hour",
        benefits: 2,
        taxes: 7,
        insurance: 8,
        union: 0,
        other: 0,
        costPerHour: 36.5,
    },
    {
        name: "Mike Love",
        role: "Laborer",
        pay: 40,
        payType: "per hour",
        benefits: 2,
        taxes: 7,
        insurance: 8,
        union: 0,
        other: 0,
        costPerHour: 48,
    },
    {
        name: "Dennis Wilson",
        role: "Foreman",
        pay: 45,
        payType: "per hour",
        benefits: 2,
        taxes: 7,
        insurance: 8,
        union: 0,
        other: 0,
        costPerHour: 53.75,
    },
    {
        name: "Brian Wilson",
        role: "Owner",
        pay: 200000,
        payType: "per year",
        benefits: 5000,
        taxes: 7,
        insurance: "n/a",
        union: "n/a",
        other: "n/a",
        costPerHour: 109.5,
    },
    {
        name: "simon Mashiah",
        role: "Office manager",
        pay: "",
        payType: "per year",
        benefits: "",
        taxes: "",
        insurance: "n/a",
        union: "n/a",
        other: "n/a",
        costPerHour: 0,
    },
];

const AdminSection = () => {
    const [showCustomTemplates, setShowCustomTemplates] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const fileName = "Bon-Bon-Logo.png";
    const fileUrl = "/uploads/Bon-Bon-Logo.png";
    const handleView = () => window.open(fileUrl, "_blank");
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const fileInputRef = useRef(null);
    const handleClick = () => fileInputRef.current.click();
    const handleFileChange = (e) => {
        const files = e.target.files;
        console.log("Selected files:", files);
    };
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [rates, setRates] = useState([{ name: 'Non taxable', rate: '0.000%' }]);
    const handleAddRate = () => setRates([...rates, { name: '', rate: '' }]);
    const handleChange = (index, field, value) => {
        const updatedRates = [...rates];
        updatedRates[index][field] = value;
        setRates(updatedRates);
    };
    const [openDropdown, setOpenDropdown] = useState(null);
    const [text, setText] = useState("");
    const toggleDropdown = (key) => setOpenDropdown((prev) => (prev === key ? null : key));
    const handleFormat = (tag) => {
        const selection = window.getSelection().toString();
        if (!selection) return;
        const formatted = `<${tag}>${selection}</${tag}>`;
        setText((prev) => prev.replace(selection, formatted));
    };
    const [showTerms, setShowTerms] = useState(false);
    const [subject, setSubject] = useState("Invoice #^InvoiceNumber^");
    const [message, setMessage] = useState(
        "Please find attached Invoice #^InvoiceNumber^ for our services.\n\nThank you,\n\n^UserName^"
    );
    const [showCompanyCam, setShowCompanyCam] = useState(false);
    const [showSquare, setShowSquare] = useState(false);
    const [paymentOption, setPaymentOption] = useState("Include card payment link in all invoices by default");
    const [showQuickBooks, setShowQuickBooks] = useState(false);
    const [showTimeImport, setShowTimeImport] = useState(false);
    const [enableImport, setEnableImport] = useState(false);
    const [showPaychex, setShowPaychex] = useState(false);
    const [customerId, setCustomerId] = useState('abc');
    const [showApiKey, setShowApiKey] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const [copied, setCopied] = useState(false);
    const generateKey = () => {
        const newKey = '2b65ddacc34d9867d738793d8efd028e5359ff7061e18c609ac5a2a2f1ba';
        setApiKey(newKey);
        setShowApiKey(true);
    };
    const copyToClipboard = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const [isOpen, setIsOpen] = useState(false);
    const [purchaseOrder, setPurchaseOrder] = useState(1);
    const [invoiceNumber, setInvoiceNumber] = useState(1);
    const [structureType, setStructureType] = useState("Departments");
    const [departments, setDepartments] = useState([
        "General/Corporate",
        "qerb",
        "rfn",
        "fg",
    ]);
    const [newDept, setNewDept] = useState("");
    const handleRemoveDept = (idx) => setDepartments(departments.filter((_, i) => i !== idx));
    const handleAddDept = () => {
        if (newDept.trim()) {
            setDepartments([...departments, newDept.trim()]);
            setNewDept("");
        }
    };
    const [users, setUsers] = useState(initialUsers);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showOnboardingModal, setShowOnboardingModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [addUserType, setAddUserType] = useState("");
    const [editUser, setEditUser] = useState({
        type: "",
        role: "",
        firstName: "",
        lastName: "",
        department: "",
        manager: "",
        cell: "",
        empId: "",
    });
    const [showResourceCost, setShowResourceCost] = useState(true);
    const [showRoles, setShowRoles] = useState(true);
    const [roles, setRoles] = useState(initialRoles);
    const [resourceCost, setResourceCost] = useState(initialResourceCost);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [newRole, setNewRole] = useState({ name: "", billingRate: "", budgetRate: "" });
    const [showSubStep1, setShowSubStep1] = useState(false);
    const [showSubStep2, setShowSubStep2] = useState(false);
    const [customizeTab, setCustomizeTab] = useState("features");


    const openAddModal = () => {
        setAddUserType("");
        setShowAddModal(true);
    };


    const openEditModal = (user) => {
        setEditUser({
            type: user.access,
            role: user.role,
            firstName: user.name.split(" ")[0],
            lastName: user.name.split(" ")[1] || "",
            department: "",
            manager: user.manager,
            cell: "",
            empId: "",
        });
        setShowEditModal(true);
    };

    const openOnboardingModal = (user) => {
        setSelectedUser(user);
        setShowOnboardingModal(true);
    };


    const handleAddRole = () => {
        if (!newRole.name.trim()) return;
        setRoles([
            ...roles,
            {
                role: newRole.name,
                billing: "Hourly",
                billingRate: Number(newRole.billingRate) || 0,
                budgetRate: Number(newRole.budgetRate) || 0,
            },
        ]);
        setNewRole({ name: "", billingRate: "", budgetRate: "" });
        setShowRoleModal(false);
    };


    const [showHideJobs, setShowHideJobs] = useState(false);
    const [hideClosedJobs, setHideClosedJobs] = useState(false);
    const [hideClosedPhases, setHideClosedPhases] = useState(false);
    const [hideBiddingJobs, setHideBiddingJobs] = useState(false);
    const [showTimeTracking, setShowTimeTracking] = useState(false);
    const [preventMobileEdit, setPreventMobileEdit] = useState(false);
    const [enableOvertime, setEnableOvertime] = useState(false);
    const [showDirectReports, setShowDirectReports] = useState(false);
    const [firstDayOfWeek, setFirstDayOfWeek] = useState("Sunday");
    const [fenceSize, setFenceSize] = useState(1);
    const [showCostManagement, setShowCostManagement] = useState(false);
    const [useActualCosts, setUseActualCosts] = useState(false);
    const [enableFlexiblePOs, setEnableFlexiblePOs] = useState(false);
    const [jobCostingStyle, setJobCostingStyle] = useState("Professional: Budget and plan in Knowify, then track labor and materials against budget line items");
    const [showProjectManagement, setShowProjectManagement] = useState(false);
    const [enableWip, setEnableWip] = useState(true);
    const [factorWip, setFactorWip] = useState(false);
    const [displayItemsOrder, setDisplayItemsOrder] = useState(false);
    const [enablePhaseProgress, setEnablePhaseProgress] = useState(false);
    const [hideClosedJobsWorkflow, setHideClosedJobsWorkflow] = useState(false);
    const [showScheduling, setShowScheduling] = useState(false);
    const [enableResourceBoard, setEnableResourceBoard] = useState(true);
    const [enableJobBoard, setEnableJobBoard] = useState(false);
    const [extendJobPhaseDates, setExtendJobPhaseDates] = useState(false);
    const [schedulingFirstDay, setSchedulingFirstDay] = useState("");
    const [showProposalMgmt, setShowProposalMgmt] = useState(false);
    const [proposalValidDays, setProposalValidDays] = useState(30);
    const [proposalEsignLink, setProposalEsignLink] = useState("View Proposal");
    const [breakdownDefault, setBreakdownDefault] = useState("Show line item breakdown / bill of materials to customer");
    const [outputStyle, setOutputStyle] = useState("Display line item subtotals");
    const [invoicingStyle, setInvoicingStyle] = useState("Use a regular invoice - display line items to be invoiced only");
    const [showJobDescBox, setShowJobDescBox] = useState(false);
    const [enableDeposits, setEnableDeposits] = useState(false);
    const [depositInvoiceDate, setDepositInvoiceDate] = useState("Project start date");
    const [depositPaymentTerms, setDepositPaymentTerms] = useState("");
    const [showAiaInvoicing, setShowAiaInvoicing] = useState(false);
    const [enableAiaInvoicing, setEnableAiaInvoicing] = useState(true);
    const [aiaDefaultStyle, setAiaDefaultStyle] = useState("Enter completed work (in $) to be Invoiced in the pay app (no stored materials)");
    const [showCostPlus, setShowCostPlus] = useState(false);
    const [enableCostPlus, setEnableCostPlus] = useState(false);
    const [showPartsInventory, setShowPartsInventory] = useState(false);
    const [showDefaultPaymentTerms, setShowDefaultPaymentTerms] = useState(false);
    const [showDefaultPOAddress, setShowDefaultPOAddress] = useState(false);
    const [showPhoneReminders, setShowPhoneReminders] = useState(false);
    const [showSubmittals, setShowSubmittals] = useState(false);
    const [isNumberingOpen, setIsNumberingOpen] = useState(false);
    const [isLogoOpen, setIsLogoOpen] = useState(false);

    const [successMessage, setSuccessMessage] = useState(null); // ✅ message state
    const [messageType, setMessageType] = useState("success");


    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.user);

    const handleAddUser = () => {
        dispatch(addUser(editUser))
            .unwrap()
            .then((res) => {
                setSuccessMessage("User Added Successfully!");
                setMessageType("success");
                setTimeout(() => {
                    setShowAddModal(false);
                }, 1000);
            })
            .catch((err) => {
                alert("Failed to add user: " + err);
            });
    };


    return (
        <div className="admin-company-form container py-4">
            <h3 className="mb-4">Admin</h3>
            <ul className="nav nav-tabs mb-4 admin-company-nav" role="tablist">
                <li className="nav-item">
                    <a
                        className="nav-link active"
                        data-bs-toggle="tab"
                        href="#company"
                        role="tab"
                    >
                        Company
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#structure"
                        role="tab"
                    >
                        Structure
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#users"
                        role="tab"
                    >
                        Users
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#rates"
                        role="tab"
                    >
                        Rates & Resources
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#customize"
                        role="tab"
                    >
                        Customize
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#documents"
                        role="tab"
                    >
                        Documents
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#quickbooks"
                        role="tab"
                    >
                        QuickBooks
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#subscription"
                        role="tab"
                    >
                        Subscription
                    </a>
                </li>
            </ul>

            <div className="tab-content mb-4">
                <div className="tab-pane fade show active" id="company" role="tabpanel">
                    <div className="row">
                        <div className="col-lg-6">
                            <h5>Company Information</h5>
                            <div className="mb-3">
                                <label className="form-label">Company Name</label>
                                <input type="text" className="form-control" value="Bon-Bon" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address Lookup</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Start typing to view suggestions"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value="7655 Lankershim Boulevard"
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">City</label>
                                    <input type="text" className="form-control" value="Los Angeles" />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Zip Code</label>
                                    <input type="text" className="form-control" value="91605" />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">State</label>
                                    <select className="form-select">
                                        <option selected>CA</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Country</label>
                                    <select className="form-select">
                                        <option selected>United States</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Timezone</label>
                                    <select className="form-select">
                                        <option selected>Los Angeles</option>
                                    </select>
                                </div>
                            </div>

                            <h5 className="mt-4">
                                Hours of Operation <i className="bi bi-info-circle"></i>
                            </h5>
                            <div className="mb-3">
                                <select className="form-select mb-2">
                                    <option>Monday</option>
                                </select>
                                <div className="d-flex gap-2">
                                    <input type="time" className="form-control" value="09:00" />
                                    <span className="align-self-center">-</span>
                                    <input type="time" className="form-control" value="17:00" />
                                </div>
                                <button className="btn btn-secondary btn-sm mt-2">
                                    Set Hours & Go To Next Day
                                </button>
                            </div>

                            <h5 className="mt-4">Additional Information</h5>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Tax Id</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">License Number</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Phone Number</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Website</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>

                            <button className="btn btn-primary">Save Changes</button>
                        </div>

                        <div className="col-lg-6 mt-4 mt-lg-0">
                            <div className="admin-company-map mb-4">
                                <iframe
                                    title="map"
                                    src="https://maps.google.com/maps?q=7655%20Lankershim%20Boulevard&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                    style={{ width: "100%", height: "250px", border: "0" }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>

                            <div className="admin-company-hours-list">
                                <ul className="list-group">
                                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                                        (day, idx) => (
                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center"
                                                key={idx}
                                            >
                                                {day}
                                                <span className="badge bg-light text-dark">
                                                    {["Sunday", "Saturday"].includes(day)
                                                        ? "Closed"
                                                        : "6:21 PM - 4:21 AM"}
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tab-pane fade" id="structure" role="tabpanel">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">
                                    What term best describes how your business is structured?
                                </label>
                                <div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="departments"
                                            name="structureType"
                                            value="Departments"
                                            checked={structureType === "Departments"}
                                            onChange={() => setStructureType("Departments")}
                                        />
                                        <label htmlFor="departments" className="ms-2">
                                            Departments
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="teams"
                                            name="structureType"
                                            value="Teams"
                                            checked={structureType === "Teams"}
                                            onChange={() => setStructureType("Teams")}
                                        />
                                        <label htmlFor="teams" className="ms-2">Teams</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="groups"
                                            name="structureType"
                                            value="Groups"
                                            checked={structureType === "Groups"}
                                            onChange={() => setStructureType("Groups")}
                                        />
                                        <label htmlFor="groups" className="ms-2">Groups</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div>
                                <div className="fw-bold mb-2">Current {structureType}</div>
                                <hr className="my-1" />
                                <ol className="ps-3">
                                    {departments.map((dept, idx) => (
                                        <li key={idx} className="d-flex align-items-center mb-1">
                                            <span className="flex-grow-1">{dept}</span>
                                            <button
                                                type="button"
                                                className="btn btn-link btn-sm text-danger p-0 ms-2"
                                                onClick={() => handleRemoveDept(idx)}
                                                tabIndex={-1}
                                                aria-label="Remove"
                                                style={{ textDecoration: "none" }}
                                            >
                                                &#10005;
                                            </button>
                                        </li>
                                    ))}
                                </ol>
                                <div className="d-flex mb-2">
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder={`Enter name here`}
                                        value={newDept}
                                        onChange={(e) => setNewDept(e.target.value)}
                                    />
                                </div>
                                <button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                    onClick={handleAddDept}
                                >
                                    Add {structureType.toLowerCase()}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tab-pane fade" id="users" role="tabpanel">
                    {/* Controls Row */}
                    <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                        <input
                            className="form-control"
                            style={{ maxWidth: 200 }}
                            placeholder="Search"
                        />

                        <button className="btn btn-primary" onClick={openAddModal}>
                            + Add User
                        </button>

                        <div className="form-check ms-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="showInactive"
                            />
                            <label className="form-check-label" htmlFor="showInactive">
                                Show Inactive
                            </label>
                        </div>

                        <div className="ms-auto mt-2 mt-sm-0">
                            <span style={{ fontSize: 12 }}>Regular (6), No access (7)</span>
                        </div>
                    </div>

                    {/* Responsive Table Wrapper */}
                    <div className="table-responsive">
                        <table className="table table-borderless align-middle">
                            <tbody>
                                {users.map((user, idx) => (
                                    <tr key={user.id}>
                                        <td>
                                            <span
                                                style={{
                                                    color: user.onboarding ? "#2eafec" : "#222",
                                                }}
                                            >
                                                <i className="bi bi-person-fill me-1" />
                                                {user.name}
                                            </span>
                                        </td>
                                        <td>{user.role}</td>
                                        <td>
                                            {user.onboarding && (
                                                <span
                                                    className="badge bg-light text-dark"
                                                    style={{ cursor: "pointer", fontSize: 11 }}
                                                    onClick={() => openOnboardingModal(user)}
                                                >
                                                    <i className="bi bi-info-circle me-1" />
                                                    INCOMPLETE MOBILE ONBOARDING
                                                </span>
                                            )}
                                        </td>
                                        <td className="text-end">
                                            <button
                                                className="btn btn-link btn-sm"
                                                title="Edit"
                                                onClick={() => openEditModal(user)}
                                            >
                                                <i className="bi bi-pencil-square" />
                                            </button>
                                            <button
                                                className="btn btn-link btn-sm"
                                                title="Message"
                                                disabled
                                            >
                                                <i className="bi bi-envelope" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="tab-pane fade" id="rates" role="tabpanel">
                    {/* Resource Cost Section */}
                    <div>
                        <div
                            style={{ cursor: "pointer", fontWeight: 500 }}
                            onClick={() => setShowResourceCost((v) => !v)}
                        >
                            <span>
                                {showResourceCost ? "▼" : "▶"} Resource Cost
                            </span>
                        </div>
                        {showResourceCost && (
                            <div className="mt-2 mb-4">
                                <div className="mb-2">
                                    Set the cost of your resources below so that Knowify can estimate project costs and performance.
                                </div>
                                <div className="d-flex justify-content-end mb-2">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="showInactiveRes" />
                                        <label className="form-check-label" htmlFor="showInactiveRes">Show Inactive</label>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-sm align-middle">
                                        <thead>
                                            <tr>
                                                <th>Resource</th>
                                                <th>Pay</th>
                                                <th>Benefits</th>
                                                <th>Taxes</th>
                                                <th>Insurance</th>
                                                <th>Union (hr)</th>
                                                <th>Other</th>
                                                <th>Cost per Hour</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {resourceCost.map((res, idx) => (
                                                <tr key={idx}>
                                                    <td>
                                                        {res.name} <span className="text-muted" style={{ fontSize: 12 }}>[{res.role}]</span>
                                                    </td>
                                                    <td>
                                                        <div className="input-group input-group-sm">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={res.pay}
                                                                style={{ maxWidth: 70 }}
                                                                readOnly
                                                            />
                                                            <select className="form-select" style={{ maxWidth: 90 }} value={res.payType} readOnly>
                                                                <option>per hour</option>
                                                                <option>per year</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control form-control-sm" value={res.benefits} readOnly style={{ maxWidth: 70 }} />
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control form-control-sm" value={res.taxes} readOnly style={{ maxWidth: 70 }} />
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control form-control-sm" value={res.insurance} readOnly style={{ maxWidth: 70 }} />
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control form-control-sm" value={res.union} readOnly style={{ maxWidth: 70 }} />
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control form-control-sm" value={res.other} readOnly style={{ maxWidth: 70 }} />
                                                    </td>
                                                    <td>
                                                        <span style={{ color: res.costPerHour === 0 ? "red" : "inherit" }}>
                                                            ${res.costPerHour.toFixed(2)}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-2">
                                    <a href="#" style={{ fontSize: 13 }}>Switch to simple rates</a>
                                </div>
                                <div className="mt-3">
                                    <div className="mb-2 fw-bold">Overtime Rules</div>
                                    <div className="row g-2 align-items-center">
                                        <div className="col-auto">
                                            <label>Overtime is earned:</label>
                                        </div>
                                        <div className="col-auto">
                                            <select className="form-select form-select-sm">
                                                <option>Never</option>
                                                <option>After 8 hours/day</option>
                                                <option>After 40 hours/week</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary btn-sm mt-3">Save Changes</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Roles and Applicable Rates Section */}
                    <div className="mt-4">
                        <div
                            style={{ cursor: "pointer", fontWeight: 500 }}
                            onClick={() => setShowRoles((v) => !v)}
                        >
                            <span>
                                {showRoles ? "▼" : "▶"} Roles and Applicable Rates
                            </span>
                        </div>
                        {showRoles && (
                            <div className="mt-2">
                                <div className="mb-2">
                                    Set the billable rates for your roles below so that Knowify can use them as default rates for invoicing purposes.
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-sm align-middle">
                                        <thead>
                                            <tr>
                                                <th>Role</th>
                                                <th>Billing Rate</th>
                                                <th>Budget Rate</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {roles.map((role, idx) => (
                                                <tr key={idx}>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            value={role.role}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td>
                                                        <div className="input-group input-group-sm">
                                                            <span className="input-group-text">$</span>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                value={role.billingRate}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input-group input-group-sm">
                                                            <span className="input-group-text">$</span>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                value={role.budgetRate}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-link btn-sm text-danger" tabIndex={-1} disabled>
                                                            &#10005;
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <a
                                    href="#"
                                    style={{ fontSize: 13 }}
                                    onClick={e => {
                                        e.preventDefault();
                                        setShowRoleModal(true);
                                    }}
                                >
                                    + Add new role
                                </a>
                                <br />
                                <button className="btn btn-primary btn-sm mt-2">Save Changes</button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="tab-pane fade" id="customize" role="tabpanel">
                    {/* Customize tab content here */}
                    <div className="container py-3">
                        {/* Sub-tabs */}
                        <div className="mb-3">
                            <button className={`btn btn-light me-1${customizeTab === "features" ? " active" : ""}`} onClick={() => setCustomizeTab("features")}>Features</button>
                            <button className={`btn btn-light me-1${customizeTab === "quickbooks" ? " active" : ""}`} onClick={() => setCustomizeTab("quickbooks")}>QuickBooks</button>
                            <button className={`btn btn-light me-1${customizeTab === "taxrates" ? " active" : ""}`} onClick={() => setCustomizeTab("taxrates")}>Tax Rates</button>
                            <button className={`btn btn-light me-1${customizeTab === "defaults" ? " active" : ""}`} onClick={() => setCustomizeTab("defaults")}>Defaults</button>
                            <button className={`btn btn-light me-1${customizeTab === "integrations" ? " active" : ""}`} onClick={() => setCustomizeTab("integrations")}>Integrations</button>
                            <button className={`btn btn-light${customizeTab === "tags" ? " active" : ""}`} onClick={() => setCustomizeTab("tags")}>Tags</button>
                        </div>
                        {/* Sub-tab content */}
                        <div>
                            {customizeTab === "features" && (
                                <>
                                    <div>
                                        Every business is different, that is why you can adjust Knowify to fit your particular needs. Contact us at support@knowify.com if you would like us to help you. Our setup is complimentary!
                                    </div>

                                    <div className="mt-2">

                                        <div>
                                            <div
                                                onClick={() => setIsLogoOpen((v) => !v)}
                                                style={{ cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center" }}
                                            >
                                                {isLogoOpen ? (
                                                    <FaChevronDown style={{ marginRight: 4 }} />
                                                ) : (
                                                    <FaChevronRight style={{ marginRight: 4 }} />
                                                )}
                                                Company Logo
                                            </div>

                                            {isLogoOpen && (
                                                <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px", backgroundColor: "#f9f9f9" }}>
                                                    <p>
                                                        Upload the logo of your company here. We will include it in your
                                                        personalized proposals, invoices, and purchase orders.
                                                    </p>

                                                    <div style={{ display: "flex", gap: "20px", alignItems: "center", border: "1px solid #ddd", padding: "15px", backgroundColor: "#f3f3f3" }}>
                                                        <img src="your-logo.png" alt="Existing Logo" style={{ maxHeight: "80px", maxWidth: "150px" }} />
                                                        <div style={{ border: "2px dashed #ccc", padding: "40px", textAlign: "center", width: "300px" }}>
                                                            <p>Drop logo here</p>
                                                            <p>or</p>
                                                            <a href="#">Select file</a>
                                                        </div>
                                                    </div>

                                                    <div style={{ marginTop: "10px", color: "#0066cc", cursor: "pointer" }}>
                                                        Remove existing logo
                                                    </div>
                                                    <div style={{ fontSize: "12px", color: "#555", marginTop: "5px" }}>
                                                        ⚠️ Both height and width of logo must be lower than 5000px
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div
                                                onClick={() => setShowCustomTemplates((v) => !v)}
                                                style={{ cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center" }}
                                                className="mb-2"
                                            >
                                                {showCustomTemplates ? (
                                                    <FaChevronDown style={{ marginRight: 4 }} />
                                                ) : (
                                                    <FaChevronRight style={{ marginRight: 4 }} />
                                                )}
                                                Custom Templates
                                            </div>
                                            {showCustomTemplates && (
                                                <div className="ps-3 pb-2">
                                                    <div>
                                                        Interested in our custom templates? Contact <a href="mailto:support@knowify.com">support@knowify.com</a> for more info.<br />
                                                        We can create custom templates for bids, estimates, invoices and purchase orders.
                                                    </div>
                                                    <div className="mt-2">
                                                        <a
                                                            href="https://www.knowify.com/custom-templates/"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{ color: "#2eafec", textDecoration: "underline", fontSize: 15, display: "flex", alignItems: "center" }}
                                                        >
                                                            <i className="bi bi-camera-video-fill me-1" style={{ fontSize: 18 }} />
                                                            Learn more about our custom templates
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div
                                                className="dropdown-header"
                                                onClick={() => setIsNumberingOpen((v) => !v)}
                                                style={{ display: "flex", alignItems: "center", cursor: "pointer", fontWeight: "bold" }}
                                            >
                                                {isNumberingOpen ? (
                                                    <FaChevronDown style={{ marginRight: 4 }} />
                                                ) : (
                                                    <FaChevronRight style={{ marginRight: 4 }} />
                                                )}
                                                Numbering
                                            </div>

                                            {isNumberingOpen && (
                                                <div className="dropdown-container">
                                                    <div className="form-group">
                                                        <label>
                                                            Last purchase order number{" "}
                                                            <span title="Used as the starting number for new purchase orders">❔</span>
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={purchaseOrder}
                                                            onChange={(e) => setPurchaseOrder(e.target.value)}
                                                            className="form-control"
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Last invoice number</label>
                                                        <input
                                                            type="number"
                                                            value={invoiceNumber}
                                                            onChange={(e) => setInvoiceNumber(e.target.value)}
                                                            className="form-control"
                                                        />
                                                    </div>

                                                    <button className="save-btn">Save Changes</button>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div
                                                onClick={() => setShowHideJobs((v) => !v)}
                                                style={{ cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center" }}
                                                className="mb-2"
                                            >
                                                {showHideJobs ? (
                                                    <FaChevronDown style={{ marginRight: 4 }} />
                                                ) : (
                                                    <FaChevronRight style={{ marginRight: 4 }} />
                                                )}
                                                Hide/Display Jobs
                                            </div>
                                            {showHideJobs && (
                                                <div className="ps-3 pb-2">
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="hideClosedJobs"
                                                            checked={hideClosedJobs}
                                                            onChange={() => setHideClosedJobs((v) => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="hideClosedJobs">
                                                            Hide closed jobs for job costing purposes.
                                                        </label>
                                                    </div>
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="hideClosedPhases"
                                                            checked={hideClosedPhases}
                                                            onChange={() => setHideClosedPhases((v) => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="hideClosedPhases">
                                                            Hide closed phases for job costing purposes.
                                                        </label>
                                                    </div>
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="hideBiddingJobs"
                                                            checked={hideBiddingJobs}
                                                            onChange={() => setHideBiddingJobs((v) => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="hideBiddingJobs">
                                                            Hide bidding jobs in the smartphone app.
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div
                                                onClick={() => setShowTimeTracking((v) => !v)}
                                                style={{ cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center" }}
                                                className="mb-2"
                                            >
                                                {showTimeTracking ? (
                                                    <FaChevronDown style={{ marginRight: 4 }} />
                                                ) : (
                                                    <FaChevronRight style={{ marginRight: 4 }} />
                                                )}
                                                Time Tracking
                                            </div>
                                            {showTimeTracking && (
                                                <div className="ps-3 pb-2">
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="preventMobileEdit"
                                                            checked={preventMobileEdit}
                                                            onChange={() => setPreventMobileEdit((v) => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="preventMobileEdit">
                                                            Prevent mobile users from manually adding or editing time
                                                        </label>
                                                    </div>
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="enableOvertime"
                                                            checked={enableOvertime}
                                                            onChange={() => setEnableOvertime((v) => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="enableOvertime">
                                                            Enable overtime tracking
                                                        </label>
                                                    </div>
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="showDirectReports"
                                                            checked={showDirectReports}
                                                            onChange={() => setShowDirectReports((v) => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="showDirectReports">
                                                            Show only direct reports by default when reviewing time
                                                        </label>
                                                    </div>
                                                    <div className="mb-2">
                                                        <label htmlFor="firstDayOfWeek" className="form-label">
                                                            First day of the week in timecards / payroll
                                                        </label>
                                                        <select
                                                            id="firstDayOfWeek"
                                                            className="form-select"
                                                            style={{ maxWidth: 200 }}
                                                            value={firstDayOfWeek}
                                                            onChange={e => setFirstDayOfWeek(e.target.value)}
                                                        >
                                                            <option>Sunday</option>
                                                            <option>Monday</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="form-label">
                                                            Fence size for check in/out purposes: {fenceSize} miles
                                                        </label>
                                                        <input
                                                            type="range"
                                                            min={0.05}
                                                            max={1}
                                                            step={0.01}
                                                            value={fenceSize}
                                                            onChange={e => setFenceSize(Number(e.target.value))}
                                                            style={{ width: 250, display: "block" }}
                                                        />
                                                        <div className="d-flex justify-content-between" style={{ fontSize: 12, color: "#888" }}>
                                                            <span>0.05 mi</span>
                                                            <span>1.00 mi</span>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <iframe
                                                            title="Fence Map"
                                                            src="https://maps.google.com/maps?q=34.2083,-118.3962&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                                            style={{ width: "100%", height: "150px", border: "0" }}
                                                            allowFullScreen=""
                                                            loading="lazy"
                                                        ></iframe>
                                                    </div>
                                                    <button className="btn btn-success">Save Changes</button>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div
                                                onClick={() => setShowCostManagement((v) => !v)}
                                                style={{ cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center" }}
                                                className="mb-2"
                                            >
                                                {showCostManagement ? (
                                                    <FaChevronDown style={{ marginRight: 4 }} />
                                                ) : (
                                                    <FaChevronRight style={{ marginRight: 4 }} />
                                                )}
                                                Cost Management
                                            </div>
                                            {showCostManagement && (
                                                <div className="ps-3 pb-2">
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="useActualCosts"
                                                            checked={useActualCosts}
                                                            onChange={() => setUseActualCosts((v) => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="useActualCosts">
                                                            Use actual costs instead of committed costs when calculating job performance.
                                                        </label>
                                                    </div>
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="enableFlexiblePOs"
                                                            checked={enableFlexiblePOs}
                                                            onChange={() => setEnableFlexiblePOs((v) => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="enableFlexiblePOs">
                                                            Enable ability to create flexible POs with multiple items. These POs do not specify the quantity of ordered items, just the total cost, and they remain open until you decide to close them manually.
                                                        </label>
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="form-label" htmlFor="jobCostingStyle">
                                                            Default job costing style
                                                        </label>
                                                        <select
                                                            className="form-select"
                                                            id="jobCostingStyle"
                                                            value={jobCostingStyle}
                                                            onChange={e => setJobCostingStyle(e.target.value)}
                                                        >
                                                            <option>Simple: Bid first, then track labor and materials at the job level</option>
                                                            <option>Advanced: Bid first, then track labor and materials against each of the bid line items</option>
                                                            <option>Professional: Budget and plan in Knowify, then track labor and materials against budget line items</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div
                                                onClick={() => setShowProjectManagement((v) => !v)}
                                                style={{ cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center" }}
                                                className="mb-2"
                                            >
                                                {showProjectManagement ? (
                                                    <FaChevronDown style={{ marginRight: 4 }} />
                                                ) : (
                                                    <FaChevronRight style={{ marginRight: 4 }} />
                                                )}
                                                Project Management
                                            </div>
                                            {showProjectManagement && (
                                                <div className="ps-3 pb-2">
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="enableWip"
                                                            checked={enableWip}
                                                            onChange={() => setEnableWip((v) => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="enableWip">
                                                            Enable Work-In-Progress in jobs with budget
                                                        </label>
                                                    </div>
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="factorWip"
                                                            checked={factorWip}
                                                            onChange={() => setFactorWip((v) => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="factorWip">
                                                            Factor Work-In-Progress in profit calculations
                                                        </label>
                                                    </div>
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="displayItemsOrder"
                                                            checked={displayItemsOrder}
                                                            onChange={() => setDisplayItemsOrder((v) => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="displayItemsOrder">
                                                            Display items in plan &amp; track view in the same order as they are entered
                                                        </label>
                                                    </div>
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="enablePhaseProgress"
                                                            checked={enablePhaseProgress}
                                                            onChange={() => setEnablePhaseProgress((v) => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="enablePhaseProgress">
                                                            Enable progress at phase level
                                                        </label>
                                                    </div>
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="hideClosedJobsWorkflow"
                                                            checked={hideClosedJobsWorkflow}
                                                            onChange={() => setHideClosedJobsWorkflow((v) => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="hideClosedJobsWorkflow">
                                                            Hide closed jobs in workflow board
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div
                                                onClick={() => setShowScheduling((v) => !v)}
                                                style={{ cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center" }}
                                                className="mb-2"
                                            >
                                                {showScheduling ? (
                                                    <FaChevronDown style={{ marginRight: 4 }} />
                                                ) : (
                                                    <FaChevronRight style={{ marginRight: 4 }} />
                                                )}
                                                Scheduling
                                            </div>
                                            {showScheduling && (
                                                <div className="ps-3 pb-2">
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="enableResourceBoard"
                                                            checked={enableResourceBoard}
                                                            onChange={() => setEnableResourceBoard((v) => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="enableResourceBoard">
                                                            Enable access to resource board
                                                        </label>
                                                    </div>
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="enableJobBoard"
                                                            checked={enableJobBoard}
                                                            onChange={() => setEnableJobBoard((v) => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="enableJobBoard">
                                                            Enable access to Job board
                                                        </label>
                                                    </div>
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="extendJobPhaseDates"
                                                            checked={extendJobPhaseDates}
                                                            onChange={() => setExtendJobPhaseDates((v) => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="extendJobPhaseDates">
                                                            Extend job phase dates when a resource is scheduled for that phase outside the current data range
                                                        </label>
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="form-label" htmlFor="schedulingFirstDay">
                                                            First day of the week in scheduling tools
                                                        </label>
                                                        <select
                                                            className="form-select"
                                                            id="schedulingFirstDay"
                                                            value={schedulingFirstDay}
                                                            onChange={e => setSchedulingFirstDay(e.target.value)}
                                                            style={{ maxWidth: 150 }}
                                                        >
                                                            <option value="">Select...</option>
                                                            <option value="Sunday">Sunday</option>
                                                            <option value="Monday">Monday</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div
                                                onClick={() => setShowProposalMgmt((v) => !v)}
                                                style={{ cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center" }}
                                                className="mb-2"
                                            >
                                                {showProposalMgmt ? (
                                                    <FaChevronDown style={{ marginRight: 4 }} />
                                                ) : (
                                                    <FaChevronRight style={{ marginRight: 4 }} />
                                                )}
                                                Proposal Management &amp; Deposits
                                            </div>
                                            {showProposalMgmt && (
                                                <div className="ps-3 pb-2" style={{ maxWidth: 400 }}>
                                                    <div className="mb-2">
                                                        <label className="form-label">
                                                            How many days are proposals valid for by default
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={proposalValidDays}
                                                            onChange={e => setProposalValidDays(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="form-label">
                                                            Custom link for e-signature emails (ex: View Proposal)
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={proposalEsignLink}
                                                            onChange={e => setProposalEsignLink(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="form-label">
                                                            Default for breakdown / bill of materials
                                                        </label>
                                                        <select
                                                            className="form-select"
                                                            value={breakdownDefault}
                                                            onChange={e => setBreakdownDefault(e.target.value)}
                                                        >
                                                            <option>Show line item breakdown / bill of materials to customer</option>
                                                            <option>Hide line item breakdown / bill of materials from customer</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="form-label">
                                                            Default for output style
                                                        </label>
                                                        <select
                                                            className="form-select"
                                                            value={outputStyle}
                                                            onChange={e => setOutputStyle(e.target.value)}
                                                        >
                                                            <option>Display line item subtotals</option>
                                                            <option>Display only grand total</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="form-label">
                                                            Default for invoicing style
                                                        </label>
                                                        <select
                                                            className="form-select"
                                                            value={invoicingStyle}
                                                            onChange={e => setInvoicingStyle(e.target.value)}
                                                        >
                                                            <option>Use a regular invoice - display line items to be invoiced only</option>
                                                            <option>Use a summary invoice - display only totals</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="showJobDescBox"
                                                            checked={showJobDescBox}
                                                            onChange={() => setShowJobDescBox(v => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="showJobDescBox">
                                                            Display job description box in fixed price jobs.
                                                        </label>
                                                    </div>
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="enableDeposits"
                                                            checked={enableDeposits}
                                                            onChange={() => setEnableDeposits(v => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="enableDeposits">
                                                            Enable deposits in contract jobs.
                                                        </label>
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="form-label">
                                                            Default invoice date for deposits
                                                        </label>
                                                        <select
                                                            className="form-select"
                                                            value={depositInvoiceDate}
                                                            onChange={e => setDepositInvoiceDate(e.target.value)}
                                                        >
                                                            <option>Project start date</option>
                                                            <option>Contract signed date</option>
                                                            <option>Proposal accepted date</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">
                                                            Default payment terms for deposits
                                                        </label>
                                                        <select
                                                            className="form-select"
                                                            value={depositPaymentTerms}
                                                            onChange={e => setDepositPaymentTerms(e.target.value)}
                                                        >
                                                            <option value="">Select...</option>
                                                            <option>Due on receipt</option>
                                                            <option>Net 7</option>
                                                            <option>Net 15</option>
                                                            <option>Net 30</option>
                                                        </select>
                                                    </div>
                                                    <button className="btn btn-success">Save Changes</button>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div
                                                onClick={() => setShowAiaInvoicing(v => !v)}
                                                style={{ cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center" }}
                                                className="mb-2"
                                            >
                                                {showAiaInvoicing ? (
                                                    <FaChevronDown style={{ marginRight: 4 }} />
                                                ) : (
                                                    <FaChevronRight style={{ marginRight: 4 }} />
                                                )}
                                                AIA-style Invoicing (pay apps)
                                            </div>
                                            {showAiaInvoicing && (
                                                <div className="ps-3 pb-2" style={{ maxWidth: 500 }}>
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="enableAiaInvoicing"
                                                            checked={enableAiaInvoicing}
                                                            onChange={() => setEnableAiaInvoicing(v => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="enableAiaInvoicing">
                                                            Enable AIA-style Invoicing.
                                                        </label>
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="form-label" htmlFor="aiaDefaultStyle">
                                                            Default Invoicing style
                                                        </label>
                                                        <select
                                                            className="form-select"
                                                            id="aiaDefaultStyle"
                                                            value={aiaDefaultStyle}
                                                            onChange={e => setAiaDefaultStyle(e.target.value)}
                                                        >
                                                            <option>Enter completed work (in $) to be Invoiced in the pay app (no stored materials)</option>
                                                            <option>Enter completed work and stored materials (in $) to be Invoiced in the pay app</option>
                                                            <option>Enter percent complete for each line item to be Invoiced in the pay app</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div
                                                onClick={() => setShowCostPlus(v => !v)}
                                                style={{ cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center" }}
                                                className="mb-2"
                                            >
                                                {showCostPlus ? (
                                                    <FaChevronDown style={{ marginRight: 4 }} />
                                                ) : (
                                                    <FaChevronRight style={{ marginRight: 4 }} />
                                                )}
                                                Cost Plus with Schedule of Values Invoicing
                                            </div>
                                            {showCostPlus && (
                                                <div className="ps-3 pb-2" style={{ maxWidth: 600 }}>
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="enableCostPlus"
                                                            checked={enableCostPlus}
                                                            onChange={() => setEnableCostPlus(v => !v)}
                                                        />
                                                        <label className="form-check-label" htmlFor="enableCostPlus">
                                                            Enable Cost Plus contracts with Invoicing based on a schedules of values plus a pre-defined markup.
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div
                                                onClick={() => setShowPartsInventory(v => !v)}
                                                style={{ cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center" }}
                                                className="mb-2"
                                            >
                                                {showPartsInventory ? (
                                                    <FaChevronDown style={{ marginRight: 4 }} />
                                                ) : (
                                                    <FaChevronRight style={{ marginRight: 4 }} />
                                                )}
                                                Parts Inventory
                                                <span className="badge bg-primary ms-1" style={{ fontSize: 10, marginLeft: 8 }}>UNLIMITED</span>
                                            </div>
                                            {showPartsInventory && (
                                                <div className="ps-3 pb-2" style={{ maxWidth: 700 }}>
                                                    <div className="mb-2" style={{ fontSize: 14 }}>
                                                        <span className="badge bg-success me-2" style={{ fontSize: 10, verticalAlign: "middle" }}>UNLIMITED</span>
                                                        Track locations/trucks, parts and inventory quantities
                                                    </div>
                                                    <div className="mb-2">
                                                        <a
                                                            href="#"
                                                            style={{ color: "#2eafec", textDecoration: "underline", fontSize: 15 }}
                                                        >
                                                            Click here to request a call from a product expert to review the Unlimited plan.
                                                        </a>
                                                    </div>
                                                    <div className="mb-2" style={{ fontSize: 13, color: "#222" }}>
                                                        <em>
                                                            Learn more about parts inventory management{" "}
                                                            <a href="#" style={{ color: "#2eafec", textDecoration: "underline" }}>here</a>.
                                                        </em>
                                                    </div>
                                                    <div style={{ fontSize: 12, color: "#444" }}>
                                                        <em>
                                                            *Upgrading your plan will increase the price of your subscription. Click{" "}
                                                            <a href="#" style={{ color: "#2eafec", textDecoration: "underline" }}>
                                                                here
                                                            </a>{" "}
                                                            to view the advantages of each plan and their prices.
                                                        </em>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div
                                                onClick={() => setShowDefaultPaymentTerms(v => !v)}
                                                style={{ cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center" }}
                                                className="mb-2"
                                            >
                                                {showDefaultPaymentTerms ? (
                                                    <FaChevronDown style={{ marginRight: 4 }} />
                                                ) : (
                                                    <FaChevronRight style={{ marginRight: 4 }} />
                                                )}
                                                Default Payment Terms
                                            </div>
                                            {showDefaultPaymentTerms && (
                                                <div className="ps-3 pb-2" style={{ maxWidth: 300 }}>
                                                    <select className="form-select">
                                                        <option>NET 15</option>
                                                        <option>NET 30</option>
                                                        <option>NET 45</option>
                                                        <option>NET 60</option>
                                                    </select>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div
                                                onClick={() => setShowDefaultPOAddress(v => !v)}
                                                style={{ cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center" }}
                                                className="mb-2"
                                            >
                                                {showDefaultPOAddress ? (
                                                    <FaChevronDown style={{ marginRight: 4 }} />
                                                ) : (
                                                    <FaChevronRight style={{ marginRight: 4 }} />
                                                )}
                                                Default Address for POs
                                            </div>
                                            {showDefaultPOAddress && (
                                                <div className="ps-3 pb-2" style={{ maxWidth: 350 }}>
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="useJobsiteAddress"
                                                        />
                                                        <label className="form-check-label" htmlFor="useJobsiteAddress">
                                                            Use Jobsite address as default for purchase orders.
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div
                                                onClick={() => setShowPhoneReminders(v => !v)}
                                                style={{ cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center" }}
                                                className="mb-2"
                                            >
                                                {showPhoneReminders ? (
                                                    <FaChevronDown style={{ marginRight: 4 }} />
                                                ) : (
                                                    <FaChevronRight style={{ marginRight: 4 }} />
                                                )}
                                                Phone Reminders
                                            </div>
                                            {showPhoneReminders && (
                                                <div className="ps-3 pb-2" style={{ maxWidth: 350 }}>
                                                    <div className="form-check mb-2">
                                                        <input className="form-check-input" type="checkbox" id="remindCheckIn" />
                                                        <label className="form-check-label" htmlFor="remindCheckIn">
                                                            Check In
                                                        </label>
                                                    </div>
                                                    <div className="form-check mb-2">
                                                        <input className="form-check-input" type="checkbox" id="remindCheckOut" defaultChecked />
                                                        <label className="form-check-label" htmlFor="remindCheckOut">
                                                            Check Out
                                                        </label>
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="form-label">Type</label>
                                                        <select className="form-select">
                                                            <option>At Scheduled Time</option>
                                                            <option>Before Scheduled Time</option>
                                                            <option>After Scheduled Time</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="form-label">At</label>
                                                        <input className="form-control" type="text" value="8:00 PM" readOnly />
                                                    </div>
                                                    <button className="btn btn-success">Save Changes</button>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div
                                                onClick={() => setShowSubmittals(v => !v)}
                                                style={{ cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center" }}
                                                className="mb-2"
                                            >
                                                {showSubmittals ? (
                                                    <FaChevronDown style={{ marginRight: 4 }} />
                                                ) : (
                                                    <FaChevronRight style={{ marginRight: 4 }} />
                                                )}
                                                Submittals
                                                <span className="badge bg-primary ms-1" style={{ fontSize: 10, marginLeft: 8 }}>UNLIMITED</span>
                                            </div>
                                            {showSubmittals && (
                                                <div className="ps-3 pb-2" style={{ maxWidth: 700 }}>
                                                    <div className="mb-2" style={{ fontSize: 14 }}>
                                                        <span className="badge bg-success me-2" style={{ fontSize: 10, verticalAlign: "middle" }}>UNLIMITED</span>
                                                        Request submittals from subs
                                                    </div>
                                                    <div className="mb-2">
                                                        <a
                                                            href="#"
                                                            style={{ color: "#2eafec", textDecoration: "underline", fontSize: 15 }}
                                                        >
                                                            Click here to request a call from a product expert to review the Unlimited plan.
                                                        </a>
                                                    </div>
                                                    <div className="mb-2" style={{ fontSize: 13, color: "#222" }}>
                                                        <em>
                                                            You can learn more about our submittals feature{" "}
                                                            <a href="#" style={{ color: "#2eafec", textDecoration: "underline" }}>here</a>.
                                                        </em>
                                                    </div>
                                                    <div style={{ fontSize: 12, color: "#444" }}>
                                                        <em>
                                                            *Upgrading your plan will increase the price of your subscription. Click{" "}
                                                            <a href="#" style={{ color: "#2eafec", textDecoration: "underline" }}>
                                                                here
                                                            </a>{" "}
                                                            to view the advantages of each plan and their prices.
                                                        </em>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                            {customizeTab === "quickbooks" && (
                                <div>
                                    Every business is different, that is why you can adjust Knowify to fit your particular needs. Contact us at support@knowify.com if you would like us to help you. Our setup is complimentary!
                                </div>
                            )}
                            {customizeTab === "taxrates" && (
                                <>
                                    <div>
                                        Every business is different, that is why you can adjust Knowify to fit your particular needs. Contact us at support@knowify.com if you would like us to help you. Our setup is complimentary!
                                    </div>
                                    <div className="mt-2">
                                        <table className="table table-bordered" style={{ maxWidth: 400 }}>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Rate</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rates.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <input
                                                                className="form-control form-control-sm"
                                                                value={item.name}
                                                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                className="form-control form-control-sm"
                                                                value={item.rate}
                                                                onChange={(e) => handleChange(index, 'rate', e.target.value)}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <a href="#" onClick={e => { e.preventDefault(); handleAddRate(); }} style={{ fontSize: 13 }}>
                                            + add a rate
                                        </a>

                                        <div className="form-check mt-3">
                                            <input className="form-check-input" type="checkbox" id="defaultTaxes" />
                                            <label className="form-check-label" htmlFor="defaultTaxes">
                                                Set line items in proposals taxable by default.
                                            </label>
                                        </div>
                                    </div>
                                </>
                            )}
                            {customizeTab === "defaults" && (
                                <>
                                    <div>
                                        Every business is different, that is why you can adjust Knowify to fit your particular needs...
                                    </div>

                                    {[
                                        { key: "invoice", label: "Invoice Email" },
                                        { key: "esignature", label: "eSignature Email" },
                                        { key: "po", label: "PO Email" },
                                        { key: "service", label: "Service Tickets Email" },
                                        { key: "terms", label: "Terms & Exclusions Language" },
                                    ].map(({ key, label }) => (
                                        <div className="mb-4" key={key}>
                                            <div
                                                className="d-flex align-items-center mb-2"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => toggleDropdown(key)}
                                            >
                                                {openDropdown === key ? (
                                                    <FaChevronUp className="me-2 text-dark" />
                                                ) : (
                                                    <FaChevronDown className="me-2 text-dark" />
                                                )}
                                                <span className="fw-bold text-dark">{label}</span>
                                            </div>

                                            {openDropdown === key && (
                                                <div className="ps-4 row">
                                                    {key === "terms" ? (
                                                        <div>
                                                            <div className="mb-2">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-dark btn-sm me-2"
                                                                    onClick={() => handleFormat("b")}
                                                                >
                                                                    <FaBold />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-dark btn-sm me-2"
                                                                    onClick={() => handleFormat("i")}
                                                                >
                                                                    <FaItalic />
                                                                </button>
                                                            </div>
                                                            <textarea
                                                                className="form-control"
                                                                rows="5"
                                                                value={text}
                                                                onChange={(e) => setText(e.target.value)}
                                                                placeholder="Write terms or exclusions here..."
                                                            />
                                                            <div className="mt-3">
                                                                <button
                                                                    className="btn btn-primary"
                                                                    onClick={() => alert("Terms saved!")}
                                                                >
                                                                    Save Contract Terms And Exclusions
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="col-md-8 mb-3">
                                                                <div className="mb-3">
                                                                    <label className="form-label fw-bold">Subject</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={subject}
                                                                        onChange={(e) => setSubject(e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label fw-bold">Message</label>
                                                                    <textarea
                                                                        className="form-control"
                                                                        rows="6"
                                                                        value={message}
                                                                        onChange={(e) => setMessage(e.target.value)}
                                                                    />
                                                                </div>
                                                                <a href="#" className="text-primary d-inline-block mb-3">
                                                                    Preview Email
                                                                </a>
                                                                <br />
                                                                <button className="btn btn-primary">
                                                                    Save {label}
                                                                </button>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <h6 className="fw-bold">Available Tags</h6>
                                                                <ul className="list-unstyled small">
                                                                    {key === "invoice" && (
                                                                        <>
                                                                            <li><code>^JobName^</code> for job name</li>
                                                                            <li><code>^ContactName^</code> for contact name</li>
                                                                            <li><code>^InvoiceNumber^</code> for Invoice number</li>
                                                                            <li><code>^TotalAmount^</code> for total amount</li>
                                                                            <li><code>^UserName^</code> for user name</li>
                                                                            <li><code>^UserEmail^</code> for user email</li>
                                                                            <li><code>^UserPhone^</code> for user phone</li>
                                                                            <li><code>^UserRole^</code> for user role</li>
                                                                        </>
                                                                    )}
                                                                    {/* Add other tags per dropdown type if needed */}
                                                                </ul>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}
                            {customizeTab === "integrations" && (
                                <>
                                    <div>
                                        Every business is different, that is why you can adjust Knowify to fit your particular needs. Contact us at support@knowify.com if you would like us to help you. Our setup is complimentary!
                                    </div>
                                    <div className="mt-2">
                                        <div className="mb-3">
                                            <div onClick={() => setShowApiKey(!showApiKey)} style={{ cursor: 'pointer' }} className="d-flex align-items-center mb-2">
                                                {showApiKey ? <FaChevronUp className="me-2" /> : <FaChevronDown className="me-2" />}
                                                <span className="fw-bold text-dark">API key</span>
                                            </div>

                                            {showApiKey ? (
                                                apiKey ? (
                                                    <InputGroup>
                                                        <Form.Control type="text" value={apiKey} readOnly />
                                                        <Button variant="outline-secondary" onClick={copyToClipboard}>
                                                            <FaCopy />
                                                        </Button>
                                                    </InputGroup>
                                                ) : (
                                                    <Button variant="primary" onClick={generateKey}>
                                                        Generate Key
                                                    </Button>
                                                )
                                            ) : null}

                                            {copied && <small className="text-primary mt-1 d-block">Copied to clipboard!</small>}
                                        </div>

                                        <div className="mb-3">
                                            <div onClick={() => setShowPaychex(!showPaychex)} style={{ cursor: 'pointer' }} className="d-flex align-items-center mb-2">
                                                {showPaychex ? <FaChevronUp className="me-2" /> : <FaChevronDown className="me-2" />}
                                                <span className="fw-bold text-dark">Payroll by Paychex</span>
                                            </div>

                                            {showPaychex && (
                                                <>
                                                    <Form.Group className="mb-2">
                                                        <Form.Label>Paychex Customer Id</Form.Label>
                                                        <Form.Control
                                                            value={customerId}
                                                            onChange={(e) => setCustomerId(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                    <Button variant="primary" className="border-dark">Save Changes</Button>
                                                </>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <div onClick={() => setShowTimeImport(!showTimeImport)} style={{ cursor: 'pointer' }} className="d-flex align-items-center mb-2">
                                                {showTimeImport ? <FaChevronUp className="me-2" /> : <FaChevronDown className="me-2" />}
                                                <span className="fw-bold text-dark">Time Import</span>
                                            </div>

                                            {showTimeImport && (
                                                <div className="ps-4">
                                                    <p className="mb-1">
                                                        If you are tracking time with BusyBusy, ExakTime, Clockshark or any other time tracking solution, you can easily import those time entries into Knowify. View demo <a href="#">here</a>.
                                                    </p>
                                                    <Form.Check
                                                        type="checkbox"
                                                        id="enable-time-import"
                                                        label="Enables time Import in Review Time."
                                                        checked={enableImport}
                                                        onChange={() => setEnableImport(!enableImport)}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <div onClick={() => setShowQuickBooks(!showQuickBooks)} style={{ cursor: 'pointer' }} className="d-flex align-items-center mb-2">
                                                {showQuickBooks ? <FaChevronUp className="me-2" /> : <FaChevronDown className="me-2" />}
                                                <span className="fw-bold text-dark">Online Payments by QuickBooks Payments</span>
                                            </div>

                                            {showQuickBooks && (
                                                <div className="ps-4">
                                                    <p className="mb-1">
                                                        Optionally accept online payments when sending invoices to customers with QuickBooks Payments (requires online payments feature to be enabled on QuickBooks).
                                                    </p>
                                                    <p className="mb-2">
                                                        Click Connect to QuickBooks below to enable QuickBooks Payments on your Knowify account.
                                                    </p>
                                                    <Button variant="primary">Connect to QuickBooks</Button>
                                                </div>
                                            )}
                                        </div>


                                        <div className="mb-3">
                                            <div onClick={() => setShowSquare(!showSquare)} style={{ cursor: 'pointer' }} className="d-flex align-items-center mb-2">
                                                {showSquare ? <FaChevronUp className="me-2" /> : <FaChevronDown className="me-2" />}
                                                <span className="fw-bold text-dark">Online Payments by Square</span>
                                            </div>

                                            {showSquare && (
                                                <div className="ps-4">
                                                    <p>
                                                        Bring electronic payments to the next level with Square. Connect your Square account with Knowify now.
                                                    </p>

                                                    <div className="mb-3 d-flex gap-2">
                                                        <Button variant="dark">Connect to Square</Button>
                                                        <Button variant="outline-dark">View demo</Button>
                                                    </div>

                                                    <Form.Select
                                                        value={paymentOption}
                                                        onChange={(e) => setPaymentOption(e.target.value)}
                                                        className="w-100"
                                                    >
                                                        <option>Include card and ACH payment link in all invoices by default</option>
                                                        <option>Include card payment link in all invoices by default</option>
                                                        <option>Include ACH payment link in all invoices by default</option>
                                                        <option>Do not include payment link in all invoices by default</option>
                                                    </Form.Select>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <div
                                                className="d-flex align-items-center mb-2"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setShowCompanyCam(!showCompanyCam)}
                                            >
                                                {showCompanyCam ? (
                                                    <FaChevronUp className="me-2 text-dark" />
                                                ) : (
                                                    <FaChevronDown className="me-2 text-dark" />
                                                )}
                                                <span className="fw-bold text-dark">Photos and portal by CompanyCam</span>
                                            </div>

                                            {showCompanyCam && (
                                                <div className="ps-4">
                                                    <p className="mb-2">
                                                        Easily manage job site photos and client access using CompanyCam.
                                                        Connect your CompanyCam account to get started.
                                                    </p>
                                                    <div className="d-flex gap-2">
                                                        <button className="btn btn-primary">Connect to CompanyCam</button>
                                                        <button className="btn btn-outline-secondary">View demo</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <div
                                                className="d-flex align-items-center mb-2"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setIsOpen(!isOpen)}
                                            >
                                                {isOpen ? (
                                                    <FaChevronUp className="me-2 text-dark" />
                                                ) : (
                                                    <FaChevronDown className="me-2 text-dark" />
                                                )}
                                                <span className="fw-bold text-dark">Time Tracking by QuickBooks Time</span>
                                            </div>

                                            {isOpen && (
                                                <div className="ps-4">
                                                    <p>
                                                        Knowify is excited to partner with QuickBooks Time to bring you world-class time tracking integrated directly
                                                        into Knowify. Get the best time tracking features and sync your time entries with Knowify for accurate job costing.
                                                    </p>
                                                    <p>
                                                        If you already have a QuickBooks Time account, you can link it now. If you are new and would like to enable
                                                        time tracking, start your <strong>FREE 14-day trial now!</strong>
                                                    </p>
                                                    <button className="btn btn-primary">
                                                        Link an existing QuickBooks Time account
                                                    </button>
                                                </div>
                                            )}
                                        </div>                                    </div>
                                </>
                            )}
                            {customizeTab === "tags" && (
                                <div>
                                    Every business is different, that is why you can adjust Knowify to fit your particular needs. Contact us at support@knowify.com if you would like us to help you. Our setup is complimentary!
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="tab-pane fade" id="documents" role="tabpanel">
                    <div className="container py-3">
                        <h6 className="mb-2">Company Documents (1/100)</h6>
                        <div className="mb-2" style={{ fontSize: 14 }}>
                            Store your documents here. They will be available in all the attachment section across Knowify and you will be able to send them to your customers or vendors.
                        </div>
                        <div className="mb-3">
                            <div
                                className="border rounded bg-light d-flex flex-column align-items-center justify-content-center"
                                style={{ minHeight: 80, borderStyle: "dashed" }}
                            >
                                <div className="py-3 text-center w-100 border border-dashed rounded" style={{ cursor: 'pointer' }}>
                                    <div>Drop files here</div>
                                    <div className="text-muted my-2">or</div>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleClick();
                                        }}
                                        style={{ color: "#2eafec", textDecoration: "underline", fontSize: 15 }}
                                    >
                                        <i className="bi bi-cloud-upload me-1" />
                                        Click to select files
                                    </a>

                                    {/* Hidden file input */}
                                    <input
                                        type="file"
                                        multiple
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="border rounded bg-white">
                            <div className="d-flex align-items-center px-2 py-2 border-bottom" style={{ fontSize: 15 }}>
                                <i className="bi bi-file-earmark me-2" />
                                <span>{fileName}</span>
                                <span className="ms-auto text-muted" style={{ fontSize: 12 }}>
                                    <i className="bi bi-clock me-1" />
                                    6/5/25 5:18 PM
                                </span>
                                <button className="btn btn-link btn-sm ms-2" title="View" onClick={handleView}>
                                    <i className="bi bi-eye" />
                                </button>


                                <button className="btn btn-link btn-sm" title="Download" onClick={handleDownload}>
                                    <i className="bi bi-cloud-download" />
                                </button>
                                <button className="btn btn-link btn-sm text-danger" title="Delete" onClick={() => alert("Delete function here")}>
                                    <i className="bi bi-x" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tab-pane fade" id="quickbooks" role="tabpanel">
                    <div className="container py-4">
                        <h5>QuickBooks Connection</h5>

                        {/* Responsive Layout */}
                        <div className="row gy-3 mb-4">
                            {/* Left Side Boxes */}
                            <div className="col-12 col-lg-8">
                                <div className="row g-3">
                                    {/* Box 1 */}
                                    <div className="col-12 col-md-6">
                                        <div className="border rounded p-3 h-100" style={{ background: "#fafbfc" }}>
                                            <div className="text-danger mb-2 fw-semibold">Not Connected to QuickBooks</div>
                                            <hr className="my-2" />
                                            <div className="text-muted" style={{ fontSize: 13 }}>Status</div>
                                        </div>
                                    </div>
                                    {/* Box 2 */}
                                    <div className="col-12 col-md-6">
                                        <div className="border rounded p-3 h-100" style={{ background: "#fafbfc" }}>
                                            <div className="mb-2 fw-semibold">Would you like to connect? Click here:</div>
                                            <button className="btn btn-primary mb-2 w-100">Connect to QuickBooks</button>
                                            <hr className="my-2" />
                                            <div className="text-muted" style={{ fontSize: 13 }}>What to do now?</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side Text */}
                            <div className="col-12 col-lg-4">
                                <div className="mb-2" style={{ color: "#2eafec", fontWeight: 600, fontSize: 16 }}>Why?</div>
                                <div style={{ fontSize: 14 }}>
                                    BonBon seamlessly integrates with QuickBooks. If you sync with your QuickBooks account now, Knowify will import your QuickBooks list of employees, clients, vendors, products, services and taxes, and will sync new bills and invoices.
                                    <br /><br />
                                    <span style={{ color: "#222" }}>
                                        <strong>Important note:</strong> The import process might take up to 5 minutes, depending on the size of your QuickBooks account. Knowify will only import data from QuickBooks. No data will be changed or removed in your QuickBooks account.
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Info Alert Box */}
                        <div className="alert alert-info d-flex flex-column flex-md-row align-items-start align-items-md-center p-3 gap-3" style={{ background: "#f5faff", borderColor: "#e3f0fb" }}>
                            <i className="bi bi-info-circle" style={{ fontSize: 20, color: "#2eafec" }}></i>
                            <div className="flex-grow-1">
                                <strong>Interested in QuickBooks Online?</strong>
                                <br />
                                With our partnership with Intuit, we can bundle Knowify and QuickBooks Online and offer a price no one can beat.
                            </div>
                            <a href="#" className="text-decoration-underline text-primary" style={{ fontSize: 14 }}>Learn more</a>
                        </div>
                    </div>

                </div>

                <div className="tab-pane fade" id="subscription" role="tabpanel">
                    <div className="container py-3">
                        <h6 className="mb-3">Knowify Account</h6>
                        <div className="row mb-4">
                            <div className="col">
                                <div className="bg-light p-3 text-center">
                                    <div className="fw-bold">Trial</div>
                                    <div className="text-muted" style={{ fontSize: 13 }}>Status</div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="bg-light p-3 text-center">
                                    <div className="fw-bold">6/12/25</div>
                                    <div className="text-muted" style={{ fontSize: 13 }}>Trial Expiration</div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="bg-light p-3 text-center">
                                    <div className="fw-bold">Contractor</div>
                                    <div className="text-muted" style={{ fontSize: 13 }}>Industry</div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="bg-light p-3 text-center">
                                    <div className="fw-bold">Advanced</div>
                                    <div className="text-muted" style={{ fontSize: 13 }}>Plan</div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="bg-light p-3 text-center">
                                    <div className="fw-bold">$311.00/month</div>
                                    <div className="text-muted" style={{ fontSize: 13 }}>
                                        {/* Link that opens the modal */}
                                        <a href="#" onClick={(e) => { e.preventDefault(); handleShow(); }} style={{ color: "#2eafec" }}>
                                            Current Price (see details)
                                        </a>

                                        {/* Bootstrap Modal */}
                                        <Modal show={show} onHide={handleClose} centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Upcoming Invoice Details</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <p className="mb-2"><strong>Subscription to Advanced, including:</strong></p>
                                                <ul className="mb-3 ps-3">
                                                    <li>1 Regular user — <strong>USD $311.00</strong></li>
                                                    <li>1 Additional regular user — <strong>USD $10.00</strong></li>
                                                </ul>
                                                <hr />
                                                <p className="d-flex justify-content-between">
                                                    <span><strong>Subtotal</strong></span>
                                                    <span><strong>USD $321.00</strong></span>
                                                </p>
                                                <p className="d-flex justify-content-between">
                                                    <span><strong>Amount due</strong></span>
                                                    <span><strong>USD $321.00</strong></span>
                                                </p>
                                                <p className="text-muted mt-3"><em>**Plus sales tax, where applicable</em></p>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="bg-light p-3 text-center">
                                    <div className="fw-bold">3</div>
                                    <div className="text-muted" style={{ fontSize: 13 }}>Active jobs</div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary mb-4" onClick={() => setShowSubStep1(true)}>
                            Activate Now
                        </button>
                    </div>

                    {/* Step 1: Confirm Subscription Modal */}
                    {showSubStep1 && (
                        <div className="modal d-block" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Step 1/2: Confirm Subscription</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowSubStep1(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">This is your current subscription:</div>
                                        <div className="fw-bold mb-2">Advanced</div>
                                        <div className="d-flex justify-content-between">
                                            <span>USD$311.00</span>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <span>Subtotal</span>
                                            <span>USD$311.00</span>
                                        </div>
                                        <div className="d-flex justify-content-between fw-bold">
                                            <span>Total</span>
                                            <span>USD$311.00</span>
                                        </div>
                                        <div className="mt-3" style={{ fontSize: 13 }}>
                                            If you wish to modify the current subscription, please contact us at support@knowify.com or (212) 233-3230.
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <a href="#" className="me-auto" style={{ fontSize: 13 }}>Add promo code</a>
                                        <button className="btn btn-secondary" onClick={() => setShowSubStep1(false)}>Cancel</button>
                                        <button className="btn btn-primary" onClick={() => { setShowSubStep1(false); setShowSubStep2(true); }}>
                                            Go to step 2/2
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Payment Information Modal */}
                    {showSubStep2 && (
                        <div className="modal d-block" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Step 2/2: Payment Information</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowSubStep2(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-2">
                                            <strong>Subscription price:</strong><br />
                                            <span>USD$311.00/month</span>
                                        </div>
                                        <div className="mb-2">
                                            <strong>License period:</strong><br />
                                            <span>This is a monthly plan. You can cancel anytime for any reason</span>
                                        </div>
                                        <div className="mb-3">
                                            Please enter your credit card information below:
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-6">
                                                <label>Card Number</label>
                                                <input className="form-control" placeholder="xxxx xxxx xxxx 1234" />
                                            </div>
                                            <div className="col-3">
                                                <label>Expiration (MM/YY)</label>
                                                <div className="d-flex gap-1">
                                                    <input className="form-control" placeholder="MM" maxLength={2} />
                                                    <input className="form-control" placeholder="YY" maxLength={2} />
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <label>CVC</label>
                                                <input className="form-control" placeholder="---" maxLength={4} />
                                            </div>
                                        </div>
                                        <div className="text-muted" style={{ fontSize: 12 }}>
                                            This information is encrypted and securely stored by Stripe.com. If you have any questions, please call +1 (212) 233-3230 or send us an email to support@knowify.com and we will be happy to assist you.
                                        </div>
                                        <div className="mt-2">
                                            <a href="#" style={{ fontSize: 13 }}>Read our terms of service and privacy policy</a>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-secondary" onClick={() => setShowSubStep2(false)}>Cancel</button>
                                        <button className="btn btn-primary">Submit Payment Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <div className="modal d-block" tabIndex="-1">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New User</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                            </div>

                            {successMessage && (
                                <AlertBox
                                    type={messageType}
                                    message={message}
                                    onClose={() => setMessage(null)}
                                />
                            )}


                            <div className="modal-body">
                                {/* Type of Access Always Visible */}
                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <label>Type of Access</label>
                                        <select
                                            className="form-select"
                                            value={editUser.type}
                                            onChange={(e) => setEditUser({ ...editUser, type: e.target.value })}
                                        >
                                            <option value="">Select access type...</option>
                                            <option>User with regular access to Knowify</option>
                                            <option>User with mobile access to Knowify only</option>
                                            <option>User with no access to Knowify</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Show full form only after access type is selected */}
                                {editUser.type && (
                                    <>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label>Role</label>
                                                <input
                                                    className="form-control"
                                                    value={editUser.role}
                                                    onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label>First Name</label>
                                                <input
                                                    className="form-control"
                                                    value={editUser.firstName}
                                                    onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label>Last Name</label>
                                                <input
                                                    className="form-control"
                                                    value={editUser.lastName}
                                                    onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label>Email</label>
                                                <input
                                                    className="form-control"
                                                    value={editUser.email}
                                                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label>Department</label>
                                                <select
                                                    className="form-select"
                                                    value={editUser.department}
                                                    onChange={(e) => setEditUser({ ...editUser, department: e.target.value })}
                                                >
                                                    <option>General/Corporate</option>
                                                    <option>Finance</option>
                                                    <option>Engineering</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Direct Manager</label>
                                                <select
                                                    className="form-select"
                                                    value={editUser.manager}
                                                    onChange={(e) => setEditUser({ ...editUser, manager: e.target.value })}
                                                >
                                                    <option>None</option>
                                                    <option>Manager A</option>
                                                    <option>Manager B</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Enable Approval Authority</label>
                                                <div className="form-check form-switch">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={editUser.approval}
                                                        onChange={(e) => setEditUser({ ...editUser, approval: e.target.checked })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Cell Phone (optional)</label>
                                                <input
                                                    className="form-control"
                                                    value={editUser.cell}
                                                    onChange={(e) => setEditUser({ ...editUser, cell: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label>Employee ID (optional)</label>
                                                <input
                                                    className="form-control"
                                                    value={editUser.empId}
                                                    onChange={(e) => setEditUser({ ...editUser, empId: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        {/* Footer should only show when form is expanded */}
                                        {/* Conditional Permissions Section */}
                                        {editUser.type !== "User with no access to Knowify" && (
                                            <div className="mt-4">
                                                <h6>This User...</h6>
                                                <div className="row g-2">
                                                    {[
                                                        "User with regular access to Knowify",
                                                        "User with mobile access to Knowify only",
                                                    ].includes(editUser.type) &&
                                                        (editUser.type === "User with regular access to Knowify"
                                                            ? [
                                                                'is responsible for managing vendor bills',
                                                                'is responsible for invoicing clients',
                                                                'tracks their time',
                                                                'manages client agreements',
                                                                'schedules company resources',
                                                                'views employee rates and job financials',
                                                                'can access QuickBooks or is your accountant',
                                                                'is a foreman or can approve time cards',
                                                                'manages or estimates jobs',
                                                                'is a Knowify system administrator',
                                                            ]
                                                            : [
                                                                'tracks their time',
                                                                'is a foreman or can approve time cards',
                                                            ]
                                                        ).map((label, index) => (
                                                            <div className="col-md-6" key={index}>
                                                                <div className="form-check">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        checked={editUser.permissions?.includes(label)}
                                                                        onChange={(e) => {
                                                                            const updated = e.target.checked
                                                                                ? [...(editUser.permissions || []), label]
                                                                                : (editUser.permissions || []).filter(p => p !== label);
                                                                            setEditUser({ ...editUser, permissions: updated });
                                                                        }}
                                                                    />
                                                                    <label className="form-check-label">{label}</label>
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            <div className="modal-footer justify-content-end">
                                <button
                                    type="button"
                                    className="btn btn-light me-2 text-dark"
                                    onClick={() => setShowAddModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary text-white"
                                    onClick={() => handleAddUser}
                                >
                                    Add User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Edit User Modal */}
            {showEditModal && (
                <div className="modal d-block" tabIndex="-1">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update User</h5>
                                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label>Type of Access</label>
                                        <select className="form-select" value={editUser.type} onChange={(e) => setEditUser({ ...editUser, type: e.target.value })}>
                                            <option>User with no access to Knowify</option>
                                            <option>User with regular access to Knowify</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Role</label>
                                        <input className="form-control" value={editUser.role} onChange={(e) => setEditUser({ ...editUser, role: e.target.value })} />
                                    </div>
                                    <div className="col-md-6">
                                        <label>First Name</label>
                                        <input className="form-control" value={editUser.firstName} onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })} />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Last Name</label>
                                        <input className="form-control" value={editUser.lastName} onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })} />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Email</label>
                                        <input className="form-control" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Department</label>
                                        <select className="form-select" value={editUser.department} onChange={(e) => setEditUser({ ...editUser, department: e.target.value })}>
                                            <option>General/Corporate</option>
                                            <option>Finance</option>
                                            <option>Engineering</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Direct Manager</label>
                                        <select className="form-select" value={editUser.manager} onChange={(e) => setEditUser({ ...editUser, manager: e.target.value })}>
                                            <option>None</option>
                                            <option>Manager A</option>
                                            <option>Manager B</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Enable Approval Authority</label>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" checked={editUser.approval} onChange={(e) => setEditUser({ ...editUser, approval: e.target.checked })} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Cell Phone (optional)</label>
                                        <input className="form-control" value={editUser.cell} onChange={(e) => setEditUser({ ...editUser, cell: e.target.value })} />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Employee ID (optional)</label>
                                        <input className="form-control" value={editUser.empId} onChange={(e) => setEditUser({ ...editUser, empId: e.target.value })} />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h6>This User...</h6>
                                    <div className="row g-2">
                                        {[
                                            'is responsible for managing vendor bills',
                                            'is responsible for invoicing clients',
                                            'tracks their time',
                                            'manages client agreements',
                                            'schedules company resources',
                                            'views employee rates and job financials',
                                            'can access QuickBooks or is your accountant',
                                            'is a foreman or can approve time cards',
                                            'manages or estimates jobs',
                                            'is a Knowify system administrator'
                                        ].map((label, index) => (
                                            <div className="col-md-6" key={index}>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={editUser.permissions?.includes(label)}
                                                        onChange={(e) => {
                                                            const updated = e.target.checked
                                                                ? [...(editUser.permissions || []), label]
                                                                : (editUser.permissions || []).filter(p => p !== label);
                                                            setEditUser({ ...editUser, permissions: updated });
                                                        }}
                                                    />
                                                    <label className="form-check-label">{label}</label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button className="btn btn-primary">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Incomplete Mobile Onboarding Modal */}
            {showOnboardingModal && selectedUser && (
                <div className="modal d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedUser.name}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowOnboardingModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-2 fw-bold">CURRENT STATUS</div>
                                <div className="mb-3">
                                    This user has not started the mobile onboarding process yet.
                                </div>
                                <div className="mb-2 fw-bold">ONBOARDING STEPS</div>
                                <ol>
                                    <li>
                                        Log into the app{" "}
                                        <i className="bi bi-info-circle ms-2" />
                                    </li>
                                    <li>
                                        Enable access to GPS (location services){" "}
                                        <i className="bi bi-info-circle ms-2" />
                                    </li>
                                    <li>
                                        Test check in/out{" "}
                                        <i className="bi bi-info-circle ms-2" />
                                    </li>
                                    <li>
                                        Verify location accuracy{" "}
                                        <i className="bi bi-info-circle ms-2" />
                                    </li>
                                </ol>
                                <div className="mb-2 fw-bold">RECOMMENDATION</div>
                                <div className="mb-3">
                                    Ask the user to install the app and log in.
                                </div>
                                <a
                                    href="#"
                                    className="d-block mb-2"
                                >
                                    Click here to send the recommendation to the user via email and
                                    push notification
                                </a>
                                <button className="btn btn-outline-secondary btn-sm me-2">
                                    Restart onboarding process
                                </button>
                                <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => setShowOnboardingModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Role Modal */}
            {showRoleModal && (
                <div className="modal d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Roles</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowRoleModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label>Name <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        value={newRole.name}
                                        onChange={e => setNewRole({ ...newRole, name: e.target.value })}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label>Billing Rate</label>
                                        <div className="input-group">
                                            <span className="input-group-text">$</span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={newRole.billingRate}
                                                onChange={e => setNewRole({ ...newRole, billingRate: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Budget Rate</label>
                                        <div className="input-group">
                                            <span className="input-group-text">$</span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={newRole.budgetRate}
                                                onChange={e => setNewRole({ ...newRole, budgetRate: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowRoleModal(false)}
                                >
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={handleAddRole}>
                                    Add New
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSection;
