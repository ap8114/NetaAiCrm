import { FaTimes } from "react-icons/fa";
import MobileSearch from "./MobileSearch";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import MobileAddNew from "./MobileAddNew";
import MobileProfileSection from "./MobileProfileSection";

const MobileMenu = ({ bonbonlogo, mobileMenuRef, setShowMobileMenu, showMobileAddNew, setShowMobileAddNew, isOpen, setIsOpen, wrapperRef }) => (
    <div ref={mobileMenuRef} className="position-fixed top-0 start-0 w-100 h-100 bg-white z-index-1050 p-3" style={{ zIndex: 1050, overflowY: 'auto' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
            <img src={bonbonlogo} alt="logo" style={{ height: 38, width: "auto", maxWidth: 170, objectFit: "contain" }} />
            <button className="btn btn-light border-0" onClick={() => { setShowMobileMenu(false); setShowMobileAddNew(false); }}>
                <FaTimes size={24} />
            </button>
        </div>

        <MobileSearch isOpen={isOpen} setIsOpen={setIsOpen} wrapperRef={wrapperRef} />

        <div className="mb-4">
            <div className="d-flex flex-column gap-3">
                <Link to="/home" className="text-decoration-none" onClick={() => setShowMobileMenu(false)}>
                    <Button className="custom-add-btn py-1 w-100 text-align-center">Home</Button>
                </Link>
                {!showMobileAddNew ? (
                    <button className="btn custom-add-btn w-100" onClick={() => setShowMobileAddNew(true)}>
                        Add new
                    </button>
                ) : (
                    <MobileAddNew setShowMobileMenu={setShowMobileMenu} setShowMobileAddNew={setShowMobileAddNew} />
                )}
            </div>
        </div>

        <MobileProfileSection setShowMobileMenu={setShowMobileMenu} />
    </div>
);

export default MobileMenu;
