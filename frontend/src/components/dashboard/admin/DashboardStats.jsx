import StatCard from "./StatCard";
import { FaUsers } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBook } from "react-icons/fa";

function DashboardStats() {
    return (
        <div className="stats-grid">

            <StatCard
                title="Tổng người dùng"
                value="--"
                icon={<FaUsers />}
                color="#ec4899"
            />

            <StatCard
                title="Sinh viên"
                value="--"
                icon={<FaUserGraduate />}
                color="#3b82f6"
            />

            <StatCard
                title="Giảng viên"
                value="--"
                icon={<FaChalkboardTeacher />}
                color="#8b5cf6"
            />

            <StatCard
                title="Đề tài"
                value="--"
                icon={<FaBook />}
                color="#f59e0b"
            />

        </div>
    );
}

export default DashboardStats;