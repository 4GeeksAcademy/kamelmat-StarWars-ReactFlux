import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Spinner } from "../component/Spinner.jsx"

export const Planets = () => {
    const { store, actions } = useContext(Context);

    const handleLearnMore = (planet, imageUrl) => {
        actions.settingPlanet({ ...planet, imageUrl: imageUrl })
    }

    const handleFavorites = (planet) => {
        console.log("Favorited: ", planet);
        actions.handleAddFavorites(planet);
    }
    const handleImageError = (e) => {
        e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
    };

    return (
        <div className="container-fluid text-center mt-5 bg-black">

            <h1 className="bg-black text-danger text-start">Planets</h1>
            <div className="row justify-content-center">
                {store.planets.results.map((planet, index) => (
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card bg-dark text-light space">
                            <img src={`https://starwars-visualguide.com/assets/img/planets/${index + 1}.jpg`}
                                onError={handleImageError}
                                className="card-img-top image-fluid" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title text-danger-emphasis">{planet.name}</h5>
                                <div className="container d-flex justify-content-between">
                                    <Link to="/card" onClick={() => { handleLearnMore(planet, `https://starwars-visualguide.com/assets/img/planets/${index + 1}.jpg`) }} className="btn btn-primary">Learn More</Link>
                                    <span onClick={() => handleFavorites(planet)} className="btn btn-outline-warning">
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

