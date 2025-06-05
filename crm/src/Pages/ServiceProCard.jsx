import React, { useState } from 'react';

const ServiceProModal = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content p-3" style={{ borderRadius: '8px' }}>
          <div className="modal-header border-0">
            <button
              type="button"
              className="close ms-auto"
              aria-label="Close"
              onClick={handleClose}
            >
              <span aria-hidden="true" style={{ fontSize: '1.5rem' }}>
                &times;
              </span>
            </button>
          </div>
          <div className="modal-body text-center">
            <img
              src="https://i.postimg.cc/PrwwGZPL/Untitled-design-18.png"
              alt="Electric AI"
              className="img-fluid mb-3"
              style={{ maxHeight: '200px', objectFit: 'cover' }}
            />
            <h4 className="fw-bold">
              Power Up Your Workflow with Electric AI <span>⚡</span>
            </h4>
            <p className="text-muted mt-3">
              Electric AI is your intelligent assistant for all things electrical!
              Automate calculations, generate wiring diagrams, and get instant
              troubleshooting help—all in one platform.
            </p>

            <div className="text-start mt-4">
              <p className="fw-bold">Electric AI Features:</p>
              <ul className="ps-3">
                <li>Smart circuit design suggestions</li>
                <li>Instant load calculation</li>
                <li>Wiring diagram generator</li>
                <li>Live troubleshooting assistant</li>
                <li>Material estimation and BOM creation</li>
                <li>Code compliance checker</li>
                <li>Project documentation automation</li>
                <li>And much more!</li>
              </ul>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <button
                className="btn btn-link text-muted"
                onClick={handleClose}
              >
                Maybe later
              </button>
              <button className="btn btn-primary">
                Try Electric AI Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProModal;
