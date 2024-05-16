import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Spinner } from "../component/Spinner.jsx";
import "../../styles/starships.css"


export const CardSTS = () => {

    const [starship, setStarship] = useState(null);

    const { store, actions } = useContext(Context)
    const selectedStarship = store.currentStarship


    const getCurrentStarship = async () => {
        const response = await fetch(selectedStarship.url)
        if (!response.ok) {
            console.log("Error");
            return;
        }
        const data = await response.json()
        console.log(data);
        setStarship(data.result.properties)
    }
    useEffect(() => {
        getCurrentStarship();
    }, [])

    console.log("Funciona los Starships", store.currentStarship);

    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-3">
                    <img src={selectedStarship.imageUrl} alt={selectedStarship.imageUrl}
                        onError={(e) => { e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'; }} className="img-fluid custom-image" />
                </div>
                <div className="col-md-8 col-lg-8 col-sm-6">
                    <h2 className="text-danger-emphasis">{selectedStarship.name}</h2>
                    {!starship ? <Spinner /> :
                        <div className="starship-details-container">
                            <ul className="text-dark" >
                                <li>Starship Class: {starship.starship_class}</li>
                                <li>Crew: {starship.crew}</li>
                                <li>Hyperdrive Rating: {starship.hyperdrive_rating}</li>
                                <li>Model: {starship.model}</li>
                                <li>Passengers: {starship.passengers}</li>
                                <li>Manufacturer: {starship.manufacturer}</li>
                                <li>Cost In Credits: {starship.cost_in_credits}</li>
                                <li>Cargo Capacity: {starship.cargo_capacity}</li>
                            </ul>
                            <Link to="/starships">
                                <button type="button" class="btn btn-outline-primary">Return</button>
                            </Link>
                        </div>

                    }
                </div>
            </div>

        </div>
    )
};