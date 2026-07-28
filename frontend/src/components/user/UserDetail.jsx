import "../../assets/styles/User.css";

function UserDetail({ isOpen, onClose, user }) {

    if (!isOpen || !user) return null;

    return (
        <div className="modal-overlay">
            <div className="detail-modal">

                <h2>Thông tin người dùng</h2>

                <div className="detail-item">
                    <label>Mã người dùng</label>
                    <p>{user.user_code}</p>
                </div>

                <div className="detail-item">
                    <label>Họ và tên</label>
                    <p>{user.full_name}</p>
                </div>

                <div className="detail-item">
                    <label>Email</label>
                    <p>{user.email}</p>
                </div>

                <div className="detail-item">
                    <label>Số điện thoại</label>
                    <p>{user.phone || "Chưa cập nhật"}</p>
                </div>

                <div className="detail-item">
                    <label>Vai trò</label>
                    <p>{user.role}</p>
                </div>

                <div className="detail-item">
                    <label>Trạng thái</label>
                    <p>{user.status}</p>
                </div>

                <div className="detail-item">
                    <label>Ngày tạo</label>
                    <p>{user.created_at}</p>
                </div>

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    Đóng
                </button>

            </div>
        </div>
    );
}

export default UserDetail;