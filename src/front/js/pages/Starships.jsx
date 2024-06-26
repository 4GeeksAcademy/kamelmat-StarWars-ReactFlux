import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/starshipslanding.css"

export const Starships = () => {
const {store, actions} = useContext(Context);

const handleLearnMore = (starship) => {
    actions.settingStarship({...starship, imageUrl: `https://starwars-visualguide.com/assets/img/starships/${starship.uid}.jpg` });
}

const handleFavorites = (starship) => {
    console.log("Favorited: ", starship);
    actions.handleAddFavorites(starship);
}

    return(
        <div className="container-fluid text-center mt-5 bg-black">
            <h1 className="bg-black text-danger text-start">Starships</h1>
            <div className="row justify-content-center">
                {store.starships.map((starship) => (
                    <div key={starship.uid} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card bg-dark text-light space">
                            <img src={`https://starwars-visualguide.com/assets/img/starships/${starship.uid}.jpg`}
                                onError={(e) => { e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'; }}
                                className="card-img-top image-fluid"
                                alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title text-danger-emphasis">{starship.name}</h5>
                                <div className="container d-flex justify-content-between">
                                <Link to="/cardsts" onClick={() => {handleLearnMore(starship)}} className="btn btn-primary">Learn More</Link>
                                <span onClick={()=> handleFavorites(starship)} className="btn btn-outline-warning">
                                        <i className="fas fa-heart"></i>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}