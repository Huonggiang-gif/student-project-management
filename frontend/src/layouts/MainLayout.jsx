import { Outlet } from "react-router-dom";
import Header from "../components/navigation/Header"
import Sidebar from "../components/navigation/Sidebar";
import "../assets/styles/MainLayout.css"
function MainLayout(){
    return (
        <div className="main-layout">
            <Sidebar />

            <div className="main-content">
                <Header />
                <main>
                    <Outlet />
                </main>

            </div>

        </div>
    )
}
export default MainLayout;