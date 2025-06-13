import { FaCogs, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const MobileProfileSection = ({ setShowMobileMenu }) => (
    <div className="border-top pt-3">
        <div className="d-flex align-items-center mb-3">
            <div className="bg-dark rounded-circle d-flex justify-content-center align-items-center" style={{ width: 40, height: 40 }}>
                <FaUser color="#fff" size={18} />
            </div>
            <div className="ms-3"><strong>Adamo</strong></div>
        </div>
        <div className="mb-2 small text-muted">ACCOUNT</div>
        <Link to="/adminsection" className="text-decoration-none text-dark" onClick={() => setShowMobileMenu(false)}>
            <div className="mb-2 ps-3"><FaCogs className="me-2" /> Admin section</div>
        </Link>
        <Link to="/" className="text-decoration-none" onClick={() => setShowMobileMenu(false)}>
            <button className="btn btn-primary w-100">Log out</button>
        </Link>
    </div>
);

export default MobileProfileSection;