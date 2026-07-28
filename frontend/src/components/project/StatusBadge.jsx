import React from "react";

function StatusBadge({ status }) {

    const badgeConfig = {

        pending: {
            color: "warning",
            text: "Chờ duyệt"
        },

        waiting_approval: {
            color: "warning",
            text: "Chờ duyệt"
        },

        approved: {
            color: "success",
            text: "Đã duyệt"
        },

        in_progress: {
            color: "primary",
            text: "Đang thực hiện"
        },

        completed: {
            color: "secondary",
            text: "Hoàn thành"
        },

        rejected: {
            color: "danger",
            text: "Từ chối"
        }

    };

    const current = badgeConfig[status] || {

        color: "dark",
        text: status

    };

    return (

        <span className={`badge bg-${current.color}`}>
            {current.text}
        </span>

    );

}

export default StatusBadge;