import "../../assets/styles/User.css";
import { useState, useEffect } from "react";
import { createUser, updateUser } from "../../services/userService";


function UserForm({ user, onSuccess }) {


    const [formData, setFormData] = useState({

        user_code: "",
        full_name: "",
        email: "",
        password: "",
        phone: "",
        role: "student"


    });

    useEffect(() => {

    if (user) {

        setFormData({

            user_code: user.user_code,
            full_name: user.full_name,
            email: user.email,
            password: "",
            phone: user.phone || "",
            role: user.role

        });

    }
    else{

        // chế độ thêm
        setFormData({

            user_code:"",
            full_name:"",
            email:"",
            password:"",
            phone:"",
            role:"student"

        });

    }

}, [user]);

    function handleChange(e){

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e){
        e.preventDefault();
        try{
            let result;
            if(user){
                // sửa người dùng
                result = await updateUser(
                    user.id,
                    formData
                );
            }
            else{
                // thêm người dùng
                result = await createUser(formData);
            }
            alert(result.message);
            setFormData({
                user_code:"",
                full_name:"",
                email:"",
                password:"",
                phone:"",
                role:"student"

            });

            if(onSuccess){
                onSuccess();
            }
        }
        catch(error){

            alert(
                error.response?.data?.message
                ||
                "Thao tác thất bại"
            );

        }

    }


    return (

        <form 
            className="user-form"
            onSubmit={handleSubmit}
        >


            <div className="form-group">

                <label>Mã người dùng</label>

                <input
                    type="text"
                    name="user_code"
                    value={formData.user_code}
                    onChange={handleChange}
                />

            </div>



            <div className="form-group">

                <label>Họ và tên</label>

                <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                />

            </div>



            <div className="form-group">

                <label>Email</label>

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

            </div>



            <div className="form-group">

                <label>Mật khẩu</label>

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

            </div>
            
            <div className="form-group">

                <label>Số điện thoại</label>

                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />

            </div>

            <div className="form-group">

                <label>Vai trò</label>


                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >

                    <option value="student">
                        Sinh viên
                    </option>

                    <option value="lecturer">
                        Giảng viên
                    </option>

                    <option value="admin">
                        Quản trị viên
                    </option>


                </select>


            </div>



            <div className="form-actions">


                <button
                    type="button"
                    className="cancel-btn"
                >
                    Hủy
                </button>


                <button
                    type="submit"
                    className="save-btn"
                >
                   {user ? "Lưu" : "Thêm"}
                </button>


            </div>


        </form>

    );
}


export default UserForm;