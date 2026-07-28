import "../../../assets/styles/StudentDashboard.css"
import StudentStats from "./StudentStats";
import ProgressCard from "./ProgressCard";
import MyProject from "./MyProject";
import RecentActivity from "../student/RecentActivity";

function StudentDashboard() {

    const user = JSON.parse(localStorage.getItem("user")) || {};

    return (
        <div className="student-dashboard">

            {/* Header */}
            <div className="student-header">

                <div>
                    <h1>
                        Xin chào{user.full_name ? `, ${user.full_name}` : ""} 👋
                    </h1>

                    <p>
                        Theo dõi tiến độ đồ án của bạn.
                    </p>
                </div>

            </div>

            {/* Thống kê */}
            <StudentStats />

            {/* Nội dung chính */}
            <div className="student-content">

                <MyProject />

                <ProgressCard />

            </div>

            {/* Hoạt động gần đây */}
            <RecentActivity />

        </div>
    );
}

export default StudentDashboard;