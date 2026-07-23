const userModel = require("../../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const jwtConfig = require("../../config/jwt")


async function login(req, res) {
    
    const {username, password} = req.body

    try{

        const user = await userModel.findUserByUsercode(
            username
        )

        if(!user){
            return res.status(401).json({
                message:"Sai tài khoản hoặc mật khẩu"
            })
        }


        const checkPassword = await bcrypt.compare(
            password,
            user.password_hash
        )


        if(!checkPassword){
            return res.status(401).json({
                message:"Sai tài khoản hoặc mật khẩu"
            })
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.user_code,
                role: user.role
            },
            jwtConfig.secret,
            {
                expiresIn: jwtConfig.expiresIn
            }
        )
        res.json({
            message:"Đăng nhập thành công",
            token: token,
            user:{
                id: user.id,
                username:user.user_code,
                full_name: user.full_name,
                role:user.role
            }
        })

    }
    catch(error){

        console.log(error)

        res.status(500).json({
            success: false,
            message:"Lỗi khi đăng nhập"
        })
    }
    
}
async function register(req, res) {
    try{
        const {username, password, full_name, email, role} = req.body

        //kiểm tra rỗng
        if(!username || !password || !full_name || !email || !role){
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ thông tin"
            })
        }
        //kiểm tra mật khẩu
        if(password.length < 6){
            return res.status(400).json({
                message: "Mật khẩu phải có ít nhất 6 ký tự"
            })
        }
        //kiểm tra email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!emailRegex.test(email)){
            return res.status(400).json({
                message: "Email không đúng định dạng"
            })
        }
        //Kiểm tra role
        if(!["student","lecturer","admin"].includes(role)){
            return res.status(400).json({
                message: "Role không hợp lệ"
            })
        }
        //Kiểm tra mã đã viết đúng chưa?
        if (
            !username.startsWith("SV") &&
            !username.startsWith("GV") &&
            username !== "ADMIN"
        ) 
        {
            return res.status(400).json({
                message: "Mã người dùng không hợp lệ"
            })
        }

        //Kiểm tra sự kết nối giữa username với role
        if (username.startsWith("SV") && role !== "student") {
            return res.status(400).json({
                message: "Mã sinh viên phải có role student"
            })
        }

        if (username.startsWith("GV") && role !== "lecturer") {
            return res.status(400).json({
                message: "Mã giảng viên phải có role lecturer"
            })
        }

        if (username.startsWith("ADMIN") && role !== "admin") {
            return res.status(400).json({
                message: "Mã ADMIN phải có role admin"
            })
        }
        //Kiểm tra user_code
        const user = await userModel.findUserByUsercode(username)

        if(user){
            return res.status(400).json({
                message:"Mã người dùng đã tồn tại"
            })
        }
        // Kiểm tra email tồn tại
        const emailUser = await userModel.findUserByEmail(email)

        if(emailUser){
            return res.status(400).json({
                message: "Email đã tồn tại"
            })
        }
        const password_hash = await bcrypt.hash(password, 10)

        await userModel.createUser(username, password_hash, full_name, email, role)

        res.status(201).json({
            message:"Đăng ký thành công"
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Lỗi khi đăng ký"
        })
    }
}
module.exports = {
    login, register
};