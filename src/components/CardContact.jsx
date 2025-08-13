import { Link, Routes } from "react-router-dom";


export const CardContact = (props) => {
    const deletePost = async () => {
        try {
            const response = await fetch(
                `https://playground.4geeks.com/contact/agendas/wdym/contacts/${props.contactId}`,
                { method: "DELETE" }
            );

            if (response.ok) {
                console.log("Contact deleted successfully.");
                if (props.onDelete) {
                    props.onDelete(props.contactId); // ✅ notify parent
                }
            } else {
                console.error("Failed to delete contact.");
            }
        } catch (error) {
            console.log("Delete post error:", error);
        }
    };

    return (
        <div className="card" style={{ marginTop:"80px"}}>
            <img src="https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg" className="card-img-top rounded-circle" style={{width:"137px", margin: "20px"}} alt="profile picture" />
            <div className="card-body">
                <h5 className="card-title" style={{justifySelf: "anchor-center" , marginLeft: "-400px" , marginTop: "-152px"}}>{props.name}</h5>
                <p style={{justifySelf: "anchor-center" , marginLeft: "-377px"}}><i class="fa-solid fa-location-dot" style={{marginRight: "10px"}}></i>{props.address}</p>
                <p style={{justifySelf: "anchor-center" , marginLeft: "-377px"}}><i class="fa-solid fa-phone" style={{marginRight: "10px"}}></i>{props.phone}</p>
                <p style={{justifySelf: "anchor-center" , marginLeft: "-377px"}}><i class="fa-solid fa-envelope" style={{marginRight: "10px"}}></i>{props.email}</p>
                <Link to={`/edit-contact/${props.contactId}`} style={{float: "right", marginTop: "-152px", marginRight: "64px"}}><i className="fa-solid fa-pencil"></i></Link>
                <button onClick={deletePost} style={{float: "right", marginTop: "-152px", marginRight: "-6px"}} className="border border-0">
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    )
};