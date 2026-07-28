function LecturerProjects(){


    const projects=[];


    return (

        <div className="lecturer-projects">


            <h2>
                Đề tài đang phụ trách
            </h2>



            {
                projects.length === 0 ? (

                    <p className="empty-project">
                        Chưa có dữ liệu
                    </p>

                ) : (

                    <table>

                        ...

                    </table>

                )
            }


        </div>

    );

}


export default LecturerProjects;