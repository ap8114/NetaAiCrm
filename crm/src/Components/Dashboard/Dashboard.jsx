import React, { useState } from 'react';

import CountUp from 'react-countup';
import { Calendar, Clock, Search } from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom"; // Add this import
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from "react-icons/fa"; // Add this import

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'activity':
        return <CompanyFeed />;
      case 'job-costing':
        return <ActivitySearch />;
      case 'overview':
      default:
        return (
          <>
            <div className="row g-4 align-items-stretch">
  {/* Left Column - Stats Card */}
  <div className="col-lg-4 d-flex">
    <div className="card shadow-sm border-0 rounded-4 w-100 animate__animated animate__fadeInLeft d-flex flex-column h-100">
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title text-muted mb-4">Contract Jobs Overview</h5>

        <div className="text-center mb-4">
          <div className="display-4 fw-bold text-dark">
            <CountUp end={3} duration={2} />
          </div>
          <div className="text-uppercase small text-muted">Active</div>
        </div>

        <div className="text-center mb-4">
          <div className="h3 text-primary fw-bold">
            $<CountUp end={226500} duration={2} separator="," decimals={2} decimal="." />
          </div>
          <div className="text-uppercase small text-muted">Unbilled Value</div>
        </div>

        <div className="text-center mb-4">
          <div className="display-6 fw-bold text-dark">
            <CountUp end={1} duration={2} />
          </div>
          <div className="text-uppercase small text-muted">Bids & Pending Change Orders</div>
        </div>

        <div className="text-center">
          <div className="h4 text-primary fw-bold">
            $<CountUp end={6499.98} duration={2} separator="," decimals={2} decimal="." />
          </div>
          <div className="text-uppercase small text-muted">Opportunity Value</div>
        </div>
      </div>
    </div>
  </div>

  {/* Right Column - Map Area */}
  <div className="col-lg-8 d-flex">
    <div className="card shadow-sm border-0 rounded-4 w-100 animate__animated animate__fadeInRight d-flex flex-column h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-muted mb-3">Daily Job Status (6/5/25)</h5>

        <div className="position-relative border rounded flex-grow-1 overflow-hidden" style={{ minHeight: '350px' }}>
          {/* Grid Background */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              backgroundImage: `
                linear-gradient(rgba(200, 200, 200, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(200, 200, 200, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
              zIndex: 1
            }}
          ></div>

          {/* Map Controls */}
          <div className="position-absolute top-0 start-0 m-3 d-flex flex-column gap-2" style={{ zIndex: 2 }}>
            <button className="btn btn-sm btn-light border shadow-sm">+</button>
            <button className="btn btn-sm btn-light border shadow-sm">−</button>
          </div>

          {/* Map Points */}
          <div className="position-absolute top-50 start-50 translate-middle d-flex gap-5 flex-wrap justify-content-center" style={{ zIndex: 2 }}>
            <div className="text-center">
              <div className="bg-primary rounded-circle mx-auto mb-1" style={{ width: '10px', height: '10px' }}></div>
              <small className="text-muted">Mount Hope<br />Cemetery</small>
            </div>
            <div className="text-center">
              <div className="bg-primary rounded-circle mx-auto mb-1" style={{ width: '10px', height: '10px' }}></div>
              <small className="text-muted">Beth Olom<br />Cemetery</small>
            </div>
          </div>

          {/* Street Labels */}
          <small className="position-absolute" style={{ top: '20px', right: '20px', transform: 'rotate(45deg)', zIndex: 2 }}>Park Ln S</small>
          <small className="position-absolute" style={{ bottom: '80px', right: '60px', zIndex: 2 }}>Jamaica Ave</small>
          <small className="position-absolute" style={{ top: '60px', left: '100px', transform: 'rotate(-45deg)', zIndex: 2 }}>0/2</small>
          <small className="position-absolute top-0 end-0 m-2 text-muted">85th Rd</small>
          <small className="position-absolute bottom-0 end-0 m-2 text-muted">84th</small>
        </div>
      </div>
    </div>
  </div>
</div>


            {/* Job Progress Overview Section */}
            <div className="row mt-4">
              <div className="col-12">
                <div className="card shadow rounded-4 border-0 animate__animated animate__fadeIn">
                  <div className="card-body p-4">


                    <h5 className="card-title text-muted mb-4">Job Progress Overview</h5>


                    <div className="row text-center text-md-start mb-4">
                      <div className="col-md-4 mb-2">
                        <span className="badge bg-primary   text-uppercase px-3 py-2 w-100 rounded-3 fw-semibold shadow-sm">WALLY WORLD PARKING LOT</span>
                      </div>
                      <div className="col-md-4 mb-2">
                        <span className="badge bg-primary text-uppercase px-3 py-2 w-100 rounded-3 fw-semibold shadow-sm">NEW HOME (COST PLUS)</span>
                      </div>
                      <div className="col-md-4 mb-2">
                        <span className="badge bg-primary text-uppercase px-3 py-2 w-100 rounded-3 fw-semibold shadow-sm">KITCHEN REMODEL (FIXED PRICE)</span>
                      </div>
                    </div>


                    <div className="row text-center mb-4">
                      <div className="col-md-4 animate__animated animate__fadeInUp">
                          <span className="fw-bold">BUDGET</span>
                        <div className="fw-bold fs-5 text-success mt-2">45.1%</div>
                        <div className="text-muted small">17.0%</div>
                        <div className="text-primary fw-semibold">$219,000.00</div>
                      </div>
                      <div className="col-md-4 animate__animated animate__fadeInUp animate__delay-1s">
                         <span className="fw-bold">INVOICED</span>
                        <div className="fw-bold fs-5 text-warning mt-2">N/A</div>
                        <div className="text-muted small">0.0%</div>
                        <div className="text-primary fw-semibold">$0.00</div>
                      </div>
                      <div className="col-md-4 animate__animated animate__fadeInUp animate__delay-2s">
                          <span className="fw-bold">TO BE INVOICED</span>
                        <div className="fw-bold fs-5 text-warning mt-2">N/A</div>
                        <div className="text-muted small">31.8%</div>
                        <div className="text-primary fw-semibold">$7,500.00</div>
                      </div>
                    </div>


                    <div className="mb-4">
                      <div className="fw-bold text-uppercase text-muted">Team Activity <span className="text-dark">(342:05)</span></div>
                      <hr />
                    </div>

                    <div className="row">
  <div className="col-md-6 d-flex">
    <div className="card bg-light rounded-4 border-0 shadow-sm mb-4 w-100 animate__animated animate__fadeInLeft d-flex flex-column">
      <div className="card-body">
        <h6 className="card-title text-muted mb-3">Invoices</h6>

        <div className="d-flex justify-content-between mb-2">
          <div className="fw-bold text-primary">$48,500.00</div>
          <span className="badge bg-warning text-dark">OPEN</span>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <div className="text-muted">$48,500.00 (2)</div>
          <span className="badge bg-danger-subtle text-danger">OVERDUE</span>
        </div>

        <div className="d-flex justify-content-between">
          <div className="text-muted">$0.00</div>
          <span className="badge bg-secondary-subtle text-muted">NOT DUE YET</span>
        </div>
      </div>
    </div>
  </div>

  <div className="col-md-6 d-flex">
    <div className="card bg-light rounded-4 border-0 shadow-sm mb-4 w-100 animate__animated animate__fadeInRight d-flex flex-column">
      <div className="card-body">
        <h6 className="card-title text-muted mb-3">Bills</h6>

        <div className="d-flex justify-content-between mb-2">
          <div className="fw-bold text-primary">$15,400.00</div>
          <span className="badge bg-warning text-dark">OPEN</span>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <div className="text-muted">$15,400.00 (2)</div>
          <span className="badge bg-danger-subtle text-danger">OVERDUE</span>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <div className="text-muted">$0.00</div>
          <span className="badge bg-secondary-subtle text-muted">NOT DUE YET</span>
        </div>

        <div className="d-flex justify-content-between">
          <div className="text-muted">$0.00</div>
          <span className="badge bg-success-subtle text-success">PAID LAST 30 DAYS</span>
        </div>
      </div>
    </div>
  </div>
</div>


                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="container-fluid p-4 py-4 bg-light">
      {/* Back Button above heading */}
      <div className="mb-2">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-1" /> Back
        </Button>
      </div>
      {/* Header */}
      <div className="mb-4">
        <div className="d-flex align-items-center mb-3">

          <h4 className="h3 fw-bold text-dark mb-0">Dashboard</h4>
        </div>


        {/* Navigation Tabs */}
        <ul className="nav nav-tabs border-bottom mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              type="button"
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'activity' ? 'active' : ''}`}
              type="button"
              onClick={() => setActiveTab('activity')}
            >
              Activity Feed
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'job-costing' ? 'active' : ''} text-primary`}
              type="button"
              onClick={() => setActiveTab('job-costing')}
            >
              Job Costing Hub
            </button>
          </li>
        </ul>
      </div>

      {renderTabContent()}
    </div>
  );
};

const CompanyFeed = () => {
  const scheduleDate = "6/8/25";
  const scheduleDay = "SUN";
  const scheduleTitle = "Admin";
  const startHour = 9;
  const endHour = 17;
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        {/* Welcome Section */}
        <div className="mb-4">
          <h5 className="card-title text-muted">Welcome to the company feed!</h5>
          <p className="card-text text-muted">
            This section will display comments from other users or relevant events in your company
          </p>
        </div>

        <hr className="my-4" />

        {/* Schedule Section */}
         <div className="card shadow-sm border-0 rounded-4 overflow-hidden animate__animated animate__fadeIn">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between border-bottom bg-white px-3 py-2">
        <div className="d-flex align-items-center">
          <Calendar className="me-2 text-warning" />
          <h6 className="mb-0 text-dark">Schedule</h6>
        </div>
      </div>

      {/* Day Header */}
      <div className="d-flex align-items-center justify-content-between bg-primary bg-opacity-10 text-dark px-3 py-2 border-bottom">
        <div className="d-flex align-items-center">
          <button className="btn btn-sm btn-light border me-2 px-2 py-0">‹</button>
          <button className="btn btn-sm btn-light border px-2 py-0">›</button>
          <div className="bg-primary text-white px-3 py-1 rounded small fw-bold mx-2 text-center">
            {scheduleDay}
            <br />
            <small>{scheduleDate}</small>
          </div>
        </div>
        <div className="fw-semibold">{scheduleTitle}</div>
      </div>

      {/* Time Slots */}
      <div className="p-3 pt-2 bg-white" style={{ height: "350px", overflowY: "auto" }}>
        {[...Array(endHour - startHour + 1)].map((_, i) => {
          const hour = startHour + i;
          const ampm = hour >= 12 ? "PM" : "AM";
          const displayHour = hour > 12 ? hour - 12 : hour;

          return (
            <div
              key={i}
              className="d-flex border-bottom py-2 align-items-center"
              style={{ minHeight: "35px" }}
            >
              <div className="text-muted small" style={{ width: "60px" }}>
                {`${displayHour}:00 ${ampm}`}
              </div>
              <div className="ps-2 flex-grow-1">
                {i === 1 && (
                  <div
                    className="text-success small px-2 py-1"
                    style={{
                      background: `repeating-linear-gradient(
                        45deg,
                        #f8f9fa,
                        #f8f9fa 10px,
                        #f1f1f1 10px,
                        #f1f1f1 20px
                      )`,
                    }}
                  >
                    TIME OFF
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
      </div>
    </div>
  );
};

const ActivitySearch = () => {
  return (
    <div className="container-fluid p-4">

      {/* Search Bar */}
      <div className="row mb-3">
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <Search />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search"
              value="Q 血 6523-6625"
              readOnly
            />
            <button className="btn btn-outline-secondary" type="button">
              Show unallocated only
            </button>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="row bg-light px-3 py-2 border-bottom fw-semibold text-nowrap">
        <div className="col-2">Date</div>
        <div className="col-4">Type (Origin)</div>
        <div className="col-4">Details</div>
        <div className="col-1">Value</div>
        <div className="col-1">Current Job</div>
      </div>

      {/* Empty State */}
      <div className="row py-5 border-bottom">
        <div className="col-12 text-center text-muted">
          <div className="py-4">
            <div className="d-flex justify-content-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="bi bi-search"
                width="48"
                height="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <p className="fs-5 m-0">There is no activity that matches your search criteria</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;