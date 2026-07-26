import ProtectedRoute from "./ProtectetedRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ReportPage from "../pages/ReportPage";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import ReportPage from "../pages/ReportPage";


function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />}/>

                <Route element={<AuthLayout />}>

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />}/>
                </Route>

                <Route element={<MainLayout />}>

                    <Route path="/dashboard" element={<DashboardPage />}/>
                </Route>
            </Routes>

        </BrowserRouter>

    );

}


export default AppRoutes;