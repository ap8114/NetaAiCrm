import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Dropdown, Modal, Row, Col } from "react-bootstrap";
import { FaRegCopy, FaEnvelopeOpenText, FaTrashAlt, FaChevronLeft, FaChevronRight, FaArrowLeft } from "react-icons/fa";
import CopyFromSpreadsheetModal from './CopyFromSpreadsheetModal';
import { useNavigate } from "react-router-dom";
import PurchaseOrderModal from "./PurchaseOrderModal";

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


  const [items, setItems] = useState([
    { description: "", quantity: 1, unitCost: "", job: "" }
  ]);
  const [showSpreadsheetModal, setShowSpreadsheetModal] = useState(false);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

 


  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, unitCost: "", job: "" }]);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setShowSpreadsheetModal(false);
          onHide();
        }}
        fullscreen  // Changed from size="lg" to fullscreen
        backdrop={showSpreadsheetModal ? "static" : true}
        keyboard={!showSpreadsheetModal}
      >
        <div
          style={showSpreadsheetModal ? {
            pointerEvents: "none",
            opacity: 0.5,
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          } : {
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Modal.Header closeButton={!showSpreadsheetModal}>
            <Modal.Title>New purchase</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ flex: 1, overflowY: 'auto' }}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Purchase Type</Form.Label>
                <Form.Select defaultValue="">
                  <option value="" disabled>Select Purchase Type</option>
                  <option>Purchase Order (vendor will send an invoice)</option>
                  <option>Expense (paid with cash or debit card)</option>
                  <option>Reimbursement (company will reimburse me)</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Person to be Reimbursed</Form.Label>
                <Form.Control placeholder="Type name" />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">Item</h6>
                <div>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setShowSpreadsheetModal(true)}
                    disabled={showSpreadsheetModal}
                    className="me-2"
                  >
                    Copy from spreadsheet
                  </Button>
                  <Button variant="outline-primary" size="sm" onClick={addItem}>
                    + Add another item
                  </Button>
                </div>
              </div>

              <div style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                {items.map((item, index) => (
                  <Row key={index} className="mb-2 align-items-end">
                    <Col md={5}>
                      <Form.Label className="small mb-0">Description</Form.Label>
                      <Form.Control
                        placeholder="Enter description"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, "description", e.target.value)}
                      />
                    </Col>
                    <Col md={2}>
                      <Form.Label className="small mb-0">Qty</Form.Label>
                      <Form.Control
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                      />
                    </Col>
                    <Col md={2}>
                      <Form.Label className="small mb-0">Unit Cost</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="$"
                        value={item.unitCost}
                        onChange={(e) => handleItemChange(index, "unitCost", e.target.value)}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Label className="small mb-0">Job</Form.Label>
                      <Form.Control
                        placeholder="Search Job"
                        value={item.job}
                        onChange={(e) => handleItemChange(index, "job", e.target.value)}
                      />
                    </Col>
                  </Row>
                ))}
              </div>

              <Row className="mt-3">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Check label="Set Purchase Date" />
                    <Form.Check label="Upload Supporting Documents" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Type here" />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer className="border-top py-3">
            <div className="me-auto fw-bold fs-5">Total: $0.00</div>
            <Button variant="light" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary">✔ Verify & Submit</Button>
          </Modal.Footer>
        </div>
      </Modal>
      <CopyFromSpreadsheetModal
        show={showSpreadsheetModal}
        onHide={() => setShowSpreadsheetModal(false)}
      />
    </>
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
  const navigate = useNavigate(); // Add this line
  const [showModal, setShowModal] = useState(false);
  const [selectedLine, setSelectedLine] = useState(null);

  const handleLineClick = (line) => {
    setSelectedLine(line);
    setShowModal(true);
  };

  return (
    <div className="col-12 p-4 mt-4" style={{ overflowX: "hidden" }}>
      {/* Back Button above heading */}
      <div className="mb-2">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-1" /> Back
        </Button>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">Purchases</h4>
        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            onClick={() => setShowReport(true)}
          >
            View report
          </Button>
          <Button variant="primary" onClick={() => setShowAdd(true)}>
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

      <Table bordered hover responsive style={{ overflowX: "hidden" }}>

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
                <span className="badge bg-primary">{row.status}</span>
              </td>
              <td>{row.date}</td>
              <td>
               {row.allocated.map((line, i) => (
        <div key={i} onClick={() => handleLineClick(line)} style={{ cursor: 'pointer' }}>
          {line}
        </div>
      ))}

      <PurchaseOrderModal
        show={showModal}
        onHide={() => setShowModal(false)}
        line={selectedLine}/>

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