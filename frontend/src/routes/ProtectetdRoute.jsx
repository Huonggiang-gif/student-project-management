import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!token) {
        console.log("Chuyển về login");
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;