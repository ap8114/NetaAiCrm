import { FaBell } from "react-icons/fa";

const NotificationIcon = ({ setShowActivityPanel }) => (
    <div className="position-relative" style={{ cursor: "pointer" }}>
        <FaBell size={20} onClick={() => setShowActivityPanel(true)} />
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.6rem" }}>3</span>
    </div>
);

export default NotificationIcon;