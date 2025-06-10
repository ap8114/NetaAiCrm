import React from "react";
import { Modal, Button, Table, Row, Col, Card, Form } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

const PurchaseOrderModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <span className="text-muted">Purchase</span>{" "}
            <span className="badge bg-success">Active</span>
            <h4 className="mt-2">PO #2 for ABC Supply</h4>
            <div className="text-muted">Balance <strong>$14,000.00</strong></div>
          </div>
          <div>
            <Button variant="outline-dark" className="me-2">Email PO to vendor</Button>
            <Button variant="light" onClick={handleClose}><FaTimes /></Button>
          </div>
        </div>

        <Row className="mb-4">
          <Col><strong>Date</strong><div>Nov 09, 2022</div></Col>
          <Col><strong>Payment method</strong><div>Vendor will invoice</div></Col>
          <Col><strong>Submitted by</strong><div className="text-muted">-</div></Col>
          <Col><strong>Approver</strong><div>N/A</div></Col>
        </Row>

        <h5 className="border-bottom pb-2">Details</h5>
        <Table bordered responsive>
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit Cost</th>
              <th>Total</th>
              <th>Job</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Driveway Asphalt (#5823)</td>
              <td>4000.00</td>
              <td>$7.00</td>
              <td>$28,000.00</td>
              <td>
                <div>
                  Griswold Enterprises<br />
                  <a href="/detail">Wally World Parking Lot Asphalt</a>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>

        <Row className="mb-4">
          <Col md={6}></Col>
          <Col md={6}>
            <div className="d-flex justify-content-between">
              <strong>Total:</strong>
              <span>$28,000.00</span>
            </div>
            <div className="d-flex justify-content-between">
              <strong>Balance:</strong>
              <span>$14,000.00</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <h6>Activity</h6>
            <Card className="mb-2 bg-light">
              <Card.Body className="p-2">
                <div><strong>Bill allocated</strong> (<a href="/">View</a>)</div>
                <small className="text-muted">simon Mashlah - 5/29/25 8:26 PM</small>
              </Card.Body>
            </Card>
            <Card className="bg-light">
              <Card.Body className="p-2">
                <div><strong>Purchase created</strong></div>
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

export default PurchaseOrderModal;
