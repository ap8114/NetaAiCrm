import { FaUser } from "react-icons/fa";

const ProfileIcon = ({ toggleProfileDropdown }) => (
    <div className="bg-dark rounded-circle d-flex align-items-center justify-content-center" style={{ width: 32, height: 32, cursor: "pointer" }} onClick={toggleProfileDropdown}>
        <FaUser color="#fff" size={16} />
    </div>
);

export default ProfileIcon;