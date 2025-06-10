import React, { useState } from "react";
import "./Editpurposal.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Modal, Dropdown } from "react-bootstrap";
import ClientProposalForm from "./Createpurposal";
import Draftpurposal from "./Draftpurposal";


const Editpurposal = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#b5a14f");
  const [activeTab, setActiveTab] = useState("Summary");
  const [logsTab, setLogsTab] = useState("logs");
  const [showDailyLogModal, setShowDailyLogModal] = useState(false);
  const [logNotes, setLogNotes] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const job = location.state;
  const stage = job?.p?.stage;

  const handleEditClick = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => setIsEditing(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const renderTabContent = () => {
    // Special: Lead stage
    if (stage === "lead" && activeTab === "Client Proposal") {
      return <ClientProposalForm />;
    }

    // Special: Active stage
    if (stage === "Active" && activeTab === "Draft Proposal") {
      return <Draftpurposal />;
    }

    // Common Tabs
    switch (activeTab) {
      case "Summary":
        return (
          <div className="tab-content-box row">
            {/* Left Column: Job Details */}
            <div className="col-md-8">
              <h5 className="mb-3 fw-bold">Details</h5>
              <div className="row mb-3">
                <div className="col-md-6">
                  <p className="mb-1 text-muted">Job Status</p>
                  <p>Lead</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-1 text-muted">Job Type</p>
                  <p>Fixed price</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-1 text-muted">Job Costing Style</p>
                  <p>Professional</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-1 text-muted">Scheduling Color</p>
                  <select className="form-select" style={{ backgroundColor: "#90a4ae" }}>
                    <option>Color</option>
                  </select>
                </div>
                <div className="col-12 mt-3">
                  <p className="mb-1 text-muted">Tags</p>
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <input type="text" className="form-control w-auto" placeholder="Enter tag" />
                    <span className="badge bg-secondary">
                      h <button className="btn btn-sm btn-close ms-1" />
                    </span>
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <p className="mb-1 text-muted">Location</p>
                  <p>1225 Eastern Parkway, hdh<br />Brooklyn, NY 11213, US</p>
                </div>
                <div className="col-12 mt-2">
                  <div style={{ height: "300px", borderRadius: "8px", overflow: "hidden" }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1389432.6951691378!2d48.01632987930219!3d15.867006933389124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1749494379294!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Job Location Map"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Tasks & Portal */}
            <div className="col-md-4">
              <div className="bg-light p-3 rounded mb-3">
                <h6 className="fw-bold">Tasks</h6>
                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <p className="mb-0 text-muted">Total</p>
                    <p className="mb-0">0</p>
                  </div>
                  <div>
                    <p className="mb-0 text-muted">Pending</p>
                    <p className="mb-0">0</p>
                  </div>
                </div>

                <h6 className="fw-bold">Analytics</h6>
                <p className="text-muted small">Not enough data</p>
                <a href="#!" className="small text-primary">Set costs/revenue previous to Knowify</a>
              </div>

              <div className="bg-light p-3 rounded">
                <h6 className="fw-bold">Customer Portal</h6>
                <button className="btn btn-outline-secondary btn-sm mt-2">
                  🔗 Click here to create a portal for this job
                </button>
              </div>
            </div>
          </div>
        );

      case "Plan & Track":
        return (
          <div className="tab-content-box row">
            {/* Left Column */}
            <div className="col-md-8">
              <h5 className="mb-3 fw-bold">Job Planning</h5>
              <div className="row">
                {/* Job Status */}
                <div className="col-md-6 mb-3">
                  <p className="mb-1 text-muted">Job Status</p>
                  <p>Lead</p>
                </div>

                {/* Job Type */}
                <div className="col-md-6 mb-3">
                  <p className="mb-1 text-muted">Job Type</p>
                  <p>Fixed price</p>
                </div>

                {/* Estimated Start */}
                <div className="col-md-6 mb-3">
                  <p className="mb-1 text-muted">Estimated Start</p>
                  <input type="date" className="form-control" />
                </div>

                {/* Estimated Completion */}
                <div className="col-md-6 mb-3">
                  <p className="mb-1 text-muted">Estimated Completion</p>
                  <input type="date" className="form-control" />
                </div>

                {/* Job Costing Style */}
                <div className="col-md-6 mb-3">
                  <p className="mb-1 text-muted">Job Costing Style</p>
                  <p>Professional</p>
                </div>

                {/* Total Budget */}
                <div className="col-md-6 mb-3">
                  <p className="mb-1 text-muted">Total Budget</p>
                  <input type="text" className="form-control" placeholder="$0.00" />
                </div>
              </div>

              {/* Task List */}
              <div className="mt-4">
                <h6 className="fw-bold">Tasks</h6>
                <div className="border rounded p-3 bg-light">
                  <p className="text-muted">No tasks added yet</p>
                  <button className="btn btn-sm btn-primary">Add Task</button>
                </div>
              </div>

              {/* Milestones */}
              <div className="mt-4">
                <h6 className="fw-bold">Milestones</h6>
                <div className="border rounded p-3 bg-light">
                  <p className="text-muted">No milestones defined</p>
                  <button className="btn btn-sm btn-primary">Add Milestone</button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-4">
              <div className="bg-light p-3 rounded mb-3">
                <h6 className="fw-bold">Scheduling</h6>
                <div className="text-muted small mb-2">No work scheduled</div>
                <button className="btn btn-outline-secondary btn-sm">Add Schedule</button>
              </div>

              <div className="bg-light p-3 rounded">
                <h6 className="fw-bold">Job Calendar</h6>
                <div className="text-muted small mb-2">Nothing on calendar yet</div>
                <button className="btn btn-outline-secondary btn-sm">Open Calendar</button>
              </div>
            </div>
          </div>
        );

      case "Contract & Change Orders":
        return (
          <div className="tab-content-box container">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold">Fixed price | AIA-style billing</h5>
              <button className="btn btn-primary">Invoice now</button>
            </div>

            {/* Value summary */}
            <div className="d-flex flex-wrap gap-4 mb-3">
              <div><strong>Value:</strong> $264,000.00</div>
              <div><strong>Invoiced:</strong> $45,000.00</div>
              <div><strong>Retained:</strong> $5,000.00</div>
            </div>

            {/* Contract details */}
            <div className="row mb-4">
              <div className="col-md-6">
                <p><strong>GC Contract#:</strong> 4235</p>
                <p><strong>GC contract date:</strong> 11/1/22</p>
              </div>
              <div className="col-md-6">
                <p><strong>Retainage for work:</strong> 10%</p>
                <p><strong>Retainage for materials:</strong> 10%</p>
                <p><strong>Payment terms:</strong> NET7</p>
              </div>
            </div>

            <button className="btn btn-link p-0 mb-3">✏️ Edit this information</button>

            {/* Schedule of Values */}
            <div className="border-top pt-3 mb-4">
              <h6 className="fw-bold">SCHEDULE OF VALUES</h6>

              {/* Item 1 */}
              <div className="border rounded p-3 mb-3 bg-light">
                <h6 className="mb-1">1. Demolition / Clear Out</h6>
                <p className="mb-1"><strong>Value:</strong> $108,000.00</p>
                <p className="mb-1"><strong>Invoiced:</strong> 46.30%</p>
                <p><strong>Balance:</strong> $58,000.00</p>
              </div>

              {/* Item 2 */}
              <div className="border rounded p-3 mb-3 bg-light">
                <h6 className="mb-1">2. Asphalt</h6>
                <p className="mb-1"><strong>Value:</strong> $156,000.00</p>
                <p className="mb-1"><strong>Invoiced:</strong> 0%</p>
                <p><strong>Balance:</strong> $156,000.00</p>
              </div>

              <button className="btn btn-primary">Add change order</button>
            </div>

            {/* Financial Summary */}
            <div className="bg-primary bg-opacity-10 p-3 rounded mb-4">
              <div className="row mb-2">
                <div className="col-md-6"><strong>A1. Original bid Sum:</strong></div>
                <div className="col-md-6 text-md-end">$264,000.00</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6"><strong>A2. Original contract sum:</strong></div>
                <div className="col-md-6 text-md-end">$264,000.00</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6"><strong>B1. Pending change orders:</strong></div>
                <div className="col-md-6 text-md-end">$0.00</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6"><strong>B2. Net change by approved change orders:</strong></div>
                <div className="col-md-6 text-md-end">$0.00</div>
              </div>
              <div className="row mb-2 fw-bold">
                <div className="col-md-6"><strong>C. Contract sum to date (A+B1+B2):</strong></div>
                <div className="col-md-6 text-md-end">$264,000.00</div>
              </div>
              <div className="row fw-bold">
                <div className="col-md-6"><strong>D. Approved contract sum to date (A+B2):</strong></div>
                <div className="col-md-6 text-md-end">$264,000.00</div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="mb-4">
              <h6 className="fw-bold">ADDITIONAL OPTIONS</h6>
              <select className="form-select w-auto">
                <option>Display line item subtotals</option>
              </select>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-4">
              <h6 className="fw-bold">TERMS AND CONDITIONS</h6>
              <p className="text-muted mb-0">
                The above price is valid for 30 days. Test Data agrees that they will enter into a standard AIA subcontract with General Contractor, 
                and that basic provisions such as insurance and W-9 shall be in place prior to start.
              </p>
            </div>
          </div>
        );

      case "Documents":
        return (
          <div className="tab-content-box text-center">
            {/* Placeholder Image */}
            <div className="mb-3">
              <img
                src="https://img.icons8.com/ios/100/000000/document--v1.png"
                alt="Documents"
                width="100"
              />
            </div>

            {/* Headings */}
            <h5 className="fw-bold">Documents</h5>
            <p className="text-muted mb-1">
              Build a central repository for all your project documents.
            </p>
            <p>
              <a href="#" className="text-primary text-decoration-none">
                You can even link remote documents.
              </a>
            </p>

            {/* Buttons */}
            <div className="d-flex justify-content-center gap-2 mt-3">
              <button className="btn btn-outline-secondary">Add folder</button>
              <button className="btn btn-primary" onClick={handleUploadClick}>
                Upload file
              </button>
              <input
                type="file"
                id="fileInput"
                className="d-none"
                onChange={handleFileChange}
              />
            </div>

            {/* Uploaded File Display */}
            {uploadedFile && (
              <div className="mt-3">
                <p className="text-primary">Uploaded: {uploadedFile}</p>
              </div>
            )}
          </div>
        );

      case "Logs":
        const logsData = [
          {
            date: "6/10/25",
            entries: [
              {
                text: "Time entry modified",
                by: "simon mashiah",
                time: "2:37 PM",
              },
            ],
          },
          {
            date: "6/5/25",
            entries: [
              {
                text: "Checked out",
                by: "simon mashiah",
                time: "6:00 PM",
              },
              {
                text: "Time entry submitted",
                by: "simon mashiah",
                time: "6:00 PM",
              },
              {
                text: "Checked in",
                by: "simon mashiah",
                time: "6:00 PM",
              },
            ],
          },
          {
            date: "5/29/25",
            files: [
              { name: "Wally World Parking Lot 11/9/2022.pdf" },
              { name: "Wally World Parking Lot 11/9/2022.pdf" },
            ],
            entries: [
              { text: "Resource allocated", by: "simon mashiah", time: "2:26 PM" },
              { text: "Resource allocated", by: "simon mashiah", time: "2:26 PM" },
              { text: "Phase: Demolition / Clear Out marked as active", by: "simon mashiah", time: "2:26 PM" },
              { text: "Subcontractor contract made active", by: "simon mashiah", time: "2:26 PM" },
              { text: "PO created from subcontractor contract", by: "simon mashiah", time: "2:26 PM" },
              { text: "Purchase created", by: "simon mashiah", time: "2:26 PM" },
              { text: "Invoice finalized", by: "simon mashiah", time: "2:26 PM" },
              { text: "Contract information modified", by: "simon mashiah", time: "2:26 PM" },
              { text: "Job made active", by: "simon mashiah", time: "2:26 PM" },
              { text: "Proposal saved as draft", by: "simon mashiah", time: "2:26 PM" },
              { text: "Job created", by: "simon mashiah", time: "2:26 PM" },
              { text: "Bill allocated", by: "simon mashiah", time: "2:26 PM" },
              { text: "Bill created", by: "simon mashiah", time: "2:26 PM" },
              { text: "Bill items re-allocated", by: "simon mashiah", time: "2:26 PM" },
              { text: "Bill created", by: "simon mashiah", time: "2:26 PM" },
            ],
          },
        ];

        return (
          <div className="tab-content-box">
            {/* Logs/Daily logs tab buttons */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <button
                className={`btn btn-sm ${logsTab === "logs" ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setLogsTab("logs")}
              >
                Logs
              </button>
              <button
                className={`btn btn-sm ${logsTab === "daily" ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setLogsTab("daily")}
              >
                Daily logs
              </button>
            </div>

            {/* Logs tab content */}
            {logsTab === "logs" && (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="mb-0">Logs</h4>
                  <div className="d-flex gap-2">
                    <button className="btn btn-success btn-sm">Add log</button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                  </div>
                </div>
                <div className="d-flex gap-2 mb-3">
                  <div className="input-group" style={{ maxWidth: 300 }}>
                    <input type="text" className="form-control" placeholder="Search" />
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn btn-light dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      View: All
                    </button>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">All</a></li>
                      <li><a className="dropdown-item" href="#">Created</a></li>
                      <li><a className="dropdown-item" href="#">Updated</a></li>
                    </ul>
                  </div>
                </div>
                <div>
                  {logsData.map((log, idx) => (
                    <div key={idx} className="mb-4">
                      <div className="fw-bold mb-2">{log.date}</div>
                      {/* Files (if any) */}
                      {log.files && log.files.map((file, i) => (
                        <div key={i} className="d-flex align-items-center bg-light rounded px-2 py-1 mb-1" style={{ maxWidth: 500 }}>
                          <i className="bi bi-paperclip me-2"></i>
                          <span className="text-primary" style={{ cursor: "pointer" }}>{file.name}</span>
                        </div>
                      ))}
                      {/* Entries */}
                      <ul className="list-unstyled ms-3">
                        {log.entries.map((entry, i) => (
                          <li key={i} className="mb-2">
                            <span className="fw-semibold">{entry.text}</span>
                            <br />
                            <span className="text-muted small">
                              by {entry.by} @ {entry.time}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Daily logs tab content */}
            {logsTab === "daily" && (
              <div>
                <div className="text-center py-5">
                  <img src="https://img.icons8.com/ios/100/000000/document--v1.png" alt="No activity" width={80} />
                  <h5 className="mt-3">No activity for today</h5>
                  <button className="btn btn-success mt-2" onClick={() => setShowDailyLogModal(true)}>
                    Create log
                  </button>
                </div>
                {/* Modal for Create Log */}
                <Modal
                  show={showDailyLogModal}
                  onHide={() => setShowDailyLogModal(false)}
                  size="xl"
                  centered
                  backdrop="static"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Daily Log - TUE 6/10/25</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="d-flex flex-wrap align-items-center border-bottom pb-3 mb-3">
                      <div className="col text-center">
                        <div className="text-muted small">Phases with activity</div>
                        <div className="fw-bold fs-4">NA</div>
                      </div>
                      <div className="col text-center">
                        <div className="text-muted small">Resources on site</div>
                        <div className="fw-bold fs-4">NA</div>
                      </div>
                      <div className="col text-center">
                        <div className="text-muted small">Resource hours on site</div>
                        <div className="fw-bold fs-4">NA</div>
                      </div>
                      <div className="col text-center">
                        <div className="text-muted small">
                          <span role="img" aria-label="humidity">💧</span> High
                        </div>
                        <div className="fw-bold fs-4">70°F</div>
                        <div className="text-muted small">Low</div>
                        <div className="fw-bold fs-4">62°F</div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h5 className="fw-bold">Phases</h5>
                      <div className="text-muted">No phase activity for today.</div>
                    </div>
                    <div className="mb-4">
                      <h4 className="fw-bold">Project details</h4>
                      <h6 className="fw-bold">Resources on site</h6>
                      <div className="text-muted mb-2">No resources on site activity for today.</div>
                      <h6 className="fw-bold">Notes</h6>
                      <textarea
                        className="form-control mb-3"
                        rows={4}
                        placeholder="Type here"
                        value={logNotes}
                        onChange={e => setLogNotes(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <h5 className="fw-bold">Project photos & documents</h5>
                      <div className="text-muted mb-2">No project photos activity for today.</div>
                      <Dropdown>
                        <Dropdown.Toggle variant="light" size="sm">
                          + Add photos & documents
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Add photo</Dropdown.Item>
                          <Dropdown.Item>Add document</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="mb-4">
                      <h5 className="fw-bold">Log comments</h5>
                      <div className="text-muted">No log comments activity for today.</div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="light" onClick={() => setShowDailyLogModal(false)}>
                      Cancel
                    </Button>
                    <Button variant="success" onClick={() => setShowDailyLogModal(false)}>
                      Save
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            )}
          </div>
        );

      case "Activity":
        return (
          <div className="tab-content-box">
            {/* Totals Section */}
            <div className="row text-center border-bottom pb-3 mb-3">
              {[
                { label: "Materials", note: "w/ open POs" },
                { label: "Labor", note: "w/ open POs" },
                { label: "Subs", note: "w/ open POs" },
                { label: "Invoices", note: "w/ deposits & taxes, ex. drafts" }
              ].map((item, index) => (
                <div className="col-md-3" key={index}>
                  <div><strong>$0.00</strong></div>
                  <small className="text-muted">{item.note}</small>
                </div>
              ))}
            </div>

            {/* Filters and Export */}
            <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
              <div className="input-group" style={{ maxWidth: 220 }}>
                <span className="input-group-text">
                  <i className="bi bi-calendar-event"></i>
                </span>
                <input type="text" className="form-control" value="6/10/24 - 6/30/25" readOnly />
              </div>

              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  View: All
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">All</a></li>
                  <li><a className="dropdown-item" href="#">Filtered</a></li>
                </ul>
              </div>

              <button className="btn btn-outline-secondary">
                <i className="bi bi-file-earmark-arrow-down me-1"></i> Export
              </button>
            </div>

            {/* No Results Message */}
            <div className="bg-light text-center py-5 rounded" style={{ minHeight: '250px' }}>
              <i className="bi bi-search fs-1 text-muted"></i>
              <h5 className="mt-3">No results</h5>
              <p className="text-muted">There is no activity that match your search criteria</p>
            </div>
          </div>
        );

      case "Reports":
        return (
          <div className="tab-content-box container">
            {/* Overall Performance */}
            <div className="mb-4">
              <h5 className="fw-bold">Overall Performance</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <a href="#" className="text-primary fw-semibold d-block">Project Summary</a>
                  <p className="text-muted mb-0">
                    This report contains all the job information and can be used as a closeout document.
                  </p>
                </div>
                <div className="col-md-6 mb-3">
                  <a href="#" className="text-primary fw-semibold d-block">Profit and Loss (P&amp;L)</a>
                  <p className="text-muted mb-0">
                    This report provides budget and progress information based on the current status of the job, 
                    offering insights on budget variance. It doesn't take into account WIP for profit calculations.
                  </p>
                </div>
              </div>
            </div>

            {/* Labor, Subs & Equipment */}
            <div className="mb-4">
              <h5 className="fw-bold">Labor, Subs &amp; Equipment</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <a href="#" className="text-primary fw-semibold d-block">Labor Hours Report</a>
                  <p className="text-muted mb-0">
                    This report provides a breakdown of labor hours by employee and phase.
                  </p>
                </div>
                <div className="col-md-6 mb-3">
                  <a href="#" className="text-primary fw-semibold d-block">Subcontractor Summary</a>
                  <p className="text-muted mb-0">
                    This report provides a summary of all subcontractor work and payments.
                  </p>
                </div>
              </div>
            </div>

            {/* Financial Reports */}
            <div className="mb-4">
              <h5 className="fw-bold">Financial Reports</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <a href="#" className="text-primary fw-semibold d-block">AIA G702/G703</a>
                  <p className="text-muted mb-0">
                    Standard AIA billing forms for construction projects.
                  </p>
                </div>
                <div className="col-md-6 mb-3">
                  <a href="#" className="text-primary fw-semibold d-block">Cost Code Summary</a>
                  <p className="text-muted mb-0">
                    Detailed breakdown of costs by cost code.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="wwd-container container">
      {/* Back Button */}
      <div className="mb-2">
        <Button variant="outline-secondary mt-1" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-1" /> Back
        </Button>
      </div>

      {!isEditing ? (
        <>
          {/* Header */}
          <div className="wwd-header d-flex justify-content-between align-items-center py-3">
            <div>
              <h4 className="mb-0">Wally World Parking Lot</h4>
              <p className="text-muted small">For Griswold Enterprises</p>
            </div>
          </div>

          {/* Tabs */}
          <ul className="nav nav-tabs wwd-tabs mb-4">
            {[
              "Summary",
              "Plan & Track",
              stage === "lead"
                ? "Client Proposal"
                : stage === "Active"
                ? "Draft Proposal"
                : "Contract & Change Orders",
              "Documents",
              "Logs",
              "Activity",
              "Reports",
            ].map((tab, i) => (
              <li className="nav-item" key={i}>
                <button
                  className={`nav-link ${activeTab === tab ? "active" : ""}`}
                  style={{ background: "none", border: "none" }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>

          {/* Tab Content */}
          {renderTabContent()}
        </>
      ) : (
        <EditJob
          onCancel={handleCancel}
          onSave={handleSave}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      )}
    </div>
  );
};

export default Editpurposal;