import { BsSearch } from "react-icons/bs";
import MobileSearchDropdown from "./MobileSearchDropdown";

const MobileSearch = ({ isOpen, setIsOpen, wrapperRef }) => (
    <div className="position-relative" ref={wrapperRef}>
        <div className="d-flex d-md-none align-items-center mb-3">
            <button className="btn btn-light w-100 me-2" style={{ border: "1px solid #ddd", flex: 1 }} onClick={() => setIsOpen((v) => !v)} aria-label="Open search">
                <div className="d-flex align-items-center justify-content-center w-100">
                    <BsSearch className="me-2" />
                    <span style={{ flex: 1, textAlign: "left" }}>Search or jump to...</span>
                </div>
            </button>
        </div>
        {isOpen && <MobileSearchDropdown setIsOpen={setIsOpen} />}
    </div>
);

export default MobileSearch;