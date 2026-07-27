import StudentReport from "../components/report/StudentReport";
import TeacherReport from "../components/report/TeacherReport";

function ReportPage() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    if (user?.role === "lecturer") {

        return <TeacherReport />;

    }

    return <StudentReport />;

}

export default ReportPage;