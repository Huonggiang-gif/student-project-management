import { useEffect, useState } from "react";
import axios from "axios";

function TopicStatistics() {

    const [stats, setStats] = useState({
        pending: 0,
        inProgress: 0,
        completed: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

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

            const topics = res.data;

            const pending = topics.filter(
                t => t.status === "waiting_approval"
            ).length;

            const inProgress = topics.filter(
                t => t.status === "approved" ||
                     t.status === "in_progress"
            ).length;

            const completed = topics.filter(
                t => t.status === "completed"
            ).length;

            setStats({
                pending,
                inProgress,
                completed
            });

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="topic-statistics">

            <h2>Thống kê đề tài</h2>

            <div className="topic-stat-row">

                <span>🟡 Chờ duyệt</span>

                <strong>{stats.pending}</strong>

            </div>

            <div className="topic-stat-row">

                <span>🔵 Đang thực hiện</span>

                <strong>{stats.inProgress}</strong>

            </div>

            <div className="topic-stat-row">

                <span>🟢 Hoàn thành</span>

                <strong>{stats.completed}</strong>

            </div>

        </div>

    );
}

export default TopicStatistics;