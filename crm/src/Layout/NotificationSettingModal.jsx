import { Button, Modal, Form } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

const NotificationSettingsModal = ({ showNotificationModal, setShowNotificationModal, emailAlert, setEmailAlert, activityAlert, setActivityAlert }) => (
    <Modal show={showNotificationModal} onHide={() => setShowNotificationModal(false)} centered backdrop="static" size="md">
        <Modal.Body className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="fw-bold mb-0">Notification settings</h5>
                <Button variant="link" className="text-dark fs-4 p-0" onClick={() => setShowNotificationModal(false)} aria-label="Close">
                    <FaTimes />
                </Button>
            </div>
            <div className="border-bottom mb-3 pb-2">
                <span className="fw-semibold" style={{ borderBottom: "2px solid #009688", paddingBottom: 2 }}>General</span>
            </div>
            <div className="mb-2" style={{ color: "#444" }}>
                Set up your notification preferences for comments, mentions, tasks and scheduling alerts
            </div>
            <Form>
                <div className="form-check form-switch mb-3">
                    <Form.Check
                        type="switch"
                        id="email-alert-switch"
                        label={
                            <span>
                                <span className="fw-semibold">Email</span>
                                <br />
                                <span className="text-muted small">You receive an email with the full message</span>
                            </span>
                        }
                        checked={emailAlert}
                        onChange={() => setEmailAlert(!emailAlert)}
                    />
                </div>
                <div className="form-check form-switch mb-3">
                    <Form.Check
                        type="switch"
                        id="activity-alert-switch"
                        label={
                            <span>
                                <span className="fw-semibold">Activity alert</span>
                                <br />
                                <span className="text-muted small">You receive an alert in the side panel or activity feed</span>
                            </span>
                        }
                        checked={activityAlert}
                        onChange={() => setActivityAlert(!activityAlert)}
                    />
                </div>
                <div className="mb-3">
                    <a href="#" className="text-primary fw-semibold small text-decoration-none">Learn more about notifications</a>
                </div>
                <div className="d-flex justify-content-end gap-2">
                    <Button variant="light" onClick={() => setShowNotificationModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => setShowNotificationModal(false)}>Save changes</Button>
                </div>
            </Form>
        </Modal.Body>
    </Modal>
);

export default NotificationSettingsModal;