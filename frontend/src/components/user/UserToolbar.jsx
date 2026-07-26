import "../../assets/styles/User.css";

function UserToolbar() {
    return (
        <div className="user-toolbar">

            <input
                type="text"
                placeholder="Tìm kiếm theo mã, họ tên hoặc email..."
                className="search-input"
            />

            <div className="toolbar-actions">

                <select className="filter-select">
                    <option value="">Tất cả vai trò</option>
                    <option value="student">Sinh viên</option>
                    <option value="lecturer">Giảng viên</option>
                    <option value="admin">Quản trị viên</option>
                </select>

                <select className="filter-select">
                    <option value="">Tất cả trạng thái</option>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Đã khóa</option>
                </select>

            </div>

        </div>
    );
}

export default UserToolbar;