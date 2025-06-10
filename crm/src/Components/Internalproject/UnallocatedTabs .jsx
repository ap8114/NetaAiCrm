import React from "react";
import { Tab, Nav, Row, Col, Form, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import { FaArrowLeft } from "react-icons/fa"; // Importing the back arrow icon

const UnallocatedTabs = () => {
    const navigate = useNavigate();

  return (
    <div className="p-4">
         <div className="mb-2">
                <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                  <FaArrowLeft className="me-1" /> Back
                </Button>
              </div>
      <h3><strong>Unallocated</strong></h3>
      <p>For <a href="#">hfn</a></p>

      <Tab.Container defaultActiveKey="summary">
        <Nav variant="tabs" className="mb-3 border-bottom">
          <Nav.Item>
            <Nav.Link eventKey="summary">Summary</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="activity">Activity</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          {/* Summary Tab */}
          <Tab.Pane eventKey="summary">
            <Row>
              <Col md={6}>
                <h5><strong>Details</strong></h5>
                <Form.Group className="mb-3" controlId="formTag">
                  <Form.Label><strong>Tags</strong></Form.Label>
                  <Form.Control type="text" placeholder="Enter tag" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Card className="p-3" style={{ backgroundColor: "#fdfdf6" }}>
                  <h5><strong>Tasks</strong></h5>
                  <Row>
                    <Col>
                      <p className="text-muted mb-0">Total</p>
                      <p><strong>0</strong></p>
                    </Col>
                    <Col>
                      <p className="text-muted mb-0">Pending</p>
                      <p><strong>0</strong></p>
                    </Col>
                  </Row>
                  <h5><strong>Analytics</strong></h5>
                </Card>
              </Col>
            </Row>
          </Tab.Pane>

          {/* Activity Tab */}
          <Tab.Pane eventKey="activity">
            <Row className="mb-3">
              <Col md={4}><p><strong>Materials</strong><br />$0.00<br /><small>w/ open POs</small></p></Col>
              <Col md={4}><p><strong>Labor</strong><br />$0.00<br /><small>w/ open POs</small></p></Col>
              <Col md={4}><p><strong>Subs</strong><br />$0.00<br /><small>w/ open POs</small></p></Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={4}>
                <Form.Control type="text" placeholder="4/10/25 - 6/30/25" />
              </Col>
              <Col md={2}>
                <Form.Select>
                  <option>View</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Form.Select>
                  <option>All</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Button variant="outline-secondary">
                  <i className="bi bi-box-arrow-down"></i> Export
                </Button>
              </Col>
            </Row>

            <div className="text-center p-5 bg-light rounded">
              <i className="bi bi-search" style={{ fontSize: "2rem" }}></i>
              <h5 className="mt-3">No results</h5>
              <p>There is no activity that match your search criteria</p>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default UnallocatedTabs;
