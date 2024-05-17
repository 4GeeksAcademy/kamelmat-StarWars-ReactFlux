import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const AddLegion = () => {
  const {actions} = useContext(Context)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('')
  const navigate = useNavigate();

  const handleSubmit = (event) =>{
    event.preventDefault();
    const dataToSend = {
      name: name,
      phone: phone,
      email: email,
      address: address
    }
    console.log("Data To Send: ", dataToSend);
    actions.addContact(dataToSend);
    navigate('/contacts')
  }
  const handleCancel = () => {
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
  }

  return (
    <div className="container col-6 justify-content-center text-center">

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className="text-danger">Join The 501st</legend>
          <i className="fab fa-galactic-republic text-danger"></i>
          <div className="row">
            <div className="col-sm-10">
              <input type="text" readonly="" className="form-control-plaintext" id="staticEmail" />
            </div>
          </div>
          <div>
            <label forhtml="exampleInputName" className="form-label mt-4">Name</label>
            <input type="name" className="form-control" id="exampleInputName" placeholder="Name" autocomplete="off" 
            value={name} onChange={(event) => setName(event.target.value) }/>
          </div>
          <div>
            <label forhtml="exampleInputEmail1" className="form-label mt-4">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" 
            value={email} onChange={(event) => setEmail(event.target.value) }/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div>
            <label forhtml="exampleInputAdress" className="form-label mt-4">Adress</label>
            <input type="address" className="form-control" id="exampleInputAdress" placeholder="Address" autocomplete="off"
            value={address} onChange={(event) => setAddress(event.target.value) } />
          </div>
          <div>
            <label forhtml="exampleInputPhne" className="form-label mt-4">Phone</label>
            <input type="name" className="form-control" id="exampleInputName" placeholder="Phone" autocomplete="off"
            value={phone} onChange={(event) => setPhone(event.target.value) } />
          </div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
          <button type="reset" className="btn btn-secondary mt-3 ms-2"
          onClick={handleCancel}
          >Cancel</button>
        </fieldset>
      </form>
    </div>
  )
}