import "../../../assets/styles/StudentDashboard.css";
import StudentStats from "./StudentStats";
import ProgressCard from "./ProgressCard";
import MyProject from "./MyProject";

function StudentDashboard() {

    const user = JSON.parse(localStorage.getItem("user")) || {};

    return (
        <div className="student-dashboard">

            <div className="student-header">
                <div>
                    <h1>
                        Xin chào{user.full_name ? `, ${user.full_name}` : ""} 👋
                    </h1>

                    <p>Theo dõi tiến độ đồ án của bạn.</p>
                </div>
            </div>

            <StudentStats />

            <div className="student-content">
                <MyProject />
                <ProgressCard />
            </div>

        </div>
    );
}

export default StudentDashboard;