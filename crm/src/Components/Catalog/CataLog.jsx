import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Container,
  Button,
  Table,
  Form,
  Modal,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";

const CatalogTabs = () => {
  const [activeTab, setActiveTab] = useState("manage");
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const catalogItems = [
    { name: "Asphalt", type: "Service" },
    { name: "Demolition / Clear Out", type: "Service" },
    { name: "Disconnect Switch (switch)", type: "Product", price: 50, cost: 40, sku: "97522" },
    { name: "Driveway Asphalt (cf)", type: "Product", price: 10, cost: 7, sku: "5823" },
    { name: "Finishing", type: "Service" },
    { name: "Installation", type: "Service" },
    { name: "Laborer (hours)", type: "Product", price: 70, cost: 45 },
    { name: "Outlet (unit)", type: "Product", price: 10, cost: 8, sku: "10823" },
    { name: "Paint (5 gallons)", type: "Product", price: 25, cost: 17, sku: "5234" },
    { name: "Primer (5 gallon)", type: "Product", price: 20, cost: 15, sku: "19823" },
    { name: "Rough In", type: "Service" },
    { name: "Wire (1 ft) (feet)", type: "Product", price: 1, cost: 2, sku: "1028" },
  ];

  const filteredItems = catalogItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Allocate Materials state
  const [materials, setMaterials] = useState([
    { item: "Demolition / Clear Out", quantity: 1, cost: 0 },
  ]);

  const handleMaterialChange = (index, field, value) => {
    const updated = [...materials];
    updated[index][field] = field === "quantity" || field === "cost" ? parseFloat(value) || 0 : value;
    setMaterials(updated);
  };

  const addNewMaterial = () => {
    setMaterials([...materials, { item: "", quantity: 1, cost: 0 }]);
  };

  const removeMaterial = (index) => {
    const updated = [...materials];
    updated.splice(index, 1);
    setMaterials(updated);
  };

  const totalCost = materials.reduce((acc, mat) => acc + (mat.quantity * mat.cost), 0);

  return (
    <Container fluid  className="p-4">
      <h4 className=" fw-bold mb-4">Catalog</h4>
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="manage" title="Manage Catalog">
          {/* Manage Catalog Content */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <InputGroup style={{ maxWidth: "400px" }}>
              <Form.Control
                placeholder="Search item"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputGroup.Text><FaSearch /></InputGroup.Text>
            </InputGroup>
            <Button variant="primary" onClick={handleShow}>
              <FaPlus className="me-1" /> Add new
            </Button>
          </div>

          <Table bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Cost</th>
                <th>Code/SKU</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.price !== undefined ? `$${item.price.toFixed(2)}` : "-"}</td>
                  <td>{item.cost !== undefined ? `$${item.cost.toFixed(2)}` : "-"}</td>
                  <td>{item.sku || "-"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="allocate" title="Allocate Materials">
          <div className="border p-4 bg-light rounded">
            <h5>Allocate Materials</h5>
            <p className="mb-1">Kitchen Remodel (Fixed Price)</p>
            <p className="text-muted">for Bob Belcher</p>

            <Form.Group className="mb-3">
              <Form.Select>
                <option>Labor and Materials</option>
              </Form.Select>
            </Form.Group>

            <Table bordered>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Cost</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((mat, idx) => (
                  <tr key={idx}>
                    <td>
                      <InputGroup>
                        <Form.Control
                          value={mat.item}
                          onChange={(e) => handleMaterialChange(idx, "item", e.target.value)}
                        />
                        <Button variant="outline-danger" onClick={() => removeMaterial(idx)}>×</Button>
                      </InputGroup>
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        value={mat.quantity}
                        onChange={(e) => handleMaterialChange(idx, "quantity", e.target.value)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        step="0.01"
                        value={mat.cost}
                        onChange={(e) => handleMaterialChange(idx, "cost", e.target.value)}
                      />
                    </td>
                    <td>${(mat.quantity * mat.cost).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Button variant="link" onClick={addNewMaterial} className="mb-3">
              + add new item
            </Button>

            <div className="text-end fw-bold fs-5 mb-3">${totalCost.toFixed(2)}</div>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary">Submit</Button>
            </div>
          </div>
        </Tab>
      </Tabs>

      {/* Add Item Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Catalog Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control placeholder="Enter item name" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Select>
                    <option>Product</option>
                    <option>Service</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control placeholder="$0.00" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Cost</Form.Label>
                  <Form.Control placeholder="$0.00" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>SKU/Code</Form.Label>
                  <Form.Control placeholder="e.g., 10823" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CatalogTabs;
