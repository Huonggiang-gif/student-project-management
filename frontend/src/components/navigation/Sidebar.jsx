import { NavLink, useNavigate } from "react-router-dom";
import "../../assets/styles/Sidebar.css";

import {
    FaThLarge,
    FaFolderOpen,
    FaTasks,
    FaChartBar,
    FaCog,
    FaSignOutAlt,
    FaPlus,
    FaGraduationCap
} from "react-icons/fa";

function Sidebar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const role = user?.role;

    function logout() {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

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

                {role === "admin" && (

                    <NavLink
                        to="/project"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        <FaFolderOpen />
                        <span>Quản lý đề tài</span>
                    </NavLink>

                )}

                {role === "lecturer" && (

                    <NavLink
                        to="/lecturer/project"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        <FaFolderOpen />
                        <span>Đề tài hướng dẫn</span>
                    </NavLink>

                )}

                {role === "student" && (

                    <NavLink
                        to="/student/project"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        <FaFolderOpen />
                        <span>Đề tài của tôi</span>
                    </NavLink>

                )}

                <NavLink
                    to="/task"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <FaTasks />
                    <span>Tiến độ</span>
                </NavLink>

                <NavLink
                    to="/report"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <FaChartBar />
                    <span>Báo cáo</span>
                </NavLink>

            </nav>

            {(role === "admin" || role === "student") && (

                <button
                    className="new-project-btn"
                    onClick={() => navigate("/project/create")}
                >
                    <FaPlus />
                    <span>Thêm đề tài</span>
                </button>

            )}

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
                    onClick={logout}
                >
                    <FaSignOutAlt />
                    <span>Đăng xuất</span>
                </button>

            </div>

        </aside>

    );

}

export default Sidebar;