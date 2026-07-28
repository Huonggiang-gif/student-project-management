import { useEffect, useState } from "react";
import axios from "axios";

function RecentProjects() {

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

            setProjects(res.data.slice(0, 5));

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="recent-projects">

            <h2>Đề tài mới</h2>

            <table>

                <thead>

                    <tr>

                        <th>Tên đề tài</th>

                        <th>Sinh viên</th>

                        <th>Giảng viên</th>

                        <th>Trạng thái</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        projects.length === 0 ?

                            (

                                <tr>

                                    <td colSpan="4">

                                        Chưa có dữ liệu.

                                    </td>

                                </tr>

                            )

                            :

                            (

                                projects.map(project => (

                                    <tr key={project.id}>

                                        <td>{project.title}</td>

                                        <td>{project.student_name || "--"}</td>

                                        <td>{project.lecturer_name || "--"}</td>

                                        <td>
                                            <span className={`status ${project.status}`}>
                                                {project.status}
                                            </span>
                                        </td>

                                    </tr>

                                ))

                            )

                    }

                </tbody>

            </table>

        </div>

    );

}

export default RecentProjects;