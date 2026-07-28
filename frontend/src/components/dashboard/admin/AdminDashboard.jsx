import "../../../assets/styles/AdminDashboard.css";

import DashboardStats from "./DashboardStats";
import TopicStatistics from "./TopicStatistics";
import RecentActivity from "./RecentActivity";
import RecentProjects from "./RecentProjects";

function AdminDashboard() {
    return (
        <div className="admin-dashboard">

            <div className="dashboard-header">

                <div>
                    <h1>Tổng quan hệ thống</h1>
                    <p>Chào mừng quay trở lại, Quản trị viên 👋</p>
                </div>

            </div>

            <DashboardStats />

            <div className="dashboard-content">

                <TopicStatistics />

                <RecentActivity />

            </div>

            <RecentProjects />

        </div>
    );
}

export default AdminDashboard;