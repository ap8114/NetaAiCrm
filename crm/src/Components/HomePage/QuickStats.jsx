import StatCard from "./StatCard";

const QuickStats = ({ stats }) => (
    <div className="quick-stats py-4 bg-light">
        <div className="container">
            <div className="row g-3">
                {stats.map((item, idx) => (
                    <div className="col-md-3 col-6" key={idx}>
                        <StatCard icon={item.icon} bgColor={item.bgColor} count={item.count} label={item.label} />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default QuickStats;