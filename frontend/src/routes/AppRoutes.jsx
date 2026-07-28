import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectetedRoute";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ReportPage from "../pages/ReportPage";
import UserPage from "../pages/UserPage";
import SettingsPage from "../pages/settingPage";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import AdminProject from "../pages/project/admin/AdminProject";
import LecturerProject from "../pages/project/lecturer/LecturerProject";
import StudentProject from "../pages/project/student/StudentProject";

import TopicCreate from "../pages/project/TopicCreate";
import TopicDetail from "../pages/project/TopicDetail";
import TopicEdit from "../pages/project/TopicEdit";

import Progress from "../pages/progress/Progress";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                {/* Các trang chỉ cần đăng nhập */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>

                        <Route path="/dashboard" element={<DashboardPage />}/>
                        <Route path="/project/create" element={<TopicCreate />}/>
                        <Route path="/project/:id"element={<TopicDetail />}/>
                        <Route path="/project/edit/:id" element={<TopicEdit />}/>
                        <Route path="/task" element={<Progress />}/>
                        <Route path="/reports" element={<ReportPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
        
                    </Route>
                </Route>

                {/* Admin */}
                <Route element={<ProtectedRoute roles={["admin"]} />}>
                    <Route element={<MainLayout />}>

                        <Route path="/project" element={<AdminProject />}/>
                        <Route path="/users" element={<UserPage />}/>
   
                    </Route>
                </Route>

                {/* Lecturer */}
                <Route element={<ProtectedRoute roles={["lecturer"]} />}>
                    <Route element={<MainLayout />}>
                        <Route path="/lecturer/project" element={<LecturerProject />}/>
                        
                    </Route>
                </Route>

                {/* Student */}
                <Route element={<ProtectedRoute roles={["student"]} />}>
                    <Route element={<MainLayout />}>
                        <Route path="/student/project" element={<StudentProject />}/>
                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;