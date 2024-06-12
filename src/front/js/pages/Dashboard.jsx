import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";



export const Dashboard = () => {
  const {store, actions} = useContext(Context)
const navigate = useNavigate()
  return (
    <div className="container">
      {store.isLogin ?       
      <div className="card" >
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <span href="#" className="btn btn-primary">Go somewhere</span>
        </div>
      </div>
      :
      navigate("/")
      } 

    </div>
  )
}