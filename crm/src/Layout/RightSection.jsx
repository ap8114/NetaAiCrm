import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NotificationIcon from "./NotificationIcon";
import ProfileIcon from "./ProfileIcon";
import ProfileDropdown from "./ProfileDropdown";

const RightSection = ({ toggleProfileDropdown, showProfileDropdown, isAdmin, setShowActivityPanel, navigate, profileRef }) => (
    <div className="d-flex align-items-center gap-3" ref={profileRef}>
        <Link to="/home" className="d-none d-md-block">
            <Button className="custom-add-btn py-1">Home</Button>
        </Link>
        <NotificationIcon setShowActivityPanel={setShowActivityPanel} />
        <ProfileIcon toggleProfileDropdown={toggleProfileDropdown} />
        {showProfileDropdown && <ProfileDropdown isAdmin={isAdmin} navigate={navigate} />}
    </div>
);

export default RightSection;