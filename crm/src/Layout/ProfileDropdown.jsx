import { FaCogs, FaRegBell } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfileDropdown = ({ isAdmin, navigate, setShowNotificationModal }) => (
    <div className="position-absolute end-0 mt-5 me-3 p-3 bg-white shadow rounded" style={{ width: "280px", zIndex: 100, top: "20%" }}>
        <div className="d-flex align-items-center mb-3">
            <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: 36, height: 36 }}>SM</div>
            <div className="ms-2"><strong>Adamo</strong></div>
        </div>
        <hr />
        <div className="mb-2 small text-muted">ACCOUNT</div>
        <Link to="/adminsection" className="text-dark text-decoration-none">
            <div className="mb-1"><FaCogs className="me-2" /> Admin section</div>
        </Link>
        {isAdmin && (
            <button className="mb-1 btn btn-link text-dark text-decoration-none p-0" style={{ fontSize: "1rem" }} onClick={() => setShowNotificationModal(true)} type="button">
                <FaRegBell className="me-2" /> Notification settings
            </button>
        )}
        <button className="btn btn-primary w-100" onClick={() => { localStorage.clear(); setTimeout(() => { navigate('/'); }, 1000); }}>Log out</button>
    </div>
);

export default ProfileDropdown;