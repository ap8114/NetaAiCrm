import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import AddNewButton from "./AddNewButton";
import { BsList } from "react-icons/bs";

const LeftSection = ({ isOpen, setIsOpen, toggleMobileMenu, toggleDropdown, showDropdown, dropdownRef, wrapperRef, bonbonlogo }) => (
    <div className="d-flex align-items-center gap-3">
        <button className="d-md-none btn btn-light border-0" onClick={toggleMobileMenu}>
            <BsList size={24} />
        </button>
        <Link to="/home">
            <div className="fw-bold fs-4 d-flex align-items-center text-primary">
                <img src={bonbonlogo} alt="logo" style={{ height: 38, width: "auto", maxWidth: 170, objectFit: "contain" }} />
            </div>
        </Link>
        <SearchBar isOpen={isOpen} setIsOpen={setIsOpen} wrapperRef={wrapperRef} />
        <AddNewButton toggleDropdown={toggleDropdown} showDropdown={showDropdown} dropdownRef={dropdownRef} />
    </div>
);

export default LeftSection;