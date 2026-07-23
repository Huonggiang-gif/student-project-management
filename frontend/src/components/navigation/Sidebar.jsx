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
                        Project Management
                    </h2>

                    <p>
                        Academic Portal
                    </p>

                </div>

            </div>

            <nav className="sidebar-menu">

                <Link to="/dashboard" className="active">

                    <FaThLarge />

                    <span>Dashboard</span>

                </Link>

                <Link to="/project">

                    <FaFolderOpen />

                    <span>Projects</span>

                </Link>

                <Link to="/task">

                    <FaTasks />

                    <span>Tasks</span>

                </Link>

                <Link to="/report">

                    <FaChartBar />

                    <span>Reports</span>

                </Link>

            </nav>

            <button className="new-project-btn">

                <FaPlus />

                <span>New Project</span>

            </button>

            <div className="sidebar-footer">

                <Link to="/settings">

                    <FaCog />

                    <span>Settings</span>

                </Link>

                <Link to="/login">

                    <FaSignOutAlt />

                    <span>Logout</span>

                </Link>

            </div>

        </aside>

    )
}

export default Sidebar;