import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CopyFromSpreadsheetModal = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [textareaData, setTextareaData] = useState('');
  const [matchDescription, setMatchDescription] = useState(false);

  const handleVerify = () => {
    setStep(2);
  };

  const handleImport = () => {
    alert('Data Imported!');
    onHide();
    setStep(1);
    setTextareaData('');
  };

  const handleCancel = () => {
    onHide();
    setStep(1);
    setTextareaData('');
  };

  return (
     <div style={{ background: "#fff", minHeight: "100%", height: "100%" }}>
    <Modal show={show} onHide={handleCancel} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Copy from Spreadsheet</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ background: "#fff" }}>
          {step === 1 ? (
            <>
              <p>
                You can import a list of items from a spreadsheet by copying the spreadsheet columns.
                <br />
                Please follow the following format:
              </p>
              <div className="mb-2">
                <code>Description1 <i>(tab)</i> Quantity1 <i>(tab)</i> Price1 <i>(tab)</i> ProductNumber1 (optional)</code><br />
                <code>Description2 <i>(tab)</i> Quantity2 <i>(tab)</i> Price2 <i>(tab)</i> ProductNumber2 (optional)</code><br />
                <code>Description3 <i>(tab)</i> Quantity3 <i>(tab)</i> Price3 <i>(tab)</i> ProductNumber3 (optional)</code>
              </div>

              <Form.Control
                as="textarea"
                rows={6}
                value={textareaData}
                onChange={(e) => setTextareaData(e.target.value)}
              />

              <div className="d-flex justify-content-between mt-2">
                <a href="#" onClick={(e) => e.preventDefault()}>View example</a>
                <a href="#" onClick={(e) => setTextareaData('')}>Clear data</a>
              </div>

              <Form.Check
                type="checkbox"
                label="Match description with Catalog items by name"
                className="mt-3"
                checked={matchDescription}
                onChange={(e) => setMatchDescription(e.target.checked)}
              />

              <div className="mt-3 text-muted" style={{ fontSize: '14px' }}>
                <i>
                  Tip: For best performance, copy directly columns from a spreadsheet, skipping the header. It will automatically add the "tab" between all columns.
                </i>
              </div>
            </>
          ) : (
            <>
              <p>
                Got it! We will import <strong>{textareaData ? textareaData.split('\n').length : 0}</strong> items into this purchase.
              </p>
              <a href="#" onClick={(e) => e.preventDefault()}>View list</a>
            </>
          )}
        </Modal.Body>

        <Modal.Footer style={{ background: "#fff" }}>
          {step === 1 ? (
            <>
              <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
              <Button variant="success" onClick={handleVerify}>Verify Data (1/2)</Button>
            </>
          ) : (
            <>
              <Button variant="outline-secondary" onClick={() => setStep(1)}>Copy Data Again</Button>
              <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
              <Button variant="success" onClick={handleImport}>Import Now! (2/2)</Button>
            </>
          )}
        </Modal.Footer>
    </Modal>
      </div>
  );
};

export default CopyFromSpreadsheetModal;