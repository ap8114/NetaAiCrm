import SearchBar from "./SearchBar";

const HeroSection = ({ logo, searchQuery, setSearchQuery, showResults, setShowResults, searchResults, handleResultClick, handleKeyPress, handleSearch }) => (
    <div className="hero-section py-5">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-8 mx-auto text-center">
                    <div className="d-flex flex-wrap justify-content-center align-items-center mb-4 gap-3">
                        <img src={logo} alt="BonBon Logo" className="hero-logo" />
                        <h1 className="hero-title m-0">Welcome to <span className="gradient-text">BonBon</span></h1>
                    </div>
                    <p className="hero-subtitle mb-4">Your complete business management solution</p>
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} showResults={showResults} setShowResults={setShowResults} searchResults={searchResults} handleResultClick={handleResultClick} handleKeyPress={handleKeyPress} handleSearch={handleSearch} />
                </div>
            </div>
        </div>
    </div>
);

export default HeroSection;