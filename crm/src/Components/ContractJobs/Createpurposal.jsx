import React from "react";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";

const ClientProposalForm = () => {
  return (
    <div className="container py-4">
      <h4 className="mb-3">Fixed price</h4>

      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formAttn">
              <Form.Label>Attn:</Form.Label>
              <Form.Control type="text" defaultValue="Clark Griswold" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formPO">
              <Form.Label>PO #</Form.Label>
              <Form.Control type="text" placeholder="Enter PO number" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formContract">
              <Form.Label>Contract #</Form.Label>
              <Form.Control type="text" placeholder="Enter number or id" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Group controlId="formStartDate">
              <Form.Label>Estimated start date:</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formEndDate">
              <Form.Label>Estimated end date:</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formPaymentTerms">
              <Form.Label>Payment terms:</Form.Label>
              <Form.Select>
                <option>NET 45</option>
                <option>NET 30</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <hr />
        <h5>Line Items</h5>
        <Row className="align-items-end mb-3">
          <Col md={4}>
            <Form.Control placeholder="Enter description here" />
          </Col>
          <Col md={2}>
            <Form.Control placeholder="Qty: 1.00" />
          </Col>
          <Col md={2}>
            <Form.Control placeholder="$0.00" />
          </Col>
          <Col md={1}>
            <Form.Check label="Taxable" />
          </Col>
          <Col md={3} className="d-flex justify-content-end">
            <Button variant="outline-secondary" className="me-2">⟲</Button>
            <Button variant="outline-danger">✕</Button>
          </Col>
        </Row>

        <div className="mb-3">
          <Button variant="link">Enter details or comments for client</Button>
          <Button variant="link">Enter breakdown or bill of materials</Button>
        </div>

        <div className="mb-3">
          <Button variant="primary" className="me-2">+ Add new line item</Button>
          <Button variant="outline-secondary">Copy from spreadsheet</Button>
        </div>

        <div className="bg-light p-3 border rounded mb-3">
          <Row>
            <Col md={4}>
              <Form.Group controlId="formTaxRate">
                <Form.Label>Applicable tax rate:</Form.Label>
                <Form.Select>
                  <option>(Non taxable) 0%</option>
                  <option>5%</option>
                  <option>10%</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}><strong>Contract sum:</strong> $0.00</Col>
            <Col md={4}><strong>Taxes in contract sum:</strong> $0.00</Col>
          </Row>
        </div>

        <hr />
        <h5>Additional Options</h5>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formOutputStyle">
              <Form.Label>Output style:</Form.Label>
              <Form.Select>
                <option>Display line item subtotals</option>
                <option>Display totals only</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formInvoicingStyle">
              <Form.Label>Invoicing style:</Form.Label>
              <Form.Select>
                <option>Use a regular invoice - display line items to be invoiced only</option>
                <option>Use a detailed invoice</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <hr />
        <h5>Terms and Conditions</h5>
        <Form.Group controlId="formTerms">
          <Form.Control as="textarea" rows={5} placeholder="Enter terms and conditions here..." />
        </Form.Group>

        <div className="d-flex justify-content-end mt-3">
          <Button variant="primary" className="me-2">Save changes</Button>
          <Button variant="primary">Send out for signature</Button>
        </div>
      </Form>
    </div>
  );
};

export default ClientProposalForm;
