import React from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Table,
  Card,
  Form
} from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

const InvoiceDetailModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="xl" centered scrollable>
      <Modal.Body>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <div className="text-muted">Pay app <span className="badge bg-danger">Overdue</span></div>
            <h4 className="mt-2">Griswold Enterprises</h4>
            <div className="text-muted">Balance <strong className="text-dark">$45,000.00</strong></div>
          </div>
          <div>
            <Button variant="outline-secondary" className="me-2">Send via email</Button>
            <Button variant="light" onClick={handleClose}><FaTimes /></Button>
          </div>
        </div>

        {/* Invoice Info Grid */}
        <Row className="bg-light rounded p-3 mb-4">
          <Col><strong>Invoice #</strong><div>3</div></Col>
          <Col><strong>Application #</strong><div>1</div></Col>
          <Col><strong>Period</strong><div>Oct 18, 2022</div></Col>
          <Col><strong>Invoice date</strong><div>Nov 09, 2022</div></Col>
          <Col><strong>Due date</strong><div>Nov 16, 2022</div></Col>
          <Col>
            <strong>Project name</strong>
            <div className="text-primary text-decoration-underline" style={{ cursor: "pointer" }}><a href="/detail">
              Wally World Parking Lot
            </a></div>
          </Col>
        </Row>

        {/* Details Table */}
        <h5 className="mb-3">Details</h5>
        <Table bordered responsive>
          <tbody>
            <tr>
              <td>1. Original Contract Sum:</td>
              <td>$264,000.00</td>
            </tr>
            <tr>
              <td>2. Net Change by Change Orders:</td>
              <td>$0.00</td>
            </tr>
            <tr>
              <td>3. Contract Sum to Date (1+2):</td>
              <td>$264,000.00</td>
            </tr>
            <tr>
              <td>4. Total Completed and Stored to Date:</td>
              <td>$50,000.00</td>
            </tr>
            <tr>
              <td>5. Retainage:</td>
              <td>$5,000.00</td>
            </tr>
            <tr>
              <td>5a. % of Completed Work:</td>
              <td>$0.00</td>
            </tr>
            <tr>
              <td>5b. % of Stored Materials:</td>
              <td>$0.00</td>
            </tr>
            <tr>
              <td>6. Total Earned Less Retainage (4-5):</td>
              <td>$45,000.00</td>
            </tr>
            <tr>
              <td>7. Previous Applications for Payment:</td>
              <td>$0.00</td>
            </tr>
            <tr>
              <td>8. Payment Due (6-7):</td>
              <td>$45,000.00</td>
            </tr>
            <tr>
              <td>9. Balance to Finish, Including Retainage (3-6):</td>
              <td>$219,000.00</td>
            </tr>
          </tbody>
        </Table>

        {/* Payments Section */}
        <h6 className="mt-4">Payments (0)</h6>
        <Card className="mb-3">
          <Card.Body className="text-muted text-center">There are no payments</Card.Body>
        </Card>

        {/* Optional Marketing Message */}
        <Card className="bg-light p-3 mb-4">
          <Card.Body className="p-0">
            <span role="img" aria-label="info">💡</span>
            <strong className="ms-2">
              Tired of waiting on customers to pay?{" "}
              <a href="#" className="text-primary">Learn about Pay App Advances from Billd</a>
            </strong>
          </Card.Body>
        </Card>

        {/* Activity Section */}
        <h6 className="mt-4">Activity</h6>
        <Form.Control as="textarea" rows={3} placeholder="Type here" />
      </Modal.Body>
    </Modal>
  );
};

export default InvoiceDetailModal;
