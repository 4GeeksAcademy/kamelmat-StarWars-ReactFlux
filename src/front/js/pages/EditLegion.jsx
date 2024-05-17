import React,{ useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const EditLegion = () => {
    const { store, actions } = useContext(Context);
    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (store.currentRecruit) {
            setId(store.currentRecruit.id || null);
            setName(store.currentRecruit.name || '');
            setPhone(store.currentRecruit.phone || '');
            setEmail(store.currentRecruit.email || '');
            setAddress(store.currentRecruit.address || '');
        }
    }, [store.currentRecruit]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !phone || !email || !address) {
            alert("Please fill out all fields.");
            return;
        }
        const dataToSend = {
            id: id,
            name: name,
            phone: phone,
            email: email,
            address: address
        };
        console.log("Data To Send: ", dataToSend);
        actions.updateContact(dataToSend); // Assuming you have an updateContact action
        navigate('/contacts');
    };

    const handleCancel = () => {
        setName('');
        setPhone('');
        setEmail('');
        setAddress('');
    };

    return (
        <div className="container col-6 justify-content-center text-center">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend className="text-danger">Join The 501st</legend>
                    <i className="fab fa-galactic-republic text-danger"></i>
                    <div className="row">
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" id="staticEmail" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="exampleInputName" className="form-label mt-4">Name</label>
                        <input type="text" className="form-control" id="exampleInputName" placeholder="Name" autoComplete="off"
                            value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label mt-4">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                            value={email} onChange={(event) => setEmail(event.target.value)} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div>
                        <label htmlFor="exampleInputAddress" className="form-label mt-4">Address</label>
                        <input type="text" className="form-control" id="exampleInputAddress" placeholder="Address" autoComplete="off"
                            value={address} onChange={(event) => setAddress(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="exampleInputPhone" className="form-label mt-4">Phone</label>
                        <input type="text" className="form-control" id="exampleInputPhone" placeholder="Phone" autoComplete="off"
                            value={phone} onChange={(event) => setPhone(event.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-outline-warning mt-3">Make Changes</button>
                    <button type="reset" className="btn btn-secondary mt-3 ms-2" onClick={handleCancel}>Cancel</button>
                </fieldset>
            </form>
            <Link to="/contacts">
                <button type="button" className="btn btn-outline-dark mt-3">Go Back</button>
            </Link>
        </div>
    );
};