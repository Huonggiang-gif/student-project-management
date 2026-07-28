import "../assets/styles/setting.css";
import { useState } from "react";
import { changePassword } from "../services/userService";

function SettingsPage() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (!oldPassword || !newPassword || !confirmPassword) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        if (newPassword.length < 6) {
            alert("Mật khẩu mới phải có ít nhất 6 ký tự");
            return;
        }

        if (oldPassword === newPassword) {
            alert("Mật khẩu mới không được trùng với mật khẩu cũ");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Xác nhận mật khẩu không khớp");
            return;
        }

        try {

            const data = await changePassword(
                oldPassword,
                newPassword
            );

            alert(data.message);

            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Không thể kết nối đến server");
            }

            console.error(error);
        }
    }

    return (
        <div className="settings-page">

            <div className="settings-header">
                <h1>Cài đặt</h1>
                <p>Quản lý cài đặt tài khoản.</p>
            </div>

            <div className="settings-card">

                <h2>Đổi mật khẩu</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Mật khẩu hiện tại</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) =>
                                setOldPassword(e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu mới</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Nhập lại mật khẩu mới</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="save-btn"
                    >
                        Đổi mật khẩu
                    </button>

                </form>

            </div>

        </div>
    );
}

export default SettingsPage;