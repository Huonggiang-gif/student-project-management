import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { Link } from "react-router-dom";
import "../assets/styles/Auth.css";
function RegisterPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [full_name, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("")
    const [role, setRole] = useState("student");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    async function handleRegister(event) {

        event.preventDefault();

        setError("");
        setSuccess("");

        try {

            const data = await register(
                username,
                password,
                full_name,
                email,
                phone,
                role
            );

            setSuccess(data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Không thể kết nối đến server");
            }

        }

    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Đăng ký</h2>

                <form onSubmit={handleRegister}>

                    <div className="form-group">
                        <label>Tên người dùng</label><br />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <br />

                    <div className="form-group">
                        <label>Mật khẩu</label><br />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <br />

                    <div className="form-group">
                        <label>Họ và tên</label><br />
                        <input
                            type="text"
                            value={full_name}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <br />

                    <div className="form-group">
                        <label>Email</label><br />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <br />

                    <div className="form-group">
                        <label>Số điện thoại</label>

                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <br />

                    <div className="form-group">
                        <label>Vai trò</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="student">Student</option>
                            <option value="lecturer">Lecturer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <br />

                    {error && (
                        <p style={{ color: "red" }}>{error}</p>
                    )}

                    {success && (
                        <p style={{ color: "green" }}>{success}</p>
                    )}

                    <button type="submit" className="auth-btn">
                        Đăng ký
                    </button>

                    <p>
                        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;