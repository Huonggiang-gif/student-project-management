import StudentReport from "../components/report/StudentReport";
import AdminReport from "../components/report/AdminReport";
import LecturerReport from "../components/report/LecturerReport";
function ReportPage() {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.role === "admin") {
        return <AdminReport />;
    }

    if (user?.role === "lecturer") {
        return <LecturerReport />;
    }

    return <StudentReport />;
}

export default ReportPage;