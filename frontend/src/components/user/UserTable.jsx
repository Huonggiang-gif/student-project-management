import "../../assets/styles/User.css";
import { FaEdit, FaLock, FaUnlock} from "react-icons/fa";

function UserTable() {
    const users = [
        {
            id: 1,
            user_code: "SV001",
            full_name: "Nguyễn Văn A",
            email: "a@gmail.com",
            role: "student",
            status: "active"
        },
        {
            id: 2,
            user_code: "GV001",
            full_name: "Trần Văn B",
            email: "b@gmail.com",
            role: "lecturer",
            status: "active"
        },
        {
            id: 3,
            user_code: "AD001",
            full_name: "Admin",
            email: "admin@gmail.com",
            role: "admin",
            status: "active"
        }
    ];
    return (
        <div className="user-table-container">

            <table className="user-table">

                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>Vai trò</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (

                        <tr key={user.id}>

                            <td>{user.user_code}</td>

                            <td>{user.full_name}</td>

                            <td>{user.email}</td>

                            <td>{user.role}</td>

                            <td>
                                <span className={`status ${user.status}`}>
                                    {user.status}
                                </span>
                            </td>

                            <td>
                                <div className="action-buttons">
                                    <button
                                        className="action-btn edit-btn"
                                        title="Chỉnh sửa"
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        className="action-btn lock-btn"
                                        title="Khóa tài khoản"
                                    >
                                        <FaLock />
                                    </button>

                                </div>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}
export default UserTable;