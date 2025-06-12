import AddNewDropdown from "./AddNewDropdown";

const AddNewButton = ({ toggleDropdown, showDropdown, dropdownRef }) => (
    <div className="position-relative d-none d-md-block" ref={dropdownRef}>
        <button className="btn custom-add-btn d-flex align-items-center px-3 py-1" onClick={toggleDropdown}>
            Add new <span style={{ fontSize: "0.75rem" }}>▼</span>
        </button>
        {showDropdown && <AddNewDropdown />}
    </div>
);

export default AddNewButton;