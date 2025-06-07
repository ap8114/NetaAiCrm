import React, { useState } from "react";
import { Button, Form, Table, InputGroup, FormControl, Modal, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Add this import
import { FaArrowLeft } from "react-icons/fa"; // Add this import

const colorGrid = [
  ["#aab8b8", "#b7c7d6", "#e6e25a", "#e6e25a"],
  ["#b39ac7", "#7db7e6", "#a38c8c", "#7db7e6"],
  ["#b7c7d6", "#e6b25a", "#d67d7d", "#7dd6d6"],
  ["#aab8b8", "#e6b25a", "#b8b86c", "#7dd6a3"],
  ["#b7aab8", "#e68c5a", "#b8b86c", "#7dd6a3"],
  ["#b7aab8", "#e68c5a", "#b8b86c", "#7dd6a3"],
];

const departments = ["fg", "hfn", "gdfb", "General/Corporate"];

const InternalProjects = () => {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [department, setDepartment] = useState(departments[0]);
  const [setColor, setSetColor] = useState(false);
  const [color, setColorValue] = useState("#d67d7d");
  const [showColorGrid, setShowColorGrid] = useState(false);

  const navigate = useNavigate(); // Add this line

  const projects = [
    { title: "Unallocated", subtitle: "for fg" },
    { title: "Unallocated", subtitle: "for hfn" },
    { title: "Unallocated", subtitle: "for gdfb" },
    { title: "Unallocated", subtitle: "for General/Corporate" },
  ];

  return (
    <div className="p-4" style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Back Button above heading */}
      <div className="mb-2">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-1" /> Back
        </Button>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="mb-3">
          {/* Row 2: Heading */}
          <div>
            <h4 className="fw-bold mb-0">Internal projects</h4>
          </div>
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add internal project
        </Button>
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
        backdrop="static"
      >
        <Modal.Body className="p-5">
          <div className="d-flex justify-content-between align-items-start mb-4">
            <h2 className="fw-bold mb-0">New internal project</h2>
            <Button
              variant="link"
              className="fs-3 p-0 lh-1 text-dark"
              style={{ textDecoration: "none" }}
              onClick={() => setShowModal(false)}
            >
              &times;
            </Button>
          </div>
          <Form>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Project Name</Form.Label>
              <Form.Control
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                placeholder="Project Name"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Department Name</Form.Label>
              <Form.Select
                value={department}
                onChange={e => setDepartment(e.target.value)}
              >
                {departments.map(dep => (
                  <option key={dep}>{dep}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4 d-flex align-items-center">
              <Form.Check
                type="checkbox"
                id="setColor"
                checked={setColor}
                onChange={e => setSetColor(e.target.checked)}
                className="me-2"
              />
              <Form.Label htmlFor="setColor" className="mb-0 fw-bold">
                Set Scheduling Color
              </Form.Label>
              <span className="ms-2" title="Set a color for scheduling">
                <i className="bi bi-question-circle"></i>
              </span>
              {setColor && (
                <div className="position-relative ms-3">
                  <Button
                    variant="light"
                    style={{
                      background: color,
                      minWidth: 200,
                      minHeight: 40,
                      border: "none",
                      boxShadow: "0 1px 2px #0001",
                    }}
                    onClick={() => setShowColorGrid(!showColorGrid)}
                  >
                    <span className="me-2"></span>
                    <span className="float-end">&#9660;</span>
                  </Button>
                  {showColorGrid && (
                    <div
                      className="position-absolute bg-white p-3 rounded shadow"
                      style={{
                        left: "110%",
                        top: 0,
                        zIndex: 10,
                        minWidth: 220,
                        border: "1px solid #eee",
                      }}
                    >
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 30px)", gap: 8 }}>
                        {colorGrid.flat().map((c, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setColorValue(c);
                              setShowColorGrid(false);
                            }}
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: 4,
                              background: c,
                              border: c === color ? "2px solid #d67d7d" : "1px solid #ccc",
                              cursor: "pointer",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-end gap-2 mt-5">
            <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
              Discard
            </Button>
            <Button variant="primary">Save Job</Button>
          </div>
        </Modal.Body>
      </Modal>

      <div className="bg-white p-3 rounded shadow-sm">
        <div className="d-flex align-items-center gap-2 mb-3">
          <FormControl placeholder="Search by project or department" className="w-50" />

          <InputGroup style={{ width: "160px" }}>
            <InputGroup.Text>View</InputGroup.Text>
            <Form.Select>
              <option>Open</option>
              <option>Closed</option>
            </Form.Select>
          </InputGroup>
        </div>

        <Table hover responsive className="align-middle">
          <thead className="table-light">
            <tr>
              <th>Project details</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td>
                  <div className="fw-semibold">{project.title}</div>
                  <div className="text-muted small">{project.subtitle}</div>
                </td>
                <td>
                  <span className="badge bg-primary rounded-pill px-3 py-2">Open</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="d-flex justify-content-end align-items-center gap-2">
          <span>1-4 of 4</span>
          <Button variant="light" size="sm">&lt;</Button>
          <Button variant="light" size="sm">&gt;</Button>
        </div>
      </div>
    </div>
  );
};

export default InternalProjects;
