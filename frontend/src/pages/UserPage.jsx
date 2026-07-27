import "../assets/styles/User.css"
import UserToolbar from "../components/user/UserToolbar";
import UserTable from "../components/user/UserTable";

function UserPage() {
    return (
        <div className="user-page">

            <div className="user-header">
                <div>
                    <h1>Quản lý người dùng</h1>
                    <p>
                        Quản lý thông tin sinh viên, giảng viên và quản trị viên.
                    </p>
                </div>

                <button className="add-user-btn">
                    + Thêm người dùng
                </button>
            </div>

            <div className="user-content">
                <UserToolbar/>

                <UserTable/>
            </div>

        </div>
    );
}

export default UserPage;