import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Starships = () => {
const {store, actions} = useContext(Context);

const handleLearnMore = (starship, imageUrl) => {
    actions.settingStarship({...starship, imageUrl: imageUrl})
}

    return(
        <div className="container-fluid text-center mt-5 bg-black">
            <h1 className="bg-black text-danger text-start">Starships</h1>
            <div className="row justify-content-center">
                {store.starships.map((starship, index) => (
                    <div key={starship.name} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card bg-dark text-light space">
                            <img src={`https://starwars-visualguide.com/assets/img/starships/${index + 1}.jpg`} className="card-img-top image-fluid" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title fs-2">{starship.name}</h5>
                                <div className="container d-flex justify-content-between">
                                {/* <Link to="/cardsts" onClick={() => {handleLearnMore(starship, `https://starwars-visualguide.com/assets/img/starships/${index + 1}.jpg`)}} className="btn btn-primary">Learn More</Link> */}
                                    <a href="#" className="btn btn-warning"><i className="fas fa-heart"></i></a>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}