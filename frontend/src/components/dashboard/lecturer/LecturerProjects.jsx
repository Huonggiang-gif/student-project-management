import { useEffect, useState } from "react";
import axios from "axios";

function LecturerProjects() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:3000/api/topics",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setProjects(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const getStatusText = (status) => {

        switch (status) {

            case "pending":
                return "Chờ đăng ký";

            case "waiting_approval":
                return "Chờ duyệt";

            case "approved":
                return "Đã duyệt";

            case "in_progress":
                return "Đang thực hiện";

            case "completed":
                return "Hoàn thành";

            case "rejected":
                return "Từ chối";

            default:
                return status;
        }

    };

    return (

        <div className="lecturer-projects">

            <h2>Đề tài đang phụ trách</h2>

            {
                projects.length === 0 ? (

                    <p className="empty-project">

                        Chưa có dữ liệu

                    </p>

                ) : (

                    <table>

                        <thead>

                            <tr>

                                <th>Tên đề tài</th>

                                <th>Sinh viên</th>

                                <th>Trạng thái</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                projects.map(project => (

                                    <tr key={project.id}>

                                        <td>{project.title}</td>

                                        <td>{project.student_name || "--"}</td>

                                        <td>

                                            <span
                                                className={`project-status ${project.status}`}
                                            >
                                                {getStatusText(project.status)}
                                            </span>

                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                )

            }

        </div>

    );

}

export default LecturerProjects;