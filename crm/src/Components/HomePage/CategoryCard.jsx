// components/CategoryCard.jsx
import { Link } from "react-router-dom";

const CategoryCard = ({ title, items }) => {
    return (
        <div className="category-card">
            <h3 className="category-title">{title}</h3>
            <div className="menu-items">
                {items.map(({ to, iconClass, text, badge }, idx) => (
                    <Link to={to} className="menu-item" key={idx}>
                        <div className={`menu-icon ${iconClass.bg}`}>
                            <i className={`fas ${iconClass.name}`}></i>
                        </div>
                        {badge ? (
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <span className="menu-text">{text}</span>
                                <span className="badge bg-warning text-dark badge-pill">{badge}</span>
                            </div>
                        ) : (
                            <span className="menu-text">{text}</span>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryCard;
