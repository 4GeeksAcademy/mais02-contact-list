
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const EditContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const { contactId } = useParams();
    const [data, setData] = useState({});

 

    useEffect(() => {
        if (!contactId) return;
        const fetchContact = async () => {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/wdym/contacts/${contactId}`);
            const contactData = await response.json();
            setData(contactData);
        };

        fetchContact();
    }, []);

    const handleChange = (event) => {
        setData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const editContact = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/wdym/contacts/${contactId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const updated = await response.json();
                dispatch({ type: "edit_contact", payload: { editContact: updated } });
                console.log("Contact updated!");
            } else {
                console.error("Failed to update contact.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="text-center mt-5" style={{padding:"30px"}}>
            <h1>Edit Contact</h1>
            <div className="mb-3">
                <label className="form-label" style={{float: "left"}}>Full Name</label>
                <input type="text" name="name" value={data.name || ""} className="form-control" placeholder="Full Name" onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label className="form-label" style={{float: "left"}}>Email</label>
                <input type="email" name="email" value={data.email || ""} className="form-control" placeholder="Email" onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label className="form-label" style={{float: "left"}}>Phone</label>
                <input type="text" name="phone" value={data.phone || ""} className="form-control" placeholder="Phone" onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label className="form-label" style={{float: "left"}}>Address</label>
                <input type="text" name="address" value={data.address || ""} className="form-control" placeholder="Address" onChange={handleChange} />
            </div>
            <div className="buttonSave">
                <button type="button" className="btn btn-primary col-12" onClick={editContact}>Save</button>
            </div>
            <div>
                <Link to={"/"} style={{float: "left"}}>or get back to contacts</Link>
            </div>
        </div>
    );
};
