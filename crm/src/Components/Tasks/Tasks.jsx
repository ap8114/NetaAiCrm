import React, { useState } from 'react';
import { Tabs, Tab, Table, Button, Modal, Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

export default function Tasks() {
  const [key, setKey] = useState('catalog');
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="p-4">
      <Tabs id="main-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-4">
        <Tab eventKey="catalog" title="Manage Catalog">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className='fw-bold'>Tasks</h4>
            <Button variant="success" onClick={handleShow}>Add new</Button>
          </div>
          <InputGroup className="mb-3">
            <FormControl placeholder="Search item" />
            <Button variant="outline-secondary"><FaSearch/></Button>
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
            <Button variant="success">Add new task</Button>
          </div>
          <InputGroup className="mb-3">
            <FormControl placeholder="Search" />
            <Button variant="outline-secondary"><FaSearch/></Button>
          </InputGroup>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Tasks Description</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Created by</th>
                <th>Created on</th>
                <th>Completed on</th>
                <th>Job</th>
                <th>Assigned to</th>
                <th>Comment</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>yyhy</td>
                <td>Pending</td>
                <td>06/06/2025</td>
                <td>simon Mashiah</td>
                <td>06/05/2025</td>
                <td></td>
                <td></td>
                <td>Carl Wilson, Brian Wilson</td>
                <td>ttes</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Tab>
      </Tabs>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Allocate Materials</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Kitchen Remodel (Fixed Price)</strong><br />for Bob Belcher</p>
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
              <tr>
                <td>
                  <Form.Select defaultValue="Demolition / Clear Out">
                    <option>Demolition / Clear Out</option>
                  </Form.Select>
                </td>
                <td><Form.Control type="number" defaultValue={1} /></td>
                <td><Form.Control type="text" defaultValue="$0.00" /></td>
                <td>$0.00</td>
              </tr>
            </tbody>
          </Table>
          <Button variant="link">+ add new item</Button>
          <div className="text-end fw-bold">$0.00</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="success" onClick={handleClose}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
