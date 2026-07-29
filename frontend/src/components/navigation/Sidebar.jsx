import { NavLink, useNavigate } from "react-router-dom";
import "../../assets/styles/Sidebar.css";

import { FaUsers, FaThLarge, FaFolderOpen,FaTasks,FaChartBar,FaCog,FaSignOutAlt,FaPlus,FaGraduationCap} from "react-icons/fa";

function Sidebar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    // Đường dẫn đề tài
    const projectPath =
        user?.role === "admin"
            ? "/admin/project"
            : user?.role === "lecturer"
                ? "/lecturer/project"
                : "/student/project";

    // Đường dẫn tiến độ
    const progressPath =
        user?.role === "admin"
            ? "/admin/progress"
            : user?.role === "lecturer"
                ? "/lecturer/progress"
                : "/student/progress";

    // Đường dẫn báo cáo
    // Đường dẫn báo cáo
    const reportPath = "/reports";

    function handleLogout() {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login", { replace: true });

    }

    return (

        <aside className="sidebar">

            <div className="sidebar-logo">

                <div className="logo-icon">
                    <FaGraduationCap />
                </div>

                <div>

                    <h2>HỆ THỐNG</h2>

                    <p>Quản lý đồ án sinh viên</p>

                </div>

            </div>

            <nav className="sidebar-menu">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <FaThLarge />
                    <span>Tổng quan hệ thống</span>
                </NavLink>

                {
                    user?.role === "admin" && (

                        <NavLink
                            to="/users"
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            <FaUsers />
                            <span>Quản lý người dùng</span>
                        </NavLink>

                    )
                }

                <NavLink
                    to={projectPath}
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <FaFolderOpen />
                    <span>Đề tài</span>
                </NavLink>

                <NavLink
                    to={progressPath}
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <FaTasks />
                    <span>Tiến độ</span>
                </NavLink>

                <NavLink
                    to={reportPath}
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <FaChartBar />
                    <span>Báo cáo</span>
                </NavLink>
            </nav>

            {
                user?.role === "admin" && (

                    <button className="new-project-btn">

                        <FaPlus />

                        <span>Thêm đề tài</span>

                    </button>

                )
            }

            <div className="sidebar-footer">

                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <FaCog />
                    <span>Cài đặt</span>
                </NavLink>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    <span>Đăng xuất</span>
                </button>

            </div>

        </aside>

    );

}

export default Sidebar;