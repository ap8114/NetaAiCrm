import React, { useState } from "react";
import "./AdminSection.css";

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
    
  // --- Structure tab state ---
  const [structureType, setStructureType] = useState("Departments");
  const [departments, setDepartments] = useState([
    "General/Corporate",
    "qerb",
    "rfn",
    "fg",
  ]);
  const [newDept, setNewDept] = useState("");

  const handleRemoveDept = (idx) => {
    setDepartments(departments.filter((_, i) => i !== idx));
  };

  const handleAddDept = () => {
    if (newDept.trim()) {
      setDepartments([...departments, newDept.trim()]);
      setNewDept("");
    }
  };

  // Users state
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

  // Rates & Resources state
  const [showResourceCost, setShowResourceCost] = useState(true);
  const [showRoles, setShowRoles] = useState(true);
  const [roles, setRoles] = useState(initialRoles);
  const [resourceCost, setResourceCost] = useState(initialResourceCost);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [newRole, setNewRole] = useState({ name: "", billingRate: "", budgetRate: "" });

  // Subscription state
  const [showSubStep1, setShowSubStep1] = useState(false);
  const [showSubStep2, setShowSubStep2] = useState(false);

  // Customize tab state
  const [customizeTab, setCustomizeTab] = useState("features");

  // Modal handlers
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

  // Add new role handler
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
                <input type="text" className="form-control" value="NETA" />
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
                  className="btn btn-success btn-sm"
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
          <div className="d-flex align-items-center mb-3">
            <input
              className="form-control me-2"
              style={{ maxWidth: 200 }}
              placeholder="Search"
            />
            <button className="btn btn-success" onClick={openAddModal}>
              + Add User
            </button>
            <div className="form-check ms-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="showInactive"
              />
              <label
                className="form-check-label"
                htmlFor="showInactive"
              >
                Show Inactive
              </label>
            </div>
            <div className="ms-auto">
              <span style={{ fontSize: 12 }}>Regular (6), No access (7)</span>
            </div>
          </div>
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
                        className="badge bg-light text-primary"
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
                  <button className="btn btn-success btn-sm mt-3">Save Changes</button>
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
                <button className="btn btn-success btn-sm mt-2">Save Changes</button>
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
                    <div>&#x25B6; Company Logo</div>
                    <div>&#x25B6; Custom Templates</div>
                    <div>&#x25B6; Numbering</div>
                    <div>&#x25B6; Hide/Display Jobs</div>
                    <div>&#x25B6; Time Tracking</div>
                    <div>&#x25B6; Cost Management</div>
                    <div>&#x25B6; Project Management</div>
                    <div>&#x25B6; Scheduling</div>
                    <div>&#x25B6; Proposal Management & Deposits</div>
                    <div>&#x25B6; AIA-style Invoicing (pay apps)</div>
                    <div>&#x25B6; Cost Plus with Schedule of Values Invoicing</div>
                    <div>&#x25B6; Parts Inventory <span className="badge bg-success ms-1" style={{ fontSize: 10 }}>UNLIMITED</span></div>
                    <div>&#x25B6; Default Payment Terms</div>
                    <div>&#x25B6; Default Address for POs</div>
                    <div>&#x25B6; Phone Reminders</div>
                    <div>&#x25B6; Submittals <span className="badge bg-success ms-1" style={{ fontSize: 10 }}>UNLIMITED</span></div>
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
                        <tr>
                          <td>
                            <input className="form-control form-control-sm" value="Non taxable" readOnly />
                          </td>
                          <td>
                            <input className="form-control form-control-sm" value="0.000%" readOnly />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <a href="#" style={{ fontSize: 13 }}>+ add a rate</a>
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
                    Every business is different, that is why you can adjust Knowify to fit your particular needs. Contact us at support@knowify.com if you would like us to help you. Our setup is complimentary!
                  </div>
                  <div className="mt-2">
                    <div>&#x25B6; Invoice Email</div>
                    <div>&#x25B6; eSignature Email</div>
                    <div>&#x25B6; PO Email</div>
                    <div>&#x25B6; Service Tickets Email</div>
                    <div>&#x25B6; Terms & Exclusions Language</div>
                  </div>
                </>
              )}
              {customizeTab === "integrations" && (
                <>
                  <div>
                    Every business is different, that is why you can adjust Knowify to fit your particular needs. Contact us at support@knowify.com if you would like us to help you. Our setup is complimentary!
                  </div>
                  <div className="mt-2">
                    <div>&#x25B6; API key</div>
                    <div>&#x25B6; Payroll by Paychex</div>
                    <div>&#x25B6; Time Import</div>
                    <div>&#x25B6; Online Payments by QuickBooks Payments</div>
                    <div>&#x25B6; Online Payments by Square</div>
                    <div>&#x25B6; Photos and portal by CompanyCam</div>
                    <div>&#x25B6; Time Tracking by QuickBooks Time</div>
                  </div>
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
                <div className="py-3 text-center w-100">
                  <div>Drop files here</div>
                  <div className="text-muted my-2">or</div>
                  <a href="#" style={{ color: "#2eafec", textDecoration: "underline", fontSize: 15 }}>
                    <i className="bi bi-cloud-upload me-1" />
                    Click to select files
                  </a>
                </div>
              </div>
            </div>
            <div className="border rounded bg-white">
              <div className="d-flex align-items-center px-2 py-2 border-bottom" style={{ fontSize: 15 }}>
                <i className="bi bi-file-earmark me-2" />
                <span>Neta-Logo.png</span>
                <span className="ms-auto text-muted" style={{ fontSize: 12 }}>
                  <i className="bi bi-clock me-1" />
                  6/5/25 5:18 PM
                </span>
                <button className="btn btn-link btn-sm ms-2" title="View">
                  <i className="bi bi-eye" />
                </button>
                <button className="btn btn-link btn-sm" title="Download">
                  <i className="bi bi-cloud-download" />
                </button>
                <button className="btn btn-link btn-sm text-danger" title="Delete">
                  <i className="bi bi-x" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="quickbooks" role="tabpanel">
          <div className="container py-4">
            <h5>QuickBooks Connection</h5>
            <div className="row mb-4">
              <div className="col-md-8 d-flex">
                <div className="border rounded p-3 flex-fill me-3" style={{ minWidth: 220, background: "#fafbfc" }}>
                  <div className="text-danger mb-2" style={{ fontWeight: 500 }}>Not Connected to QuickBooks</div>
                  <hr className="my-2" />
                  <div className="text-muted" style={{ fontSize: 13 }}>Status</div>
                </div>
                <div className="border rounded p-3 flex-fill" style={{ minWidth: 220, background: "#fafbfc" }}>
                  <div className="mb-2" style={{ fontWeight: 500 }}>Would you like to connect? Click here:</div>
                  <button className="btn btn-success mb-2">Connect to QuickBooks</button>
                  <hr className="my-2" />
                  <div className="text-muted" style={{ fontSize: 13 }}>What to do now?</div>
                </div>
              </div>
              <div className="col-md-4">
                <div style={{ color: "#2eafec", fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Why?</div>
                <div style={{ fontSize: 14 }}>
                  Knowify seamlessly integrates with QuickBooks. If you sync with your QuickBooks account now, Knowify will import your QuickBooks list of employees, clients, vendors, products, services and taxes, and will sync new bills and invoices.
                  <br /><br />
                  <span style={{ color: "#222" }}>
                    Important note: The import process might take up to 5 minutes, depending on the size of your QuickBooks account. Knowify will only import data from QuickBooks. No data will be changed or removed in your QuickBooks account.
                  </span>
                </div>
              </div>
            </div>
            <div className="alert alert-info d-flex align-items-center p-2" style={{ background: "#f5faff", borderColor: "#e3f0fb" }}>
              <i className="bi bi-info-circle me-2" style={{ fontSize: 20, color: "#2eafec" }}></i>
              <div className="flex-grow-1">
                <strong>Interested in QuickBooks Online?</strong>
                <br />
                With our partnership with Intuit, we can bundle Knowify and QuickBooks Online and offer a price no one can beat.
              </div>
              <a href="#" className="ms-3" style={{ color: "#2eafec", textDecoration: "underline", fontSize: 14 }}>Learn more</a>
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
                    <a href="#" style={{ color: "#2eafec" }}>Current Price<br />(see details)</a>
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
            <button className="btn btn-success mb-4" onClick={() => setShowSubStep1(true)}>
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
                    <button className="btn btn-success" onClick={() => { setShowSubStep1(false); setShowSubStep2(true); }}>
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
                    <button className="btn btn-success">Submit Payment Details</button>
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
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Type of Access</label>
                  <select
                    className="form-select"
                    value={addUserType}
                    onChange={(e) => setAddUserType(e.target.value)}
                  >
                    <option value="">Select type</option>
                    <option value="No access">
                      User with no access to Knowify
                    </option>
                    <option value="Regular">Regular User</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success">Add User</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label>Type of Access</label>
                    <select
                      className="form-select"
                      value={editUser.type}
                      onChange={(e) =>
                        setEditUser({ ...editUser, type: e.target.value })
                      }
                    >
                      <option>User with no access to Knowify</option>
                      <option>Regular</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label>Role</label>
                    <input
                      className="form-control"
                      value={editUser.role}
                      onChange={(e) =>
                        setEditUser({ ...editUser, role: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label>First Name</label>
                    <input
                      className="form-control"
                      value={editUser.firstName}
                      onChange={(e) =>
                        setEditUser({ ...editUser, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Last Name</label>
                    <input
                      className="form-control"
                      value={editUser.lastName}
                      onChange={(e) =>
                        setEditUser({ ...editUser, lastName: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Department</label>
                    <input
                      className="form-control"
                      value={editUser.department}
                      onChange={(e) =>
                        setEditUser({ ...editUser, department: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Direct Manager</label>
                    <input
                      className="form-control"
                      value={editUser.manager}
                      onChange={(e) =>
                        setEditUser({ ...editUser, manager: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Cell Phone (optional)</label>
                    <input
                      className="form-control"
                      value={editUser.cell}
                      onChange={(e) =>
                        setEditUser({ ...editUser, cell: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Employee ID (optional)</label>
                    <input
                      className="form-control"
                      value={editUser.empId}
                      onChange={(e) =>
                        setEditUser({ ...editUser, empId: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success">Save Changes</button>
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
                <button className="btn btn-success" onClick={handleAddRole}>
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
