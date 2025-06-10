import { Button } from 'react-bootstrap';
import { FaArrowLeft, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaFilter, FaCog } from 'react-icons/fa';
import React, { useState, useEffect, useRef } from "react";
import { Modal, Form } from 'react-bootstrap';


const columnsList = [
  // Initial columns
  'Project Name', 'Client', 'Creation Date', 'Date closed', 'Date lost',
  'GC Contract#', 'Contract #', 'Address', 'City', 'State',

  // New options from additional screenshots
  'ZIP', 'Country', 'Latitude', 'Longitude',
  'Start Date', 'End Date', 'Sales Lead', 'Project Manager', 'Class', 'Original Contract',
  'Original contract taxes', 'Change orders', 'Contract total', 'Contract Total Taxes',
  'Invoiced', 'Invoiced Taxes', 'Retainage', 'Invoiced plus retainage', 'Payments Invoices', 'Deposits',
  'Billable Items', 'Total Cost Committed', 'Total Cost Actual', 'Total Cost Budget',
  'Total budget committed remaining', 'Total budget actual remaining',
  'Labor Budget', 'Labor Committed', 'Labor committed remaining', 'Labor Hours Committed',
  'Materials Budget', 'Materials Committed', 'Materials Actual',
  'Materials committed remaining', 'Materials actual remaining',
  'Subs Budget', 'Subs Committed', 'Subs Actual',
  'Subs committed remaining', 'Subs actual remaining',
  'Equipment Budget', 'Equipment Committed', 'Equipment Actual',
  'Equipment committed remaining', 'Equipment actual remaining', 'Equipment hours committed',
  'Miscellanea Budget', 'Miscellanea Committed', 'Miscellanea Actual', 'Misc. actual remaining',
  'Misc. committed remaining', 'WIP', 'Profit', 'Profit Amount',
  'Projected Profitability', 'Percentage of Completion', 'Tags'
];


const reportData = [
  {
    category: "EXPORT",
    items: ["Paychex Export"],
  },
  {
    category: "JOBS",
    items: [
      { name: "Advanced Jobs", preview: true },
      { name: "Backlog Report" },
      { name: "Basic Jobs Report" },
      { name: "Change Order Report" },
      { name: "Contract Progress Report" },
      { name: "GC Report" },
      { name: "Job Progress", preview: true },
      { name: "Job Purchases Report" },
      { name: "Job Tag Summary", preview: true },
      { name: "Owner Report" },
      { name: "Phases", preview: true },
      { name: "Retainage", preview: true },
      { name: "Sales", preview: true },
    ],
  },
  {
    category: "OTHER",
    items: [
      { name: "Bills", preview: true },
      { name: "Invoices", preview: true },
    ],
  },
  {
    category: "PURCHASES",
    items: [
      { name: "Purchases", preview: true },
      { name: "Purchases and items", preview: true },
    ],
  },
  {
    category: "TIME",
    items: [
      { name: "Foreman Report" },
      { name: "Time Cards Report" },
      { name: "Time entries", preview: true },
      { name: "Time Rate Report" },
      { name: "Time Report" },
      { name: "Timesheet" },
    ],
  },
];

const previewTableHeaders = [
  "Project Name", "Client", "Est. Start Date", "Est. Completion", "Actual Start", "Actual Completion",
  "Status", "Location", "Project Manager", "Original Contract", "Change Orders", "Contract Total",
  "Billings", "Insurance", "Retention", "Total Cost Contract", "Remaining Budget", "Labor", "Materials",
  "Subcontractors", "Other", "Total Budget", "Invoiced", "Paid", "Paid %"
];

const previewTableData = [
  {
    project: "Hyundai Site Works",
    client: "Hyundai Motors",
    start: "01/01/2024",
    end: "06/01/2024",
    actualStart: "01/05/2024",
    actualEnd: "05/25/2024",
    status: "Completed",
    location: "CHN",
    manager: "W. Smith",
    contract: "$120,000",
    changeOrders: "$8,000",
    total: "$128,000",
    billings: "$118,000",
    insurance: "$2,000",
    retention: "$3,000",
    cost: "$110,000",
    remaining: "$18,000",
    labor: "$50,000",
    materials: "$30,000",
    subcontractors: "$20,000",
    other: "$10,000",
    totalBudget: "$110,000",
    invoiced: "$118,000",
    paid: "$115,000",
    paidPercent: "97.4%"
  },
  // You can duplicate/add more objects here
];

