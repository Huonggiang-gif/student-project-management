import ActionButtons from "./ActionButtons";
import StatusBadge from "./StatusBadge";

function ProjectTable({
    topics,
    role,
    onDelete,
    onApprove,
    onReject
}) {
    

    return (

        <div className="table-responsive">

            <table className="table table-hover align-middle">

                <thead className="table-light">

                    <tr>

                        <th>#</th>

                        <th>Tên đề tài</th>

                        <th>Sinh viên</th>

                        <th>Giảng viên</th>

                        <th>Trạng thái</th>

                        <th className="text-center">
                            Thao tác
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {topics.length === 0 ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center py-4"
                            >
                                Không có đề tài nào
                            </td>

                        </tr>

                    ) : (

                        topics.map((topic, index) => (

                            <tr key={topic.id}>

                                <td>{index + 1}</td>

                                <td>

                                    <strong>
                                        {topic.title}
                                    </strong>

                                    <br />

                                    <small className="text-muted">

                                        ID: {topic.id}

                                    </small>

                                </td>

                                <td>

                                    <div className="d-flex align-items-center">

                                        <div className="student-avatar">

                                            {topic.student_name
                                                ?.charAt(0)
                                                .toUpperCase()}

                                        </div>

                                        <div className="ms-2">

                                            <strong>

                                                {topic.student_name}

                                            </strong>

                                            <br />

                                            <small className="text-muted">

                                                {topic.student_code}

                                            </small>

                                        </div>

                                    </div>

                                </td>

                                <td>

                                    {topic.lecturer_name}

                                </td>

                                <td>
                                    <StatusBadge status={topic.status} />
                                </td>

                                <td className="text-center">

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

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default ProjectTable;