const userModel = require("../../models/user.model");
const bcrypt = require("bcrypt")
//Lấy tất cả người dùng
async function getAllUsers(req, res) {
    try {
        const users = await userModel.getAllUsers();

        res.status(200).json(users);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Lỗi server"
        });
    }
}
//Lấy thông tin người dùng theo id
async function getUserById(req, res) {

    try {

        const user = await userModel.getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "Không tìm thấy người dùng"
            });
        }

        res.status(200).json(user);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Lỗi server"
        });

    }

}
// Cập nhật thông tin
async function updateUser(req, res) {
    try {
        const { full_name, email, phone, avatar } = req.body;

        const result = await userModel.updateUser(
            req.params.id,
            full_name,
            email,
            phone,
            avatar
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Không tìm thấy người dùng"
            });
        }

        res.status(200).json({
            message: "Cập nhật thành công"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Lỗi server"
        });
    }
}
//Đổi mật khẩu
async function changePassword(req, res) {
    try {
        const { oldPassword, newPassword } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ mật khẩu cũ và mật khẩu mới"
            });
        }
        // Lấy user từ token
        const user = await userModel.getUserByIdWithPassword(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "Không tìm thấy người dùng"
            });
        }
        // Kiểm tra mật khẩu cũ
        const isMatch = await bcrypt.compare(
            oldPassword,
            user.password_hash
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu cũ không đúng"
            });
        }

        // Mã hóa mật khẩu mới
        const password_hash = await bcrypt.hash(newPassword, 10);

        // Cập nhật mật khẩu
        await userModel.updatePassword(
            user.id,
            password_hash
        );
        res.status(200).json({
            message: "Đổi mật khẩu thành công"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Lỗi server"
        });
    }
}
//tìm kiếm người dùng
async function searchUsers(req, res) {

    try {

        const { keyword } = req.query;

        if (!keyword) {
            return res.status(400).json({
                message: "Vui lòng nhập từ khóa tìm kiếm"
            });
        }

        const users = await userModel.searchUsers(keyword);

        res.status(200).json(users);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Lỗi server"
        });

    }

}

// Lấy danh sách sinh viên
async function getStudents(req, res) {
    try {

        const users = await userModel.getStudents();

        res.status(200).json(users);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Lỗi server"
        });

    }
}

// Lấy danh sách giảng viên
async function getLecturers(req, res) {
    try {

        const users = await userModel.getLecturers();

        res.status(200).json(users);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Lỗi server"
        });

    }
}
// Khóa / Mở tài khoản
async function updateUserStatus(req, res) {

    try {

        const { status } = req.body;
        const { id } = req.params;

        if (status !== "active" && status !== "inactive") {
            return res.status(400).json({
                message: "Trạng thái không hợp lệ"
            });
        }

        const user = await userModel.getUserById(id);

        if (!user) {
            return res.status(404).json({
                message: "Không tìm thấy người dùng"
            });
        }

        await userModel.updateUserStatus(id, status);

        res.status(200).json({
            message: `Đã ${status === "active" ? "mở khóa" : "khóa"} tài khoản thành công`
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Lỗi server"
        });

    }

}
module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    changePassword,
    searchUsers,
    getStudents,
    getLecturers,
    updateUserStatus
}