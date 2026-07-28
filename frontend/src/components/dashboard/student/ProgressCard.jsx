import { useEffect, useState } from "react";
import axios from "axios";

function ProgressCard() {

    const [progress, setProgress] = useState([]);

    useEffect(() => {
        fetchProgress();
    }, []);

    const fetchProgress = async () => {

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

            setProgress(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="progress-card">

            <h2>Tiến độ gần đây</h2>

            {
                progress.length === 0 ? (

                    <div className="empty-box">

                        Chưa có báo cáo tiến độ.

                    </div>

                ) : (

                    <div className="progress-list">

                        {
                            progress.slice(0, 4).map(item => (

                                <div
                                    key={item.id}
                                    className="progress-item"
                                >

                                    <div className="progress-dot"></div>

                                    <div className="progress-content">

                                        <h4>

                                            {new Date(item.updated_at).toLocaleDateString("vi-VN")}

                                        </h4>

                                        <p>

                                            {item.description}

                                        </p>

                                        {
                                            item.lecturer_comment ? (

                                                <small>

                                                    Nhận xét GV: {item.lecturer_comment}

                                                </small>

                                            ) : (

                                                <small
                                                    style={{
                                                        color: "#94a3b8"
                                                    }}
                                                >

                                                    Chưa có nhận xét

                                                </small>

                                            )
                                        }

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                )
            }

        </div>

    );

}

export default ProgressCard;