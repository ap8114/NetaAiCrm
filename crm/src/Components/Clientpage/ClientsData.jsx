import React, { useEffect, useState } from "react";
import { Button, Table, Form, InputGroup, Modal, Tabs, Tab } from "react-bootstrap";
import { FaSearch, FaEdit, FaUser, FaBuilding, FaUsers, FaFileExport, FaArrowLeft, FaPhone } from "react-icons/fa"; // Add FaArrowLeft
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Add useNavigate
import { createClient, fetchAllClients, updateClient } from "../../slices/clientSlice";
import AlertBox from "../AlertBox";
import { MdEmail } from "react-icons/md";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
  const [clientName, setClientName] = React.useState("");
  const [contactName, setContactName] = React.useState("");
  const [isSubclient, setIsSubclient] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [otherDetails, setOtherDetails] = React.useState("");
  const [addressLookup, setAddressLookup] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");
  const [country, setCountry] = React.useState("United States");
  const [notes, setNotes] = React.useState("");
  const [addressType, setAddressType] = React.useState("Billing");


  const [message, setMessage] = useState(null); // ✅ message state
  const [messageType, setMessageType] = useState("success");


  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const { clients } = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(fetchAllClients())
  }, [dispatch])

  const handleAddOpen = () => {
    setIsEditMode(false);
    resetForm();
    setShowAdd(true);
  };

  const handleAddClose = () => {
    setShowAdd(false);
    // Reset form fields
    resetForm();
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

  const resetForm = () => {
    setClientName("");
    setContactName("");
    setClientType("person");
    setIsSubclient(false);
    setPhone("");
    setEmail("");
    setOtherDetails("");
    setAddressLookup("");
    setAddress("");
    setAddress2("");
    setCity("");
    setState("");
    setZipCode("");
    setCountry("United States");
    setNotes("");
    setAddressType("Billing");
  }

  const handleEditOpen = (client) => {
    setIsEditMode(true);
    setSelectedClient(client);
    // Populate form fields with client data
    setClientName(client.client_name);
    setContactName(client.contact_name);
    setClientType(client.client_type);
    setIsSubclient(client.is_subclient);
    setPhone(client.phone);
    setEmail(client.email);
    setOtherDetails(client.other_details);
    setAddressLookup(client.address_lookup);
    setAddress(client.address);
    setAddress2(client.address_2);
    setCity(client.city);
    setState(client.state);
    setZipCode(client.zip_code);
    setCountry(client.country);
    setNotes(client.notes);
    setAddressType(client.address_type);
    setShowAdd(true);
  }

  useEffect(() => {
    if (selectedClient && isEditMode) {
      setClientName(selectedClient.client_name || "");
      setContactName(selectedClient.contact_name || "");
      setClientType(selectedClient.client_type || "person");
      setIsSubclient(!!selectedClient.is_subclient);
      setPhone(selectedClient.phone || "");
      setEmail(selectedClient.email || "");
      setOtherDetails(selectedClient.other_details || "");
      setAddressLookup(selectedClient.address_lookup || "");
      setAddress(selectedClient.address || "");
      setAddress2(selectedClient.address_2 || "");
      setCity(selectedClient.city || "");
      setState(selectedClient.state || "");
      setZipCode(selectedClient.zip_code || "");
      setCountry(selectedClient.country || "United States");
      setNotes(selectedClient.notes || "");
      setAddressType(selectedClient.address_type || "Billing");
    }
  }, [selectedClient, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      client_name: clientName,
      contact_name: contactName,
      client_type: clientType,
      is_subclient: isSubclient,
      phone,
      email,
      other_details: otherDetails,
      address_lookup: addressLookup,
      address,
      address_2: address2,
      city,
      state,
      zip_code: zipCode,
      country,
      notes,
      address_type: addressType,
    };

    try {
      if (isEditMode) {
        console.log(payload);

        await dispatch(updateClient({ id: selectedClient.id, data: payload })).unwrap();
        handleAddClose();
        setMessage("Client Data Updated Successfully");
        setMessageType("success");
      } else {
        await dispatch(createClient(payload)).unwrap();
        handleAddClose();
        setMessage("Client Data Updated Successfully");
        setMessageType("success");
      }
      // Optionally reload list or show toast here
    } catch (error) {
      console.error("Error submitting client:", error);
    }
  };

  const handleExport = () => {
    const formattedData = clients.map((client) => ({
      "Client Name": client.client_name || "",
      "Contact Name": client.contact_name || "",
      "Address 1": client.address || "",
      "Address 2": client.address_2 || "",
      "City": client.city || "",
      "State": client.state || "",
      "Postal Code": client.zip_code || "",
      "Country": client.country || "",
      "Phone": client.phone || "",
      "Email": client.email || "",
      "Other": client.other_details || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, "Clients.xlsx");
  };

  return (
    <div className="container-fluid p-4">
      {/* Back Button above heading */}
      <div className="mb-2">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-1" /> Back
        </Button>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold mt-3">Clients</h4>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" onClick={handleExport}>
            <FaFileExport className="me-2" />
            Export
          </Button>
          <Button variant="primary" onClick={handleAddOpen}>
            Add new client
          </Button>
        </div>
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
            onClick={handleExport}
          >
            <span className="me-1">🗎</span>Export to XLS
          </a>
        </div>
      </div>
      {message && (
        <AlertBox
          type={messageType}
          message={message}
          onClose={() => setMessage(null)}
        />
      )}
      <Table hover responsive className="border">
        <thead className="bg-light">
          <tr>
            <th>Client</th>
            <th>Type</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>
                <a
                  href="#"
                  className="text-primary fw-medium text-decoration-none"
                  onClick={() => handleEditOpen(client)}
                >
                  {client.client_name}
                </a>
              </td>
              <td>
                {client.type === "company" ? (
                  <span className="badge bg-info">Company</span>
                ) : (
                  <span className="badge bg-secondary">Person</span>
                )}
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
      <Modal show={showAdd} onHide={handleAddClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row g-4">
              {/* Left Column */}
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>
                    Client Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter client name"
                  />
                </Form.Group>
                <Form.Group className="mt-3">
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
                    <Form.Group className="mt-3">
                      <Form.Label>Industry</Form.Label>
                      <Form.Control placeholder="Enter industry" />
                    </Form.Group>
                    <Form.Group className="mt-3">
                      <Form.Label>Company Size</Form.Label>
                      <Form.Control placeholder="Enter company size" />
                    </Form.Group>
                    <Form.Group className="mt-3">
                      <Form.Label>Business Type</Form.Label>
                      <Form.Control placeholder="Enter business type" />
                    </Form.Group>
                  </>
                )}
                <Form.Check
                  label="This is a subclient"
                  className="mt-4 mb-3"
                  checked={isSubclient}
                  onChange={(e) => setIsSubclient(e.target.checked)}
                />
                <div className="d-flex gap-2 mb-3">
                  <Button
                    variant={addressType === "Billing" ? "primary" : "outline-primary"}
                    size="sm"
                    onClick={() => setAddressType("Billing")}
                  >
                    Billing Address
                  </Button>
                  <Button
                    variant={addressType === "Mailing" ? "primary" : "outline-secondary"}
                    size="sm"
                    onClick={() => setAddressType("Mailing")}
                  >
                    Mailing Address
                  </Button>
                </div>
                <Form.Group>
                  <Form.Label>Address Lookup</Form.Label>
                  <InputGroup>
                    <Button variant="outline-secondary">
                      <FaSearch />
                    </Button>
                    <Form.Control
                      value={addressLookup}
                      onChange={(e) => setAddressLookup(e.target.value)}
                      placeholder="Start typing to view suggestions"
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </Form.Group>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>State</Form.Label>
                      <Form.Select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value="NJ">NJ</option>
                        <option value="NY">NY</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option>United States</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>
              </div>
              {/* Right Column */}
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Contact Name</Form.Label>
                  <Form.Control
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Full name"
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex. (123) 456-7890"
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex. name@email.com"
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Other</Form.Label>
                  <Form.Control
                    value={otherDetails}
                    onChange={(e) => setOtherDetails(e.target.value)}
                    placeholder="Ex. account#, website, etc."
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any notes about this client..."
                  />
                </Form.Group>
              </div>
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleAddClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* <Modal show={showAdd} onHide={handleAddClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Client</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <div className="row g-4">
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>
                    Client Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control placeholder="Enter client name" />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Client Type</Form.Label>
                  <Form.Select value={clientType} onChange={(e) => setClientType(e.target.value)}>
                    <option value="person">Person</option>
                    <option value="company">Company</option>
                  </Form.Select>
                </Form.Group>

                {clientType === "company" && (
                  <>
                    <Form.Group className="mt-3">
                      <Form.Label>Industry</Form.Label>
                      <Form.Control placeholder="Enter industry" />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Company Size</Form.Label>
                      <Form.Control placeholder="Enter company size" />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Business Type</Form.Label>
                      <Form.Control placeholder="Enter business type" />
                    </Form.Group>
                  </>
                )}

                <Form.Check label="This is a subclient" className="mt-4 mb-3" />

                <div className="d-flex gap-2 mb-3">
                  <Button variant="outline-primary" size="sm">Billing Address</Button>
                  <Button variant="outline-secondary" size="sm">Mailing Address</Button>
                </div>

                <Form.Group>
                  <Form.Label>Address Lookup</Form.Label>
                  <InputGroup>
                    <Button variant="outline-secondary">
                      <FaSearch />
                    </Button>
                    <Form.Control placeholder="Start typing to view suggestions" />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control />
                </Form.Group>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>State</Form.Label>
                      <Form.Select>
                        <option>NJ</option>
                        <option>NY</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Country</Form.Label>
                      <Form.Select>
                        <option>United States</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Contact Name</Form.Label>
                  <Form.Control placeholder="Full name" />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control placeholder="Ex. (123) 456-7890" />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control placeholder="Ex. name@email.com" />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Other</Form.Label>
                  <Form.Control placeholder="Ex. account#, website, etc." />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control as="textarea" rows={6} placeholder="Add any notes about this client..." />
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose}>
            Cancel
          </Button>
          <Button variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* Edit Client Modal */}
      {/* <Modal show={showEdit} onHide={handleEditClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Client Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Tabs defaultActiveKey="details" className="mb-3">
            <Tab eventKey="details" title="Details">
              <Form>
                <div className="row g-4">
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>
                        Client Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control defaultValue={selectedClient?.name} />
                    </Form.Group>

                    <Form.Group className="mt-3">
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
                        <Form.Group className="mt-3">
                          <Form.Label>Industry</Form.Label>
                          <Form.Control defaultValue={selectedClient?.industry} />
                        </Form.Group>
                        <Form.Group className="mt-3">
                          <Form.Label>Company Size</Form.Label>
                          <Form.Control defaultValue={selectedClient?.size} />
                        </Form.Group>
                        <Form.Group className="mt-3">
                          <Form.Label>Business Type</Form.Label>
                          <Form.Control defaultValue={selectedClient?.businessType} />
                        </Form.Group>
                      </>
                    )}

                    <Form.Check
                      label="This is a subclient"
                      className="mt-4 mb-3"
                      defaultChecked={!!selectedClient?.parentId}
                    />

                    <div className="d-flex gap-2 mb-3">
                      <Button variant="outline-primary" size="sm">Billing Address</Button>
                      <Button variant="outline-secondary" size="sm">Mailing Address</Button>
                    </div>

                    <Form.Group>
                      <Form.Label>Address Lookup</Form.Label>
                      <InputGroup>
                        <Button variant="outline-secondary">
                          <FaSearch />
                        </Button>
                        <Form.Control placeholder="Start typing to view suggestions" />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Address 2</Form.Label>
                      <Form.Control />
                    </Form.Group>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <Form.Group>
                          <Form.Label>City</Form.Label>
                          <Form.Control />
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group>
                          <Form.Label>State</Form.Label>
                          <Form.Select>
                            <option>NJ</option>
                            <option>NY</option>
                          </Form.Select>
                        </Form.Group>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <Form.Group>
                          <Form.Label>Zip Code</Form.Label>
                          <Form.Control />
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group>
                          <Form.Label>Country</Form.Label>
                          <Form.Select>
                            <option>United States</option>
                          </Form.Select>
                        </Form.Group>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Contact Name</Form.Label>
                      <Form.Control />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control placeholder="Ex. (123) 456-7890" />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Other</Form.Label>
                      <Form.Control placeholder="Ex. account#, website" />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Notes</Form.Label>
                      <Form.Control as="textarea" rows={6} placeholder="Additional notes..." />
                    </Form.Group>
                  </div>
                </div>
              </Form>
            </Tab>

            <Tab eventKey="projects" title="Projects & Leads">
              {renderClientTabs(selectedClient || { projects: [], leads: [] })}
            </Tab>

            <Tab eventKey="children" title="Child Relationships">
              {selectedClient?.children?.length > 0 ? (
                renderClientTree(selectedClient.children)
              ) : (
                <div className="text-muted">No child records.</div>
              )}
            </Tab>

            <Tab eventKey="org" title="Organization Info">
              {selectedClient?.type === "company" ? (
                <div className="px-2">
                  <p><strong>Industry:</strong> {selectedClient?.industry || "N/A"}</p>
                  <p><strong>Company Size:</strong> {selectedClient?.size || "N/A"}</p>
                  <p><strong>Business Type:</strong> {selectedClient?.businessType || "N/A"}</p>
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
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal> */}

      {/* Assign Role Modal */}
      {/* User Details Modal */}
      <Modal show={showAssign} onHide={handleAssignClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><FaUser /> <b> Name:</b> {selectedClient?.client_name || ''}</p>
          <p><MdEmail /> <b> Email:</b> {selectedClient?.email || ''}</p>
          <p><FaPhone /> <b> Phone:</b> {selectedClient?.phone || ''}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAssignClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Export Modal */}
      {/* <Modal show={showExport} onHide={handleExportClose}>
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
          <Button variant="primary">Export</Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default ClientsData;