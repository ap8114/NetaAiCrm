import CategoryCard from "./CategoryCard";

const MainContent = ({ menuData }) => (
    <div className="main-content py-5">
        <div className="container">
            <div className="row mb-5">
                <div className="col-12 text-center">
                    <h2 className="section-title">Jump right into</h2>
                    <p className="section-subtitle">Access all business modules from one place</p>
                </div>
            </div>
            <div className="row g-4 justify-content-center">
                {menuData.map((section, idx) => (
                    <div key={idx} className={section.col}>
                        <CategoryCard title={section.title} items={section.items} />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default MainContent;