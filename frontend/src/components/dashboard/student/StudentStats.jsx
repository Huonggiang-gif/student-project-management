import { useState, useEffect } from "react";
import axios from "axios";
import { FaBook, FaUserTie, FaChartLine } from "react-icons/fa";

function StudentStats() {

    const [stats, setStats] = useState({
        topic: "",
        lecturer: "",
        progress: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:3000/api/dashboard/student",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setStats(res.data.data);

        } catch (err) {
            console.log(err);
        }
    };

    const data = [
        {
            title: "Đề tài",
            value: stats.topic || "--",
            icon: <FaBook />,
            color: "#f59e0b"
        },
        {
            title: "Giảng viên",
            value: stats.lecturer || "--",
            icon: <FaUserTie />,
            color: "#8b5cf6"
        },
        {
            title: "Tiến độ",
            value: `${stats.progress || 0}%`,
            icon: <FaChartLine />,
            color: "#3b82f6"
        }
    ];

    return (
        <div className="student-stats-grid">

            {data.map((item, index) => (

                <div
                    className="student-stat-card"
                    key={index}
                >

                    <div
                        className="student-stat-icon"
                        style={{
                            background: `${item.color}20`,
                            color: item.color
                        }}
                    >
                        {item.icon}
                    </div>

                    <div className="student-stat-info">
                        <h4>{item.title}</h4>
                        <h2>{item.value}</h2>
                    </div>

                </div>

            ))}

        </div>
    );
}

export default StudentStats;