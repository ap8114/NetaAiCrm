import React, { useState } from "react";
import { Modal, Button, Table, Form, InputGroup, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Add this import

const BillsTab = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeSearch, setActiveSearch] = useState("vendor");
  const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate(); // Add this line

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  const handleClear = () => setSearchInput("");

  return (
    <div className="col-12 p-4">
      <div className="d-flex justify-content-between align-items-center my-3">
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                      &lt; Back
                    </Button>
        <h4 className="fw-bold">Bills</h4>
        <Button variant="primary" onClick={handleModalShow}>
          Add new bill
        </Button>
      </div>

      <div className="alert alert-warning d-flex justify-content-between">
        <span>Outstanding: <strong className="text-danger">$15,400.00</strong></span>
        <span>Due within 7 days: <strong className="text-warning">$0.00</strong></span>
        <span>Overdue: <strong className="text-danger">$15,400.00</strong></span>
      </div>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder={`Search by ${activeSearch === "vendor" ? "vendor name" : "PO number"}`}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Dropdown onSelect={(e) => setActiveSearch(e)}>
          <Dropdown.Toggle variant="outline-secondary">Search by</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="vendor">Vendor Name</Dropdown.Item>
            <Dropdown.Item eventKey="po">PO Number</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </InputGroup>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Status</th>
            <th>Due date</th>
            <th>Invoice date</th>
            <th>Balance</th>
            <th>Total</th>
            <th>Payee/Vendor</th>
            <th>PO#/For</th>
            <th>Invoice #</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span className="badge bg-danger">Overdue</span></td>
            <td>11/9/22</td>
            <td>11/9/22</td>
            <td>$5,400.00</td>
            <td>$15,400.00</td>
            <td>ABC Supply</td>
            <td>PO #2<br />Griswold Enterprises<br />Wally World Parking</td>
            <td></td>
            <td className="text-center">🔁</td>
          </tr>
          <tr>
            <td><span className="badge bg-danger">Overdue</span></td>
            <td>11/9/22</td>
            <td>11/9/22</td>
            <td>$10,000.00</td>
            <td>$20,000.00</td>
            <td>Cheadle D…</td>
            <td>PO #3<br />Griswold Enterprises<br />Wally World Parking</td>
            <td></td>
            <td className="text-center">🔁</td>
          </tr>
        </tbody>
      </Table>

      {/* Add Bill Modal */}
      <Modal show={showModal} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>New Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex gap-3 mb-3">
            <Button variant={activeSearch === "vendor" ? "primary" : "outline-primary"} onClick={() => setActiveSearch("vendor")}>By vendor name</Button>
            <Button variant={activeSearch === "po" ? "primary" : "outline-primary"} onClick={() => setActiveSearch("po")}>By PO number</Button>
          </div>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{activeSearch === "vendor" ? "Vendor name" : "PO number"}</Form.Label>
              <Form.Control placeholder={`Enter ${activeSearch === "vendor" ? "vendor name" : "PO number"}`} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Supporting documents (optional)</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClear}>
            Clear data
          </Button>
          <Button variant="primary" onClick={handleModalClose}>
            Verify & Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BillsTab;
