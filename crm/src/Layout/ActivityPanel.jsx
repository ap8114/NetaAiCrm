import { Button, Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import NoActivityMessage from "./NoActivityMessage";

const ActivityPanel = ({ showActivityPanel, setShowActivityPanel, bonbonlogo }) => (
    <Modal
        show={showActivityPanel}
        onHide={() => setShowActivityPanel(false)}
        dialogClassName="modal-dialog-slideout"
        contentClassName="border-0"
        backdropClassName="bg-dark bg-opacity-25"
        centered={false}
        style={{ pointerEvents: "auto" }}
        animation={false}
    >
        <div className="bg-white" style={{ width: 370, minHeight: "100vh", maxHeight: "100vh", position: "fixed", top: 0, right: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderTopLeftRadius: "1rem", borderBottomLeftRadius: "1rem", boxShadow: "0 0 24px 0 rgba(0,0,0,0.12)", overflowY: "auto", zIndex: 2000 }}>
            <div className="d-flex justify-content-end p-3">
                <Button variant="link" className="text-dark fs-3 p-0" onClick={() => setShowActivityPanel(false)} aria-label="Close">
                    <FaTimes />
                </Button>
            </div>
            <div className="px-4">
                <img src={bonbonlogo} alt="Welcome" className="img-fluid rounded mb-4" style={{ width: "100%", maxHeight: 110, objectFit: "cover" }} />
                <NoActivityMessage />
            </div>
        </div>
    </Modal>
);

export default ActivityPanel;