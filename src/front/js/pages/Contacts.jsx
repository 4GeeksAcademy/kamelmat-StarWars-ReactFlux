import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Spinner } from "../component/Spinner.jsx"
import Legion from "../../img/No_Recruits.png"

export const Contacts = () => {
    const { store, actions } = useContext(Context);
    const handleDelete = (contactId) => {
        actions.removeContact(contactId);
        console.log("Remove Id: ", contactId); 
    }
    const handleCurrentRecruit = (item) => {
    actions.setCurrentRecruit(item)
    console.log("Current Recruit: ", item); 
    }
    return (
        <div className="container justify-content-center col-6">

            <h1 className="text-danger text-center">Join The Empire</h1>
            <h1 className="text-danger text-center"><i className="fab fa-galactic-republic"></i></h1>
            <div className="text-center mb-3"> 
                <Link to='/addlegion' className="btn btn-outline-secondary">
                    <span><i className="fab fa-galactic-republic text-danger"></i></span>
                    Join The Legion
                    <span><i className="fab fa-galactic-republic text-danger"></i></span>
                </Link>
            </div>
            <h4 className="text-center text-dark">New Recruits to the 501</h4>
            <div className="list-group">
                {store.contacts.length === 0 ?
                    <img src={Legion} alt="No Recruits" className="img-fluid" /> :
                    <>
                        {store.contacts.map((item, index) =>
                            <div className="d-flex justify-content-between align-items-center list-group-item list-group-item-action" key={index}>
                                <span>{item.name}</span>
                                <Link to="/editlegion" className="ms-auto ">
                                <i onClick={() => handleCurrentRecruit(item)} className="fas fa-edit me-2"></i>
                                </Link>
                                <i className="text-danger fas fa-trash" onClick={()=>handleDelete(item.id)}></i>
                            </div>
                            
                    
                        )}
                    </>
                }
            </div>
        </div>
    )
}