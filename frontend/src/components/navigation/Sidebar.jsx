import { Link } from "react-router-dom";
import "../../assets/styles/Sidebar.css"
import { FaThLarge, FaFolderOpen,FaTasks,FaChartBar,FaCog,FaSignOutAlt,FaPlus,FaGraduationCap} from "react-icons/fa";
function Sidebar() {

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

                <Link to="/project">

                    <FaFolderOpen />

                    <span>Đề tài</span>

                </Link>

                <Link to="/task">

                    <FaTasks />

                    <span>Tiến độ</span>

                </Link>

                <Link to="/report">

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

                <Link to="/login">

                    <FaSignOutAlt />

                    <span>Đăng xuất</span>

                </Link>

            </div>

        </aside>

    )
}

export default Sidebar;