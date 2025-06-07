import React, { useState } from 'react';
import { Button, Form, Dropdown, ButtonGroup, Badge, Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { FunnelFill, List } from 'react-bootstrap-icons';

import './Jobs.css'; // Make sure to create this CSS file

const projects = [
  {
    name: 'New Home (Cost Plus)',
    client: 'Stan and Francine Smith',
    billing: 'Cost plus / other',
    phases: '1 phase left',
    status: 'Active',
    revenue: '$0.00',
    committedCost: '$0.00',
    profitLoss: '$0.00',
    percent: '0%',
    color: 'primary'
  },
  {
    name: 'Kitchen Remodel (Fixed Price)',
    client: 'Bob Belcher',
    billing: 'Fixed price',
    phases: '1 phase left',
    status: 'Active',
    revenue: '$3,500.00',
    committedCost: '$0.00',
    profitLoss: '$3,500.00',
    percent: '0%',
    color: 'primary'
  },
  {
    name: 'Wally World Parking Lot',
    client: 'Griswold Enterprises',
    billing: 'Fixed price with AIA-style billing',
    phases: '2 phases left',
    status: 'Active',
    revenue: '$50,000.00',
    committedCost: '$79,400.00',
    profitLoss: '-$29,400.00',
    percent: '58.80%',
    color: 'danger'
  }
];

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
    <div className="container py-4">
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

const NewContractJobPage = ({ onClose }) => {
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

  const handleSave = () => {
    console.log('Saving job...', {
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
                    style={{maxWidth: '500px'}}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Client Name <span className="text-danger">*</span>
                  </label>
                  <div className="position-relative" style={{maxWidth: '500px'}}>
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
                        style={{cursor: 'pointer'}}
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
                        style={{cursor: 'pointer'}}
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
                        style={{cursor: 'pointer'}}
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
                        style={{backgroundColor: '#D4AF37'}}
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
    <div className="bg-light min-vh-100">
      {/* Navigation Tabs */}
      <div className="bg-white">
        <div className="container-fluid px-3 pt-3">
          <div className="d-flex gap-1">
            <button
              className={`btn btn-sm px-3 py-2 rounded-1 border-0 fw-medium ${
                activeTab === 'change-orders'
                  ? 'bg-dark text-white'
                  : 'bg-light text-secondary'
              }`}
              onClick={() => setActiveTab('change-orders')}
            >
              Change orders
            </button>
            <button
              className={`btn btn-sm px-3 py-2 rounded-1 border-0 fw-medium ${
                activeTab === 'daily-logs'
                  ? 'bg-dark text-white'
                  : 'bg-light text-secondary'
              }`}
              onClick={() => setActiveTab('daily-logs')}
            >
              Daily logs
            </button>
            <button
              className={`btn btn-sm px-3 py-2 rounded-1 border-0 fw-medium ${
                activeTab === 'phases'
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
                  style={{fontSize: '14px'}}
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
            <span className="text-muted" style={{fontSize: '13px'}}>0 of 0</span>
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
            <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: '400px'}}>
              {/* Search Icon */}
              <div className="mb-4">
                <div 
                  className="rounded-circle border border-2 border-dark d-flex align-items-center justify-content-center bg-white"
                  style={{width: '80px', height: '80px'}}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </div>
              </div>
              
              {/* No Results Message */}
              <h4 className="fw-bold text-dark mb-3" style={{fontSize: '24px'}}>No results</h4>
              <p className="text-muted mb-0" style={{fontSize: '14px'}}>
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

  const handleAddNewContract = () => {
    setShowNewContractPage(true);
  };

  const handleCloseNewContract = () => {
    setShowNewContractPage(false);
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
                <Button variant="light"  className="list-btn bg-white">
                  <List className="me-1" /> List
                </Button>

                <Form.Control type="text" placeholder="Search" className="search-box" />

                <Button variant="light" className="view-btn">View</Button>

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
            
            <Container className="bg-white py-3">
              <Row className="fw-bold border-bottom pb-2 mb-3">
                <Col md={4}>Project details</Col>
                <Col md={1}>Status</Col>
                <Col md={2}>Revenue</Col>
                <Col md={2}>Committed Cost</Col>
                <Col md={3}>Profit/Loss</Col>
              </Row>
              {projects.map((project, index) => (
                <Row key={index} className="align-items-start border-bottom py-3">
                  <Col md={4}>
                    <div className="fw-bold">{project.name}</div>
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
            </Container>
          </>
        );
    }
  };

  return (
    <>
      {showNewContractPage ? (
        <NewContractJobPage onClose={handleCloseNewContract} />
      ) : (
        <div className="contract-jobs-wrapper">
          <div className="d-flex justify-content-between align-items-center header-bar px-4 py-3">
            <h4 className="fw-bold  mb-0">Contract jobs</h4>
            {activeTab === 'manage' && (
              <Button className="add-btn" onClick={handleAddNewContract}>
                Add new contract job
              </Button>
            )}
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