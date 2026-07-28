import { 
    FaProjectDiagram,
    FaUsers,
    FaClipboardCheck
} from "react-icons/fa";


function LecturerStats(){


    const stats=[

        {
            title:"Đề tài hướng dẫn",
            value:"-",
            icon:<FaProjectDiagram/>,
            className:"orange"
        },


        {
            title:"Sinh viên",
            value:"-",
            icon:<FaUsers/>,
            className:"purple"
        },


        {
            title:"Tiến độ",
            value:"-",
            icon:<FaClipboardCheck/>,
            className:"blue"
        }

    ];



    return (

        <div className="lecturer-stats">


        {
            stats.map((item,index)=>(


                <div 
                className="lecturer-stat-card"
                key={index}
                >


                    <div className={`stat-icon ${item.className}`}>

                        {item.icon}

                    </div>



                    <div>

                        <p>
                            {item.title}
                        </p>


                        <h2>
                            {item.value}
                        </h2>


                    </div>



                </div>


            ))
        }


        </div>

    );

}


export default LecturerStats;