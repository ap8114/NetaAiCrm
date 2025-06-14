import React, { useState, useEffect } from 'react';
import { Button, Form, Dropdown, ButtonGroup, Badge, Container, Row, Col, ProgressBar, Modal } from 'react-bootstrap';
import { FunnelFill, Link, List } from 'react-bootstrap-icons';
import { Kanban, Plus } from 'react-bootstrap-icons';
import { FaArrowLeft } from "react-icons/fa"; // Add this import
import { useNavigate } from "react-router-dom";


import './Jobs.css';

// --- Kanban Workflow Data ---
const initialStages = [
  { id: 'create-proposal', title: 'Create Proposal' },
  { id: 'client-review', title: 'Client Review' }, // Changed from 'automatic-delivery'
  { id: 'client-signing', title: 'Contract Signing' },
  { id: 'auto-activation', title: 'Auto-Activation' }
];

const initialProposals = [
  {
    id: 'p1',
    title: 'Proposal for Sunrise Apartments',
    client: 'Ramesh Kumar',
    status: 'Draft',
    stage: 'create-proposal',
    updated: '2025-06-07 10:30',
    logs: [
      { by: 'Admin', at: '2025-06-07 10:30', note: 'Created proposal' }
    ]
  },
  {
    id: 'p2',
    title: 'Proposal for Metro Mall',
    client: 'Sunita Singh',
    status: 'Sent',
    stage: 'client-review', // was 'automatic-delivery'
    updated: '2025-06-07 11:00',
    logs: [
      { by: 'Admin', at: '2025-06-07 10:45', note: 'Proposal sent via email' }
    ]
  },
  {
    id: 'p3',
    title: 'Proposal for Greenfield School',
    client: 'Ajay Mehra',
    status: 'Awaiting Signature',
    stage: 'client-signing',
    updated: '2025-06-07 11:30',
    logs: [
      { by: 'Client', at: '2025-06-07 11:25', note: 'Opened email' }
    ]
  }
];

const projects = [
  {
    name: "Sunrise Apartments (Plus)",
    client: "Ramesh Kumar",
    billing: "Fixed Price",
    phases: "2 phases",
    status: "lead",
    revenue: "$120,000.00",
    committedCost: "$80,000.00",
    profitLoss: "$40,000.00",
    percent: "33%",
    color: "primary"
  },
  {
    name: "Metro Mall Renovation",
    client: "Sunita Singh",
    billing: "AIA-style",
    phases: "1 phase",
    status: "Active",
    revenue: "$15,000.00",
    committedCost: "$7,500.00",
    profitLoss: "$7,500.00",
    percent: "50%",
    color: "info"
  },
  {
    name: "Greenfield School",
    client: "Ajay Mehra",
    billing: "Cost Plus",
    phases: "3 phases",
    status: "Active",
    revenue: "$290,000.00",
    committedCost: "$193,400.00",
    profitLoss: "$96,600.00",
    percent: "33%",
    color: "danger"
  },
  {
    name: "Greenfield School",
    client: "Ajay Mehra",
    billing: "Cost Plus",
    phases: "3 phases",
    status: "Biding",
    revenue: "$290,000.00",
    committedCost: "$193,400.00",
    profitLoss: "$96,600.00",
    percent: "33%",
    color: "danger"
  }
];

