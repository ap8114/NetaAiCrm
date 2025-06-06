import React, { useState } from "react";
import { Tab, Nav, Table, Dropdown, Button, ButtonGroup,Form } from "react-bootstrap";

const TimeTracker = () => {
  const [key, setKey] = useState("overview");
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  return (
    <div className="container mt-4">
      <h2 className="fw-bold">Time tracker</h2>
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
      <Button variant="light" className="border me-2">&lt;</Button>
      <span className="fw-semibold">Week of June 01 to June 07</span>
      <Button variant="light" className="border ms-2">&gt;</Button>
    </div>
    <div className="d-flex align-items-center">
      <select className="form-select me-2" style={{ width: 200 }}>
        <option>NETA Admin</option>
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
    <Button variant="success">Save and Submit</Button>
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
            <Button variant="success">
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
      <Button variant="light" className="border px-2">&lt;</Button>
      <strong>FRI 6/6/25</strong>
      <Button variant="light" className="border px-2">&gt;</Button>
    </div>
  </div>

  <div
    className="d-flex flex-column justify-content-center align-items-center"
    style={{ height: '300px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="gray"
      className="mb-3"
      viewBox="0 0 16 16"
    >
      <path d="M14.6 1.4a1 1 0 0 1 0 1.4l-2.3 2.3 1.3 1.3a1 1 0 0 1 0 1.4l-1.2 1.2a1 1 0 0 1-1.4 0L10 7.4l-2.3 2.3 1.3 1.3a1 1 0 0 1 0 1.4l-1.2 1.2a1 1 0 0 1-1.4 0L5.4 12l-2.3 2.3a1 1 0 0 1-1.4-1.4L4 10.6l-.7-.7a1 1 0 0 1 0-1.4l1.2-1.2a1 1 0 0 1 1.4 0l.7.7L10.6 4l-.7-.7a1 1 0 0 1 0-1.4l1.2-1.2a1 1 0 0 1 1.4 0l1.1 1.1z"/>
    </svg>
    <h5 className="text-muted">Select a job to input hours</h5>
  </div>
</Tab.Pane>

        <Tab.Pane eventKey="checkInOut">
  {/* Header Controls */}
  <div className="d-flex justify-content-between align-items-center mb-3">
    <div className="d-flex gap-2">
      <input type="text" className="form-control" placeholder="Search" style={{ maxWidth: '200px' }} />
      <Button variant="outline-secondary">
        <i className="bi bi-search"></i>
      </Button>
      <input type="text" className="form-control" value="5/30/25 - 6/13/25" style={{ maxWidth: '200px' }} readOnly />
    </div>
    <div className="d-flex gap-2 align-items-center">
      <Button variant="primary" onClick={() => setShowCheckInModal(true)}>+ Add New Entry</Button>
      <span>1-1 of 1</span>
      <Button variant="light">&lt;</Button>
      <Button variant="light">&gt;</Button>
    </div>
  </div>

  {/* Table */}
  <div className="table-responsive">
    <table className="table table-bordered align-middle">
      <thead className="table-light">
        <tr>
          <th>Day</th>
          <th>Resource <i className="bi bi-arrow-up"></i></th>
          <th>For <i className="bi bi-arrow-up"></i></th>
          <th>Check in <i className="text-primary bi bi-arrow-up"></i></th>
          <th>Check out</th>
          <th>Time</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>THU</td>
          <td>NETA Admin</td>
          <td>
            Wally World Parking Lot<br />
            <em>for Griswold Enterprises</em><br />
            Asphalt
          </td>
          <td>
            <a href="#" className="text-primary">6/5/25 9:00 AM</a><br />
            <span className="text-primary">Manually checked in</span>
          </td>
          <td>
            <a href="#" className="text-primary">6/5/25 5:01 PM</a><br />
            <span className="text-primary">Manually checked out</span>
          </td>
          <td>8:05</td>
          <td>
            <i className="bi bi-building" style={{ fontSize: '1.3rem' }}></i>{' '}
            <i className="bi bi-trash" style={{ fontSize: '1.3rem', color: '#ced4da' }}></i>
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
            <Button variant="success">
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  )}
  {showCheckInModal && <div className="modal-backdrop fade show"></div>}
</Tab.Pane>

         <Tab.Pane eventKey="reviewTime">
  {/* Header Controls */}
  <div className="d-flex justify-content-between align-items-center mb-3">
    <div className="d-flex gap-2 align-items-center">
      <input type="text" className="form-control" placeholder="Search" style={{ maxWidth: '200px' }} />
      <Button variant="outline-secondary">
        <i className="bi bi-search"></i>
      </Button>
      <input type="text" className="form-control" value="5/9/25 - 6/7/25" style={{ maxWidth: '200px' }} readOnly />
      <Form.Check type="checkbox" label="Show reviewed" />
      <Form.Check type="checkbox" label="Show only direct reports" />
    </div>
    <div className="d-flex align-items-center gap-2">
      <span>1-2 of 2</span>
      <Button variant="light">&lt;</Button>
      <Button variant="light">&gt;</Button>
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
            NETA Admin<br />
            <small>(by simon Mashiah)</small>
          </td>
          <td>
            Wally World Parking Lot<br />
            <em>for Griswold Enterprises</em><br />
            Asphalt
          </td>
          <td>
            8:05<br />
            <span className="text-muted">
              <i className="bi bi-box-arrow-in-right"></i> 9:00 AM<br />
              <i className="bi bi-box-arrow-left"></i> 5:01 PM
            </span>
          </td>
          <td>
            <Button variant="outline-primary" size="sm">Fix it</Button><br />
            <span className="text-danger">$0.00</span>
          </td>
          <td>✔</td>
          <td><i className="bi bi-chat-left-text-fill text-primary fs-5"></i></td>
          <td>
            <i className="bi bi-pencil-square text-primary fs-5 me-2"></i>
            <i className="bi bi-calculator-fill text-danger fs-5"></i>
          </td>
        </tr>
        <tr>
          <td><Form.Check /></td>
          <td>6/6/25<br />FRI</td>
          <td>
            NETA Admin<br />
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
          <td><i className="bi bi-chat-left-dots-fill text-muted fs-5"></i></td>
          <td>
            <i className="bi bi-pencil-square text-primary fs-5 me-2"></i>
            <i className="bi bi-calculator-fill text-danger fs-5"></i>
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
      <i className="bi bi-file-earmark-excel"></i> Export to XLS
    </Button>
  </div>
</Tab.Pane>

          <Tab.Pane eventKey="timeReports">
  <div className="p-4 bg-white rounded shadow-sm">
    {[
      {
        title: 'Time Report',
        desc: 'PDF report with approved time entries grouped by job and employees'
      },
      {
        title: 'Time Rate Report',
        desc: 'PDF report with approved time and rate information for a given time frame'
      },
      {
        title: 'Time Cards',
        desc: 'Spreadsheet export with submitted time entries for a given time frame'
      },
      {
        title: 'Timesheet Report',
        desc: 'Spreadsheet report with submitted employee timecards for a given time frame, with daily resolution'
      },
      {
        title: 'Foreman Report',
        desc: 'Spreadsheet report with submitted time and reimbursement information by employee for a given time frame'
      },
      {
        title: 'Payroll Report',
        desc: 'Spreadsheet report with approved payroll information, daily or weekly based on your company setup'
      },
      {
        title: 'Labor Costing Report',
        desc: 'Spreadsheet report with labor grouped by cost type and employee for a given time frame'
      }
    ].map((report, index) => (
      <div key={index} className="mb-4">
        <h5 className="text-primary mb-1">{report.title}</h5>
        <p className="mb-0 text-secondary">{report.desc}</p>
      </div>
    ))}
  </div>
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
          &lt;
        </Button>
        <span className="fw-semibold">Week of June 01 to June 07</span>
        <Button variant="light" className="border">
          &gt;
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
            <td>NETA Admin</td>
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
