import React from "react";
import { Button, Table, Form, InputGroup, Modal, Tabs, Tab } from "react-bootstrap";
import { FaSearch, FaEdit, FaUser, FaBuilding, FaUsers, FaFileExport, FaArrowLeft } from "react-icons/fa"; // Add FaArrowLeft
import { useNavigate } from "react-router-dom"; // Add useNavigate

// Example client data structure with parent-child and projects/leads
const CLIENTS = [
  {
    id: 1,
    name: "Griswold Enterprises",
    type: "company",
    industry: "Construction",
    size: "100-500",
    businessType: "LLC",
    children: [
      {
        id: 2,
        name: "Stan and Francine Smith",
        type: "person",
        parentId: 1,
        projects: [
          { title: "Kitchen Remodel", status: "Active" },
          { title: "Bathroom Renovation", status: "Completed" },
        ],
        leads: [{ title: "Garage Expansion", status: "In Progress" }],
      },
    ],
    projects: [
      { title: "Office Buildout", status: "Active" },
      { title: "HQ Renovation", status: "Completed" },
    ],
    leads: [{ title: "New Warehouse", status: "In Progress" }],
  },
  {
    id: 3,
    name: "Bob Belcher",
    type: "person",
    parentId: null,
    projects: [{ title: "Burger Shop Upgrade", status: "Active" }],
    leads: [],
  },
];

