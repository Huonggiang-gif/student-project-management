function StatCard({ title, value, icon, color }) {
    return (
        <div className="stat-card">
            <div className="stat-icon" 
            style={{
                    backgroundColor: `${color}20`,
                    color: color
                }}
            >
                {icon}
            </div>
            <div className="stat-info">
                <span>{title}</span>
                <h2>{value}</h2>
            </div>

        </div>
    );
}

export default StatCard;