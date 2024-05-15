import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import {Spinner} from "../component/Spinner.jsx"

export const Planets = () => {
    const { store, actions } = useContext(Context);

    const handleLearnMore = (planet, imageUrl) => {
        actions.settingPlanet({...planet, imageUrl: imageUrl})
    }

    console.log(store.planets.results);
    return (
        <div className="container-fluid text-center mt-5 bg-black">
          {(e) => { e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'; }}
            <h1 className="bg-black text-danger text-start">Planets</h1>
            <div className="row justify-content-center">
                {store.planets.results.map((planet, index) => (
                    <div key={planet.name} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card bg-dark text-light space">
                            <img src={`https://starwars-visualguide.com/assets/img/planets/${index + 1}.jpg`} onError={(e) => { e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'; }} className="card-img-top image-fluid" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title text-danger-emphasis">{planet.name}</h5>
                                <div className="container d-flex justify-content-between">
                                <Link to="/card" onClick={() => {handleLearnMore(planet, `https://starwars-visualguide.com/assets/img/planets/${index + 1}.jpg`)}} className="btn btn-primary">Learn More</Link>
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

