import React from "react";

function ProjectToolbar({

    keyword,
    setKeyword,

    status,
    setStatus,

    role,

    onCreate

}) {

    return (

        <div className="row mb-4">

            <div className="col-md-7">

                <input
                    className="form-control"
                    placeholder="Tìm kiếm đề tài..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />

            </div>

            <div className="col-md-3">

                <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >

                    <option value="">
                        Tất cả
                    </option>

                    <option value="pending">
                        Chờ duyệt
                    </option>

                    <option value="waiting_approval">
                        Chờ duyệt SV
                    </option>

                    <option value="approved">
                        Đã duyệt
                    </option>

                    <option value="in_progress">
                        Đang thực hiện
                    </option>

                    <option value="completed">
                        Hoàn thành
                    </option>

                    <option value="rejected">
                        Từ chối
                    </option>

                </select>

            </div>

            <div className="col-md-2 text-end">

                {role === "admin" && (

                    <button
                        className="btn btn-danger w-100"
                        onClick={onCreate}
                    >

                        + Thêm đề tài

                    </button>

                )}

                {role === "student" && (

                    <button
                        className="btn btn-success w-100"
                        onClick={onCreate}
                    >

                        Đăng ký

                    </button>

                )}

            </div>

        </div>

    );

}

export default ProjectToolbar;