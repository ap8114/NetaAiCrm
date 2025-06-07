import React, { useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { FaFileExport, FaCheckSquare, FaPrint, FaFilter, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa'; // Add FaArrowLeft
import { useNavigate } from "react-router-dom"; // Add this import

const invoices = [
  {
    status: 'Overdue',
    dueDate: '11/16/22',
    invoiceDate: '11/9/22',
    balance: '$45,000.00',
    total: '$45,000.00',
    invoiceNumber: '3',
    client: 'Griswold Enterprises',
    project: 'Wally World Parking Lot',
  },
  {
    status: 'Overdue',
    dueDate: '11/16/22',
    invoiceDate: '11/9/22',
    balance: '$3,500.00',
    total: '$3,500.00',
    invoiceNumber: '2',
    client: 'Bob Belcher',
    project: 'Kitchen Remodel (Fixed Price)',
  },
];

const InvoiceDashboard = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="p-4">
      {/* Back Button above heading */}
      <div className="mb-2">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-1" /> Back
        </Button>
      </div>
      <div className="mb-4">
        {/* Row 1: Back button + Right Buttons */}
        <div className="d-flex align-items-center mb-2">
          {/* Left: (empty, since back button is above) */}
          <div className="ms-auto d-flex gap-2">
            <Button variant="outline-dark">
              View report
            </Button>
            <Button variant="primary" onClick={handleOpenModal}>
              Add new invoice
            </Button>
          </div>
        </div>

        {/* Row 2: Heading */}
        <div>
          <h4 className="fw-bold mb-0">Invoice</h4>
        </div>
      </div>

      {/* Bootstrap Nav Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'invoices' ? 'active' : ''}`}
            onClick={() => setActiveTab('invoices')}
            type="button"
          >
            Manage Invoices
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'billable' ? 'active' : ''}`}
            onClick={() => setActiveTab('billable')}
            type="button"
          >
            Manage Billable Items
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      {activeTab === 'invoices' && (
        <>
          <div className="bg-warning bg-opacity-10 border border-warning rounded p-3 mb-4 d-flex justify-content-between">
            <div>Outstanding: <span className="text-warning fw-bold">$48,500.00 (2)</span></div>
            <div>Due within 30 days: <span className="text-warning fw-bold">$0.00 (0)</span></div>
            <div>Overdue: <span className="text-danger fw-bold">$48,500.00 (2)</span></div>
          </div>

          <div className="d-flex align-items-center mb-3 gap-2">
            <Form.Control placeholder="Search" style={{ maxWidth: '200px' }} />
            <Button variant="outline-secondary">
              <FaCalendarAlt className="me-2" />
              Invoice date
            </Button>
            <Button variant="outline-secondary" className="position-relative">
              <FaFilter />
              <span className="badge bg-primary position-absolute top-0 start-100 translate-middle p-1 rounded-circle">1</span>
            </Button>
          </div>

          <div className="table-responsive">
            <Table hover>
              <thead className="text-muted">
                <tr>
                  <th>Status</th>
                  <th>Due date &#x25BC;</th>
                  <th>Invoice date &#x25B2;</th>
                  <th>Balance &#x25B2;</th>
                  <th>Total &#x25B2;</th>
                  <th>Invoice &#x25B2;</th>
                  <th>For &#x25B2;</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className="badge bg-danger px-4 py-2">Overdue</span>
                    </td>
                    <td>{inv.dueDate}</td>
                    <td>{inv.invoiceDate}</td>
                    <td>{inv.balance}</td>
                    <td>{inv.total}</td>
                    <td>{inv.invoiceNumber}</td>
                    <td>
                      {inv.client}<br />
                      <span className="text-muted">{inv.project}</span>
                    </td>
                    <td className="text-end">
                      <FaCheckSquare className="me-3 fs-5 text-primary" />
                      <FaPrint className="fs-5 text-primary" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <Button variant="outline-secondary">
              <FaFileExport className="me-2" />
              Export to XLS
            </Button>
            <div>1-2 of 2</div>
          </div>
        </>
      )}

      {activeTab === 'billable' && (
        <div className="bg-light rounded-3 p-4">
          <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
            {/* Search */}
            <div className="input-group" style={{ maxWidth: 320 }}>
              <input className="form-control" placeholder="Search" />
              <span className="input-group-text bg-white">
                <i className="bi bi-search" />
              </span>
            </div>
            {/* Date Range */}
            <div>
              <button className="btn btn-outline-secondary d-flex align-items-center">
                <i className="bi bi-calendar me-2" />
                3/6/25 - 6/13/25
              </button>
            </div>
            {/* Show history */}
            <div className="form-check ms-2">
              <input className="form-check-input" type="checkbox" id="showHistory" />
              <label className="form-check-label" htmlFor="showHistory">
                Show history
              </label>
            </div>
            {/* Pagination */}
            <div className="ms-auto d-flex align-items-center gap-2">
              <span>0 of 0</span>
              <button className="btn btn-outline-light border"><i className="bi bi-chevron-left" /></button>
              <button className="btn btn-outline-light border"><i className="bi bi-chevron-right" /></button>
            </div>
          </div>
          {/* No Results */}
          <div className="d-flex flex-column align-items-center justify-content-center py-5" style={{ minHeight: 300 }}>
            <i className="bi bi-search" style={{ fontSize: 64, color: "#444", opacity: 0.2 }} />
            <h3 className="fw-bold mt-3 mb-2">No results</h3>
            <div className="text-muted text-center" style={{ maxWidth: 420 }}>
              There are no billable items that match the current filters. Change the timeframe if you are trying to invoice for billable items which due date is in the future.
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block', background: 'rgba(0,0,0,0.2)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0">
              <div className="modal-body p-4">
                <button
                  type="button"
                  className="btn-close mb-3"
                  aria-label="Close"
                  onClick={handleCloseModal}
                  style={{ fontSize: '1.5rem' }}
                ></button>
                <h2 className="fw-bold mb-4">New invoice</h2>
                <div className="mb-3 fw-semibold" style={{ fontSize: '1.2rem' }}>
                  Select the job you are invoicing for:
                </div>
                <Form.Select size="lg" className="mb-2" style={{ fontSize: '1.1rem' }}>
                  <option>Type client or job</option>
                  {/* Add options dynamically if needed */}
                </Form.Select>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default InvoiceDashboard;
