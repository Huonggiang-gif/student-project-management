import api from "./api";

// Đăng nhập
export async function login(username, password) {
    const response = await api.post("/auth/login", {
        username,
        password
    });

    return response.data;
}

// Đăng ký
export async function register(username, password, full_name, email,phone, role) {
    const response = await api.post("/auth/register", {
        username,
        password,
        full_name,
        email,
        phone,
        role
    });

    return response.data;
}

// Đăng xuất
export function logout() {
    localStorage.removeItem("token");
}