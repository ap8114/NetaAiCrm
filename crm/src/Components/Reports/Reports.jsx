import React from 'react';


const Reports = () => {
  return (
    <div className="container-fluid" style={{ backgroundColor: '#f6f6f7', minHeight: '100vh' }}>
      <div className="pt-4 px-4">
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