const ClientsData = () => {
  const [showAdd, setShowAdd] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [showAssign, setShowAssign] = React.useState(false);
  const [showExport, setShowExport] = React.useState(false);
  const [selectedClient, setSelectedClient] = React.useState(null);
  const [clientType, setClientType] = React.useState("person");
  const navigate = useNavigate(); // Add this line

  const handleAddOpen = () => setShowAdd(true);
  const handleAddClose = () => setShowAdd(false);

  const handleEditOpen = (client) => {
    setSelectedClient(client);
    setClientType(client?.type || "person");
    setShowEdit(true);
  };
  const handleEditClose = () => setShowEdit(false);

  const handleAssignOpen = (client) => {
    setSelectedClient(client);
    setShowAssign(true);
  };
  const handleAssignClose = () => setShowAssign(false);

  const handleExportOpen = () => setShowExport(true);
  const handleExportClose = () => setShowExport(false);

  // Helper to render parent-child tree
  const renderClientTree = (clients) =>
    clients.map((client) => (
      <div key={client.id} className="mb-2">
        <div>
          {client.type === "company" ? (
            <span className="me-2"><FaBuilding /></span>
          ) : (
            <span className="me-2"><FaUsers /></span>
          )}
          <span className="fw-bold">{client.name}</span>
          {client.children && client.children.length > 0 && (
            <div className="ms-4 mt-1 border-start ps-3">
              {renderClientTree(client.children)}
            </div>
          )}
        </div>
      </div>
    ));

  // Helper to render projects/leads tabs
  const renderClientTabs = (client) => (
    <Tabs defaultActiveKey="projects" className="mb-3">
      <Tab eventKey="projects" title="Active Projects">
        <ul>
          {(client.projects || [])
            .filter((p) => p.status === "Active")
            .map((p, i) => (
              <li key={i}>{p.title}</li>
            ))}
        </ul>
      </Tab>
      <Tab eventKey="completed" title="Completed Projects">
        <ul>
          {(client.projects || [])
            .filter((p) => p.status === "Completed")
            .map((p, i) => (
              <li key={i}>{p.title}</li>
            ))}
        </ul>
      </Tab>
      <Tab eventKey="leads" title="Leads in Progress">
        <ul>
          {(client.leads || [])
            .filter((l) => l.status === "In Progress")
            .map((l, i) => (
              <li key={i}>{l.title}</li>
            ))}
        </ul>
      </Tab>
    </Tabs>
  );

  return (
    <div className="p-4">
      {/* Back Button above heading */}
      <div className="mb-2">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-1" /> Back
        </Button>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">Clients</h4>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" onClick={handleExportOpen}>
            <FaFileExport className="me-2" />
            Export
          </Button>
          <Button variant="success" onClick={handleAddOpen}>
            Add new client
          </Button>
        </div>
      </div>

      {/* Parent-Child Relationship Tree */}
      <div className="mb-4">
        <h6 className="fw-bold mb-2">Client Hierarchy</h6>
        {renderClientTree(CLIENTS)}
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
          <a
            href="#"
            className="text-secondary text-decoration-none border border-secondary p-2 d-flex align-items-center rounded"
            onClick={handleExportOpen}
          >
            <span className="me-1">🗎</span>Export to XLS
          </a>
        </div>
      </div>

      <Table hover responsive className="border">
        <thead className="bg-light">
          <tr>
            <th>Client</th>
            <th>Type</th>
            <th>Parent</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {CLIENTS.map((client, index) => (
            <tr key={index}>
              <td>
                <a
                  href="#"
                  className="text-primary fw-medium text-decoration-none"
                  onClick={() => handleEditOpen(client)}
                >
                  {client.name}
                </a>
              </td>
              <td>
                {client.type === "company" ? (
                  <span className="badge bg-info">Company</span>
                ) : (
                  <span className="badge bg-secondary">Person</span>
                )}
              </td>
              <td>
                {client.parentId
                  ? CLIENTS.find((c) => c.id === client.parentId)?.name || "-"
                  : "-"}
              </td>
              <td className="text-end">
                <Button
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => handleEditOpen(client)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => handleAssignOpen(client)}
                >
                  <FaUser />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center">
        <div>1-{CLIENTS.length} of {CLIENTS.length}</div>
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
          <div className="row g-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>
                  Client Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Client Type</Form.Label>
                <Form.Select
                  value={clientType}
                  onChange={(e) => setClientType(e.target.value)}
                >
                  <option value="person">Person</option>
                  <option value="company">Company</option>
                </Form.Select>
              </Form.Group>
              {clientType === "company" && (
                <>
                  <Form.Group className="mt-2">
                    <Form.Label>Industry</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Company Size</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Business Type</Form.Label>
                    <Form.Control />
                  </Form.Group>
                </>
              )}
              <Form.Check label="This is a subclient" className="my-2" />
              <div className="d-flex gap-2 mb-2">
                <Button variant="secondary" size="sm">
                  Billing Address
                </Button>
                <Button variant="light" size="sm">
                  Mailing Address
                </Button>
              </div>
              <Form.Group>
                <Form.Label>Address Lookup</Form.Label>
                <InputGroup>
                  <Button variant="light">
                    <FaSearch />
                  </Button>
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
          <Button variant="secondary" onClick={handleAddClose}>
            Cancel
          </Button>
          <Button variant="success">Submit</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Client Modal */}
      <Modal show={showEdit} onHide={handleEditClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Client Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Unified Client View with Tabs */}
          <Tabs defaultActiveKey="details" className="mb-3">
            <Tab eventKey="details" title="Details">
              <div className="row g-3">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>
                      Client Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control defaultValue={selectedClient?.name} />
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Client Type</Form.Label>
                    <Form.Select
                      value={selectedClient?.type || "person"}
                      onChange={(e) => setClientType(e.target.value)}
                    >
                      <option value="person">Person</option>
                      <option value="company">Company</option>
                    </Form.Select>
                  </Form.Group>
                  {clientType === "company" && (
                    <>
                      <Form.Group className="mt-2">
                        <Form.Label>Industry</Form.Label>
                        <Form.Control defaultValue={selectedClient?.industry} />
                      </Form.Group>
                      <Form.Group className="mt-2">
                        <Form.Label>Company Size</Form.Label>
                        <Form.Control defaultValue={selectedClient?.size} />
                      </Form.Group>
                      <Form.Group className="mt-2">
                        <Form.Label>Business Type</Form.Label>
                        <Form.Control defaultValue={selectedClient?.businessType} />
                      </Form.Group>
                    </>
                  )}
                  <Form.Check
                    label="This is a subclient"
                    className="my-2"
                    defaultChecked={!!selectedClient?.parentId}
                  />
                  <div className="d-flex gap-2 mb-2">
                    <Button variant="secondary" size="sm">
                      Billing Address
                    </Button>
                    <Button variant="light" size="sm">
                      Mailing Address
                    </Button>
                  </div>
                  <Form.Group>
                    <Form.Label>Address Lookup</Form.Label>
                    <InputGroup>
                      <Button variant="light">
                        <FaSearch />
                      </Button>
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
            </Tab>
            <Tab eventKey="projects" title="Projects & Leads">
              {renderClientTabs(selectedClient || { projects: [], leads: [] })}
            </Tab>
            <Tab eventKey="children" title="Child Relationships">
              {selectedClient?.children && selectedClient.children.length > 0 ? (
                renderClientTree(selectedClient.children)
              ) : (
                <div className="text-muted">No child records.</div>
              )}
            </Tab>
            <Tab eventKey="org" title="Organization Info">
              {selectedClient?.type === "company" ? (
                <div>
                  <div>
                    <strong>Industry:</strong> {selectedClient?.industry}
                  </div>
                  <div>
                    <strong>Company Size:</strong> {selectedClient?.size}
                  </div>
                  <div>
                    <strong>Business Type:</strong> {selectedClient?.businessType}
                  </div>
                </div>
              ) : (
                <div className="text-muted">Not a company.</div>
              )}
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Cancel
          </Button>
          <Button variant="success">Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Assign Role Modal */}
      <Modal show={showAssign} onHide={handleAssignClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <Button variant="secondary" onClick={handleAssignClose}>
            Cancel
          </Button>
          <Button variant="success">Assign</Button>
        </Modal.Footer>
      </Modal>

      {/* Export Modal */}
      <Modal show={showExport} onHide={handleExportClose}>
        <Modal.Header closeButton>
          <Modal.Title>Export Client Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Select fields to export</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                <Form.Check type="checkbox" label="Projects" defaultChecked />
                <Form.Check type="checkbox" label="Contacts" defaultChecked />
                <Form.Check type="checkbox" label="Tags" />
                <Form.Check type="checkbox" label="Notes" />
                <Form.Check type="checkbox" label="Organization Info" />
                <Form.Check type="checkbox" label="Child Relationships" />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleExportClose}>
            Cancel
          </Button>
          <Button variant="success">Export</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClientsData;