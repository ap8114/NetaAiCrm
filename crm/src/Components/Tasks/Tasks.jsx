import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  Badge,
  Dropdown,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import { FaSearch, FaUserCircle, FaBell, FaFlag, FaChevronDown } from 'react-icons/fa';

// Dummy data for projects and users
const PROJECTS = [
  { id: 1, name: "Kitchen Remodel" },
  { id: 2, name: "Office Buildout" },
  { id: 3, name: "HQ Renovation" },
];
const USERS = [
  { id: 1, name: "Simon Mashiah" },
  { id: 2, name: "Carl Wilson" },
  { id: 3, name: "Brian Wilon" },
];

// Priority badge color map
const PRIORITY_COLORS = {
  Low: "success",
  Medium: "warning",
  High: "danger",
};

// Status options
const STATUS_OPTIONS = [
  "To Do",
  "In Progress",
  "Blocked",
  "Done",
];

// Dummy tasks data
const INITIAL_TASKS = [
  {
    id: 1,
    description: "yyhy",
    status: "To Do",
    deadline: "2025-06-06",
    createdBy: "Simon Mashiah",
    createdOn: "2025-06-05",
    completedOn: "",
    projectId: 1,
    assignedTo: [2, 3],
    comment: "ttes",
    tags: [],
    priority: "Medium",
    statusHistory: [
      { status: "To Do", user: "Simon Mashiah", timestamp: "2025-06-05 09:00" },
    ],
    logs: [
      { type: "created", user: "Simon Mashiah", timestamp: "2025-06-05 09:00" },
    ],
    subtasks: [],
  },
];

export default function Tasks() {
  const [key, setKey] = useState('catalog');
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [form, setForm] = useState({
    description: "",
    projectId: PROJECTS[0]?.id || "",
    assignedTo: [],
    deadline: "",
    priority: "Medium",
    status: "To Do",
    comment: "",
    tags: "",
    subtasks: [],
  });
  const [editingTask, setEditingTask] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [showNotif, setShowNotif] = useState(false);

  // Analytics
  const completionRate = Math.round(
    (tasks.filter((t) => t.status === "Done").length / tasks.length) * 100 || 0
  );
  const overdueTasks = tasks.filter(
    (t) => t.status !== "Done" && t.deadline && new Date(t.deadline) < new Date()
  ).length;

  // Handlers
  const handleClose = () => {
    setShowModal(false);
    setEditingTask(null);
    setForm({
      description: "",
      projectId: PROJECTS[0]?.id || "",
      assignedTo: [],
      deadline: "",
      priority: "Medium",
      status: "To Do",
      comment: "",
      tags: "",
      subtasks: [],
    });
  };
  const handleShow = () => setShowModal(true);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleAssignChange = (e) => {
    const options = Array.from(e.target.selectedOptions).map((o) => Number(o.value));
    setForm((f) => ({ ...f, assignedTo: options }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      // Update existing task
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id
            ? {
                ...t,
                ...form,
                statusHistory: [
                  ...t.statusHistory,
                  { status: form.status, user: "Current User", timestamp: new Date().toISOString() },
                ],
                logs: [
                  ...t.logs,
                  { type: "updated", user: "Current User", timestamp: new Date().toISOString() },
                ],
              }
            : t
        )
      );
      setToastMsg("Task updated and logged.");
    } else {
      // Create new task
      const newTask = {
        ...form,
        id: tasks.length + 1,
        createdBy: "Current User",
        createdOn: new Date().toISOString().slice(0, 10),
        completedOn: form.status === "Done" ? new Date().toISOString().slice(0, 10) : "",
        statusHistory: [
          { status: form.status, user: "Current User", timestamp: new Date().toISOString() },
        ],
        logs: [
          { type: "created", user: "Current User", timestamp: new Date().toISOString() },
        ],
        assignedTo: form.assignedTo,
        subtasks: [],
      };
      setTasks((prev) => [...prev, newTask]);
      setToastMsg("Task created and logged.");
    }
    setShowToast(true);
    handleClose();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setForm({
      description: task.description,
      projectId: task.projectId,
      assignedTo: task.assignedTo,
      deadline: task.deadline,
      priority: task.priority,
      status: task.status,
      comment: task.comment,
      tags: task.tags,
      subtasks: task.subtasks,
    });
    setShowModal(true);
  };

  // Notification simulation
  React.useEffect(() => {
    // Simulate due date approaching notification
    const soon = tasks.find(
      (t) =>
        t.status !== "Done" &&
        t.deadline &&
        new Date(t.deadline) - new Date() < 2 * 24 * 60 * 60 * 1000 &&
        new Date(t.deadline) - new Date() > 0
    );
    if (soon) setShowNotif(true);
  }, [tasks]);

  // Filter by project
  const [projectFilter, setProjectFilter] = useState("");
  const filteredTasks = projectFilter
    ? tasks.filter((t) => t.projectId === Number(projectFilter))
    : tasks;

  // Task Analytics Widget
  const TaskAnalytics = () => (
    <div className="mb-3 d-flex gap-4">
      <div>
        <strong>Completion Rate:</strong>{" "}
        <Badge bg="primary">{completionRate}%</Badge>
      </div>
      <div>
        <strong>Overdue Tasks:</strong>{" "}
        <Badge bg="danger">{overdueTasks}</Badge>
      </div>
      <div>
        <strong>Total Tasks:</strong>{" "}
        <Badge bg="secondary">{tasks.length}</Badge>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      {/* Notification Bell */}
      <div className="d-flex justify-content-end mb-2">
        <Button variant="outline-warning" onClick={() => setShowNotif(false)}>
          <FaBell className="me-2" />
          {showNotif && <Badge bg="danger">!</Badge>}
        </Button>
      </div>
      <TaskAnalytics />
      <Tabs id="main-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-4">
        <Tab eventKey="catalog" title="Manage Catalog">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className='fw-bold'>Tasks Catalog</h4>
            <Button variant="success" onClick={handleShow}>Add new</Button>
          </div>
          <InputGroup className="mb-3">
            <FormControl placeholder="Search item" />
            <Button variant="outline-secondary"><FaSearch /></Button>
          </InputGroup>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Cost</th>
                <th>Code/SKU</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Disconnect Switch (switch)</td><td>Product</td><td>$50.00</td><td>$40.00</td><td>97522</td></tr>
              <tr><td>Driveway Asphalt (cf)</td><td>Product</td><td>$10.00</td><td>$7.00</td><td>5823</td></tr>
              <tr><td>Laborer (hours)</td><td>Product</td><td>$70.00</td><td>$45.00</td><td></td></tr>
              <tr><td>Outlet (unit)</td><td>Product</td><td>$10.00</td><td>$8.00</td><td>10823</td></tr>
              <tr><td>Paint (5 gallons)</td><td>Product</td><td>$25.00</td><td>$17.00</td><td>5234</td></tr>
              <tr><td>Primer (5 gallon)</td><td>Product</td><td>$20.00</td><td>$15.00</td><td>19823</td></tr>
              <tr><td>Wire (1 ft) (feet)</td><td>Product</td><td>$1.00</td><td>$2.00</td><td>1028</td></tr>
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="tasks" title="Tasks">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Tasks</h4>
            <Button variant="success" onClick={handleShow}>Add new task</Button>
          </div>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Select
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
              >
                <option value="">All Projects</option>
                {PROJECTS.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </Form.Select>
            </Col>
            <Col md={8}>
              <InputGroup>
                <FormControl placeholder="Search" />
                <Button variant="outline-secondary"><FaSearch /></Button>
              </InputGroup>
            </Col>
          </Row>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Task Description</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Created by</th>
                <th>Created on</th>
                <th>Completed on</th>
                <th>Project</th>
                <th>Assigned to</th>
                <th>Comment</th>
                <th>Tags</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, idx) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.description}</td>
                  <td>
                    <Badge bg={
                      task.status === "Done"
                        ? "success"
                        : task.status === "Blocked"
                        ? "danger"
                        : task.status === "In Progress"
                        ? "info"
                        : "secondary"
                    }>
                      {task.status}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={PRIORITY_COLORS[task.priority]}>
                      <FaFlag className="me-1" />
                      {task.priority}
                    </Badge>
                  </td>
                  <td>{task.deadline}</td>
                  <td>{task.createdBy}</td>
                  <td>{task.createdOn}</td>
                  <td>{task.completedOn}</td>
                  <td>
                    {PROJECTS.find((p) => p.id === task.projectId)?.name || ""}
                  </td>
                  <td>
                    {task.assignedTo.map((uid) => {
                      const user = USERS.find((u) => u.id === uid);
                      return (
                        <span key={uid} className="me-1">
                          <FaUserCircle title={user?.name} />{" "}
                          <span style={{ fontSize: "0.85em" }}>{user?.name}</span>
                        </span>
                      );
                    })}
                  </td>
                  <td>{task.comment}</td>
                  <td>{task.tags}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle size="sm" variant="outline-primary">
                        <FaChevronDown />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleEdit(task)}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item disabled>Delete</Dropdown.Item>
                        <Dropdown.Item disabled>Add Subtask</Dropdown.Item>
                        <Dropdown.Item disabled>View Details</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

      {/* Task Create/Edit Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingTask ? "Edit Task" : "Add New Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control
                    name="description"
                    value={form.description}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Project</Form.Label>
                  <Form.Select
                    name="projectId"
                    value={form.projectId}
                    onChange={handleFormChange}
                    required
                  >
                    {PROJECTS.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Assign To</Form.Label>
                  <Form.Select
                    name="assignedTo"
                    value={form.assignedTo.map(String)}
                    onChange={handleAssignChange}
                    multiple
                  >
                    {USERS.map((u) => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleFormChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    name="priority"
                    value={form.priority}
                    onChange={handleFormChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={form.status}
                    onChange={handleFormChange}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    name="comment"
                    value={form.comment}
                    onChange={handleFormChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tags</Form.Label>
                  <Form.Control
                    name="tags"
                    value={form.tags}
                    onChange={handleFormChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Subtasks (optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Describe subtasks or dependencies"
                    name="subtasks"
                    value={form.subtasks}
                    onChange={handleFormChange}
                  />
                </Form.Group>
                <div className="mb-3">
                  <strong>Status History</strong>
                  <ul className="small">
                    {(editingTask?.statusHistory || []).map((h, i) => (
                      <li key={i}>
                        {h.timestamp} - {h.user}: {h.status}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Auto-Logs</strong>
                  <ul className="small">
                    {(editingTask?.logs || []).map((l, i) => (
                      <li key={i}>
                        {l.timestamp} - {l.user} {l.type}
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="success" type="submit">
                {editingTask ? "Save Changes" : "Create Task"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Toast for task log/notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={4000}
          autohide
          bg="info"
        >
          <Toast.Header>
            <FaBell className="me-2" />
            <strong className="me-auto">Task Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
