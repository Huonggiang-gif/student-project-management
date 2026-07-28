import { useEffect, useState } from "react";
import axios from "axios";

import StatCard from "./StatCard";
import { FaUsers } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBook } from "react-icons/fa";

function DashboardStats() {

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalStudents: 0,
        totalLecturers: 0,
        totalTopics: 0,
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:3000/api/dashboard/stats",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Response:", res.data);

            setStats(res.data.data);

        } catch (err) {
            console.log("Error:", err);
            console.log("Response:", err.response);
            console.log("Data:", err.response?.data);
        }
    };

    return (
        <div className="stats-grid">

            <StatCard
                title="Tổng người dùng"
                value={stats.totalUsers}
                icon={<FaUsers />}
                color="#ec4899"
            />

            <StatCard
                title="Sinh viên"
                value={stats.totalStudents}
                icon={<FaUserGraduate />}
                color="#3b82f6"
            />

            <StatCard
                title="Giảng viên"
                value={stats.totalLecturers}
                icon={<FaChalkboardTeacher />}
                color="#8b5cf6"
            />

            <StatCard
                title="Đề tài"
                value={stats.totalTopics}
                icon={<FaBook />}
                color="#f59e0b"
            />

        </div>
    );
}

export default DashboardStats;