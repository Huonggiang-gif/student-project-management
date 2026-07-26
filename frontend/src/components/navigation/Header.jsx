import "../../assets/styles/Header.css";
import { FaSearch, FaBell, FaQuestionCircle, FaUserCircle } from "react-icons/fa";
function Header() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <header className="header">

            <div className="header-left">

                <div className="search-box">

                    <FaSearch className="search-icon" />

                    <input
                        type="text"
                        placeholder="Tìm kiếm đồ án..."
                    />

                </div>

            </div>

            <div className="header-right">

                <button className="icon-btn">

                    <FaBell />

                    <span className="notification-dot"></span>

                </button>

                <button className="icon-btn">

                    <FaQuestionCircle />

                </button>

                <div className="user-info">

                    <FaUserCircle className="user-avatar"/>

                    <span className="user-name">
                        {user?.full_name || "Người dùng"}
                    </span>

                </div>

            </div>

        </header>
    )
}

export default Header;