// --- Proposal Creation Modal ---
const ProposalCreationModal = ({ show, onHide, onSave }) => {
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [details, setDetails] = useState('');

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create/Edit Proposal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Proposal Title</Form.Label>
            <Form.Control value={title} onChange={e => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Client Name</Form.Label>
            <Form.Control value={client} onChange={e => setClient(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Bid/Proposal Details</Form.Label>
            <Form.Control as="textarea" rows={3} value={details} onChange={e => setDetails(e.target.value)} />
          </Form.Group>
          <div className="d-flex gap-2 mt-3">
            <Button variant="outline-primary" onClick={() => alert('Text Bid sent!')}>Text Bid</Button>
            <Button variant="primary" onClick={() => alert('Email Bid sent!')}>Email Bid</Button>
          </div>
        </Form>
        <div className="mt-4">
          <h6>Preview</h6>
          <div className="border rounded p-2 bg-light">
            <strong>{title || 'Proposal Title'}</strong>
            <div>{client || 'Client Name'}</div>
            <div className="text-muted small">{details || 'Proposal details preview...'}</div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={() => { onSave({ title, client, details }); onHide(); }}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

// --- Proposal Card ---
const ProposalCard = ({ proposal, onShowLogs }) => (
  <div className="bg-white border rounded mb-2 p-2 shadow-sm" style={{ minHeight: 110 }}>
    <div className="fw-semibold">{proposal.title}</div>
    <div className="text-muted small">{proposal.client}</div>
    <div className="small">Status: <span className="fw-bold">{proposal.status}</span></div>
    <div className="small text-muted">Last updated: {proposal.updated}</div>
    <Button size="sm" variant="link" className="p-0 mt-1" onClick={() => onShowLogs(proposal.logs)}>
      Stage logs
    </Button>
  </div>
);

// --- Replace ProposalWorkflowBoard with this Knowify-style Kanban ---

const knowifyStages = [
  { id: 'lead', title: 'Lead', color: 'dark' },
  { id: 'bidding', title: 'Bidding', color: 'dark' },
  { id: 'out-for-signature', title: 'Out for signature', color: 'dark' },
  { id: 'proposal-expired', title: 'Proposal expired', color: 'dark' },
  { id: 'active', title: 'Active', color: 'dark' },
  { id: 'pending-changes', title: 'Pending changes', color: 'dark' },
  { id: 'closed', title: 'Closed', color: 'dark' },
  { id: 'rejected', title: 'Rejected', color: 'dark' }
];

const ProposalWorkflowBoard = ({ proposals, onNavigate }) => {
  const [draggedId, setDraggedId] = useState(null);

  // Drag handlers
  const onDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDrop = (e, stageId) => {
    e.preventDefault();
    setProposals(proposals =>
      proposals.map(p =>
        p.id === draggedId ? { ...p, stage: stageId } : p
      )
    );
    setDraggedId(null);
  };

  const onDragOver = e => {
    e.preventDefault();
  };

  return (
    <div className="kanban-board d-flex gap-3 py-3" style={{ overflowX: 'auto', minHeight: 350 }}>
      {knowifyStages.map(stage => (
        <div
          key={stage.id}
          className="kanban-stage bg-light border rounded p-2 flex-shrink-0"
          style={{ minWidth: 220, maxWidth: 260, minHeight: 320 }}
          onDrop={e => onDrop(e, stage.id)}
          onDragOver={onDragOver}
        >
          <div className="fw-bold mb-2 d-flex align-items-center gap-2">
            <span className={`text-${stage.color}`} style={{ fontSize: 14 }}>
              <span className="me-1" style={{ fontSize: 10 }}>●</span>
              {stage.title}
            </span>
            <span className="badge bg-light text-dark border ms-auto">
              {
                proposals.filter(p => p.stage === stage.id).length > 0
                  ? proposals.filter(p => p.stage === stage.id).length
                  : ''
              }
            </span>
          </div>
          {proposals.filter(p => p.stage === stage.id).map(p => (
            <div
              key={p.id}
              className="bg-white border rounded mb-2 p-2 shadow-sm"
              draggable
              onDragStart={e => onDragStart(e, p.id)}
              style={{ cursor: 'grab', opacity: draggedId === p.id ? 0.5 : 1 }}
            >
              <div className="fw-semibold text-primary" style={{ cursor: 'pointer', fontSize: 15 }}>
                {p.title}
              </div>
              {p.type === 'proposal' && (
                <Button
                  size="sm"
                  variant="outline-secondary"
                  className="mt-1"
                  onClick={() => onNavigate('/detail')}
                >
                  Edit proposal
                </Button>
              )}
              {p.type === 'invoice' && (
                <Button size="sm" variant="outline-secondary" className="mt-1">Invoice</Button>
              )}
              {p.type === 'view' && (
                <Button size="sm" variant="outline-secondary" className="mt-1">View</Button>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const ReportsDashboard = () => {
  const reports = [
    {
      title: "Backlog Report",
      description: "Report with backlog information, including contract value and labor"
    },
    {
      title: "Basic Jobs Report",
      description: "Output with all the company jobs, with contract information when applicable"
    },
    {
      title: "Advanced Jobs Report",
      description: "Report with all the company jobs, including P&L information"
    },
    {
      title: "Contract Progress Report",
      description: "Report with all contract items in active Fixed Price jobs"
    },
    {
      title: "Job Purchases Report",
      description: "Report with all materials estimated and ordered across all the company jobs"
    },
    {
      title: "GC Report",
      description: "Report with all the Fixed Price (AIA-style billing) proposals"
    },
    {
      title: "Owner Report",
      description: "Report with all the Fixed Price (regular billing) proposals"
    },
    {
      title: "Sales",
      description: "Report with all Fixed Price contract jobs grouped by sales lead"
    },
    {
      title: "Change Order Report",
      description: "Report with all the company change orders"
    }
  ];

  return (
    <div className="container py-4 bg-white">
      <div className="row">
        <div className="col-12">
          {reports.map((report, index) => (
            <div key={index} className="mb-4">
              <h6 className="text-primary fw-semibold">{report.title}</h6>
              <p className="text-muted small mb-0">{report.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const NewContractJobPage = ({ onClose, onSave }) => {
  const [jobName, setJobName] = useState('');
  const [clientName, setClientName] = useState('Bob Belcher');
  const [billingType, setBillingType] = useState('fixed-price');
  const [tags, setTags] = useState('');
  const [bidDueDate, setBidDueDate] = useState('06/10/25');
  const [schedulingColor, setSchedulingColor] = useState('yellow');
  const [salesLead, setSalesLead] = useState('');
  const [projectManager, setProjectManager] = useState('');
  const [address, setAddress] = useState('');
  const [aptSuite, setAptSuite] = useState('');

  // Save handler (shared by both buttons)
  const handleSave = () => {
    if (onSave) {
      onSave({
        jobName,
        clientName,
        billingType,
        tags,
        bidDueDate,
        schedulingColor,
        salesLead,
        projectManager,
        address,
        aptSuite
      });
    }
    onClose();
  };

  const handleDiscard = () => {
    onClose();
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="bg-white border-bottom shadow-sm">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-3 px-4">
            <div className="d-flex align-items-center">
              <button
                type="button"
                className="btn btn-light me-3 p-2"
                onClick={onClose}
              >x
              </button>
              <h2 className="mb-0 fw-semibold">New contract job</h2>
            </div>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleDiscard}
              >
                Discard
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save Job
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="bg-white rounded shadow-sm p-4">
              <div className="row g-4">
                <div className="col-12">
                  <label className="form-label fw-semibold">Job Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={jobName}
                    onChange={(e) => setJobName(e.target.value)}
                    style={{ maxWidth: '500px' }}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Client Name <span className="text-danger">*</span>
                  </label>
                  <div className="position-relative" style={{ maxWidth: '500px' }}>
                    <input
                      type="text"
                      className="form-control"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold mb-3">Which of these best describes the job?</label>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <div
                        className={`card h-100 ${billingType === 'fixed-price' ? 'border-primary border-2' : 'border'}`}
                        onClick={() => setBillingType('fixed-price')}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="card-body p-3">
                          <p className="card-text small mb-3">
                            We are performing work for a <strong>lump sum</strong> and we will bill for it on
                            a <strong>percent completion basis</strong>. Change orders will be applied as
                            necessary.
                          </p>
                          <div className="text-center">
                            <span className="badge bg-primary">Fixed Price</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div
                        className={`card h-100 ${billingType === 'fixed-price-aia' ? 'border-primary border-2' : 'border'}`}
                        onClick={() => setBillingType('fixed-price-aia')}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="card-body p-3">
                          <p className="card-text small mb-3">
                            We are working for a commercial GC or government and expect to
                            bill with <strong>AIA-style</strong> applications for payment. Change orders will be
                            applied as necessary.
                          </p>
                          <div className="text-center">
                            <span className="badge bg-primary">Fixed Price with AIA-style billing</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div
                        className={`card h-100 ${billingType === 'cost-plus' ? 'border-primary border-2' : 'border'}`}
                        onClick={() => setBillingType('cost-plus')}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="card-body p-3">
                          <p className="card-text small mb-3">
                            It is a <strong>time and materials job</strong> or something else requiring custom
                            pricing tools. If a change is required, a whole new contract will
                            be produced.
                          </p>
                          <div className="text-center">
                            <span className="badge bg-secondary">Cost plus / other</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted small mt-2">
                    * This job will use the default job costing mode. Click <a href="#" className="text-primary">here</a> in case you look for more advanced options.
                  </p>
                </div>

                <div className="col-12">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" id="setTags" defaultChecked />
                        <label className="form-check-label fw-semibold" htmlFor="setTags">
                          Set Tags
                        </label>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter tag"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <div className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" id="setBidDate" defaultChecked />
                        <label className="form-check-label fw-semibold" htmlFor="setBidDate">
                          Set Bid Due Date
                        </label>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        value={bidDueDate}
                        onChange={(e) => setBidDueDate(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <div className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" id="setColor" defaultChecked />
                        <label className="form-check-label fw-semibold" htmlFor="setColor">
                          Set Scheduling Color
                        </label>
                      </div>
                      <select
                        className="form-select"
                        value={schedulingColor}
                        onChange={(e) => setSchedulingColor(e.target.value)}
                        style={{ backgroundColor: 'blue' }}
                      >
                        <option value="yellow">Yellow</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <div className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" id="setSalesLead" defaultChecked />
                        <label className="form-check-label fw-semibold" htmlFor="setSalesLead">
                          Set Sales Lead
                        </label>
                      </div>
                      <select
                        className="form-select"
                        value={salesLead}
                        onChange={(e) => setSalesLead(e.target.value)}
                      >
                        <option value="">Select Sales Lead</option>
                        <option value="john">John Doe</option>
                        <option value="jane">Jane Smith</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <div className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" id="setProjectManager" defaultChecked />
                        <label className="form-check-label fw-semibold" htmlFor="setProjectManager">
                          Set Project Manager
                        </label>
                      </div>
                      <select
                        className="form-select"
                        value={projectManager}
                        onChange={(e) => setProjectManager(e.target.value)}
                      >
                        <option value="">Select Project Manager</option>
                        <option value="mike">Mike Johnson</option>
                        <option value="sarah">Sarah Wilson</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <div className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" id="setJobAddress" defaultChecked />
                        <label className="form-check-label fw-semibold" htmlFor="setJobAddress">
                          Set Job Address
                        </label>
                      </div>
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label small text-muted">Address</label>
                          <textarea
                            className="form-control"
                            rows="2"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                          <small className="text-primary">Search again. Enter manually</small>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small text-muted">Apt, Suite, etc. (optional)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={aptSuite}
                            onChange={(e) => setAptSuite(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* --- Blue Save Job button at the bottom --- */}
                <div className="col-12 d-flex justify-content-end mt-4">
                  <button
                    type="button"
                    className="btn btn-primary px-4"
                    onClick={handleSave}
                  >
                    Save Job
                  </button>
                </div>
                {/* --- End Save Job button --- */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChangeOrdersUI = () => {
  const [activeTab, setActiveTab] = useState('change-orders');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-white min-vh-100">
      {/* Navigation Tabs */}
      <div className="bg-white">
        <div className="container-fluid px-3 pt-3">
          <div className="d-flex gap-1">
            <button
              className={`btn btn-sm px-3 py-2 rounded-1 border-0 fw-medium ${activeTab === 'change-orders'
                ? 'bg-dark text-white'
                : 'bg-light text-secondary'
                }`}
              onClick={() => setActiveTab('change-orders')}
            >
              Change orders
            </button>
            <button
              className={`btn btn-sm px-3 py-2 rounded-1 border-0 fw-medium ${activeTab === 'daily-logs'
                ? 'bg-dark text-white'
                : 'bg-light text-secondary'
                }`}
              onClick={() => setActiveTab('daily-logs')}
            >
              Daily logs
            </button>
            <button
              className={`btn btn-sm px-3 py-2 rounded-1 border-0 fw-medium ${activeTab === 'phases'
                ? 'bg-dark text-white'
                : 'bg-light text-secondary'
                }`}
              onClick={() => setActiveTab('phases')}
            >
              Phases
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white border-top border-bottom">
        <div className="container-fluid px-3 py-3">
          <div className="row align-items-center">
            <div className="col-md-4">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control border border-secondary rounded-1 ps-2"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '14px' }}
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="d-flex justify-content-start gap-2 ms-2">
                <button className="btn btn-outline-secondary btn-sm border border-secondary rounded-1 px-2 py-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </button>
                <button className="btn btn-outline-secondary btn-sm border border-secondary rounded-1 px-2 py-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Counter */}
      <div className="bg-white border-bottom">
        <div className="container-fluid px-3 py-2">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted" style={{ fontSize: '13px' }}>0 of 0</span>
            <div className="d-flex gap-1">
              <button className="btn btn-link btn-sm text-muted p-1 border-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
              </button>
              <button className="btn btn-link btn-sm text-muted p-1 border-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Empty State */}
      <div className="container-fluid px-3">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '400px' }}>
              {/* Search Icon */}
              <div className="mb-4">
                <div
                  className="rounded-circle border border-2 border-dark d-flex align-items-center justify-content-center bg-white"
                  style={{ width: '80px', height: '80px' }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </div>
              </div>

              {/* No Results Message */}
              <h4 className="fw-bold text-dark mb-3" style={{ fontSize: '24px' }}>No results</h4>
              <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
                There are no change orders to be displayed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContractJobs = () => {
  const [showNewContractPage, setShowNewContractPage] = useState(false);
  const [activeTab, setActiveTab] = useState('manage');
  const [workflowView, setWorkflowView] = useState('list');
  const [jobs, setJobs] = useState([
    {
      name: "Sunrise Apartments (Plus)",
      client: "Ramesh Kumar",
      billing: "Fixed Price",
      phases: "2 phases",
      status: "Active",
      revenue: "$120,000.00",
      committedCost: "$80,000.00",
      profitLoss: "$40,000.00",
      percent: "33%",
      color: "primary"
    },
    {
      name: "Metro Mall Renovation",
      client: "Sunita Singh",
      billing: "AIA-style",
      phases: "1 phase",
      status: "Active",
      revenue: "$15,000.00",
      committedCost: "$7,500.00",
      profitLoss: "$7,500.00",
      percent: "50%",
      color: "info"
    },
    {
      name: "Greenfield School",
      client: "Ajay Mehra",
      billing: "Cost Plus",
      phases: "3 phases",
      status: "Active",
      revenue: "$290,000.00",
      committedCost: "$193,400.00",
      profitLoss: "$96,600.00",
      percent: "33%",
      color: "danger"
    }
  ]);
  const [workflowProposals, setWorkflowProposals] = useState([
    // Initial proposals for workflow board
    { id: 1, title: 'Restaurant Painting', stage: 'bidding', type: 'proposal' },
    { id: 2, title: 'Wally World Parking Lot', stage: 'active', type: 'invoice' },
    { id: 3, title: 'New Home (Cost Plus)', stage: 'active', type: 'invoice' },
    { id: 4, title: 'Kitchen Remodel (Fixed Price)', stage: 'active', type: 'invoice' },
    { id: 5, title: 'fsdgbeehb', stage: 'closed', type: 'view' },
    { id: 6, title: 'Lighting Install', stage: 'closed', type: 'view' },
    { id: 7, title: 'Lighting Install', stage: 'lead', type: 'Create purposal' }
  ]);
  const navigate = useNavigate();

  // Add new job handler
  const handleAddNewContract = () => {
    setShowNewContractPage(true);
  };

  // Save new job and close form
  const handleSaveNewContract = (newJob) => {
    // 1. Add to jobs list with status 'lead'
    setJobs(prev => [
      {
        name: newJob.jobName,
        client: newJob.clientName,
        billing: newJob.billingType === "fixed-price" ? "Fixed Price" : newJob.billingType === "fixed-price-aia" ? "AIA-style" : "Cost Plus",
        phases: "1 phase",
        status: "lead", // <-- Set status to 'lead'
        revenue: "$0.00",
        committedCost: "$0.00",
        profitLoss: "$0.00",
        percent: "0%",
        color: "primary"
      },
      ...prev
    ]);
    // 2. Add to workflow board in 'lead' stage
    setWorkflowProposals(prev => [
      {
        id: Date.now(),
        title: newJob.jobName,
        stage: 'lead',
        type: 'proposal'
      },

      ...prev
    ]);
    setShowNewContractPage(false);
    setWorkflowView('workflow'); // Switch to workflow view
  };

  const handleCloseNewContract = () => {
    setShowNewContractPage(false);
  };

  // Pass workflowProposals to ProposalWorkflowBoard
  const ProposalWorkflowBoard = () => {
    const [proposals, setProposals] = useState(workflowProposals);
    const [draggedId, setDraggedId] = useState(null);

    useEffect(() => {
      setProposals(workflowProposals);
    }, [workflowProposals]);

    // Drag handlers
    const onDragStart = (e, id) => {
      setDraggedId(id);
      e.dataTransfer.effectAllowed = "move";
    };

    const onDrop = (e, stageId) => {
      e.preventDefault();
      setProposals(proposals =>
        proposals.map(p =>
          p.id === draggedId ? { ...p, stage: stageId } : p
        )
      );
      setDraggedId(null);
    };

    const onDragOver = e => {
      e.preventDefault();
    };

    return (
      <div className="kanban-board d-flex gap-3 py-3" style={{ overflowX: 'auto', minHeight: 350 }}>
        {knowifyStages.map(stage => (
          <div
            key={stage.id}
            className="kanban-stage bg-light border rounded p-2 flex-shrink-0"
            style={{ minWidth: 220, maxWidth: 260, minHeight: 320 }}
            onDrop={e => onDrop(e, stage.id)}
            onDragOver={onDragOver}
          >
            <div className="fw-bold mb-2 d-flex align-items-center gap-2">
              <span className={`text-${stage.color}`} style={{ fontSize: 14 }}>
                <span className="me-1" style={{ fontSize: 10 }}>●</span>
                {stage.title}
              </span>
              <span className="badge bg-light text-dark border ms-auto">
                {
                  proposals.filter(p => p.stage === stage.id).length > 0
                    ? proposals.filter(p => p.stage === stage.id).length
                    : ''
                }
              </span>
            </div>
            {proposals.filter(p => p.stage === stage.id).map(p => (
              <div
                key={p.id}
                className="bg-white border rounded mb-2 p-2 shadow-sm"
                draggable
                onDragStart={e => onDragStart(e, p.id)}
                style={{ cursor: 'grab', opacity: draggedId === p.id ? 0.5 : 1 }}
              >
                <div className="fw-semibold text-primary" style={{ cursor: 'pointer', fontSize: 15 }}>
                  {p.title}
                </div>
                {p.type === 'proposal' && (
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    className="mt-1"
                    onClick={() => navigate('/detail', { state: { p } })}
                  >
                    Edit proposal
                  </Button>
                )}
                {p.type === 'invoice' && (
                  <Button size="sm" variant="outline-secondary" className="mt-1" onClick={() => navigate('/detail', { state: { p } })}
                  >Invoice</Button>
                )}
                {p.type === 'view' && (
                  <Button size="sm" variant="outline-secondary" className="mt-1" onClick={() => navigate('/detail', { state: { p } })}>View</Button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'reports':
        return <ReportsDashboard />;
      case 'coordination':
        return <ChangeOrdersUI />;
      case 'manage':
      default:
        return (
          <>
            <div className="filters-bar px-4 py-3">
              <div className="d-flex flex-wrap gap-2 align-items-center">
                {/* --- Dropdown for List/Contract workflow --- */}
                <Dropdown as={ButtonGroup}>
                  <Button
                    variant="light"
                    className="list-btn bg-white d-flex align-items-center"
                  >
                    {workflowView === 'workflow' ? <Kanban className="me-1" /> : <List className="me-1" />}
                    {workflowView === 'workflow' ? 'Contract workflow' : 'List'}
                  </Button>
                  <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />
                  <Dropdown.Menu>
                    <Dropdown.Item
                      active={workflowView === 'list'}
                      onClick={() => setWorkflowView('list')}
                      className="d-flex align-items-center"
                    >
                      <List className="me-2" /> List
                    </Dropdown.Item>
                    <Dropdown.Item
                      active={workflowView === 'workflow'}
                      onClick={() => setWorkflowView('workflow')}
                      className="d-flex align-items-center"
                    >
                      <Kanban className="me-2" /> Contract workflow
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item disabled className="d-flex align-items-center text-muted">
                      <Plus className="me-2" /> Add workflow
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Form.Control type="text" placeholder="Search" className="search-box" />

                <Button variant="light" className="view-btn">sf</Button>

                <Dropdown as={ButtonGroup}>
                  <Button variant="light">Lead +5</Button>
                  <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />
                  <Dropdown.Menu>
                    <Dropdown.Item>Lead</Dropdown.Item>
                    <Dropdown.Item>Lead +2</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Button variant="light" className="filter-icon">
                  <FunnelFill />
                </Button>

                <Form.Check type="checkbox" label="Show tags" className="text-muted" />
              </div>

              <div className="pagination-info text-end">
                1-6 of 6
                <Button variant="light" size="sm" className="ms-2">&lt;</Button>
                <Button variant="light" size="sm" className="ms-1">&gt;</Button>
              </div>
            </div>

            {/* --- Switch between List and Workflow views --- */}
            {workflowView === 'workflow' ? (
              <ProposalWorkflowBoard proposals={workflowProposals} onNavigate={navigate} />
            ) : (
              <div className="bg-white py-3 p-4">
                <Row className="fw-bold border-bottom pb-2 mb-3">
                  <Col md={4}>Project details</Col>
                  <Col md={1}>Status</Col>
                  <Col md={2}>Revenue</Col>
                  <Col md={2}>Committed Cost</Col>
                  <Col md={3}>Profit/Loss</Col>
                </Row>
                {jobs.map((project, index) => (
                  <Row key={index} className="align-items-start border-bottom py-3">
                    <Col md={4}>

                      <div className="fw-bold"><a href="/detail">{project.name}</a></div>

                      <div className="text-muted">for {project.client}</div>
                      <div className="text-muted small">{project.billing} — {project.phases}</div>
                      <Button variant="outline-secondary" size="sm" className="mt-2">Invoice now</Button>
                    </Col>
                    <Col md={1}>
                      <Badge bg="primary">{project.status}</Badge>
                    </Col>
                    <Col md={2}>
                      <div>{project.revenue}</div>
                      {project.revenue !== '$0.00' && (
                        <ProgressBar className="mt-2">
                          <ProgressBar striped variant="primary" now={40} key={1} />
                          <ProgressBar variant="secondary" now={60} key={2} />
                        </ProgressBar>
                      )}
                      {index === 1 && <div className="text-muted small">&rarr; $7,500.00 left in contract</div>}
                      {index === 2 && (
                        <>
                          <div className="text-muted small">WIP $69,100.00</div>
                          <div className="text-muted small">Retained $5,000.00</div>
                          <div className="text-muted small">&rarr; $219,000.00 left in contract</div>
                        </>
                      )}
                    </Col>
                    <Col md={2}>
                      <div>{project.committedCost}</div>
                      {index === 2 && (
                        <>
                          <div className="text-muted small">&rarr; $96,600.00 left in budget</div>
                          <div className="small">Materials $29,400.00</div>
                          <div className="small">Subs $50,000.00</div>
                        </>
                      )}
                    </Col>
                    <Col md={3} className="text-center">
                      <div>{project.profitLoss}</div>
                      <div className={`rounded-circle border border-${project.color} text-${project.color} mt-2 mx-auto d-flex flex-column justify-content-center align-items-center`} style={{ width: '60px', height: '60px' }}>
                        <div className="fw-bold">{project.percent}</div>
                        <div className="small">{project.color === 'danger' ? 'Loss' : 'Profit'}</div>
                      </div>
                    </Col>
                  </Row>
                ))}
              </div>
            )}
          </>
        );
    }
  };

  return (
    <>
      {showNewContractPage ? (
        <NewContractJobPage
          onClose={handleCloseNewContract}
          onSave={handleSaveNewContract} // Pass save handler
        />
      ) : (
        <div className="contract-jobs-wrapper">
          {/* Back Button above heading */}

          <div className="px-4 py-3">
            {/* Row 1: Back Button */}
            <Button className="mb-3" variant="outline-secondary" onClick={() => navigate(-1)}>
              <FaArrowLeft className="me-1" /> Back
            </Button>

            {/* Row 2: Heading and Add Button */}
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="fw-bold mb-0">Contract jobs</h4>
              {activeTab === 'manage' && (
                <Button className="btn btn-primary" onClick={handleAddNewContract}>
                  Add new contract job
                </Button>
              )}
            </div>
          </div>

          <div className="tabs px-4">
            <div
              className={`tab ${activeTab === 'manage' ? 'active-tab' : ''}`}
              onClick={() => setActiveTab('manage')}
            >
              Manage Contract Jobs
            </div>
            <div
              className={`tab ${activeTab === 'coordination' ? 'active-tab' : ''}`}
              onClick={() => setActiveTab('coordination')}
            >
              Coordination Hub <span className="badge-new">New</span>
            </div>
            <div
              className={`tab ${activeTab === 'reports' ? 'active-tab' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              Job Reports
            </div>
          </div>

          {renderTabContent()}
        </div>
      )}
    </>
  );
};

export default ContractJobs;