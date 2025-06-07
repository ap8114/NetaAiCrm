import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Table,
  Button,
  Modal,
  Tabs,
  Tab,
  Alert,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import NotesTab from "./NotesTab.jsx";
import BillsTab from "./BillsTab.jsx";

// --- Custom Status System (admin-defined, can be loaded from backend/settings) ---
const PROJECT_STATUSES = [
  { key: "pending", label: "Pending", color: "secondary" },
  { key: "in_progress", label: "In Progress", color: "info" },
  { key: "contract_signed", label: "Contract Signed", color: "success" },
  { key: "completed", label: "Completed", color: "primary" },
  { key: "closed", label: "Closed", color: "dark" },
  { key: "lost", label: "Lost", color: "danger" },
];

// --- Simulated contract signed event for demo ---
const signedContracts = [
  {
    contractId: "C-2025-001",
    title: "1001 Partridge Dr (Ventura Oncology)",
    client: "Tal Kedmy",
    startDate: "2025-06-07",
    endDate: "2025-12-07",
    assignedTeam: "Team Alpha",
    value: "$9,740.00",
    status: "contract_signed",
  },
];

// Dummy data for demonstration
const allClients = [
  {
    id: 1,
    firstName: "Tal",
    lastName: "Kedmy",
    displayName: "Tal Kedmy",
    street: "6924 Canby Ave, Unit 103",
    city: "Reseda",
    state: "CA",
    zip: "91335",
    phone: "(310) 678-5436",
    opportunities: [
      {
        title: "1001 Partridge Dr (Ventura Oncology)",
        status: "Open",
        created: "May 6, 2025",
        sold: "N/A",
        salesperson: "Roni Nisim",
      },
      {
        title: "10921 Wilshire (Dr. Edinger)",
        status: "Open",
        created: "Nov 21, 2023",
        sold: "N/A",
        salesperson: "Sara Yakov",
      },
      {
        title: "10921 Wilshire (Dr. Mendelovitz)",
        status: "Open",
        created: "Nov 21, 2023",
        sold: "N/A",
        salesperson: "Sara Yakov",
      },
      {
        title: "11200 Corbin",
        status: "Lost",
        created: "Nov 21, 2023",
        sold: "Nov 27, 2023",
        salesperson: "Sara Yakov",
      },
      {
        title: "11200 Corbin",
        status: "Sold",
        created: "Sep 13, 2023",
        sold: "Sep 13, 2023",
        salesperson: "Sara Yakov",
      },
      {
        title: "1122 Mission St (Craig D. Cheng, DDS)",
        status: "Open",
        created: "May 7, 2025",
        sold: "N/A",
        salesperson: "Janine De Jesus",
      },
    ],
  },
  {
    id: 2,
    firstName: "Garrett",
    lastName: "Construction Inc",
    displayName: "Garrett Construction Inc",
    street: "123 Builder Ave",
    city: "San Francisco",
    state: "CA",
    zip: "94101",
    phone: "(415) 555-1234",
    opportunities: [
      {
        title: "1122 Mission St (Craig D. Cheng, DDS)",
        status: "Open",
        created: "May 7, 2025",
        sold: "N/A",
        salesperson: "Janine De Jesus",
      },
    ],
  },
  {
    id: 3,
    firstName: "Pacific Cove",
    lastName: "Development...",
    displayName: "Pacific Cove Development...",
    street: "1101 Stanford St",
    city: "Santa Monica",
    state: "CA",
    zip: "90401",
    phone: "(310) 555-7890",
    opportunities: [
      {
        title: "1101 Stanford St",
        status: "Open",
        created: "Nov 12, 2024",
        sold: "N/A",
        salesperson: "N/A",
      },
    ],
  },
  {
    id: 4,
    firstName: "Dwell",
    lastName: "LLC",
    displayName: "Dwell LLC",
    street: "11056 Braddock Dr",
    city: "Los Angeles",
    state: "CA",
    zip: "90066",
    phone: "(213) 555-4567",
    opportunities: [
      {
        title: "11056 Braddock Dr",
        status: "Open",
        created: "Sep 26, 2024",
        sold: "N/A",
        salesperson: "N/A",
      },
    ],
  },
  {
    id: 5,
    firstName: "Pillar Building",
    lastName: "Group",
    displayName: "Pillar Building Group",
    street: "1161 Angelo Dr",
    city: "Beverly Hills",
    state: "CA",
    zip: "90210",
    phone: "(310) 555-9999",
    opportunities: [
      {
        title: "1161 Angelo Dr",
        status: "Open",
        created: "Apr 12, 2025",
        sold: "N/A",
        salesperson: "N/A",
      },
    ],
  },
];

