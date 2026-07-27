import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardPage() {

    const navigate = useNavigate();

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (user.role === "admin") {

            navigate("/project");

        }

        if (user.role === "lecturer") {

            navigate("/lecturer/project");

        }

        if (user.role === "student") {

            navigate("/student/project");

        }

    }, []);

    return null;

}

export default DashboardPage;