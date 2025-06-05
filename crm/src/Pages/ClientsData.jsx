import React from "react";
import { Button, Table, Form, InputGroup, Modal } from "react-bootstrap";
import { FaSearch, FaEdit, FaUser } from "react-icons/fa";

const ClientsUI = () => {
  const [showAdd, setShowAdd] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [showAssign, setShowAssign] = React.useState(false);
  const [selectedClient, setSelectedClient] = React.useState(null);

  const handleAddOpen = () => setShowAdd(true);
  const handleAddClose = () => setShowAdd(false);

  const handleEditOpen = (client) => {
    setSelectedClient(client);
    setShowEdit(true);
  };
  const handleEditClose = () => setShowEdit(false);

  const handleAssignOpen = (client) => {
    setSelectedClient(client);
    setShowAssign(true);
  };
  const handleAssignClose = () => setShowAssign(false);

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Clients</h2>
        <Button variant="success" onClick={handleAddOpen}>Add new client</Button>
      </div>

      <div className="d-flex gap-3 align-items-center mb-3">
        <InputGroup style={{ maxWidth: "300px" }}>
          <Form.Control placeholder="Search" />
          <Button variant="light">
            <FaSearch />
          </Button>
        </InputGroup>
        <Form.Check type="checkbox" label="Show Inactive" />
        <div className="ms-auto text-end"> 
          <a href="#" className="text-secondary text-decoration-none border border-secondary p-2 d-flex align-items-center rounded">
            <span className="me-1">🗎</span>Export to XLS
          </a>
        </div>
      </div>

      <Table hover responsive className="border">
        <thead className="bg-light">
          <tr>
            <th>Client</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[
            "Bob Belcher",
            "Griswold Enterprises",
            "Stan and Francine Smith",
          ].map((client, index) => (
            <tr key={index}>
              <td>
                <a href="#" className="text-primary fw-medium text-decoration-none">
                  {client}
                </a>
              </td>
              <td className="text-end">
                <Button variant="outline-primary" className="me-2" onClick={() => handleEditOpen(client)}>
                  <FaEdit />
                </Button>
                <Button variant="outline-primary" onClick={() => handleAssignOpen(client)}>
                  <FaUser />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center">
        <div>1-3 of 3</div>
        <div>
          <Button variant="light" className="me-2">
            &lt;
          </Button>
          <Button variant="light">&gt;</Button>
        </div>
      </div>

      {/* Add New Client Modal */}
      <Modal show={showAdd} onHide={handleAddClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add new client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form fields as per your screenshot */}
          <div className="row g-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Client Name <span className="text-danger">*</span></Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Check label="This is a subclient" className="my-2" />
              <div className="d-flex gap-2 mb-2">
                <Button variant="secondary" size="sm">Billing Address</Button>
                <Button variant="light" size="sm">Mailing Address</Button>
              </div>
              <Form.Group>
                <Form.Label>Address Lookup</Form.Label>
                <InputGroup>
                  <Button variant="light"><FaSearch /></Button>
                  <Form.Control placeholder="Start typing to view suggestions" />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Address</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>City</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>State</Form.Label>
                <Form.Select>
                  <option>NJ</option>
                  <option>NY</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Country</Form.Label>
                <Form.Select>
                  <option>United States</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Contact Name</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Phone</Form.Label>
                <Form.Control placeholder="Ex. (123) 456-7890" />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Other</Form.Label>
                <Form.Control placeholder="Ex. account#, website" />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" rows={5} />
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose}>Cancel</Button>
          <Button variant="success">Submit</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Client Modal */}
      <Modal show={showEdit} onHide={handleEditClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Client Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Same form as Add, but prefilled for editing */}
          {/* ...copy the form from above, prefill with selectedClient if needed... */}
          <div className="row g-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Client Name <span className="text-danger">*</span></Form.Label>
                <Form.Control defaultValue={selectedClient} />
              </Form.Group>
              <Form.Check label="This is a subclient" className="my-2" />
              <div className="d-flex gap-2 mb-2">
                <Button variant="secondary" size="sm">Billing Address</Button>
                <Button variant="light" size="sm">Mailing Address</Button>
              </div>
              <Form.Group>
                <Form.Label>Address Lookup</Form.Label>
                <InputGroup>
                  <Button variant="light"><FaSearch /></Button>
                  <Form.Control placeholder="Start typing to view suggestions" />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Address</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>City</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>State</Form.Label>
                <Form.Select>
                  <option>NJ</option>
                  <option>NY</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Country</Form.Label>
                <Form.Select>
                  <option>United States</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Contact Name</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Phone</Form.Label>
                <Form.Control placeholder="Ex. (123) 456-7890" />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Other</Form.Label>
                <Form.Control placeholder="Ex. account#, website" />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" rows={5} />
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>Cancel</Button>
          <Button variant="success">Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Assign Role Modal */}
      <Modal show={showAssign} onHide={handleAssignClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Example content, adjust as per your design */}
          <Form.Group>
            <Form.Label>Select Role</Form.Label>
            <Form.Select>
              <option>Admin</option>
              <option>User</option>
              <option>Viewer</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAssignClose}>Cancel</Button>
          <Button variant="success">Assign</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClientsUI;