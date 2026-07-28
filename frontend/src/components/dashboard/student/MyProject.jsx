import { useEffect, useState } from "react";
import axios from "axios";

function MyProject() {

    const [topic, setTopic] = useState(null);

    useEffect(() => {
        fetchTopic();
    }, []);

    const fetchTopic = async () => {

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

            if (res.data.length > 0) {
                setTopic(res.data[0]);
            }

        } catch (err) {

            console.log(err);

        }

    };

    const getStatus = (status) => {

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

            default:
                return status;

        }

    };

    return (

        <div className="project-card">

            <h2>Thông tin đề tài</h2>

            {
                topic ? (

                    <div className="project-table">

                        <div className="project-row">
                            <span>Tên đề tài</span>
                            <strong>{topic.title}</strong>
                        </div>

                        <div className="project-row">
                            <span>Mô tả</span>
                            <strong>{topic.description}</strong>
                        </div>

                        <div className="project-row">
                            <span>Giảng viên</span>
                            <strong>{topic.lecturer_name}</strong>
                        </div>

                        <div className="project-row">
                            <span>Trạng thái</span>

                            <span className={`status ${topic.status}`}>
                                {getStatus(topic.status)}
                            </span>

                        </div>

                    </div>

                ) : (

                    <div className="empty-box">

                        Chưa đăng ký đề tài.

                    </div>

                )

            }

        </div>

    );

}

export default MyProject;