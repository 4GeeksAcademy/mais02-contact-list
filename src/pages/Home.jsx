import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { CardContact } from "../components/CardContact.jsx";
import {Link} from "react-router-dom";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()
  const API="https://playground.4geeks.com/contact";
  const getContacts = async() =>{
	try {
		const response= await fetch (`${API}/agendas/wdym/contacts`);
		if (!response.ok){
			throw new Error("No funciono la consulta");
		}
		const data = await response.json();
		dispatch({
			type:'set_contacts',
			payload: {contacts:data.contacts}
		})

	} catch (error) {
		console.error(error)
	}
  }
  useEffect(()=>{getContacts()},[])

  const handleDelete = (deletedId) => {
		const updatedContacts = store.contacts.filter(c => c.id !== deletedId);
		dispatch({
			type: "set_contacts",
			payload: { contacts: updatedContacts }
		});
	};
	return (
		<div className="container mt-5">
			<Link to= {"/new-contact"} className="btn btn-success" style={{float:"right"}}>create new contact</Link>
			<div className="row">
				{store.contacts.map((contact,index)=>{
					return(
						<CardContact key= {contact.id} name = {contact.name} phone = {contact.phone} email= {contact.email} address = {contact.address} contactId={contact.id} onDelete={handleDelete}/>
					)
				})}
			</div>
		</div>
	);
}; 

