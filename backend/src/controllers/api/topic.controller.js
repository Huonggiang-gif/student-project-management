const Topic = require("../../models/topic.model");

// Lấy danh sách đề tài theo quyền
exports.getTopics = async (req, res) => {
    try {

        let data;

        if (req.user.role === "admin") {
            data = await Topic.getAll();
        }

        else if (req.user.role === "lecturer") {
            data = await Topic.getByLecturerId(req.user.id);
        }

        else if (req.user.role === "student") {
            data = await Topic.getByStudentId(req.user.id);
        }

        res.json(data);

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};

// Lấy chi tiết
exports.getTopicById = async (req, res) => {
    try {

        const data = await Topic.getById(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: "Không tìm thấy đề tài"
            });
        }

        res.json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};

// Tạo đề tài
exports.createTopic = async (req, res) => {
    try {

        const {
            title,
            description,
            student_id,
            lecturer_id
        } = req.body;

        const result = await Topic.create([
            title,
            description,
            student_id,
            lecturer_id,
            "pending"
        ]);

        res.status(201).json({
            message: "Create success",
            id: result.insertId
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Lỗi server"
        });

    }
};

// Cập nhật đề tài
exports.updateTopic = async (req, res) => {

    try {

        const topic = await Topic.getById(req.params.id);

        if (!topic) {
            return res.status(404).json({
                message: "Không tìm thấy đề tài"
            });
        }

        // =============================
        // Quyền của sinh viên
        // =============================
        if (req.user.role === "student") {

            // Chỉ được sửa đề tài của mình
            if (topic.student_id !== req.user.id) {
                return res.status(403).json({
                    message: "Bạn không có quyền sửa đề tài này"
                });
            }

            // Chỉ được sửa khi chưa được duyệt
            if (
                topic.status !== "pending" &&
                topic.status !== "rejected"
            ) {
                return res.status(403).json({
                    message: "Đề tài đã được duyệt hoặc đang thực hiện nên không thể chỉnh sửa."
                });
            }

            // Sinh viên KHÔNG được đổi trạng thái
            const data = [
                req.body.title,
                req.body.description,
                req.body.lecturer_id,
                topic.status
            ];

            await Topic.update(req.params.id, data);

            return res.json({
                message: "Cập nhật thành công"
            });
        }
        // Giảng viên/Admin chỉ được sửa nội dung khi đề tài chưa thực hiện
        if (
            (req.user.role === "lecturer" || req.user.role === "admin") &&
            (topic.status === "approved" ||
                topic.status === "in_progress" ||
                topic.status === "completed")
        ) {

            // Chỉ cho phép đổi trạng thái
            await Topic.updateStatus(req.params.id, req.body.status);

            return res.json({
                message: "Cập nhật trạng thái thành công"
            });
        }

        // =============================
        // Quyền của giảng viên/Admin
        // =============================

        const data = [
            req.body.title,
            req.body.description,
            req.body.lecturer_id,
            req.body.status
        ];

        await Topic.update(req.params.id, data);

        res.json({
            message: "Cập nhật thành công"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Lỗi server"
        });

    }

};

// Xóa
exports.deleteTopic = async (req, res) => {
    try {

        await Topic.delete(req.params.id);

        res.json({
            message: "Delete success"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Lỗi server"
        });

    }
};

// Duyệt
exports.approveTopic = async (req, res) => {
    try {

        await Topic.updateStatus(req.params.id, "approved");

        res.json({
            message: "Approved"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Lỗi server"
        });

    }
};

// Từ chối
exports.rejectTopic = async (req, res) => {
    try {

        await Topic.updateStatus(req.params.id, "rejected");

        res.json({
            message: "Rejected"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Lỗi server"
        });

    }
};