import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { Link } from "react-router-dom";
import "../assets/styles/Auth.css"
function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();

        try {

            const data = await login(username, password);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/dashboard");

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
                <h2>Đăng nhập</h2>

                <form onSubmit={handleLogin}>

                    <div className="form-group">
                        <label>Tên đăng nhập</label>
                        <br />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <br />

                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <br />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <br />

                    {error && (
                        <p style={{ color: "red" }}>
                            {error}
                        </p>
                    )}

                    <button type="submit" className="auth-btn">
                        Đăng nhập
                    </button>
                    
                    <p>
                        Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                    </p>
                </form>
            </div>      
        </div>
    )
}

export default LoginPage;