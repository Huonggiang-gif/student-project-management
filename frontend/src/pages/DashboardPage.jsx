import AdminDashboard from "../components/dashboard/admin/AdminDashboard";
import LecturerDashboard from "../components/dashboard/lecturer/LecturerDashboard";
import StudentDashboard from "../components/dashboard/student/StudentDashboard";

function DashboardPage() {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user.role === "admin") {
        return <AdminDashboard />;
    }

    if (user.role === "lecturer") {
        return <LecturerDashboard />;
    }

    return <StudentDashboard />;
}

export default DashboardPage;