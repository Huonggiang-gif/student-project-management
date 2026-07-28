import StatusBadge from "./StatusBadge";
import ActionButtons from "./ActionButtons";

function ProjectTable({

    topics,

    role,

    onDelete,

    onApprove,

    onReject

}) {

    return (

        <div className="table-responsive">

            <table className="table table-bordered table-hover">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Đề tài</th>

                        <th>Sinh viên</th>

                        <th>Giảng viên</th>
                        <th>Tiến độ</th>

                        <th>Trạng thái</th>

                        <th width="220">
                            Thao tác
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        topics.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center"
                                    >

                                        Không có dữ liệu

                                    </td>

                                </tr>

                            )

                            :

                            topics.map(topic => (

                                <tr key={topic.id}>

                                    <td>{topic.id}</td>

                                    <td>{topic.title}</td>

                                    <td>

                                        {topic.student_name || "-"}

                                    </td>

                                    <td>

                                        {topic.lecturer_name || "-"}

                                    </td>
                                    <td width="180">

                                        <div className="progress">

                                            <div

                                                className="progress-bar"

                                                role="progressbar"

                                                style={{
                                                    width: `${topic.progress || 0}%`
                                                }}

                                            >

                                                {topic.progress || 0}%

                                            </div>

                                        </div>

                                    </td>

                                    <td>

                                        <StatusBadge
                                            status={topic.status}
                                        />

                                    </td>

                                    <td>

                                        <ActionButtons

                                            topic={topic}

                                            role={role}

                                            onDelete={onDelete}

                                            onApprove={onApprove}

                                            onReject={onReject}

                                        />

                                    </td>

                                </tr>

                            ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default ProjectTable;