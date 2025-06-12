import getCategoryColor from "./GetCategoryColor";

const SearchResultsDropdown = ({ searchResults, handleResultClick, searchQuery }) => (
    <div className="search-results-dropdown">
        {searchResults.length > 0 ? (
            <ul className="list-group">
                {searchResults.map((item, index) => (
                    <li key={index} className="list-group-item search-result-item" onClick={() => handleResultClick(item.path)}>
                        <div className="d-flex align-items-center">
                            <div className={`menu-icon-sm bg-${getCategoryColor(item.category)} me-3`}>
                                <i className={`fas ${item.icon}`}></i>
                            </div>
                            <div className="d-flex flex-column">
                                <span className="result-title">{item.name}</span>
                                <small className="text-muted">{item.category}</small>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <div className="search-no-results">
                <i className="fas fa-search me-2"></i>
                No results found for "{searchQuery}"
            </div>
        )}
    </div>
);

export default SearchResultsDropdown;