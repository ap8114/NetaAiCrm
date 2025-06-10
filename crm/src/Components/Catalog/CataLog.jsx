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
import { FaPlus, FaSearch, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CatalogTabs = () => {

  const [activeTab, setActiveTab] = useState("manage");
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [catalogItems, setCatalogItems] = useState([
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
  ]);
  
  const navigate = useNavigate();

  const handleClose = () => setShowModal(false);

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

  const [itemType, setItemType] = useState("Product");
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "Product",
    description: "",
    extendedDescription: "",
    tags: "",
    unitOfMeasure: "",
    unitPrice: "",
    unitCost: "",
    sku: "",
    defaultScope: "",
    price: "",
    isSubitem: false,
  });

  // Open modal for add or edit

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "type") setItemType(value);
  };

  // Save or update item
  const handleSave = () => {
    if (editIndex !== null) {
      // Update existing
      setCatalogItems(prevItems => {
        const updatedItems = [...prevItems];
        updatedItems[editIndex] = {
          ...updatedItems[editIndex],
          ...formData,
          type: itemType,
          price: Number(formData.unitPrice || formData.price) || undefined,
          cost: Number(formData.unitCost) || undefined,
          sku: formData.sku,
        };
        return updatedItems;
      });
    } else {
      // Add new
      setCatalogItems(prevItems => [
        ...prevItems,
        {
          ...formData,
          type: itemType,
          price: Number(formData.unitPrice || formData.price) || undefined,
          cost: Number(formData.unitCost) || undefined,
          sku: formData.sku,
        }
      ]);
    }
    setShowModal(false);
  };

  const totalCost = materials.reduce((acc, mat) => acc + (mat.quantity * mat.cost), 0);


    // catalogItems ko state me rakhein



   const handleShow = (item = null, idx = null) => {
    if (item) {
      setEditIndex(idx);
      setItemType(item.type || "Product");
      setFormData({
        name: item.name || "",
        type: item.type || "Product",
        description: item.description || "",
        extendedDescription: item.extendedDescription || "",
        tags: item.tags || "",
        unitOfMeasure: item.unitOfMeasure || "",
        unitPrice: item.unitPrice !== undefined ? item.unitPrice : (item.price !== undefined ? item.price : ""),
        unitCost: item.unitCost !== undefined ? item.unitCost : (item.cost !== undefined ? item.cost : ""),
        sku: item.sku || "",
        defaultScope: item.defaultScope || "",
        price: item.price !== undefined ? item.price : "",
        isSubitem: item.isSubitem || false,
      });
    } else {
      setEditIndex(null);
      setItemType("Product");
      setFormData({
        name: "",
        type: "Product",
        description: "",
        extendedDescription: "",
        tags: "",
        unitOfMeasure: "",
        unitPrice: "",
        unitCost: "",
        sku: "",
        defaultScope: "",
        price: "",
        isSubitem: false,
      });
    }
    setShowModal(true);
  };

  // handleSave ko update karein
 
  return (
    <Container fluid className="p-4">
      {/* Back Button above heading */}
      <div className="mb-2">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-1" /> Back
        </Button>
      </div>
      <h4 className="fw-bold mb-4">Catalog</h4>
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
                <tr key={idx} style={{ cursor: "pointer" }} onClick={() => handleShow(item, idx)}>
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
                  <Form.Control
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter item name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={itemType}
                    onChange={handleInputChange}
                  >
                    <option>Product</option>
                    <option>Service</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {itemType === "Product" ? (
              <>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Extended Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="extendedDescription"
                        value={formData.extendedDescription}
                        onChange={handleInputChange}
                        placeholder="Extended Description"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Tags</Form.Label>
                      <Form.Control
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        placeholder="Enter tag"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Unit of Measure</Form.Label>
                      <Form.Control
                        name="unitOfMeasure"
                        value={formData.unitOfMeasure}
                        onChange={handleInputChange}
                        placeholder="Unit of Measure"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Unit price</Form.Label>
                      <Form.Control
                        name="unitPrice"
                        value={formData.unitPrice}
                        onChange={handleInputChange}
                        placeholder="$"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Unit Cost</Form.Label>
                      <Form.Control
                        name="unitCost"
                        value={formData.unitCost}
                        onChange={handleInputChange}
                        placeholder="$"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Item number / SKU</Form.Label>
                      <Form.Control
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        placeholder="SKU"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Default Scope of Work</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="defaultScope"
                        value={formData.defaultScope}
                        onChange={handleInputChange}
                        placeholder="Default Scope of Work"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Tags</Form.Label>
                      <Form.Control
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        placeholder="Enter tag"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="$"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="d-flex align-items-end">
                    <Form.Check
                      type="checkbox"
                      label="This is a subitem"
                      name="isSubitem"
                      checked={formData.isSubitem}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CatalogTabs;
