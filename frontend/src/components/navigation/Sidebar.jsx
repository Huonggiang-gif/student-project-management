import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/Sidebar.css"
import { FaUsers, FaThLarge, FaFolderOpen,FaTasks,FaChartBar,FaCog,FaSignOutAlt,FaPlus,FaGraduationCap} from "react-icons/fa";
function Sidebar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

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
                    <h2>
                        HỆ THỐNG
                    </h2>
                    <p>
                        Quản lý đồ án sinh viên
                    </p>
                </div>
            </div>

            <nav className="sidebar-menu">
                <Link to="/dashboard" className="active">
                    <FaThLarge />
                    <span>Tổng quan hệ thống</span>
                </Link>
                {user?.role === "admin" && (
                    <Link to="/users">
                    <FaUsers />
                    <span>Quản lý người dùng</span>
                    </Link>
                )}
                <Link to="/project">
                    <FaFolderOpen />
                    <span>Đề tài</span>
                </Link>
                <Link to="/task">
                    <FaTasks />
                    <span>Tiến độ</span>
                </Link>
<<<<<<< Updated upstream
                <Link to="/report">
=======

                <Link to="/reports">

>>>>>>> Stashed changes
                    <FaChartBar />
                    <span>Báo cáo</span>
                </Link>
            </nav>

            <button className="new-project-btn">
                <FaPlus />
                <span>Thêm đề tài</span>
            </button>

            <div className="sidebar-footer">
                <Link to="/settings">
                    <FaCog />
                    <span>Cài đặt</span>
                </Link>
                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    <span>Đăng xuất</span>
                </button>
            </div>
        </aside>
    )
}

export default Sidebar;