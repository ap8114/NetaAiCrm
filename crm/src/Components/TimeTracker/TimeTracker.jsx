import React, { useState } from "react";
import { Tab, Nav, Table, Dropdown, Button, ButtonGroup, Form, Container, Modal } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight, FaSearch, FaBuilding, FaTrashAlt, FaArrowUp, FaTools, FaBoxOpen, FaCommentDots, FaCommentAlt, FaCalculator, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// --- Check In/Out Location Modal ---
const CheckInOutLocationModal = ({ show, onHide, data }) => {
  const [selectedDate, setSelectedDate] = useState(data?.date || "");
  const [selectedTime, setSelectedTime] = useState(data?.time || "");

  return (
    <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
      <Modal.Header closeButton style={{ background: "#fcfcf6" }}>
        <Modal.Title className="fw-normal" style={{ fontSize: "1.1rem" }}>
          Check In/Out Location
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-2">
          <div className="fw-bold">{data?.location || "Wally World Parking Lot"}</div>
          <div className="text-muted">{data?.type || "Asphalt"}</div>
        </div>
        <div className="fw-bold">{data?.user || "NETA Admin"}</div>
        <div className="fw-bold mb-2">
          <Form.Control
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            style={{ display: "inline-block", width: 160, marginRight: 8 }}
          />
        </div>
        <div className="mb-2">
          <Form.Label className="me-2 mb-0">Time</Form.Label>
          <Form.Control
            type="time"
            value={selectedTime}
            onChange={e => setSelectedTime(e.target.value)}
            style={{ display: "inline-block", width: 120 }}
          />
        </div>
        <div className="mb-2">
          <span style={{ display: "inline-block", marginRight: 16 }}>
            <span style={{ display: "inline-block", width: 12, height: 12, background: "#000", borderRadius: "50%", marginRight: 4 }}></span>
            Job Site
          </span>
          <span style={{ display: "inline-block", marginRight: 16 }}>
            <span style={{ display: "inline-block", width: 12, height: 12, background: "#0f0", borderRadius: "50%", marginRight: 4 }}></span>
            Check In (9:00 AM)
          </span>
          <span>
            <span style={{ display: "inline-block", width: 12, height: 12, background: "#00f", borderRadius: "50%", marginRight: 4 }}></span>
            Check out (5:01 PM)
          </span>
        </div>
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Map_of_Indiana_highlighting_Clark_County.svg/2560px-Map_of_Indiana_highlighting_Clark_County.svg.png"
            alt="Map"
            className="img-fluid rounded"
            style={{ maxHeight: 250, width: "100%", objectFit: "cover" }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};
// --- End Check In/Out Location Modal ---

// --- Edit Job Modal Component ---
const EditJobModal = ({ show, onHide, job }) => {
  if (!show || !job) return null;
  return (
    <>
      <div className="modal fade show" tabIndex="-1" style={{ display: 'block', background: 'rgba(0,0,0,0.2)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0">
            <div className="modal-header">
              <div>
                <div style={{ fontSize: "0.95em" }}>
                  Time entry <span className="badge bg-warning text-dark ms-2" style={{ fontSize: '0.9em' }}>Submitted</span>
                </div>
                <div className="fw-bold" style={{ fontSize: "2rem" }}>{job.title?.replace(" | 8:05 Straight", "")}</div>
              </div>
              <button type="button" className="btn-close" aria-label="Close" onClick={onHide}></button>
            </div>
            <div className="modal-body">
              <Form>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="text" defaultValue="6/5/25" />
                  </div>
                  <div className="col-md-3">
                    <Form.Label>Check in</Form.Label>
                    <Form.Control type="text" defaultValue="9:00 AM" />
                  </div>
                  <div className="col-md-3">
                    <Form.Label>Check out</Form.Label>
                    <Form.Control type="text" defaultValue="5:01 PM" />
                  </div>
                  <div className="col-md-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Select defaultValue="Straight">
                      <option>Straight</option>
                      <option>Other</option>
                    </Form.Select>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <Form.Label>Hours</Form.Label>
                    <Form.Control type="text" defaultValue="8:05" />
                    <div className="form-text"><FaCalculator /> Manually adjusted</div>
                  </div>
                  <div className="col-md-5">
                    <Form.Label>Allocated to</Form.Label>
                    <div className="fw-semibold">Wally World Parking Lot For Griswold Enterprises</div>
                    <Form.Control type="text" defaultValue="Asphalt" />
                  </div>
                  <div className="col-md-4">
                    <Form.Label>Role</Form.Label>
                    <Form.Control type="text" defaultValue="Office manager" />
                  </div>
                </div>
                <div className="mb-3">
                  <Form.Label>User description</Form.Label>
                  <Form.Control as="textarea" rows={2} placeholder="User description" />
                </div>
                <div className="mb-3 d-flex align-items-center justify-content-between">
                  <Button variant="link" className="p-0">Resource burden rate (hourly)</Button>
                  <span className="fw-bold">$0.00</span>
                </div>
                <div className="mb-3">
                  <Form.Check label="Add adjustment" />
                </div>
                <div className="mb-3 d-flex align-items-center justify-content-between">
                  <span>Total cost</span>
                  <span>$0.00</span>
                </div>
                <div className="mb-3">
                  <Form.Check label="Billable" defaultChecked />
                </div>
                <div className="mb-3">
                  <Form.Label>Reviewer's note</Form.Label>
                  <Form.Control as="textarea" rows={2} placeholder="Comment" />
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <Button variant="light" onClick={onHide}>Cancel</Button>
                  <Button variant="success">Save</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};
// --- End Edit Job Modal ---

// --- Job Detail Modal Component ---
const JobDetailModal = ({ show, onHide, job, onEdit }) => {
  if (!show || !job) return null;
  return (
    <>
      <div className="modal fade show" tabIndex="-1" style={{ display: 'block', background: 'rgba(0,0,0,0.2)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">
                {job.title}
                <span className="badge bg-warning text-dark ms-2" style={{ fontSize: '0.9em' }}>Submitted</span>
              </h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onHide}></button>
            </div>
            <div className="modal-body">
              <div className="mb-2 text-muted" style={{ fontSize: '0.95em' }}>
                {job.date} &bull; {job.time}
              </div>
              <div className="row mb-2">
                <div className="col-md-6">
                  <div className="mb-1 text-muted" style={{ fontSize: '0.95em' }}>Allocated to</div>
                  <div>
                    <strong className="text-primary">{job.allocatedTo}</strong>
                    <div>{job.for}</div>
                    <div>{job.type}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-1 text-muted" style={{ fontSize: '0.95em' }}>Role</div>
                  <div>{job.role}</div>
                </div>
              </div>
              <div className="mb-2">
                <div className="text-muted" style={{ fontSize: '0.95em' }}>Description</div>
                <div>No description available</div>
              </div>
              <div className="mb-2">
                <span className="text-muted" style={{ fontSize: '0.95em' }}>Cost</span>
                <span className="ms-2 text-danger">$0.00 <FaTools /></span>
              </div>
              <div className="mb-2">
                <Form.Check type="checkbox" label="Billable" checked readOnly />
              </div>
              <div className="mb-2">
                <span className="text-muted" style={{ fontSize: '0.95em' }}>Reviewer's note</span>
                <div>No description available</div>
              </div>
              <div className="mb-2">
                <strong>Activity</strong>
                <ul className="list-unstyled mt-2">
                  <li>
                    <FaBoxOpen className="me-2" />Check in by {job.resource} - {job.checkIn}
                  </li>
                  <li>
                    <FaBoxOpen className="me-2" />Check out after {job.duration} hours by {job.resource} - {job.checkOut}
                  </li>
                  <li>
                    <FaCommentAlt className="me-2" />Time updated by {job.resource} - {job.updated}
                  </li>
                </ul>
              </div>
              <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Map_of_Indiana_highlighting_Clark_County.svg/2560px-Map_of_Indiana_highlighting_Clark_County.svg.png" alt="Map" className="img-fluid rounded" style={{ maxHeight: 180 }} />
                <div className="mt-2">
                  <span className="badge bg-primary me-2">Check in</span>
                  <span className="badge bg-secondary">Check out</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Button variant="success" onClick={onEdit}>Edit</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};
// --- End Job Detail Modal ---

const TimeTracker = () => {
  const [key, setKey] = useState("overview");
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCheckInOutLocationModal, setShowCheckInOutLocationModal] = useState(false);
  const [checkInOutModalData, setCheckInOutModalData] = useState(null);
  const navigate = useNavigate();

  // Handler for job cell click
  const handleJobClick = () => {
    setSelectedJob({
      title: "NETA Admin | 8:05 Straight",
      date: "Jun 05, 2025",
      time: "9:00 AM - 5:01 PM",
      allocatedTo: "Wally World Parking Lot",
      for: "for Griswold Enterprises",
      type: "Asphalt",
      role: "Office manager",
      resource: "NETA Admin",
      checkIn: "Jun 05, 2025 @ 5:01 PM",
      checkOut: "Jun 05, 2025 @ 5:01 PM",
      duration: "08:05",
      updated: "Jun 10, 2025 @ 3:29 PM"
    });
    setShowJobModal(true);
  };

  // Handler for Edit button in modal
  const handleEditClick = () => {
    setShowJobModal(false);
    setShowEditModal(true);
  };

  // Handler for Check In/Out cell click
  const handleCheckInOutCellClick = (type) => {
    setCheckInOutModalData({
      location: "Wally World Parking Lot",
      type: "Asphalt",
      user: "NETA Admin",
      date: "2025-06-05",
      time: type === "in" ? "09:00" : "17:01"
    });
    setShowCheckInOutLocationModal(true);
  };

  return (
    <div className="col-12 p-4 mt-4">
      {/* Back Button above heading */}
      <div className="mb-2">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-1" /> Back
        </Button>
      </div>
      <h4 className="fw-bold mt-3">Time tracker</h4>
      <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
        <Nav variant="tabs" className="mt-3">
          <Nav.Item>
            <Nav.Link eventKey="overview">Overview</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="enterTime">Enter Time</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="foremanView">Foreman View</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="checkInOut">Check In/Out View</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="reviewTime">Review Time</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="timeReports">Time Reports</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="mt-4">
          <Tab.Pane eventKey="overview">
            <TimeTable />
          </Tab.Pane>
          <Tab.Pane eventKey="enterTime">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center">
                <Button variant="light" className="border me-2">
                  <FaChevronLeft />
                </Button>
                <span className="fw-semibold">Week of June 01 to June 07</span>
                <Button variant="light" className="border ms-2">
                  <FaChevronRight />
                </Button>
              </div>
              <div className="d-flex align-items-center">
                <select className="form-select me-2" style={{ width: 200 }}>
                  <option>BonBon Admin</option>
                  <option>Other User</option>
                </select>
                <Button variant="primary" onClick={() => setShowActivityModal(true)}>
                  + Add New Activity
                </Button>
              </div>
            </div>

            <Table bordered responsive className="text-center">
              <thead className="table-light">
                <tr>
                  <th className="text-start">ACTIVITY</th>
                  <th>Jun 1<br />SUN</th>
                  <th>Jun 2<br />MON</th>
                  <th>Jun 3<br />TUE</th>
                  <th>Jun 4<br />WED</th>
                  <th>Jun 5<br />THU</th>
                  <th>Jun 6<br />FRI</th>
                  <th>Jun 7<br />SAT</th>
                  <th className="text-danger">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-start">
                    <div className="fw-semibold">Griswold Enterprises</div>
                    <div className="text-muted">Wally World Parking Lot</div>
                    <div className="text-muted">Asphalt</div>
                  </td>
                  {["", "", "", "", "8:05", "", ""].map((val, i) => (
                    <td key={i}>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={val}
                        style={{
                          background: val ? "linear-gradient(to right, green 4px, transparent 4px)" : "",
                        }}
                      />
                    </td>
                  ))}
                  <td>
                    <input type="text" className="form-control" defaultValue="8:05" disabled />
                  </td>
                </tr>

                <tr>
                  <td className="text-start">
                    <div className="fw-semibold">Stan and Francine Smith</div>
                    <div className="text-muted">New Home (Cost Plus)</div>
                    <div className="text-muted">Construction Services</div>
                  </td>
                  {["", "", "", "", "", "334:00", ""].map((val, i) => (
                    <td key={i}>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={val}
                        style={{
                          background: val ? "linear-gradient(to right, green 4px, transparent 4px)" : "",
                        }}
                      />
                    </td>
                  ))}
                  <td>
                    <input type="text" className="form-control" defaultValue="334:00" disabled />
                  </td>
                </tr>

                <tr>
                  <td className="fw-bold text-start">Total</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><span>8:05</span></td>
                  <td><span>334:00</span></td>
                  <td></td>
                  <td className="fw-bold">342:05</td>
                </tr>
              </tbody>
            </Table>

            <div className="d-flex align-items-center mt-3 mb-4">
              <div className="d-flex align-items-center me-4">
                <div style={{ width: 8, height: 24, backgroundColor: "green", marginRight: 5 }}></div>
                <span>Already Submitted</span>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="light" className="border">Save as Draft</Button>
              <Button variant="primary">Save and Submit</Button>
            </div>

            {/* Add New Activity Modal */}
            {showActivityModal && (
              <div className="modal fade show" tabIndex="-1" style={{ display: 'block', background: 'rgba(0,0,0,0.2)' }}>
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content border-0">
                    <div className="modal-header bg-light" style={{ background: "#fcfcf6" }}>
                      <h5 className="modal-title fw-bold">Add New Activity</h5>
                      <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowActivityModal(false)}></button>
                    </div>
                    <div className="modal-body">
                      <Form.Select size="lg" className="mb-3" style={{ fontSize: '1.1rem' }}>
                        <option>Select job</option>
                        {/* Add more options as needed */}
                      </Form.Select>
                    </div>
                    <div className="modal-footer bg-light">
                      <Button variant="light" onClick={() => setShowActivityModal(false)}>
                        Cancel
                      </Button>
                      <Button variant="primary">
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showActivityModal && <div className="modal-backdrop fade show"></div>}
          </Tab.Pane>

          <Tab.Pane eventKey="foremanView">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div style={{ width: 200 }}>
                <select className="form-select">
                  <option>Select job</option>
                  <option>Job A</option>
                  <option>Job B</option>
                </select>
              </div>

              <div className="d-flex align-items-center gap-2">
                <Button variant="light">Today</Button>
                <Button variant="light" className="border px-2">
                  <FaChevronLeft />
                </Button>
                <strong>FRI 6/6/25</strong>
                <Button variant="light" className="border px-2">
                  <FaChevronRight />
                </Button>
              </div>
            </div>

            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ height: '300px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}
            >
              <FaTools size={48} color="gray" className="mb-3" />
              <h5 className="text-muted">Select a job to input hours</h5>
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="checkInOut">
            {/* Header Controls */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex gap-2">
                <input type="text" className="form-control" placeholder="Search" style={{ maxWidth: '200px' }} />
                <Button variant="outline-secondary">
                  <FaSearch />
                </Button>
                <input type="text" className="form-control" value="5/30/25 - 6/13/25" style={{ maxWidth: '200px' }} readOnly />
              </div>
              <div className="d-flex gap-2 align-items-center">
                <Button variant="primary" onClick={() => setShowCheckInModal(true)}>+ Add New Entry</Button>
                <span>1-1 of 1</span>
                <Button variant="light">
                  <FaChevronLeft />
                </Button>
                <Button variant="light">
                  <FaChevronRight />
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Day</th>
                    <th>
                      Resource <FaArrowUp style={{ fontSize: "0.9em" }} />
                    </th>
                    <th>
                      For <FaArrowUp style={{ fontSize: "0.9em" }} />
                    </th>
                    <th>
                      Check in <FaArrowUp className="text-primary" style={{ fontSize: "0.9em" }} />
                    </th>
                    <th>Check out</th>
                    <th>Time</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>THU</td>
                    <td>Bon-Bon Admin</td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={handleJobClick}
                    >
                      <div className="fw-semibold text-primary text-decoration-underline">Wally World Parking Lot</div>
                      <div className="text-muted">for Griswold Enterprises</div>
                      <div className="text-muted">Asphalt</div>
                    </td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCheckInOutCellClick("in")}
                    >
                      <a className="text-primary text-decoration-none">6/5/25 9:00 AM</a><br />
                      <span className="text-primary">Manually checked in</span>
                    </td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCheckInOutCellClick("out")}
                    >
                      <a className="text-primary text-decoration-none">6/5/25 5:01 PM</a><br />
                      <span className="text-primary">Manually checked out</span>
                    </td>
                    <td>8:05</td>
                    <td>
                      <FaBuilding className="text-primary" />
                      <FaTrashAlt className="text-danger" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Manual Check In/Out Modal */}
            {showCheckInModal && (
              <div className="modal fade show" tabIndex="-1" style={{ display: 'block', background: 'rgba(0,0,0,0.2)' }}>
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content border-0">
                    <div className="modal-header bg-light" style={{ background: "#fcfcf6" }}>
                      <h5 className="modal-title fw-bold">Manual Check In/Out</h5>
                      <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowCheckInModal(false)}></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-2 fw-semibold" style={{ fontSize: '1.1rem' }}>Resource</div>
                      <Form.Select size="lg" className="mb-3" style={{ fontSize: '1.1rem' }}>
                        <option>Select resource</option>
                        {/* Add more options as needed */}
                      </Form.Select>
                    </div>
                    <div className="modal-footer bg-light">
                      <Button variant="light" onClick={() => setShowCheckInModal(false)}>
                        Cancel
                      </Button>
                      <Button variant="primary">
                        Create
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showCheckInModal && <div className="modal-backdrop fade show"></div>}

            {/* Job Detail Modal */}
            <JobDetailModal show={showJobModal} onHide={() => setShowJobModal(false)} job={selectedJob} onEdit={handleEditClick} />
            {/* Edit Job Modal */}
            <EditJobModal
              show={showEditModal}
              onHide={() => setShowEditModal(false)}
              job={selectedJob}
            />
            {/* Check In/Out Location Modal */}
            <CheckInOutLocationModal
              show={showCheckInOutLocationModal}
              onHide={() => setShowCheckInOutLocationModal(false)}
              data={checkInOutModalData}
            />
          </Tab.Pane>

          <Tab.Pane eventKey="reviewTime">
            {/* Header Controls */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex gap-2 align-items-center">
                <input type="text" className="form-control" placeholder="Search" style={{ maxWidth: '200px' }} />
                <Button variant="outline-secondary">
                  <FaSearch />
                </Button>
                <input type="text" className="form-control" value="5/9/25 - 6/7/25" style={{ maxWidth: '200px' }} readOnly />
                <Form.Check type="checkbox" label="Show reviewed" />
                <Form.Check type="checkbox" label="Show only direct reports" />
              </div>
              <div className="d-flex align-items-center gap-2">
                <span>1-2 of 2</span>
                <Button variant="light">
                  <FaChevronLeft />
                </Button>
                <Button variant="light">
                  <FaChevronRight />
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th><Form.Check /></th>
                    <th>Date <i className="bi bi-arrow-up"></i></th>
                    <th>Resource</th>
                    <th>For</th>
                    <th>Time</th>
                    <th>Our cost</th>
                    <th>Billable</th>
                    <th>Comments</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Form.Check /></td>
                    <td>6/5/25<br />THU</td>
                    <td>
                      BonBon Admin<br />
                      <small>(by simon Mashiah)</small>
                    </td>
                    <td>
                      Wally World Parking Lot<br />
                      <em>for Griswold Enterprises</em><br />
                      Asphalt
                    </td>
                    <td>
                      <span className="text-muted">
                        <FaBoxOpen /> 9:00 AM<br />
                        <FaBoxOpen style={{ transform: "rotate(180deg)" }} /> 5:01 PM
                      </span>
                    </td>
                    <td>
                      <Button variant="outline-primary" size="sm">Fix it</Button><br />
                      <span className="text-danger">$0.00</span>
                    </td>
                    <td>✔</td>
                    <td>
                      <FaCommentDots className="text-primary fs-5" />
                    </td>
                    <td>
                      <FaCommentAlt className="text-muted fs-5" />
                    </td>
                    <td>
                      <FaCalculator className="text-danger fs-5" />
                    </td>
                  </tr>
                  <tr>
                    <td><Form.Check /></td>
                    <td>6/6/25<br />FRI</td>
                    <td>
                      Bon-Bon Admin<br />
                      <small>(by simon Mashiah)</small>
                    </td>
                    <td>
                      New Home (Cost Plus)<br />
                      for Stan and Francine Smith<br />
                      Construction Services<br />
                      <em className="text-muted">"gsgvb"</em>
                    </td>
                    <td>334:00</td>
                    <td>
                      <Button variant="outline-primary" size="sm">Fix it</Button><br />
                      <span className="text-danger">$0.00</span>
                    </td>
                    <td>✔</td>
                    <td>
                      <FaCommentDots className="text-primary fs-5" />
                    </td>
                    <td>
                      <FaCommentAlt className="text-muted fs-5" />
                    </td>
                    <td>
                      <FaCalculator className="text-danger fs-5" />
                    </td>
                  </tr>
                  <tr className="table-light">
                    <td colSpan="4"><strong>Total period</strong></td>
                    <td>342:05</td>
                    <td>$0.00</td>
                    <td colSpan="3"></td>
                  </tr>
                  <tr className="table-light">
                    <td colSpan="4"><strong>Total displayed</strong></td>
                    <td>342:05</td>
                    <td>$0.00</td>
                    <td colSpan="3"></td>
                  </tr>
                  <tr className="table-light">
                    <td colSpan="4"><strong>Selected entries</strong></td>
                    <td>0</td>
                    <td>$0.00</td>
                    <td colSpan="3"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Export Button */}
            <div className="text-end mt-2">
              <Button variant="outline-primary" size="sm">
                <FaBoxOpen /> Export to XLS
              </Button>
            </div>
          </Tab.Pane>

       <Tab.Pane eventKey="timeReports">
      <Container className="py-4">
        <h5 className="mb-4">Time Reports</h5>
        <div>
          <div className="mb-3">
            <strong className="text-primary">Time Report</strong>
            <p className="mb-1">PDF report with approved time entries grouped by job and employees</p>
          </div>
          <div className="mb-3">
            <strong className="text-primary">Time Rate Report</strong>
            <p className="mb-1">PDF report with approved time and rate information for a given time frame</p>
          </div>
          <div className="mb-3">
            <strong className="text-primary">Time Cards</strong>
            <p className="mb-1">Spreadsheet export with submitted time entries for a given time frame</p>
          </div>
          <div className="mb-3">
            <strong className="text-primary">Timesheet Report</strong>
            <p className="mb-1">
              Spreadsheet report with submitted employee timecards for a given time frame, with daily resolution
            </p>
          </div>
          <div className="mb-3">
            <strong className="text-primary">Foreman Report</strong>
            <p className="mb-1">
              Spreadsheet report with submitted time and reimbursement information by employee for a given time frame
            </p>
          </div>
          <div className="mb-3">
            <strong className="text-primary">Payroll Report</strong>
            <p className="mb-1">
              Spreadsheet report with approved payroll information, daily or weekly based on your company setup
            </p>
          </div>
          <div className="mb-3">
            <strong className="text-primary">Labor Costing Report</strong>
            <p className="mb-1">
              Spreadsheet report with labor grouped by cost type and employee for a given time frame
            </p>
          </div>
          <div className="mb-3">
            <strong className="text-primary">Paychex Export</strong>
            <p className="mb-1">Spreadsheet to import payroll into Paychex</p>
          </div>
        </div>
      </Container>
    </Tab.Pane>

        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

const TimeTable = () => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <Button variant="light" className="border">
          <FaChevronLeft />
        </Button>
        <span className="fw-semibold">Week of June 01 to June 07</span>
        <Button variant="light" className="border">
          <FaChevronRight />
        </Button>

        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle variant="light" className="border ms-3">
            Resources with submitted time only
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>All Resources</Dropdown.Item>
            <Dropdown.Item>Submitted Only</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Table bordered hover responsive className="text-center">
        <thead className="table-light">
          <tr>
            <th>Resource</th>
            <th>Jun 1<br />SUN</th>
            <th>Jun 2<br />MON</th>
            <th>Jun 3<br />TUE</th>
            <th>Jun 4<br />WED</th>
            <th>Jun 5<br />THU</th>
            <th>Jun 6<br />FRI</th>
            <th>Jun 7<br />SAT</th>
            <th className="text-danger">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bon-Bon Admin</td>
            <td>0:00</td>
            <td>0:00</td>
            <td>0:00</td>
            <td>0:00</td>
            <td className="text-primary">8:05</td>
            <td className="text-primary">334:00</td>
            <td>0:00</td>
            <td className="text-danger">342:05</td>
          </tr>
          <tr className="fw-bold">
            <td>Total</td>
            <td>0:00</td>
            <td>0:00</td>
            <td>0:00</td>
            <td>0:00</td>
            <td>8:05</td>
            <td>334:00</td>
            <td>0:00</td>
            <td>342:05</td>
          </tr>
        </tbody>
      </Table>

      <div className="d-flex mt-3">
        <div className="me-4">
          <div className="d-flex align-items-center">
            <div style={{ width: 10, height: 25, backgroundColor: "#00b7ff", marginRight: 5 }} />
            Above 8 h/day
          </div>
        </div>
        <div>
          <div className="d-flex align-items-center">
            <div style={{ width: 10, height: 25, backgroundColor: "#ff2d2d", marginRight: 5 }} />
            Above 40 h/week
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeTracker;
