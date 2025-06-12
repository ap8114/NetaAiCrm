// components/StatCard.jsx
const StatCard = ({ icon, bgColor, count, label }) => {
    return (
        <div className="stat-card">
            <div className={`stat-icon ${bgColor}`}>
                <i className={`fas ${icon}`}></i>
            </div>
            <div className="stat-content">
                <h3>{count}</h3>
                <p>{label}</p>
            </div>
        </div>
    );
};

export default StatCard;
