import { useEffect, useState } from "react";
import { getUsers, searchUsers, updateUserStatus, getUserById } from "../services/userService";
import "../assets/styles/User.css"

import UserToolbar from "../components/user/UserToolbar";
import UserTable from "../components/user/UserTable";
import UserModal from "../components/user/UserModal";
import UserForm from "../components/user/UserForm";
import UserDetail from "../components/user/UserDetail";

function UserPage() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const data = await getUsers();

            setUsers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const [keyword, setKeyword] = useState("")
    async function handleSearch(keyword) {

        try {

            if (keyword.trim() === "") {
                fetchUsers();
                return;
            }

            const data = await searchUsers(keyword);

            setUsers(data);

        } catch (error) {
            console.error(error);
        }

    }

    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    function handleEditUser(user) {
        setSelectedUser(user);
        setOpenModal(true);
    }

    async function handleChangeStatus(user){

        try{

            const newStatus =
                user.status === "active"
                ? "inactive"
                : "active";


            const result = await updateUserStatus(
                user.id,
                newStatus
            );


            alert(result.message);


            fetchUsers();


        }
        catch(error){

            console.error(error);

            alert(
                "Cập nhật trạng thái thất bại"
            );

        }

    }
    const [showDetail, setShowDetail] = useState(false);

    async function handleView(id) {
        try {
            const data = await getUserById(id);

            setSelectedUser(data);
            setShowDetail(true);

        } catch (error) {
            console.error(error);
        }
    }

    function handleSuccess(){

        fetchUsers();

        setSelectedUser(null);

        setOpenModal(false);

    }

    return (
        <div className="user-page">

            <div className="user-header">
                <div>
                    <h1>Quản lý người dùng</h1>
                    <p>
                        Quản lý thông tin sinh viên, giảng viên và quản trị viên.
                    </p>
                </div>

                <button
                    className="add-user-btn"
                    onClick={() => {
                        setSelectedUser(null);
                        setOpenModal(true);
                    }}
                >
                    + Thêm người dùng
                </button>
            </div>

            <div className="user-content">
                <UserToolbar
                    keyword={keyword}
                    setKeyword={setKeyword}
                    onSearch={handleSearch}
                />

                <UserTable
                    users={users}
                    loading={loading}
                    onEdit={handleEditUser}
                    onChangeStatus={handleChangeStatus}
                    onView={handleView}
                />
            </div>

            <UserModal
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setSelectedUser(null);
                }}
                user={selectedUser}
            >
                <UserForm
                    user={selectedUser}
                    onSuccess={handleSuccess}
                />
            </UserModal>
            <UserDetail
                isOpen={showDetail}
                user={selectedUser}
                onClose={() => setShowDetail(false)}
            />

        </div>
    )
}

export default UserPage;