const Reports = () => {


 // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalReport, setModalReport] = useState("");
  const [modalStart, setModalStart] = useState("");
  const [modalEnd, setModalEnd] = useState("");

  // Helper for quick date ranges
  const setRange = (type) => {
    const today = new Date();
    let start, end;
    if (type === "previous_month") {
      const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      start = prevMonth.toISOString().slice(0, 10);
      end = new Date(today.getFullYear(), today.getMonth(), 0).toISOString().slice(0, 10);
    } else if (type === "current_month") {
      start = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10);
      end = today.toISOString().slice(0, 10);
    } else if (type === "previous_week") {
      const prevWeekStart = new Date(today);
      prevWeekStart.setDate(today.getDate() - today.getDay() - 6);
      const prevWeekEnd = new Date(today);
      prevWeekEnd.setDate(today.getDate() - today.getDay());
      start = prevWeekStart.toISOString().slice(0, 10);
      end = prevWeekEnd.toISOString().slice(0, 10);
    } else if (type === "current_week") {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      start = weekStart.toISOString().slice(0, 10);
      end = today.toISOString().slice(0, 10);
    }
    setModalStart(start && start.split('-').reverse().join('/'));
    setModalEnd(end && end.split('-').reverse().join('/'));
  };

  // Modified handleSelect
  const handleSelect = (item) => {
    const isPreview = typeof item === "object" && item.preview;
    setSelected(typeof item === "string" ? item : item.name);
    setIsOpen(false);
    setShowPreview(!!isPreview);

    // If not preview, open modal
    if (!isPreview) {
      setModalReport(typeof item === "string" ? item : item.name);
      // Default dates: current month
      const today = new Date();
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      setModalStart(start.toLocaleDateString('en-GB'));
      setModalEnd(today.toLocaleDateString('en-GB'));
      setShowModal(true);
    }
  };


  const columnSettingsRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        columnSettingsRef.current &&
        !columnSettingsRef.current.contains(event.target)
      ) {
        setShowColumnSettings(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const [showFilter, setShowFilter] = useState(false);
  const [showColumnSettings, setShowColumnSettings] = useState(false);

  // Initial state: all columns visible
  const [visibleColumns, setVisibleColumns] = useState(() =>
    Object.fromEntries(columnsList.map(col => [col, true]))
  );

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({
      ...prev,
      [col]: !prev[col]
    }));
  };

  const filteredHeaders = previewTableHeaders.filter(header => visibleColumns[header]);
  const filteredRows = previewTableData.map(row =>
    Object.fromEntries(
      Object.entries(row).filter(([key]) => visibleColumns[key])
    )
  );

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("Select a report");
  const [showPreview, setShowPreview] = useState(false);

  const filteredData = reportData.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      typeof item === "string"
        ? item.toLowerCase().includes(search.toLowerCase())
        : item.name.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <div className="container-fluid" style={{ backgroundColor: '#f6f6f7', minHeight: '100vh' }}>
      <div className="pt-4 px-4">
        <div className="mb-2">
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>
            <FaArrowLeft className="me-1" /> Back
          </Button>
        </div>

        <h4 className="fw-bold">Reports</h4>

        <div className="mt-3 position-relative" style={{ maxWidth: 340 }}>
          <button
            className="btn btn-light border w-100 d-flex justify-content-between align-items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selected}
            <FaChevronDown />
          </button>

          {isOpen && (
            <div className="position-absolute mt-1 bg-white shadow border rounded p-2 w-100" style={{ zIndex: 1000, maxHeight: 300, overflowY: "auto" }}>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {filteredData.map((section, idx) => (
                section.items.length > 0 && (
                  <div key={idx}>
                    <small className="text-uppercase text-muted ps-1">{section.category}</small>
                    <ul className="list-unstyled mb-2">
                      {section.items.map((item, i) => {
                        const name = typeof item === "string" ? item : item.name;
                        const preview = typeof item === "object" && item.preview;

                        return (
                          <li
                            key={i}
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            onClick={() => handleSelect(item)}
                            style={{ cursor: "pointer" }}
                          >
                            {name}
                            {preview && <span className="badge bg-light text-primary border">Preview available</span>}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )
              ))}
            </div>
          )}
        </div>

        {!showPreview ? (
          <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ height: '60vh' }}>
            <i className="bi bi-file-earmark-bar-graph mb-4 text-primary" style={{ fontSize: '64px' }}></i>
            <h5 className="fw-bold">Generate a report</h5>
            <p className="text-muted">Start by choosing a report type and setting your report parameters</p>
          </div>
        ) : (
          <div className="mt-3">
            {/* Toolbar */}
            <div className="d-flex flex-wrap align-items-center gap-2">

              {/* Filter controls section */}
              <div className="d-flex flex-column align-items-start gap-2 mt-4">

                {/* First Row: Date Range + Filter Button */}
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="text"
                    className="form-control w-auto"
                    value="4/9/25 - 6/9/25"
                    readOnly
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setShowFilter(!showFilter)}
                  >
                    <FaFilter />
                  </button>
                </div>

                {/* Second Row: Status Buttons */}
                <div className="d-flex gap-2">
                  <button className="btn btn-dark btn-sm">Active</button>
                  <button className="btn btn-light btn-sm">Rejected</button>
                  <button className="btn btn-light btn-sm">Bidding</button>
                  <button className="btn btn-light btn-sm">Closed</button>
                </div>
              </div>


              <div className="ms-auto d-flex gap-2">


                {/* Column Settings */}
                <div className="position-relative" ref={columnSettingsRef}>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setShowColumnSettings(prev => !prev)}
                  >
                    <FaCog />
                  </button>

                  {showColumnSettings && (
                    <div
                      className="card shadow border mt-2 p-2 bg-white"
                      style={{
                        width: 300,
                        position: "absolute",
                        top: "100%",
                        right: 0,
                        zIndex: 1050,
                      }}
                    >
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Search by column"
                      // Optional: Add filtering logic here
                      />
                      <div style={{ maxHeight: 250, overflowY: "auto" }}>
                        {columnsList.map((col, i) => (
                          <div
                            className="d-flex justify-content-between align-items-center px-2 py-1"
                            key={i}
                          >
                            <span>{col}</span>
                            <div className="form-check form-switch m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={visibleColumns[col]}
                                onChange={() => toggleColumn(col)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-center mt-2">
                        <button className="btn btn-link p-0">Set to default</button>
                      </div>
                    </div>
                  )}
                </div>


                <button className="btn btn-outline-primary btn-sm">Export</button>
              </div>
            </div>

            {/* Filter Box */}
            {showFilter && (
              <div className="card shadow mt-2 p-3" style={{ maxWidth: 600 }}>
                <div className="d-flex align-items-center gap-2">
                  <label className="form-label me-2 mb-0">Filtering by</label>
                  <select className="form-select w-auto">
                    <option>Project Name</option>
                    <option>Client Name</option>
                  </select>
                  <select className="form-select w-auto">
                    <option>Contains</option>
                    <option>Equals</option>
                  </select>
                  <input type="text" className="form-control" placeholder="Value" />
                </div>

                <div className="mt-2">
                  <button className="btn btn-link p-0">+ Add filter</button>
                </div>

                <div className="d-flex justify-content-between mt-3">
                  <button className="btn btn-link text-danger p-0">Clear</button>
                  <div>
                    <button className="btn btn-light me-2">Cancel</button>
                    <button className="btn btn-primary">Apply</button>
                  </div>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="mt-4 overflow-auto">
              <table className="table table-bordered table-striped table-hover">
                <thead className="table-light">
                  <tr>
                    {previewTableHeaders.map((header, i) => (
                      <th key={i}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewTableData.map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((val, idx) => (
                        <td key={idx}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

       {/* Modal for non-preview reports */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalReport}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="d-flex gap-3 mb-3">
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="text"
                  value={modalStart}
                  onChange={e => setModalStart(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="text"
                  value={modalEnd}
                  onChange={e => setModalEnd(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="mb-3">
              <span className="me-2">⚡ Set range to:</span>
              <a href="#" className="me-2" onClick={e => { e.preventDefault(); setRange("previous_month"); }}>previous month</a>
              <a href="#" className="me-2" onClick={e => { e.preventDefault(); setRange("current_month"); }}>current month</a>
              <a href="#" className="me-2" onClick={e => { e.preventDefault(); setRange("previous_week"); }}>previous week</a>
              <a href="#" onClick={e => { e.preventDefault(); setRange("current_week"); }}>current week</a>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => setShowModal(false)}>
            Generate & Download
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  );
};

export default Reports;
