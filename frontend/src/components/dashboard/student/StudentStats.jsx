import { FaBook, FaUserTie, FaChartLine } from "react-icons/fa";

function StudentStats() {

    const stats = [
        {
            title: "Đề tài",
            value: "--",
            icon: <FaBook />,
            color: "#f59e0b"
        },
        {
            title: "Giảng viên",
            value: "--",
            icon: <FaUserTie />,
            color: "#8b5cf6"
        },
        {
            title: "Tiến độ",
            value: "--",
            icon: <FaChartLine />,
            color: "#3b82f6"
        }
    ];

    return (
        <div className="student-stats-grid">

            {stats.map((item,index)=>(

                <div
                    className="student-stat-card"
                    key={index}
                >

                    <div
                        className="student-stat-icon"
                        style={{
                            background:`${item.color}20`,
                            color:item.color
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