import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import ProtectedRoute from "./ProtectetedRoute";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import UserPage from "../pages/UserPage";
import Progress from "../pages/progress/Progress";

/* =======================
        ADMIN
======================= */

import AdminProject from "../pages/project/admin/AdminProject";
import AdminTopicCreate from "../pages/project/admin/AdminTopicCreate";
import AdminTopicDetail from "../pages/project/admin/AdminTopicDetail";
import AdminTopicEdit from "../pages/project/admin/AdminTopicEdit";

/* =======================
       LECTURER
======================= */

import LecturerProject from "../pages/project/lecturer/LecturerProject";
import LecturerTopicDetail from "../pages/project/lecturer/LecturerTopicDetail";

/* =======================
        STUDENT
======================= */

import StudentProject from "../pages/project/student/StudentProject";
import StudentRegisterTopic from "../pages/project/student/StudentRegisterTopic";
import StudentTopicDetail from "../pages/project/student/StudentTopicDetail";
import StudentTopicEdit from "../pages/project/student/StudentTopicEdit";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                {/* Login Register */}

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

                {/* =======================
                        DASHBOARD
                ======================= */}

                <Route element={<ProtectedRoute />}>

                    <Route element={<MainLayout />}>

                        <Route
                            path="/dashboard"
                            element={<DashboardPage />}
                        />

                        <Route
                            path="/task"
                            element={<Progress />}
                        />

                    </Route>

                </Route>

                {/* =======================
                            ADMIN
                ======================= */}

                <Route
                    element={<ProtectedRoute roles={["admin"]} />}
                >

                    <Route element={<MainLayout />}>

                        <Route
                            path="/project"
                            element={<AdminProject />}
                        />

                        <Route
                            path="/project/create"
                            element={<AdminTopicCreate />}
                        />

                        <Route
                            path="/project/:id"
                            element={<AdminTopicDetail />}
                        />

                        <Route
                            path="/project/edit/:id"
                            element={<AdminTopicEdit />}
                        />

                        <Route
                            path="/users"
                            element={<UserPage />}
                        />

                    </Route>

                </Route>

                {/* =======================
                        LECTURER
                ======================= */}

                <Route
                    element={<ProtectedRoute roles={["lecturer"]} />}
                >

                    <Route element={<MainLayout />}>

                        <Route
                            path="/lecturer/project"
                            element={<LecturerProject />}
                        />

                        <Route
                            path="/lecturer/project/:id"
                            element={<LecturerTopicDetail />}
                        />

                        

                    </Route>

                </Route>

                {/* =======================
                        STUDENT
                ======================= */}

                <Route
                    element={<ProtectedRoute roles={["student"]} />}
                >

                    <Route element={<MainLayout />}>

                        <Route
                            path="/student/project"
                            element={<StudentProject />}
                        />

                        <Route
                            path="/student/register-topic"
                            element={<StudentRegisterTopic />}
                        />

                        <Route
                            path="/student/project/:id"
                            element={<StudentTopicDetail />}
                        />

                        <Route
                            path="/student/project/edit/:id"
                            element={<StudentTopicEdit />}
                        />

                    </Route>

                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;