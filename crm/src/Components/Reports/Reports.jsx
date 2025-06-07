import React from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid" style={{ backgroundColor: '#f6f6f7', minHeight: '100vh' }}>
      <div className="pt-4 px-4">
        {/* Back Button above heading */}
        <div className="mb-2">
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>
            <FaArrowLeft className="me-1" /> Back
          </Button>
        </div>
        <h4 className="fw-bold">Reports</h4>

        <div className="mt-3">
          <div className="dropdown">
            <button
              className="btn btn-light border dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select a report
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item">Sales Report</button></li>
              <li><button className="dropdown-item">Inventory Report</button></li>
              <li><button className="dropdown-item">Finance Report</button></li>
            </ul>
          </div>
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ height: '70vh' }}>
          <i className="bi bi-file-earmark-bar-graph mb-4 text-primary" style={{ fontSize: '64px' }}></i>
          {/* Bootstrap icon used instead of image */}
          <h5 className="fw-bold">Generate a report</h5>
          <p className="text-muted">Start by choosing a report type and setting your report parameters</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
