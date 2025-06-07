import React, { useState } from "react";
import "./Detail.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import ClientProposalForm from "./ClientProposalForm";
import Draftpurposal from "./Draftpurposal";

const Detail = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#b5a14f");
  const [activeTab, setActiveTab] = useState("Summary");
  const navigate = useNavigate();
  const location = useLocation();

  const job = location.state;
  console.log(job.p.stage);

  const stage = job.p.stage; // Default to "Draft" if stage is not defined

  const handleEditClick = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => {
    // TODO: Add your save logic here
    setIsEditing(false);
  };

  const colorOptions = [
    "#b5a14f",
    "#4285f4",
    "#34a853",
    "#fbbc05",
    "#e91e63",
    "#9c27b0",
  ];

  const renderTabContent = (stage) => {
    // Handle stage-specific tab rendering
    switch (stage) {
      case "bidding":
        if (activeTab === "Client Proposal") {
          return <ClientProposalForm />;
        }
        break;
      case "lead":
        return <ClientProposalForm />;
      case "Active":
        if (activeTab === "Contract & Change Orders") {
          return (
           <div className="bg-white p-4 rounded shadow-sm mb-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="badge bg-success me-2">Active</span>
              <span className="fw-bold">Fixed price | AIA-style billing</span>
            </div>
            <div>
              <button className="btn btn-success btn-sm me-2">
                Invoice now
              </button>
              <button className="btn btn-link text-dark btn-sm">
                <i className="bi bi-three-dots-vertical"></i>
              </button>
            </div>
          </div>
          {/* Value Summary */}
          <div className="row text-center mb-4">
            <div className="col">
              <div className="text-muted small">Value</div>
              <div className="fw-bold">$264,000.00</div>
            </div>
            <div className="col">
              <div className="text-muted small">Invoiced</div>
              <div className="fw-bold">$45,000.00</div>
            </div>
            <div className="col">
              <div className="text-muted small">Retained</div>
              <div className="fw-bold">$5,000.00</div>
            </div>
          </div>
          {/* Details */}
          <div className="row mb-3">
            <div className="col-md-6">
              <div>
                Attn: <span className="text-muted">n/a</span>
              </div>
              <div>
                GC RFP#: <span className="text-muted">n/a</span>
              </div>
              <div>
                GC Contract#: <span className="text-muted">4235</span>
              </div>
              <div>
                GC contract date: <span className="text-muted">11/1/22</span>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                Estimated start date: <span className="text-muted">n/a</span>
              </div>
              <div>
                Estimated end date: <span className="text-muted">n/a</span>
              </div>
              <div>
                Retainage for work: <span className="text-muted">10%</span>
              </div>
              <div>
                Retainage for materials: <span className="text-muted">10%</span>
              </div>
              <div>
                Payment terms: <span className="text-muted">NET7</span>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <a href="#" className="text-primary small">
              <i className="bi bi-pencil"></i> Edit this information
            </a>
          </div>
          {/* Schedule of Values */}
          <div className="border rounded mb-4">
            <div
              className="border-bottom px-3 py-2 bg-light text-center fw-bold"
              style={{ letterSpacing: "1px" }}
            >
              SCHEDULE OF VALUES
            </div>
            <div className="px-3 py-3 border-bottom">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="fw-bold">1. Demolition / Clear Out</span>
                  <span className="ms-2 text-muted">
                    <i className="bi bi-files"></i>{" "}
                    <i className="bi bi-link-45deg"></i>
                  </span>
                </div>
                <div className="text-end">
                  <div>
                    Value: <span className="fw-bold">$108,000.00</span>
                  </div>
                  <div className="small text-muted">Invoiced: 46.30%</div>
                  <div className="small">Balance: $58,000.00</div>
                </div>
              </div>
            </div>
            <div className="px-3 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="fw-bold">2. Asphalt</span>
                  <span className="ms-2 text-muted">
                    <i className="bi bi-files"></i>{" "}
                    <i className="bi bi-link-45deg"></i>
                  </span>
                </div>
                <div className="text-end">
                  <div>
                    Value: <span className="fw-bold">$156,000.00</span>
                  </div>
                  <div className="small text-muted">Invoiced: 0%</div>
                  <div className="small">Balance: $156,000.00</div>
                </div>
              </div>
            </div>
            <div
              className="px-3 py-3 text-center border-top"
              style={{ background: "#fafbfc" }}
            >
              <button className="btn btn-primary btn-sm">
                Add change order
              </button>
            </div>
          </div>
          {/* Contract Summary Table */}
          <div className="mb-4 p-3 rounded" style={{ background: "#eafbe2" }}>
            <div className="row mb-2">
              <div className="col-8">A1. Original bid Sum:</div>
              <div className="col-4 text-end fw-bold">$264,000.00</div>
            </div>
            <div className="row mb-2">
              <div className="col-8">A2. Original contract sum:</div>
              <div className="col-4 text-end fw-bold">$264,000.00</div>
            </div>
            <div className="row mb-2">
              <div className="col-8">B1. Pending change orders:</div>
              <div className="col-4 text-end fw-bold">$0.00</div>
            </div>
            <div className="row mb-2">
              <div className="col-8">
                B2. Net change by approved change orders:
              </div>
              <div className="col-4 text-end fw-bold">$0.00</div>
            </div>
            <div className="row mb-2">
              <div className="col-8 fw-bold">
                C. Contract sum to date (A1+A2+B1+B2):
              </div>
              <div className="col-4 text-end fw-bold">$264,000.00</div>
            </div>
            <div className="row">
              <div className="col-8 fw-bold">
                D. Approved contract sum to date (A1+B2):
              </div>
              <div className="col-4 text-end fw-bold">$264,000.00</div>
            </div>
          </div>
          {/* Additional Options */}
          <div className="border rounded mb-4">
            <div
              className="border-bottom px-3 py-2 bg-light fw-bold"
              style={{ letterSpacing: "1px" }}
            >
              ADDITIONAL OPTIONS
            </div>
            <div className="px-3 py-3">
              <div className="row align-items-center">
                <div className="col-md-3 col-6">Output style:</div>
                <div className="col-md-6 col-6">
                  <select className="form-select form-select-sm">
                    <option>Display line item subtotals</option>
                    <option>Display summary only</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* Terms and Conditions */}
          <div className="border rounded">
            <div
              className="border-bottom px-3 py-2 bg-light fw-bold"
              style={{ letterSpacing: "1px" }}
            >
              TERMS AND CONDITIONS
            </div>
            <div className="px-3 py-3 small text-muted">
              The above price is valid for 30 days. Test Data agrees that they
              will enter into a standard AIA subcontract with General
              Contractor, and that basic provisions such as insurance and W-9
              shall be in place prior to start.
            </div>
          </div>
        </div>
          );
        }
        break;
      case "Completed":
        return (
          <div className="wwd-completed">
            <h5 className="text-center">Job Completed</h5>
          </div>
        );
      default:
        break;
    }

    // Handle common tabs for all stages
    if (activeTab === "Summary") {
      return (
        <div className="row">
          {/* Left Section */}
          <div className="col-md-7">
            <div className="wwd-section mb-4 p-3">
              <h6>Details</h6>
              <div className="row">
                <div className="col-sm-6">
                  <p>
                    <strong>Job Status:</strong> Active
                  </p>
                  <p>
                    <strong>Job Costing Style:</strong> Professional
                  </p>
                </div>
                <div className="col-sm-6">
                  <p>
                    <strong>Job Type:</strong> Fixed price with aia-style
                    billing
                  </p>
                  <p>
                    <strong>Scheduling Color:</strong>
                    <span
                      className="wwd-scheduling-color-box"
                      style={{ backgroundColor: selectedColor }}
                    ></span>
                  </p>

                  {/* Color palette */}
                  <div className="wwd-color-palette mt-2">
                    {colorOptions.map((color, idx) => (
                      <span
                        key={idx}
                        className={`wwd-color-swatch ${
                          selectedColor === color
                            ? "wwd-color-swatch-selected"
                            : ""
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>
              <p>
                <strong>Tags:</strong>{" "}
                <input
                  type="text"
                  placeholder="Enter tag"
                  className="form-control form-control-sm wwd-tag-input"
                />
              </p>
              <p>
                <strong>Location:</strong> 999 Jamaica Avenue, Brooklyn, NY
                11208, US
              </p>
              <div className="wwd-map">
                <iframe
                  title="Map"
                  src="https://maps.google.com/maps?q=999%20Jamaica%20Avenue%20Brooklyn&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-md-5">
            <div className="wwd-analytics p-4 bg-light rounded shadow-sm position-relative">
              {/* Edit job button inside the Summary tab, top right */}
              <button
                className="btn btn-success position-absolute"
                style={{ top: 16, right: 16, zIndex: 2 }}
                onClick={handleEditClick}
              >
                Edit job
              </button>
              <h6>Tasks</h6>
              <p className="mb-0">Total: 0</p>
              <p>Pending: 0</p>

              <h6 className="mt-4">Analytics</h6>
              <p>
                <strong>Contract value:</strong> $264,000.00
              </p>
              <p>
                <strong>Total Cost Budget:</strong> $176,000.00
              </p>
              <p>
                <strong>Projected Profitability:</strong> 3.33%
              </p>
              <p>
                <strong>Current Profit/Loss:</strong> -$29,400.00
              </p>

              <div className="wwd-circle-loss text-center my-3">
                <div className="wwd-loss-circle">
                  58.80%
                  <br />
                  <small>Loss</small>
                </div>
              </div>

              <div className="wwd-bar-group">
                <h6>
                  Revenue <span className="float-end">$50,000.00</span>
                </h6>
                <div className="wwd-bar wwd-bar-green">
                  <span>Invoiced</span>
                  <div className="wwd-bar-fill" style={{ width: "90%" }}>
                    $45,000.00
                  </div>
                </div>
                <div className="wwd-bar wwd-bar-light">
                  <span>Paid</span>
                  <div className="wwd-bar-fill" style={{ width: "10%" }}>
                    $5,000.00
                  </div>
                </div>
                <div className="wwd-bar wwd-bar-sky">
                  <span>WIP</span>
                  <div className="wwd-bar-fill" style={{ width: "100%" }}>
                    $50,000.00
                  </div>
                </div>
              </div>

              <div className="wwd-bar-group mt-4">
                <h6>
                  Committed Cost <span className="float-end">$79,400.00</span>
                </h6>
                <div className="wwd-bar wwd-bar-yellow">
                  <span>Material Actual</span>
                  <div className="wwd-bar-fill" style={{ width: "25%" }}>
                    $19,400.00
                  </div>
                </div>
                <div className="wwd-bar wwd-bar-yellow">
                  <span>Material Committed</span>
                  <div className="wwd-bar-fill" style={{ width: "30%" }}>
                    $24,000.00
                  </div>
                </div>
                <div className="wwd-bar wwd-bar-pink">
                  <span>Subs Actual</span>
                  <div className="wwd-bar-fill" style={{ width: "30%" }}>
                    $24,000.00
                  </div>
                </div>
                <div className="wwd-bar wwd-bar-pink">
                  <span>Subs Committed</span>
                  <div className="wwd-bar-fill" style={{ width: "45%" }}>
                    $35,000.00
                  </div>
                </div>
              </div>

              <div className="form-check mt-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="customerPortalCheck"
                />
                <label
                  className="form-check-label"
                  htmlFor="customerPortalCheck"
                >
                  Click here to create a portal for this job
                </label>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === "Plan & Track") {
      return (
        <div className="wwd-plantrack bg-white p-4 rounded shadow-sm mb-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="badge bg-success me-2">Active mode</span>
              <span className="fw-bold">Project with 2 phases</span>
            </div>
            <div>
              <button className="btn btn-outline-secondary btn-sm">
                View cost vs. budget
              </button>
            </div>
          </div>
          {/* Budget Summary */}
          <div className="row text-center mb-4">
            <div className="col">
              <div className="text-muted small">Committed</div>
              <div className="fw-bold">$79,400.00</div>
            </div>
            <div className="col">
              <div className="text-muted small">Budget</div>
              <div className="fw-bold">$176,000.00</div>
            </div>
            <div className="col">
              <div className="text-muted small">Materials</div>
              <div className="fw-bold">$29,400.00</div>
            </div>
            <div className="col">
              <div className="text-muted small">Labor</div>
              <div className="fw-bold">$56,000.00</div>
            </div>
            <div className="col">
              <div className="text-muted small">Subs</div>
              <div className="fw-bold">$50,000.00</div>
            </div>
          </div>
          {/* PHASE 1 */}
          <div className="mb-4 border rounded">
            <div className="d-flex justify-content-between align-items-center bg-light px-3 py-2 border-bottom">
              <div className="fw-bold">1. Demolition / Clear Out</div>
              <div>
                <span className="badge bg-success me-2">Active</span>
                <span className="fw-bold">$51,400.00</span>
                <span className="text-muted">/ $72,000.00</span>
              </div>
            </div>
            {/* Materials */}
            <div className="px-3 py-2 border-bottom">
              <div className="fw-bold mb-2">
                Materials{" "}
                <span className="float-end fw-normal">
                  $1,400.00 <span className="text-muted">/ No budget</span>
                </span>
              </div>
              <div className="table-responsive">
                <table className="table table-sm align-middle mb-0">
                  <thead>
                    <tr className="text-muted small">
                      <th>Item description</th>
                      <th>Ordered Qty</th>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4}>
                        <button className="btn btn-outline-primary btn-sm me-2">
                          Create purchase
                        </button>
                        <button className="btn btn-outline-secondary btn-sm">
                          Allocate materials
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Labor */}
            <div className="px-3 py-2 border-bottom">
              <div className="fw-bold mb-2">
                Labor{" "}
                <span className="float-end fw-normal">
                  $0.00 <span className="text-muted">/ $22,000.00</span>
                </span>
              </div>
              <div className="row mb-2">
                <div className="col-6 small">
                  Laborer <span className="float-end">0:00 / 400:00</span>
                </div>
                <div className="col-6 small">
                  Foreman <span className="float-end">0:00 / 120:00</span>
                </div>
              </div>
              <button className="btn btn-outline-primary btn-sm me-2">
                Schedule resources
              </button>
              <button className="btn btn-outline-secondary btn-sm">
                Enter time
              </button>
            </div>
            {/* Subcontractors */}
            <div className="px-3 py-2">
              <div className="fw-bold mb-2">
                Subcontractors{" "}
                <span className="float-end fw-normal">
                  $50,000.00 <span className="text-muted">/ $50,000.00</span>
                </span>
              </div>
              <div className="mb-2">
                <div className="border rounded p-2 bg-light">
                  <span>Cheadle Demolition</span>
                  <span className="float-end fw-bold">
                    $50,000.00{" "}
                    <span className="text-muted small">/ No budget</span>
                  </span>
                </div>
              </div>
              <button className="btn btn-outline-primary btn-sm">
                + Add subcontractor
              </button>
            </div>
          </div>
          {/* PHASE 2 */}
          <div className="mb-4 border rounded">
            <div className="d-flex justify-content-between align-items-center bg-light px-3 py-2 border-bottom">
              <div className="fw-bold">2. Asphalt</div>
              <div>
                <span className="badge bg-warning text-dark me-2">Pending</span>
                <span className="fw-bold">$28,000.00</span>
                <span className="text-muted">/ $104,000.00</span>
              </div>
            </div>
            {/* Materials */}
            <div className="px-3 py-2 border-bottom">
              <div className="fw-bold mb-2">
                Materials{" "}
                <span className="float-end fw-normal">
                  $28,000.00 <span className="text-muted">/ $70,000.00</span>
                </span>
              </div>
              <div className="table-responsive">
                <table className="table table-sm align-middle mb-0">
                  <thead>
                    <tr className="text-muted small">
                      <th>Item description</th>
                      <th>Ordered Qty</th>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a
                          href="#"
                          className="text-primary text-decoration-underline"
                        >
                          DRIVEWAY ASPHALT
                        </a>
                      </td>
                      <td>2000.00 of 10000.00</td>
                      <td>
                        <a
                          href="#"
                          className="text-primary text-decoration-underline"
                        >
                          Multiple
                        </a>
                      </td>
                      <td>$14,000.00 / $70,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button className="btn btn-outline-primary btn-sm me-2">
                Create purchase
              </button>
              <button className="btn btn-outline-secondary btn-sm">
                Allocate materials
              </button>
            </div>
            {/* Labor */}
            <div className="px-3 py-2 border-bottom">
              <div className="fw-bold mb-2">
                Labor{" "}
                <span className="float-end fw-normal">
                  $0.00 <span className="text-muted">/ $34,000.00</span>
                </span>
              </div>
              <div className="row mb-2">
                <div className="col-6 small">
                  Laborer <span className="float-end">0:00 / 600:00</span>
                </div>
                <div className="col-6 small">
                  Foreman <span className="float-end">0:00 / 200:00</span>
                </div>
                <div className="col-6 small">
                  Office manager <span className="float-end">8.05</span>
                </div>
                <div className="col-6 small">
                  NETA Admin <span className="float-end">8.05</span>
                </div>
              </div>
              <button className="btn btn-outline-primary btn-sm me-2">
                Schedule resources
              </button>
              <button className="btn btn-outline-secondary btn-sm">
                Enter time
              </button>
            </div>
            {/* Subcontractors */}
            <div className="px-3 py-2">
              <div className="fw-bold mb-2">
                Subcontractors{" "}
                <span className="float-end fw-normal">
                  $0.00 <span className="text-muted">/ No budget</span>
                </span>
              </div>
              <div className="mb-2 text-muted small">
                No subcontractors to be displayed yet
              </div>
              <button className="btn btn-outline-primary btn-sm">
                + Add subcontractor
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === "Contract & Change Orders") {
      return (
        <div className="bg-white p-4 rounded shadow-sm mb-4">
          <h5>Contract & Change Orders</h5>
          <p>Contract and change orders content goes here.</p>
        </div>
      );
    }

    if (activeTab === "Client Proposal") {
      return <ClientProposalForm />;
    }

    if (activeTab === "Documents") {
      return (
        <div className="bg-white p-4 rounded shadow-sm mb-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">All documents</h4>
            <div>
              <button className="btn btn-success me-2">Upload files</button>
              <button className="btn btn-light border">
                <i className="bi bi-three-dots-vertical"></i>
              </button>
            </div>
          </div>
          {/* Toolbar */}
          <div className="d-flex align-items-center mb-3">
            <button className="btn btn-light border me-2">
              <i className="bi bi-list"></i>
            </button>
            <input
              type="text"
              className="form-control"
              placeholder="Filter by name"
              style={{ maxWidth: 300 }}
            />
          </div>
          {/* Table */}
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th style={{ width: "40px" }}>
                    <input type="checkbox" />
                  </th>
                  <th>
                    Name <i className="bi bi-arrow-up text-primary"></i>
                  </th>
                  <th>
                    Uploaded <i className="bi bi-arrow-up text-primary"></i>
                  </th>
                  <th>Share mobile</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {[1, 2].map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="d-flex align-items-center">
                      Wally World Parking Lot 11/9/2022.pdf
                    </td>
                    <td>5/29/25 8:26 PM</td>
                    <td>
                      <div className="form-check form-switch m-0">
                        <input className="form-check-input" type="checkbox" />
                      </div>
                    </td>
                    <td>
                      <button className="btn btn-link text-dark p-0">
                        <i className="bi bi-three-dots-vertical"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeTab === "Logs") {
      return (
        <div className="bg-white p-4 rounded shadow-sm mb-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
              <span className="badge bg-light text-dark border me-2">Logs</span>
              <span className="badge bg-light text-dark border">
                Daily logs
              </span>
              <span className="ms-3 fw-bold fs-5">Logs</span>
            </div>
            <div>
              <button className="btn btn-success btn-sm me-2">Add log</button>
              <button className="btn btn-light border btn-sm">
                <i className="bi bi-three-dots-vertical"></i>
              </button>
            </div>
          </div>
          {/* Toolbar */}
          <div className="d-flex align-items-center mb-3">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search"
              style={{ maxWidth: 200 }}
            />
            <span className="me-2">View</span>
            <button className="btn btn-light border btn-sm">
              <i className="bi bi-list"></i> All
            </button>
          </div>
          {/* Logs List */}
          <div>
            {/* 6/5/25 */}
            <div className="mb-4">
              <div className="fw-bold mb-2">6/5/25</div>
              <div className="ms-3">
                <div className="mb-1">
                  <span className="text-muted">— </span>
                  <span className="fw-bold">Checked out</span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 5:01 PM
                  </span>
                </div>
                <div className="mb-1">
                  <span className="text-muted">— </span>
                  <span className="fw-bold">Time entry submitted</span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 5:01 PM
                  </span>
                </div>
                <div>
                  <span className="text-muted">— </span>
                  <span className="fw-bold">Checked in</span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 5:01 PM
                  </span>
                </div>
              </div>
            </div>
            {/* 5/29/25 */}
            <div className="mb-4">
              <div className="fw-bold mb-2">5/29/25</div>
              {/* PDF 1 */}
              <div className="d-flex align-items-center mb-2 ms-3">
                <i className="bi bi-file-earmark-pdf text-secondary me-2"></i>
                <span>Wally World Parking Lot 11/9/2022.pdf</span>
              </div>
              {/* PDF 2 */}
              <div className="d-flex align-items-center mb-2 ms-3">
                <i className="bi bi-file-earmark-pdf text-secondary me-2"></i>
                <span>Wally World Parking Lot 11/9/2022.pdf</span>
              </div>
              {/* Log entries */}
              <div className="ms-5">
                <div className="mb-1">
                  <span className="fw-bold fst-italic">Resource allocated</span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 8:26 PM
                  </span>
                </div>
                <div className="mb-1">
                  <span className="fw-bold fst-italic">Resource allocated</span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 8:26 PM
                  </span>
                </div>
                <div className="mb-1">
                  <span className="fw-bold">
                    Phase 'Demolition / Clear Out' marked as active
                  </span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 8:26 PM
                  </span>
                </div>
                <div className="mb-1">
                  <span className="fw-bold">
                    Subcontractor contract made active
                  </span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 8:26 PM
                  </span>
                </div>
                <div className="mb-1">
                  <span className="fw-bold">
                    PO created from subcontractor contract
                  </span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 8:26 PM
                  </span>
                </div>
                <div className="mb-1">
                  <span className="fw-bold">Purchase created</span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 8:26 PM
                  </span>
                </div>
                <div className="mb-1">
                  <span className="fw-bold">Invoice finalized</span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 8:26 PM
                  </span>
                </div>
                <div className="mb-1">
                  <span className="fw-bold">Contract information modified</span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 8:26 PM
                  </span>
                </div>
                <div className="mb-1">
                  <span className="fw-bold">Job made active</span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 8:26 PM
                  </span>
                </div>
                <div className="mb-1">
                  <span className="fw-bold">Proposal saved as draft</span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 8:26 PM
                  </span>
                </div>
                <div className="mb-1">
                  <span className="fw-bold">Job created</span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 8:26 PM
                  </span>
                </div>
                <div className="mb-1">
                  <span className="fw-bold">Bill allocated</span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 8:26 PM
                  </span>
                </div>
                <div className="mb-1">
                  <span className="fw-bold">Bill items re-allocated</span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 8:26 PM
                  </span>
                </div>
                <div className="mb-1">
                  <span className="fw-bold">Bill created</span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 8:26 PM
                  </span>
                </div>
                <div className="mb-1">
                  <span className="fw-bold">Bill allocated</span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 8:26 PM
                  </span>
                </div>
                <div className="mb-1">
                  <span className="fw-bold">Bill items re-allocated</span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 8:26 PM
                  </span>
                </div>
                <div className="mb-1">
                  <span className="fw-bold">Bill created</span>
                  <span className="text-muted small ms-2">
                    by simon Madison @ 8:26 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (activeTab === "Activity") {
      return (
        <div className="bg-white p-4 rounded shadow-sm mb-4">
          {/* Top summary cards */}
          <div className="row text-center mb-4">
            <div className="col">
              <div className="text-muted small">Materials</div>
              <div className="fw-bold">$0.00</div>
              <div className="text-muted small">w/ open POs</div>
            </div>
            <div className="col">
              <div className="text-muted small">Labor</div>
              <div className="fw-bold">$0.00</div>
              <div className="text-muted small">w/ open POs</div>
            </div>
            <div className="col">
              <div className="text-muted small">Subs</div>
              <div className="fw-bold">$0.00</div>
              <div className="text-muted small">w/ open POs</div>
            </div>
            <div className="col">
              <div className="text-muted small">Invoices</div>
              <div className="fw-bold">$0.00</div>
              <div className="text-muted small">
                w/ deposits & taxes, ex. drafts
              </div>
            </div>
          </div>
          {/* Filters and Export */}
          <div className="d-flex align-items-center mb-3 flex-wrap gap-2">
            <input
              type="text"
              className="form-control"
              style={{ maxWidth: 180 }}
              value="6/7/24 - 6/30/25"
              readOnly
            />
            <span>View</span>
            <select
              className="form-select form-select-sm"
              style={{ width: 80 }}
            >
              <option>All</option>
            </select>
            <button className="btn btn-outline-secondary btn-sm ms-2">
              <i className="bi bi-box-arrow-up"></i> Export
            </button>
          </div>
          {/* Table */}
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Details</th>
                  <th>Total</th>
                  <th>To this Job</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>6/5/25</td>
                  <td>
                    Labor
                    <br />
                    <a href="#" className="text-primary text-decoration-none">
                      Time entry
                    </a>
                  </td>
                  <td>Submitted</td>
                  <td>8:05 hours (ST) for NETA Admin</td>
                  <td>$0.00</td>
                  <td className="text-danger fw-bold">$0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    if (activeTab === "Reports") {
      return (
        <div className="bg-white p-4 rounded shadow-sm mb-4">
          {/* Overall Performance */}
          <div className="mb-5">
            <h4 className="fw-bold mb-4">Overall Performance</h4>
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <a
                  href="#"
                  className="fw-bold text-primary fs-5 d-block mb-1"
                  style={{ textDecoration: "none" }}
                >
                  Project Summary
                </a>
                <div className="text-muted">
                  This report contains all the job information and can be used
                  as a closeout document.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <a
                  href="#"
                  className="fw-bold text-primary fs-5 d-block mb-1"
                  style={{ textDecoration: "none" }}
                >
                  Profit and Loss (P&amp;L)
                </a>
                <div className="text-muted">
                  This report provides budget and progress information based on
                  the current status of the job, offering insights on budget
                  variance. It doesn't take into account WIP for profit
                  calculations.
                </div>
              </div>
            </div>
          </div>
          {/* Labor, Subs & Equipment */}
          <div className="mb-5">
            <h4 className="fw-bold mb-4">Labor, Subs &amp; Equipment</h4>
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <a
                  href="#"
                  className="fw-bold text-primary fs-5 d-block mb-1"
                  style={{ textDecoration: "none" }}
                >
                  Time Report
                </a>
                <div className="text-muted">
                  This report lists time recorded against this job. You can
                  select a specific time frame.
                </div>
              </div>
            </div>
          </div>
          {/* Contract & Invoicing */}
          <div>
            <h4 className="fw-bold mb-4">Contract &amp; Invoicing</h4>
            <div className="row mb-4">
              <div className="col-md-3 mb-3">
                <a
                  href="#"
                  className="fw-bold text-primary fs-5 d-block mb-1"
                  style={{ textDecoration: "none" }}
                >
                  Contract Summary
                </a>
                <div className="text-muted">
                  This report includes all contract items and change orders,
                  with their status and value. It does not include progress
                  billing information.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <a
                  href="#"
                  className="fw-bold text-primary fs-5 d-block mb-1"
                  style={{ textDecoration: "none" }}
                >
                  Progress Billing
                </a>
                <div className="text-muted">
                  This report includes approved contract items and their
                  progress billing status.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <a
                  href="#"
                  className="fw-bold text-primary fs-5 d-block mb-1"
                  style={{ textDecoration: "none" }}
                >
                  Advanced Progress Billing
                </a>
                <div className="text-muted">
                  This report includes approved contract items and their
                  progress billing status, with invoice resolution.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <a
                  href="#"
                  className="fw-bold text-primary fs-5 d-block mb-1"
                  style={{ textDecoration: "none" }}
                >
                  Job Invoices &amp; Payments
                </a>
                <div className="text-muted">
                  This report lists all invoices and payments for this job.
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    // Placeholder for other tabs
    return <div className="text-muted p-4">No data available.</div>;
  };

  return (
    <div className="wwd-container container">
      {/* Back Button above heading */}
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
              "Contract & Change Orders",
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
          {renderTabContent(stage)}
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

export default Detail;
