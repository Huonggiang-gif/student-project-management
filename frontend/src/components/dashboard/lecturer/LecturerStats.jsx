import { useState, useEffect } from "react";
import axios from "axios";
import {
    FaProjectDiagram,
    FaUsers,
    FaClipboardCheck
} from "react-icons/fa";


function LecturerStats() {
    const [stats, setStats] = useState({
        totalTopics: 0,
        totalStudents: 0,
        totalProgress: 0
    });
    useEffect(() => {
        fetchStats();
    }, []);
    const fetchStats = async () => {
        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:3000/api/dashboard/lecturer",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setStats(res.data.data);

        } catch (err) {
            console.log(err);
        }
    };
    const data = [

        {
            title: "Đề tài hướng dẫn",
            value: stats.totalTopics,
            icon: <FaProjectDiagram />,
            className: "orange"
        },


        {
            title: "Sinh viên",
            value: stats.totalStudents,
            icon: <FaUsers />,
            className: "purple"
        },


        {
            title: "Tiến độ",
            value: stats.totalProgress,
            icon: <FaClipboardCheck />,
            className: "blue"
        }

    ];



    return (

        <div className="lecturer-stats">


            {
                data.map((item, index) => (


                    <div
                        className="lecturer-stat-card"
                        key={index}
                    >


                        <div className={`stat-icon ${item.className}`}>

                            {item.icon}

                        </div>



                        <div>

                            <p>
                                {item.title}
                            </p>


                            <h2>
                                {item.value}
                            </h2>


                        </div>



                    </div>


                ))
            }


        </div>

    );

}


export default LecturerStats;