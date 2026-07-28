import { useEffect, useState } from "react";
import axios from "axios";

function RecentActivity() {

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        fetchActivity();
    }, []);

    const fetchActivity = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:3000/api/progress",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setActivities(res.data.slice(0, 5));

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="recent-activity">

            <h2>Hoạt động gần đây</h2>

            {

                activities.length === 0 ?

                    (

                        <p>Chưa có dữ liệu.</p>

                    )

                    :

                    (

                        <ul>

                            {

                                activities.map(item => (

                                    <li key={item.id}>

                                        <strong>{item.student_name}</strong>

                                        {" "}đã cập nhật tiến độ đề tài{" "}

                                        <strong>{item.title}</strong>

                                    </li>

                                ))

                            }

                        </ul>

                    )

            }

        </div>

    );

}

export default RecentActivity;