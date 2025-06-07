import React, { useState } from 'react';
import { Container, Tab, Tabs, Button, Table, InputGroup, FormControl, Form } from 'react-bootstrap';
import { FaPrint, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom"; // Add this import

const CalendarView = () => {
  const [key, setKey] = useState('calendar');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const weekDates = [
    ['26', '27', '28', '29', '30'],
    ['02', '03', '04', '05', '06'],
    ['09', '10', '11', '12', '13'],
    ['16', '17', '18', '19', '20'],
    ['23', '24', '25', '26', '27'],
    ['30', '01', '02', '03', '04'],
  ];

  return (
    <div className="container-fluid p-4">
      {/* Back Button above heading */}
      <div className="mb-2">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-1" /> Back
        </Button>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* You can remove the old back button here if present */}
        <div></div>
        <Button variant="primary" onClick={() => setShowModal(true)}>Add new allocation</Button>
      </div>
      <h4 className='fw-bold mt-3 mb-3'>Scheduling</h4>

      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3 border-bottom">
        <Tab eventKey="calendar" title={<span className="fw-semibold">Corporate Calendar</span>}>
          <InputGroup className="mb-3">
            <FormControl placeholder="Filter by name" />
          </InputGroup>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4>June 2025</h4>
            <div>
              <Button variant="outline-secondary" className="me-2">
                <FaPrint className="me-1" /> Print
              </Button>
              <Button variant="outline-secondary" className="me-2">Today</Button>
              <Button variant="outline-secondary" className="me-1">&#8592;</Button>
              <Button variant="outline-secondary">&#8594;</Button>
            </div>
          </div>

          <Table bordered className="calendar-table text-center">
            <thead className="bg-light">
              <tr>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
              </tr>
            </thead>
            <tbody>
              {weekDates.map((week, i) => (
                <tr key={i}>
                  {week.map((day, j) => (
                    <td key={j} style={{ height: '60px', verticalAlign: 'top', backgroundColor: i === 1 && j === 4 ? '#ddd' : '' }}>
                      <div className="small fw-bold">{day}</div>
                      {i === 1 && j === 4 && (
                        <div className="small text-white bg-secondary rounded px-2 mt-1">1 due task</div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

       <Tab eventKey="resourceBoard" title={<span className="fw-semibold">Resource Board</span>}>
      <div className="d-flex" style={{ height: '500px', overflow: 'hidden' }}>

        {/* Sidebar */}
        <div className="border-end p-3" style={{ width: '280px', overflowY: 'auto', background: '#f8f9fa' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="mb-0">Jobs</h6>
            <div className="dropdown">
              <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                Open
              </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item">Open</button></li>
                <li><button className="dropdown-item">Closed</button></li>
              </ul>
            </div>
          </div>

          <input type="text" className="form-control form-control-sm mb-3" placeholder="Search Jobs" />

          <div>
            <div className="bg-white border rounded p-2 mb-2">
              <strong>Kitchen Remodel</strong><br />
              <small>Fixed Price</small><br />
              <small className="text-muted">Labor and Materials</small>
            </div>
            <div className="bg-white border rounded p-2 mb-2">
              <strong>New Home</strong><br />
              <small>Cost Plus</small><br />
              <small className="text-muted">Construction Services</small>
            </div>
            <div className="bg-white border rounded p-2 mb-2">
              <strong>Wally World Parking Lot</strong><br />
              <small className="text-muted">Demolition / Clear Out</small><br />
              <small className="text-muted">Asphalt</small>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <button className="btn btn-sm btn-outline-secondary me-1">&lt;</button>
              <button className="btn btn-sm btn-outline-secondary">&gt;</button>
              <span className="ms-2 fw-bold">June 6, 2025</span>
            </div>
            <div>
              <button className="btn btn-sm btn-outline-primary me-1">One Week</button>
              <button className="btn btn-sm btn-outline-secondary">Two Weeks</button>
            </div>
          </div>

          <div className="table-responsive" style={{ maxHeight: '410px' }}>
            <table className="table table-bordered table-sm text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{ minWidth: '200px' }}></th>
                  <th>Sun 6/1</th>
                  <th>Mon 6/2</th>
                  <th>Tue 6/3</th>
                  <th>Wed 6/4</th>
                  <th>Thu 6/5</th>
                  <th className="bg-primary text-white">Fri 6/6</th>
                  <th>Sat 6/7</th>
                </tr>
              </thead>
              <tbody>
                {[
                  'Al Jardine', 'Brian Wilson', 'Bruce Johnston',
                  'Carl Wilson', 'David Marks', 'Dennis Wilson', 'Mike Love'
                ].map((member, idx) => (
                  <tr key={idx}>
                    <td className="text-start">{member} <span className="text-muted">(0.00)</span></td>
                    {Array.from({ length: 7 }, (_, i) => (
                      <td key={i}></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Tab>

        <Tab eventKey="resourceDay" title={<span className="fw-semibold">Resource Day</span>}>
  <div className="d-flex flex-column border rounded overflow-hidden" style={{ height: '85vh' }}>
    {/* Header Bar */}
    <div className="d-flex align-items-center bg-light px-3 py-2 border-bottom">
      <button className="btn btn-sm btn-outline-secondary me-2">
        <i className="bi bi-chevron-left"></i>
      </button>
      <button className="btn btn-sm btn-outline-secondary me-2">
        <i className="bi bi-chevron-right"></i>
      </button>
      <div className="fw-bold text-white bg-primary px-3 py-1 rounded me-3">THU<br />6/5/25</div>
      <div className="flex-grow-1">Bon-Bon Admin</div>
      <div><i className="bi bi-chevron-down"></i></div>
    </div>

    {/* Body */}
    <div className="d-flex overflow-auto" style={{ flexGrow: 1 }}>
      {/* Time Labels */}
      <div className="bg-white text-end pe-2 border-end" style={{ minWidth: '80px' }}>
        {Array.from({ length: 11 }).map((_, i) => {
          const hour = (i + 7) % 12 || 12;
          const period = i + 7 >= 12 ? 'PM' : 'AM';
          return (
            <div key={i} style={{ height: '60px', fontSize: '14px', fontWeight: 'bold' }}>
              {hour}:00 {period}
            </div>
          );
        })}
      </div>

      {/* Main Schedule */}
      <div className="flex-grow-1 position-relative">
        {/* Green Block for "OPEN" */}
        <div
          className="position-absolute text-white fw-bold ps-2 pt-1"
          style={{
            top: 0,
            left: 0,
            width: '100%',
            height: '660px', // 11 slots x 60px
            backgroundColor: '#c2e04f'
          }}
        >
          OPEN
        </div>
      </div>
    </div>
  </div>
</Tab>


       <Tab eventKey="lastCheckIns" title={<span className="fw-semibold">Last Check Ins</span>}>
  <div className="border rounded overflow-hidden" style={{ height: '85vh' }}>
    {/* Top Row */}
    <div className="d-flex align-items-center justify-content-between bg-light border-bottom p-2">
      <div className="d-flex align-items-center">
        <button className="btn btn-sm btn-outline-secondary me-2">
          <i className="bi bi-chevron-left"></i>
        </button>
        <button className="btn btn-sm btn-outline-secondary me-2">
          <i className="bi bi-chevron-right"></i>
        </button>
        <div className="bg-primary text-white text-center px-3 py-1 rounded me-3 fw-bold">
          THU<br />6/5/25
        </div>
        <span className="fw-semibold text-primary">Wally World Parking Lot</span>
      </div>
      <div className="d-flex gap-2">
        <select className="form-select form-select-sm" style={{ width: '200px' }}>
          <option>Display most recent activity</option>
        </select>
        <select className="form-select form-select-sm" style={{ width: '180px' }}>
          <option>Show all resources</option>
        </select>
      </div>
    </div>

    {/* Bottom Content */}
    <div className="row g-0" style={{ height: '100%' }}>
      {/* Left Side */}
      <div className="col-md-4 bg-white p-3">
        <div className="d-flex align-items-start">
          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '32px', height: '32px' }}>
            1
          </div>
          <div>
            <div className="fw-bold">Bon-Bon Admin</div>
            <div className="d-flex flex-column text-muted mt-1" style={{ fontSize: '14px' }}>
              <span><i className="bi bi-box-arrow-in-right me-1"></i> 9:00 AM</span>
              <span><i className="bi bi-box-arrow-left me-1"></i> 5:01 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Side */}
      <div className="col-md-8">
        <iframe
          title="Map View"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d471121.51598118275!2d75.56897035625!3d22.70455908994765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1749195589306!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </div>
</Tab>

      </Tabs>

      {/* Add New Allocation Modal */}
      {showModal && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block', background: 'rgba(0,0,0,0.2)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0">
              <div className="modal-header bg-light" style={{ background: "#fcfcf6" }}>
                <h5 className="modal-title fw-bold">Add New Allocation</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-4">
                  {/* Left Side */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="fw-semibold mb-1">Resources</label>
                      <Form.Select size="lg">
                        <option>+ Add Resource</option>
                        {/* Add more options as needed */}
                      </Form.Select>
                    </div>
                    <div className="mb-3">
                      <label className="fw-semibold mb-1">Job</label>
                      <Form.Select size="lg">
                        <option>Select job</option>
                        {/* Add more options as needed */}
                      </Form.Select>
                    </div>
                  </div>
                  {/* Right Side */}
                  <div className="col-md-6">
                    <div className="fw-semibold mb-2">Date/Time Information</div>
                    <div className="row g-2 mb-2">
                      <div className="col-6">
                        <label className="fw-semibold small">Start Date</label>
                        <div className="input-group">
                          <Form.Control size="lg" defaultValue="6/6/25" />
                          <span className="input-group-text"><i className="bi bi-calendar"></i></span>
                        </div>
                      </div>
                      <div className="col-6">
                        <label className="fw-semibold small">End Date</label>
                        <div className="input-group">
                          <Form.Control size="lg" defaultValue="6/7/25" />
                          <span className="input-group-text"><i className="bi bi-calendar"></i></span>
                        </div>
                      </div>
                    </div>
                    <div className="row g-2">
                      <div className="col-6">
                        <label className="fw-semibold small">Start Time</label>
                        <div className="input-group">
                          <Form.Control size="lg" defaultValue="6:15 PM" />
                          <span className="input-group-text"><i className="bi bi-clock"></i></span>
                        </div>
                      </div>
                      <div className="col-6">
                        <label className="fw-semibold small">End Time</label>
                        <div className="input-group">
                          <Form.Control size="lg" defaultValue="4:15 AM" />
                          <span className="input-group-text"><i className="bi bi-clock"></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Checkbox Row */}
                <div className="row mt-3">
                  <div className="col-md-6 d-flex align-items-center">
                    <Form.Check
                      type="checkbox"
                      id="includeOffDays"
                      label={<span>Include 'Off' days <i className="bi bi-question-circle" /></span>}
                    />
                  </div>
                </div>
                {/* Scheduling Notes */}
                <div className="mt-3">
                  <label className="fw-semibold mb-1">
                    Scheduling Notes <i className="bi bi-question-circle"></i>
                  </label>
                  <Form.Control as="textarea" rows={3} />
                </div>
                {/* Notify Checkbox */}
                <div className="mt-3">
                  <Form.Check
                    type="checkbox"
                    id="notifyChange"
                    label="Notify scheduling change"
                  />
                </div>
              </div>
              <div className="modal-footer bg-light">
                <Button variant="light" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary">
                  Add New Allocation
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default CalendarView;
