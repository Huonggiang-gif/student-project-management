import "../../assets/styles/User.css";

function UserToolbar({ keyword, setKeyword, onSearch }) {
    return (
        <div className="user-toolbar">

        <input
            type="text"
            placeholder="Tìm kiếm theo mã, họ tên hoặc email..."
            value={keyword}
            onChange={(e) => {
                setKeyword(e.target.value);
                onSearch(e.target.value);
            }}
            className="search-input"
        />
        </div>
    );
}

export default UserToolbar;