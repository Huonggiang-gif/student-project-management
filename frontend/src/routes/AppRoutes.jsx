import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ReportPage from "../pages/ReportPage";
import UserPage from "../pages/UserPage";
import EvaluationPage from "../pages/EvaluationPage";
import ProgressPage from "../pages/ProgressPage";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                <Route element={<AuthLayout />}>
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />

                    <Route
                        path="/register"
                        element={<RegisterPage />}
                    />
                </Route>

                <Route element={<MainLayout />}>
                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />

                    <Route
                        path="/users"
                        element={<UserPage />}
                    />

                    <Route
                        path="/report"
                        element={<ReportPage />}
                    />
                    <Route
                        path="/evaluation"
                        element={<EvaluationPage />}
                    />
                    <Route
                        path="/task"
                        element={<ProgressPage />}
                    />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;