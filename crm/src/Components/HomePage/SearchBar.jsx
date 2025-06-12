import SearchResultsDropdown from "./SearchResultsDropdown";

const SearchBar = ({ searchQuery, setSearchQuery, showResults, setShowResults, searchResults, handleResultClick, handleKeyPress, handleSearch }) => (
    <div className="search-container mx-auto mb-5 position-relative">
        <div className="input-group">
            <input
                type="text"
                className="form-control search-input"
                placeholder="Search across all modules..."
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value === "") {
                        setShowResults(false);
                    } else {
                        handleSearch();
                    }
                }}
                onKeyPress={handleKeyPress}
                onFocus={() => searchQuery && setShowResults(true)}
            />
            <button className="btn btn-primary search-btn" onClick={handleSearch}>
                <i className="fas fa-search"></i>
            </button>
        </div>
        {showResults && <SearchResultsDropdown searchResults={searchResults} handleResultClick={handleResultClick} searchQuery={searchQuery} />}
    </div>
);

export default SearchBar;