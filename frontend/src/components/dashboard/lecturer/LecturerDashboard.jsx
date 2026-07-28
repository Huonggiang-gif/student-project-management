import "../../../assets/styles/LecturerDashboard.css"

import LecturerStats from "./LecturerStats";
import LecturerProjects from "./LecturerProjects";


function LecturerDashboard(){

    const user = JSON.parse(localStorage.getItem("user")) || {};


    return (

        <div className="lecturer-dashboard">

            <div className="lecturer-header">

                <h1>
                    Xin chào, {user.full_name}
                </h1>

                <p>
                    Quản lý đồ án và sinh viên đang hướng dẫn
                </p>

            </div>


            <LecturerStats />

            <LecturerProjects />


        </div>

    );

}


export default LecturerDashboard;