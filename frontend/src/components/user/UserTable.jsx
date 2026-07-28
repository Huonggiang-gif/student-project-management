import "../../assets/styles/User.css";
import { FaEye, FaEdit, FaLock, FaUnlock} from "react-icons/fa";

function UserTable({users, loading, onEdit, onChangeStatus, onView}) {

    if (loading) {
        return <p>Đang tải dữ liệu...</p>
    }
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
                                        className="action-btn view-btn"
                                        title="Xem chi tiết"
                                        onClick={() => onView(user.id)}
                                    >
                                        <FaEye />
                                    </button>
                                    <button
                                        className="action-btn edit-btn"
                                        title="Chỉnh sửa"
                                        onClick={() => onEdit(user)}
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        className="action-btn lock-btn"
                                        title={
                                            user.status === "active"
                                            ? "Khóa tài khoản"
                                            : "Mở khóa tài khoản"
                                        }
                                        onClick={() => onChangeStatus(user)}
                                    >
                                        {
                                            user.status === "active"
                                            ? <FaLock />
                                            : <FaUnlock />
                                        }
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