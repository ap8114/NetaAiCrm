import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Dropdown, Modal } from "react-bootstrap";
import { FaRegCopy, FaEnvelopeOpenText, FaTrashAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PurchasesData = [
  {
    status: "Active",
    date: "11/9/22",
    allocated: ["Griswold Enterprises", "Wally World Parking..."],
    amount: "$14,000.00",
    po: "#2",
    vendor: "ABC Supply",
    items: "Driveway Asphalt (...)",
    from: "Brian Wilson",
  },
  {
    status: "Active",
    date: "11/9/22",
    allocated: ["Griswold Enterprises", "Wally World Parking..."],
    amount: "$30,000.00",
    po: "#3",
    vendor: "Cheadle Demolition...",
    items: "Demolition / Clear ...",
    from: "Brian Wilson",
  },
];

function AddPurchaseModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>New purchase</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Purchase Type</Form.Label>
            <Form.Select defaultValue="Purchase Order (vendor will send an invoice)">
              <option>Purchase Order (vendor will send an invoice)</option>
              <option>Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Vendor Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control placeholder="Start typing to search vendor" />
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function ReportModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Purchases report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 d-flex align-items-center gap-2">
          <InputGroup style={{ width: 220 }}>
            <InputGroup.Text>
              <i className="bi bi-calendar"></i>
            </InputGroup.Text>
            <Form.Control value="6/1/25 - 6/5/25" readOnly />
          </InputGroup>
          <Button variant="outline-secondary">
            <i className="bi bi-funnel"></i>
          </Button>
          <div className="ms-auto d-flex gap-2">
            <Button variant="outline-secondary">
              <i className="bi bi-gear"></i>
            </Button>
            <Button variant="primary">Export</Button>
          </div>
        </div>
        <div className="mb-3">
          <Button variant="dark" className="me-2">
            Purchases
          </Button>
          <Button variant="secondary" className="me-2">
            Catalog allocations
          </Button>
          <Button variant="secondary">Summary</Button>
        </div>
        <div className="text-center mt-5">
          <i
            className="bi bi-search"
            style={{ fontSize: 64, color: "#adb5bd" }}
          ></i>
          <div className="fw-bold mt-3" style={{ fontSize: 24 }}>
            No results found
          </div>
          <div className="text-muted">
            Try adjusting your filtering to find what you’re looking for.
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default function Purchases() {
  const [showAdd, setShowAdd] = useState(false);
  const [showReport, setShowReport] = useState(false);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">Purchases</h4>
        <div className="d-flex gap-2">
          <Button
            variant="outline-success"
            onClick={() => setShowReport(true)}
          >
            View report
          </Button>
          <Button variant="success" onClick={() => setShowAdd(true)}>
            Add new purchase
          </Button>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2">
          <Dropdown>
            <Dropdown.Toggle variant="light">All</Dropdown.Toggle>
          </Dropdown>
          <InputGroup>
            <Form.Control placeholder="Search" />
          </InputGroup>
          <Button variant="outline-secondary">
            <i className="bi bi-calendar"></i>
          </Button>
          <Button variant="outline-secondary d-flex">
            <i className="bi bi-funnel"></i>
            <span className="badge bg-primary ms-1">1</span>
          </Button>
        </div>
        <Button variant="outline-secondary">Export to XLS</Button>
      </div>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Status</th>
            <th>Date ↓</th>
            <th>Allocated to</th>
            <th>Amount</th>
            <th>PO#</th>
            <th>Vendor</th>
            <th>Items</th>
            <th>From</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {PurchasesData.map((row, idx) => (
            <tr key={idx}>
              <td>
                <span className="badge bg-success">{row.status}</span>
              </td>
              <td>{row.date}</td>
              <td>
                {row.allocated.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </td>
              <td className="text-primary fw-bold">{row.amount}</td>
              <td>{row.po}</td>
              <td>{row.vendor}</td>
              <td>{row.items}</td>
              <td>{row.from}</td>
              <td className="d-flex gap-2">
                <Button variant="link" className="text-dark p-0">
                  <FaRegCopy size={18} />
                </Button>
                <Button variant="link" className="text-dark p-0">
                  <FaEnvelopeOpenText size={18} />
                </Button>
                <Button variant="link" className="text-danger p-0">
                  <FaTrashAlt size={18} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end">
        <span>1-2 of 2</span>
        <Button variant="light" className="ms-2 p-0">
          <FaChevronLeft size={18} />
        </Button>
        <Button variant="light" className="p-0">
          <FaChevronRight size={18} />
        </Button>
      </div>

      <AddPurchaseModal show={showAdd} onHide={() => setShowAdd(false)} />
      <ReportModal show={showReport} onHide={() => setShowReport(false)} />
    </div>
  );
}
