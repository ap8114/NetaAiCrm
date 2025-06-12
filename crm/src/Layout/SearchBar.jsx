import { BsSearch } from "react-icons/bs";
import SearchDropdown from "./SearchDropdown";

const SearchBar = ({ isOpen, setIsOpen, wrapperRef }) => (
    <div className="position-relative" ref={wrapperRef}>
        <div className="input-group d-none d-md-flex">
            <span className="input-group-text bg-white border-end-0">
                <BsSearch />
            </span>
            <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search or jump to..."
                style={{ maxWidth: "200px" }}
                onFocus={() => setIsOpen(true)}
            />
        </div>
        {isOpen && <SearchDropdown />}
    </div>
);

export default SearchBar;