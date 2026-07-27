import "../../assets/styles/User.css"

function UserModal({ isOpen, onClose, children, user}) {

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">

            <div className="modal">

                <div className="modal-header">

                    <h2>
                        {
                            user 
                            ? "Chỉnh sửa người dùng"
                            : "Thêm người dùng"
                        }
                    </h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                <div className="modal-body">
                    {children}
                </div>

            </div>

        </div>
    );
}

export default UserModal;