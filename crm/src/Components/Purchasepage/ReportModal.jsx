import { Button, InputGroup, Modal, Form } from "react-bootstrap";

const ReportModal = ({ show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Purchases report</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3 d-flex align-items-center gap-2">
                    <InputGroup style={{ width: 220 }}>
                        <InputGroup.Text>
                            <i className="bi bi-calendar"></i>
                        </InputGroup.Text>
                        <Form.Control value="6/1/25 - 6/5/25" readOnly />
                    </InputGroup>
                    <Button variant="outline-secondary">
                        <i className="bi bi-funnel"></i>
                    </Button>
                    <div className="ms-auto d-flex gap-2">
                        <Button variant="outline-secondary">
                            <i className="bi bi-gear"></i>
                        </Button>
                        <Button variant="primary">Export</Button>
                    </div>
                </div>
                <div className="mb-3">
                    <Button variant="dark" className="me-2">
                        Purchases
                    </Button>
                    <Button variant="secondary" className="me-2">
                        Catalog allocations
                    </Button>
                    <Button variant="secondary">Summary</Button>
                </div>
                <div className="text-center mt-5">
                    <i
                        className="bi bi-search"
                        style={{ fontSize: 64, color: "#adb5bd" }}
                    ></i>
                    <div className="fw-bold mt-3" style={{ fontSize: 24 }}>
                        No results found
                    </div>
                    <div className="text-muted">
                        Try adjusting your filtering to find what you’re looking for.
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ReportModal;