const getStatusConfig = (statusKey) =>
  PROJECT_STATUSES.find((s) => s.key === statusKey) ||
  { label: statusKey, color: "secondary" };

const LeadOpportunities = () => {
  // --- Toast for contract-to-project conversion ---
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  // --- Projects State (includes auto-converted from contracts) ---
  const [projects, setProjects] = useState([
    // Auto-generated from signed contracts
    ...signedContracts.map((c) => ({
      title: c.title,
      date: c.startDate,
      client: c.client,
      status: c.status,
      age: "0 days",
      confidence: "100%",
      revenue: c.value,
      company: c.client,
      billing: "",
      summary: { jobTotal: c.value, payments: "$0.00", balance: c.value },
      transactions: [],
      contractMeta: c,
      autoConverted: true,
    })),
    // ...existing leads as projects...
    {
      title: "1101 Stanford St",
      date: "Nov 12, 2024, 3:36 PM",
      client: "Pacific Cove Development...",
      status: "pending",
      age: "188 days",
      confidence: "0%",
      revenue: "$0.00",
      company: "Pacific Cove",
      billing: "1101 Stanford St, Santa Monica, CA",
      summary: {
        jobTotal: "$0.00",
        payments: "$0.00",
        balance: "$0.00",
      },
      transactions: [],
    },
    // ...other projects...
  ]);

  const [show, setShow] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("transaction");
  const [selectedClient, setSelectedClient] = useState(null);

  // New state for modals in Daily Logs
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentLogIndex, setCurrentLogIndex] = useState(null);

  const theme = {
    primary: "primary",
    accent: "info",
    bg: "bg-light",
    text: "text-dark",
  };

  // --- Project Creation Form ---
  const [form, setForm] = useState({
    title: "",
    date: "",
    client: "",
    status: PROJECT_STATUSES[0].key,
    age: "",
    confidence: "0%",
    revenue: "",
  });

  // --- Handle Project Creation ---
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProjects([
      ...projects,
      {
        ...form,
        company: form.client,
        billing: "",
        summary: { jobTotal: form.revenue, payments: "$0.00", balance: form.revenue },
        transactions: [],
      },
    ]);
    setForm({
      title: "",
      date: "",
      client: "",
      status: PROJECT_STATUSES[0].key,
      age: "",
      confidence: "0%",
      revenue: "",
    });
    handleClose();
  };

  // --- Handle click on Project Title ---
  const handleProjectClick = (idx) => {
    setSelectedProjectIndex(idx);
    setActiveTab("transaction");
  };

  // --- Handle back to list ---
  const handleBack = () => {
    setSelectedProjectIndex(null);
  };

  // --- Handle click on client contact name ---
  const handleClientContactClick = (clientName) => {
    const client = allClients.find((c) => c.displayName === clientName);
    setSelectedClient(client || null);
  };

  // --- Handle back from client contact page ---
  const handleBackFromClientContact = () => {
    setSelectedClient(null);
  };

  // --- Simulate contract signed event (UI feedback) ---
  React.useEffect(() => {
    if (signedContracts.length > 0) {
      setShowToast(true);
    }
  }, []);

  const selectedProject =
    selectedProjectIndex !== null ? projects[selectedProjectIndex] : null;

  // --- Render client contact page if selected ---
  if (selectedClient) {
    return (
      <div className="container-fluid p-4 mt-4">
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col
                md={2}
                className="d-flex align-items-center justify-content-center"
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "#e5e7eb",
                    fontSize: 28,
                    fontWeight: 600,
                    color: "#374151",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {selectedClient.firstName[0]}
                  {selectedClient.lastName[0]}
                </div>
              </Col>
              <Col md={10}>
                <Row className="mb-2">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control value={selectedClient.firstName} readOnly />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control value={selectedClient.lastName} readOnly />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Display Name</Form.Label>
                      <Form.Control
                        value={selectedClient.displayName}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Street address</Form.Label>
                      <Form.Control value={selectedClient.street} readOnly />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control value={selectedClient.city} readOnly />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>State</Form.Label>
                      <Form.Control value={selectedClient.state} readOnly />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Zip code</Form.Label>
                      <Form.Control value={selectedClient.zip} readOnly />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control value={selectedClient.phone} readOnly />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <h4 className="fw-bold mb-3">Projects</h4>
        <Table bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>Project Title</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Sold Date</th>
              <th>Salesperson</th>
            </tr>
          </thead>
          <tbody>
            {selectedClient.opportunities.map((op, idx) => (
              <tr key={idx}>
                <td>{op.title}</td>
                <td>{op.status}</td>
                <td>{op.created}</td>
                <td>{op.sold}</td>
                <td>{op.salesperson}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  // --- Dummy daily logs data for demonstration ---
  const dailyLogs = [
    {
      date: "Thu, Feb 13",
      title: "service call",
      badges: ["Work Order"],
      description: `Finish work
- Change wiring of one smoke detector (everything is good!)
- Vacuumed inside fan
- Checked/adjusted timer switch
- Installed new timer switch`,
      images: [],
    },
    {
      date: "Thu, Feb 6",
      title: "Service call",
      badges: ["Customer Comment", "Camera"],
      description: `- Check the smoke detector in the master bedroom I found not wired and was re-connected
- Checked the intake/exhaust fan, found loose wiring and repaired
- New smoke crystal and set whatever check before splicing but the exhaust fan is working fine only issue is that it was not enough power`,
      images: [
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=120&h=90",
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=120&h=90",
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=120&h=90",
      ],
    },
    {
      date: "Thu, Dec 26, 2024",
      title: "Finish",
      badges: ["Finish Electrical"],
      description: "",
      images: [
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=120&h=90",
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=120&h=90",
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=120&h=90",
      ],
    },
  ];

  // --- Simulated sync status for transactions ---
  const [syncStatus, setSyncStatus] = useState({
    connected: true, // Simulate QuickBooks connection
    lastError: null,
    transactions: [
      // Example: [{ id: 1, status: "synced" | "pending" | "failed" }]
    ],
    syncLog: [
      // Example: { id, timestamp, direction, type, status }
    ],
  });

  // --- Simulated transaction data for selected project ---
  // (In real app, this would come from backend or project.transactions)
  const getProjectTransactions = (project) =>
    project.transactions && project.transactions.length
      ? project.transactions
      : [
        {
          id: 1,
          date: "2025-06-01",
          type: "Invoice",
          no: "INV-001",
          customer: project.client,
          memo: "Initial deposit",
          amount: "$2,000.00",
          status: "Synced",
          syncStatus: "synced",
          action: "View",
        },
        {
          id: 2,
          date: "2025-06-05",
          type: "Payment",
          no: "PAY-001",
          customer: project.client,
          memo: "Payment received",
          amount: "$2,000.00",
          status: "Pending",
          syncStatus: "pending",
          action: "View",
        },
        {
          id: 3,
          date: "2025-06-10",
          type: "Invoice",
          no: "INV-002",
          customer: project.client,
          memo: "Final payment",
          amount: "$7,740.00",
          status: "Failed",
          syncStatus: "failed",
          action: "Retry",
        },
      ];

  // --- Simulated sync log data ---
  const syncLogData = [
    {
      id: 1,
      timestamp: "2025-06-01 10:00",
      direction: "CRM → QB",
      type: "Invoice",
      status: "Success",
    },
    {
      id: 2,
      timestamp: "2025-06-05 12:00",
      direction: "QB → CRM",
      type: "Payment",
      status: "Success",
    },
    {
      id: 3,
      timestamp: "2025-06-10 09:30",
      direction: "CRM → QB",
      type: "Invoice",
      status: "Failed",
    },
  ];

  // --- Simulate sync retry ---
  const handleRetrySync = (transactionId) => {
    setSyncStatus((prev) => ({
      ...prev,
      lastError: null,
      transactions: prev.transactions.map((t) =>
        t.id === transactionId ? { ...t, syncStatus: "pending" } : t
      ),
    }));
    setShowToast(true);
  };

  // --- Simulate connection toggle ---
  const handleReconnect = () => {
    setSyncStatus((prev) => ({
      ...prev,
      connected: true,
      lastError: null,
    }));
    setShowToast(true);
  };

  // --- Toast for sync failure ---
  const [showSyncError, setShowSyncError] = useState(false);

  return (
    <div className="p-4 mt-4">
      {/* Back Button above heading */}
      <div className="mb-2">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-1" /> Back
        </Button>
      </div>
      {/* Connection Status UI */}
      <div className="mb-2 d-flex align-items-center gap-2">
        <span>
          QuickBooks Status:{" "}
          {syncStatus.connected ? (
            <span className="badge bg-success">Connected ✅</span>
          ) : (
            <span className="badge bg-danger">Disconnected ❌</span>
          )}
        </span>
        {!syncStatus.connected && (
          <Button
            size="sm"
            variant="outline-danger"
            onClick={handleReconnect}
            title="Try to reconnect to QuickBooks"
          >
            Reconnect
          </Button>
        )}
        <span className="ms-2 text-muted" style={{ fontSize: "0.9em" }}>
          {syncStatus.connected
            ? "Live sync enabled"
            : "Sync unavailable. Please reconnect."}
        </span>
      </div>

      {/* Toast for contract-to-project conversion */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={5000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Project Created</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Project created from signed contract.
          </Toast.Body>
        </Toast>
        <Toast
          show={showSyncError}
          onClose={() => setShowSyncError(false)}
          delay={7000}
          autohide
          bg="danger"
        >
          <Toast.Header>
            <strong className="me-auto">Sync Error</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            ⚠️ Sync with QuickBooks failed. Please try again or check the connection.
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {selectedProject === null ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3 ">
            <h4 className={`fw-bold ${theme.text}`}>Projects</h4>
            <div className="d-flex flex-wrap gap-2">
              <Button variant="outline-secondary">⚙️</Button>
              <Button variant="outline-secondary">More</Button>
              <Button variant="outline-secondary">Export</Button>
              <Button variant="outline-secondary">Import</Button>
              <Button variant="outline-secondary">
                Add Contact Form to Website
              </Button>
              <Button variant="outline-secondary">Filter (1)</Button>
              <Button variant="success" onClick={handleShow}>
                + New Project
              </Button>
            </div>
          </div>

          <Table
            bordered
            hover
            responsive
            className="bg-white rounded shadow-sm"
          >
            <thead className="align-middle">
              <tr>
                <th>
                  <Form.Check />
                </th>
                <th>Project Title</th>
                <th>Created Date</th>
                <th>Client Contact</th>
                <th>Status</th>
                <th>Age</th>
                <th>Confidence</th>
                <th>Estimated Revenue Min</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index}>
                  <td>
                    <Form.Check />
                  </td>
                  <td>
                    {project.autoConverted && (
                      <span className="badge bg-success me-2">Auto</span>
                    )}
                    <span className="fw-semibold">
                      <Button
                        variant="link"
                        className="p-0 align-baseline text-primary text-decoration-none"
                        onClick={() => handleProjectClick(index)}
                        style={{ fontWeight: 600 }}
                      >
                        {project.title}
                      </Button>
                    </span>
                  </td>
                  <td>{project.date}</td>
                  <td>
                    <a
                      href="#"
                      className="text-primary"
                      style={{ textDecoration: "none" }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClientContactClick(project.client);
                      }}
                    >
                      {project.client}
                    </a>
                  </td>
                  <td>
                    <span
                      className={`badge bg-${getStatusConfig(project.status).color} text-white`}
                    >
                      {getStatusConfig(project.status).label}
                    </span>
                  </td>
                  <td>{project.age}</td>
                  <td>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: project.confidence }}
                      ></div>
                    </div>
                  </td>
                  <td>{project.revenue}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        // --- Project Details UI with Tabs ---
        <div className="bg-white rounded shadow-sm p-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>

              <span className="fw-bold fs-5">{selectedProject.title}</span>
              {selectedProject.autoConverted && selectedProject.contractMeta && (
                <span className="ms-2 badge bg-success">
                  Linked to Contract: {selectedProject.contractMeta.contractId}
                </span>
              )}
            </div>
            <div>
              <span className="me-3">
                Company:{" "}
                <span className="fw-semibold">{selectedProject.company}</span>
              </span>
              <span>
                Billing address:{" "}
                <span className="fw-semibold">{selectedProject.billing}</span>
              </span>
            </div>
          </div>
          {/* --- Show contract metadata if available --- */}
          {selectedProject.autoConverted && selectedProject.contractMeta && (
            <Card className="mb-3">
              <Card.Body>
                <div className="mb-2">
                  <strong>Contract Title:</strong> {selectedProject.contractMeta.title}
                </div>
                <div className="mb-2">
                  <strong>Client:</strong> {selectedProject.contractMeta.client}
                </div>
                <div className="mb-2">
                  <strong>Start Date:</strong> {selectedProject.contractMeta.startDate}
                </div>
                <div className="mb-2">
                  <strong>End Date:</strong> {selectedProject.contractMeta.endDate}
                </div>
                <div className="mb-2">
                  <strong>Assigned Team:</strong> {selectedProject.contractMeta.assignedTeam}
                </div>
                <div className="mb-2">
                  <strong>Contract Value:</strong> {selectedProject.contractMeta.value}
                </div>
              </Card.Body>
            </Card>
          )}
          {/* --- Tabs and rest of UI remain unchanged, just use selectedProject --- */}
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
            justify
          >
            {/* --- Financials Tab: Transaction List with Sync Status --- */}
            <Tab eventKey="financials" title="FINANCIALS">
              <Table bordered hover responsive className="bg-white rounded">
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>TYPE</th>
                    <th>NO.</th>
                    <th>CUSTOMER</th>
                    <th>MEMO</th>
                    <th>AMOUNT</th>
                    <th>STATUS</th>
                    <th>SYNC</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {getProjectTransactions(selectedProject).map((t, idx) => (
                    <tr key={t.id || idx}>
                      <td>{t.date}</td>
                      <td>{t.type}</td>
                      <td>{t.no}</td>
                      <td>{t.customer}</td>
                      <td>{t.memo}</td>
                      <td>{t.amount}</td>
                      <td>
                        {t.status === "Closed" || t.status === "Paid" ? (
                          <span className="badge bg-success">
                            {t.status}
                          </span>
                        ) : t.status === "Pending" ? (
                          <span className="badge bg-warning text-dark">
                            {t.status}
                          </span>
                        ) : t.status === "Failed" ? (
                          <span className="badge bg-danger">
                            {t.status}
                          </span>
                        ) : (
                          <span className="badge bg-secondary">
                            {t.status}
                          </span>
                        )}
                      </td>
                      <td>
                        {/* Live Sync Indicator */}
                        {t.syncStatus === "synced" && (
                          <span className="badge bg-success">Synced</span>
                        )}
                        {t.syncStatus === "pending" && (
                          <span className="badge bg-warning text-dark">Pending</span>
                        )}
                        {t.syncStatus === "failed" && (
                          <>
                            <span className="badge bg-danger me-2">Failed</span>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => {
                                setShowSyncError(true);
                                handleRetrySync(t.id);
                              }}
                              title="Retry sync"
                            >
                              Retry
                            </Button>
                          </>
                        )}
                      </td>
                      <td>
                        <Button variant="link" className="p-0 text-decoration-none">
                          {t.action}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>

            {/* --- Sync Log Tab --- */}
            <Tab eventKey="syncLog" title="SYNC LOG">
              <div className="my-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="fw-bold mb-0">QuickBooks Sync Log</h5>
                  {/* Filter/Sort controls (static for demo) */}
                  <div>
                    <Form.Select size="sm" className="d-inline w-auto me-2">
                      <option>All Types</option>
                      <option>Invoice</option>
                      <option>Payment</option>
                      <option>Client Info</option>
                    </Form.Select>
                    <Form.Select size="sm" className="d-inline w-auto me-2">
                      <option>All Status</option>
                      <option>Success</option>
                      <option>Failed</option>
                    </Form.Select>
                    <Form.Select size="sm" className="d-inline w-auto">
                      <option>Newest First</option>
                      <option>Oldest First</option>
                    </Form.Select>
                  </div>
                </div>
                <Table bordered hover responsive className="bg-white rounded">
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>Direction</th>
                      <th>Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {syncLogData.map((log) => (
                      <tr key={log.id}>
                        <td>{log.timestamp}</td>
                        <td>
                          {log.direction === "CRM → QB" ? (
                            <span className="badge bg-primary">{log.direction}</span>
                          ) : (
                            <span className="badge bg-info text-dark">{log.direction}</span>
                          )}
                        </td>
                        <td>{log.type}</td>
                        <td>
                          {log.status === "Success" ? (
                            <span className="badge bg-success">Success</span>
                          ) : (
                            <span className="badge bg-danger">Failed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>

            {/* --- Other Tabs (Daily Logs, Bills, Notes, etc.) --- */}
            <Tab eventKey="daily" title="DAILY LOGS">
              <div className="my-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">Daily Logs</h5>
                  <Button
                    variant="primary
                    
                    "
                    onClick={() => setShowEditModal(true)}
                  >
                    + New Daily Log
                  </Button>
                </div>
                {dailyLogs.map((log, idx) => (
                  <Card className="mb-4" key={idx}>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                          <span className="fw-semibold">
                            {log.date} | {log.title}
                          </span>
                          {log.badges.map((b, i) => (
                            <span key={i} className="badge bg-secondary ms-2">
                              {b}
                            </span>
                          ))}
                        </div>
                        <div>
                          {/* Only show delete if admin or permission */}
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="me-2"
                            style={{
                              display:
                                "inline-block" /* Replace with permission logic */,
                            }}
                            // onClick={() => handleDeleteLog(idx)}
                            disabled
                          >
                            Delete
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="me-2"
                            onClick={() => {
                              setCurrentLogIndex(idx);
                              setShowEditModal(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => {
                              setCurrentLogIndex(idx);
                              setShowCommentModal(true);
                            }}
                          >
                            Comment
                          </Button>
                        </div>
                      </div>
                      {/* Images if any */}
                      {log.images.length > 0 && (
                        <div className="d-flex gap-2 mb-2">
                          {log.images.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt="log"
                              className="rounded"
                              style={{
                                width: 90,
                                height: 70,
                                objectFit: "cover",
                              }}
                            />
                          ))}
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="ms-2"
                          >
                            View all ({log.images.length})
                          </Button>
                        </div>
                      )}
                      <div
                        className="mb-2 text-muted small"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {log.description}
                        {idx === 0 && (
                          <a href="#" className="d-block mt-2 text-decoration-none">
                            Read more
                          </a>
                        )}
                      </div>
                      <div className="d-flex align-items-center gap-3 mt-2">
                        <span className="text-muted small">
                          0 <i className="bi bi-chat-left"></i>
                        </span>
                        <span className="text-muted small">
                          0 <i className="bi bi-eye"></i>
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>

              {/* New/Edit Daily Log Modal */}
              <Modal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                centered
                size="lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Daily Log</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Job</Form.Label>
                          <Form.Select>
                            <option>
                              {selectedProject?.title || "Select Job"}
                            </option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Date *</Form.Label>
                          <Form.Control type="date" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Title</Form.Label>
                          <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Tags</Form.Label>
                          <div className="d-flex align-items-center">
                            <Form.Control type="text" className="me-2" />
                            <Button variant="outline-secondary" size="sm">
                              Add
                            </Button>
                            <Button variant="link" size="sm" className="ms-2">
                              Edit
                            </Button>
                          </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Permissions</Form.Label>
                          <Table bordered size="sm" className="mb-0">
                            <thead>
                              <tr>
                                <th> </th>
                                <th>Share</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Internal Users</td>
                                <td>
                                  <Form.Check type="checkbox" defaultChecked />
                                </td>
                              </tr>
                              <tr>
                                <td>Client Contact</td>
                                <td>
                                  <Form.Check type="checkbox" />
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Notify Users</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Type to search users..."
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Attachments</Form.Label>
                          <div className="d-flex gap-2 mb-2">
                            <Button variant="outline-secondary" size="sm">
                              Add
                            </Button>
                            <Button variant="outline-secondary" size="sm">
                              Create new doc
                            </Button>
                          </div>
                          {/* Show uploaded files here */}
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Notes</Form.Label>
                          <Form.Control as="textarea" rows={7} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Photos</Form.Label>
                          <Form.Control type="file" multiple accept="image/*" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-end">
                      <Button variant="primary">Publish</Button>
                    </div>
                  </Form>
                </Modal.Body>
              </Modal>

              {/* Comment Modal */}
              <Modal
                show={showCommentModal}
                onHide={() => setShowCommentModal(false)}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Add Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <div className="d-flex justify-content-end gap-2">
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowCommentModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => setShowCommentModal(false)}
                      >
                        Add Comment
                      </Button>
                    </div>
                  </Form>
                </Modal.Body>
              </Modal>
            </Tab>
            <Tab eventKey="bills" title="BILLS">
              <BillsTab />
            </Tab>
            <Tab eventKey="notes" title="NOTES">
              <NotesTab />
            </Tab>

            <Tab eventKey="documents" title="DOCUMENTS">
              <div className="my-4 px-3">
                <h5 className="mb-4">Uploaded Documents (Admin Only)</h5>

                {/* Upload Form */}
                <Form>
                  <Form.Group controlId="docTitle" className="mb-3">
                    <Form.Label>Document Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter title or description"
                    />
                  </Form.Group>

                  <Form.Group controlId="docFile" className="mb-3">
                    <Form.Label>Upload File</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
                    />
                    <Form.Text muted>Supported: PDF, DOCX, JPG, PNG</Form.Text>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Upload Document
                  </Button>
                </Form>

                <hr className="my-4" />

                {/* Uploaded Documents (static for now) */}
                <div className="mt-3">
                  {[
                    {
                      id: 1,
                      title: "Wiring Diagram",
                      user: "Admin John",
                      timestamp: "2025-06-04 11:20 AM",
                      fileType: "image",
                      fileUrl:
                        "https://via.placeholder.com/200x120.png?text=Wiring+Diagram",
                    },
                    {
                      id: 2,
                      title: "Permit Approval",
                      user: "Admin Lisa",
                      timestamp: "2025-06-03 03:45 PM",
                      fileType: "pdf",
                      fileUrl: "#",
                    },
                  ].map(({ id, title, user, timestamp, fileType, fileUrl }) => (
                    <div
                      key={id}
                      className="mb-4 p-3 border rounded bg-light shadow-sm"
                    >
                      <div className="d-flex justify-content-between mb-2">
                        <strong>{title}</strong>
                        <span
                          className="text-muted"
                          style={{ fontSize: "0.875rem" }}
                        >
                          {timestamp}
                        </span>
                      </div>
                      <div
                        className="mb-2 text-muted"
                        style={{ fontSize: "0.9rem" }}
                      >
                        Uploaded by: {user}
                      </div>
                      {fileType === "image" ? (
                        <img
                          src={fileUrl}
                          alt={title}
                          className="img-fluid rounded"
                          style={{ maxWidth: "300px" }}
                        />
                      ) : (
                        <a
                          href={fileUrl}
                          className="btn btn-outline-secondary btn-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View PDF
                        </a>
                      )}
                    </div>
                  ))}

                  {/* If no docs: */}
                  {/* <Alert variant="info" className="my-3">No documents available.</Alert> */}
                </div>
              </div>
            </Tab>

            <Tab eventKey="change" title="CHANGE ORDERS">
              <div className="my-3">
                <h5 className="fw-bold mb-3">
                  {selectedProject?.title || ""} Change Order
                </h5>
                <Card className="mb-4">
                  <Card.Body>
                    {/* Change Order Information */}
                    <div className="mb-3">
                      <h6 className="fw-bold">Change Order Information</h6>
                      <Row className="mb-2">
                        <Col md={4}>
                          <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control value="Change Order" readOnly />
                          </Form.Group>
                        </Col>
                        <Col md={2}>
                          <Form.Group>
                            <Form.Label>ID #</Form.Label>
                            <Form.Control value="11845-0004" readOnly />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group>
                            <Form.Label>Approval Deadline</Form.Label>
                            <Form.Control value="" placeholder="-" readOnly />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group>
                            <Form.Label>Client Last Viewed</Form.Label>
                            <Form.Control value="Never" readOnly />
                          </Form.Group>
                        </Col>
                      </Row>
                      <div className="d-flex align-items-center mb-2">
                        <span className="badge bg-primary">
                          Approved manually by Sara Yakov on Jun 17, 2024
                        </span>
                      </div>
                    </div>

                    {/* Price Information */}
                    <div className="mb-3">
                      <h6 className="fw-bold">Price Information</h6>
                      <div className="d-flex align-items-center mb-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2 active"
                        >
                          Flat Fee
                        </Button>
                        <Button variant="outline-primary" size="sm">
                          Line Items
                        </Button>
                        <Form.Check
                          type="switch"
                          id="show-line-items"
                          label="Show line items to client"
                          className="ms-3"
                          disabled
                        />
                      </div>
                      <div className="table-responsive">
                        <Table bordered size="sm" className="mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>Items</th>
                              <th>Cost Type</th>
                              <th>Unit Cost</th>
                              <th>Quantity</th>
                              <th>Unit</th>
                              <th>Builder Cost</th>
                              <th>Markup</th>
                              <th>Client Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <span className="fw-semibold">
                                  changes , move outlets, switches
                                </span>
                                <br />
                                <span className="text-muted small">
                                  1000 - Electric
                                </span>
                              </td>
                              <td>--</td>
                              <td>$2,850.00</td>
                              <td>1.0000</td>
                              <td>--</td>
                              <td className="fw-bold">$2,850.00</td>
                              <td>0.00%</td>
                              <td className="fw-bold">$2,850.00</td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan={5}></td>
                              <td className="fw-bold">$2,850.00</td>
                              <td className="fw-bold">$0.00</td>
                              <td className="fw-bold">$2,850.00</td>
                            </tr>
                          </tfoot>
                        </Table>
                      </div>
                      <div className="d-flex justify-content-end mt-2">
                        <span className="fw-bold">Client Price $2,850.00</span>
                        <a href="#" className="ms-2 small text-decoration-none">
                          See full price breakdown
                        </a>
                      </div>
                    </div>

                    {/* Attachments */}
                    <div className="mb-3">
                      <h6 className="fw-bold">Attachments</h6>
                      <div className="border rounded p-3 bg-light">
                        <span className="text-muted">
                          Pre-Approval Attachments
                        </span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                <Alert variant="info">
                  <div>
                    <strong>Change orders</strong> are changes, revisions,
                    additions, or removal of any task/work for an opportunity
                    job.
                    <br />
                    Change orders need to be able to connect to QuickBooks as
                    well because with each change order an increase, decrease,
                    or revision may occur to the overall costs for the
                    opportunity job.
                    <br />
                    When a change order is submitted, an admin must approve and
                    when the admin approves then the change order can become a
                    task/work inside of the job opportunity.
                  </div>
                </Alert>
              </div>
            </Tab>
          </Tabs>
          <div className="row mt-3">
            <div className="col-md-8"></div>
            <div className="col-md-4"></div>
          </div>
        </div>
      )}

      {/* --- Add New Project Modal --- */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Created Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Client Contact</Form.Label>
              <Form.Control
                type="text"
                name="client"
                value={form.client}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                {PROJECT_STATUSES.map((status) => (
                  <option key={status.key} value={status.key}>
                    {status.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                name="age"
                value={form.age}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confidence (%)</Form.Label>
              <Form.Control
                type="number"
                name="confidence"
                value={form.confidence.replace("%", "")}
                onChange={(e) =>
                  setForm({ ...form, confidence: e.target.value + "%" })
                }
                min="0"
                max="100"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estimated Revenue Min</Form.Label>
              <Form.Control
                type="text"
                name="revenue"
                value={form.revenue}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="outline-secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Project
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LeadOpportunities;
