
import {Link} from "react-router-dom";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactInfo = () => {
    const {store, dispatch} = useGlobalReducer();
    const [data, setData] = useState({});
    const handleChange = (event) => {

        setData((prev)=>{
            return{
                ...prev,
                [event.target.name]:event.target.value
            }
        })
    }

    const createContact = async () => {
        try {
            const response = await fetch (`https://playground.4geeks.com/contact/agendas/wdym/contacts`,{
                method:"POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const newContact = await response.json()
            dispatch({type:"add_contact", payload: {newContact}})
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="text-center mt-5">
            <h1>Add a new Contact</h1>
            <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="fullName" name= "name" value={data.name} placeholder="Full Name" aria-label="Full Name" aria-describedby="basic-addon1" onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="emailContact" className="form-label">Email</label>
                <input type="email" className="form-control" id="emailContact" name= "email"  value={data.email} placeholder="Enter Email" onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone</label>
                <input type="text" className="form-control" id="phoneNumber" name="phone" value={data.phone} placeholder="Enter phone" aria-label="Phone Number" aria-describedby="basic-addon1" onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address"  name= "address" value={data.address} placeholder="Enter Address" aria-label="Address" aria-describedby="basic-addon1" onChange={handleChange}/>
            </div>
            <div className="buttonSave">
                <button type="button" className="btn btn-primary" onClick={createContact}>Save</button>
            </div>
            <div>
                <Link to={"/"}>or get back to contacts</Link>
            </div>
        </div>
    );
}; 