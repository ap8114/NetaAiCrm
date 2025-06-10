import React from "react";
import { Modal, Table, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

const BillDetailModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Body>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <span className="text-muted">Bill</span>{" "}
            <span className="badge bg-danger">Overdue</span>
            <h4 className="mt-2">ABC Supply</h4>
            <div className="text-muted">Balance <strong>$5,400.00</strong></div>
          </div>
          <div>
            <Button variant="outline-dark" className="me-2">Record payment</Button>
            <Button variant="light" onClick={handleClose}><FaTimes /></Button>
          </div>
        </div>

        {/* Invoice Info */}
        <Row className="mb-4">
          <Col><strong>Invoice date</strong><div>Nov 09, 2022</div></Col>
          <Col><strong>Due date</strong><div>Nov 09, 2022</div></Col>
        </Row>

        {/* Details Section */}
        <h5 className="border-bottom pb-2">Details</h5>
        <Table bordered responsive>
          <thead>
            <tr>
              <th>Source</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Item Price</th>
              <th>Total</th>
              <th>For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="/">PO #2 <span className="badge bg-success">ACTIVE</span></a>
              </td>
              <td>Driveway Asphalt</td>
              <td>2000.00</td>
              <td>$7.00</td>
              <td>$14,000.00</td>
              <td>
                Griswold Enterprises<br />
                <a href="/detail">Wally World Parking Lot Asphalt</a>
              </td>
            </tr>
            <tr>
              <td>No PO#</td>
              <td>Dumpster Rental</td>
              <td>14.00</td>
              <td>$100.00</td>
              <td>$1,400.00</td>
              <td>
                Griswold Enterprises<br />
                <a href="/detail">Wally World Parking Lot Demolition / Clear Out</a>
              </td>
            </tr>
          </tbody>
        </Table>

        <Row className="mb-4">
          <Col md={6}></Col>
          <Col md={6}>
            <div className="d-flex justify-content-between">
              <strong>Total Amount:</strong>
              <span>$15,400.00</span>
            </div>
            <div className="d-flex justify-content-between">
              <strong>Current Balance:</strong>
              <span>$5,400.00</span>
            </div>
          </Col>
        </Row>

        {/* Payments */}
        <h6>Payments (1)</h6>
        <Table bordered>
          <thead>
            <tr>
              <th>Date</th>
              <th>Total</th>
              <th>Payment Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>11/24/22</td>
              <td>-$10,000.00</td>
              <td>n/a</td>
            </tr>
          </tbody>
        </Table>
        <Button variant="outline-secondary" className="mb-4">Void payment</Button>

        {/* Activity + Docs */}
        <Row>
          <Col md={6}>
            <h6>Activity</h6>
            <Card className="mb-2 bg-light">
              <Card.Body className="p-2">
                <div><strong>Payment recorded</strong></div>
                <small className="text-muted">Brian Wilson - 5/29/25 8:26 PM</small>
              </Card.Body>
            </Card>
            <Card className="mb-2 bg-light">
              <Card.Body className="p-2">
                <div><strong>[PO #2] Bill allocated</strong></div>
                <small className="text-muted">simon Mashlah - 5/29/25 8:26 PM</small>
              </Card.Body>
            </Card>
            <Card className="mb-2 bg-light">
              <Card.Body className="p-2">
                <div><strong>Bill items re-allocated</strong></div>
                <small className="text-muted">simon Mashlah - 5/29/25 8:26 PM</small>
              </Card.Body>
            </Card>
            <Card className="mb-2 bg-light">
              <Card.Body className="p-2">
                <div><strong>Bill created</strong></div>
                <small className="text-muted">simon Mashlah - 5/29/25 8:26 PM</small>
              </Card.Body>
            </Card>
            <Card className="bg-light">
              <Card.Body className="p-2">
                <div><strong>[PO #2] Purchase created</strong> (<a href="/">view</a>)</div>
                <small className="text-muted">simon Mashlah - 5/29/25 8:26 PM</small>
              </Card.Body>
            </Card>
            <Form.Control as="textarea" rows={2} placeholder="Type here" className="mt-3" />
          </Col>

          <Col md={6}>
            <h6>Supporting Documents</h6>
            <Card className="text-center p-4 border-dashed">
              <Card.Body>
                <div className="mb-2">Drop files here</div>
                <div>
                  <a href="/" className="text-primary">Click to select files</a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default BillDetailModal;
