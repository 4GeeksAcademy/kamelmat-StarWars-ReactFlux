import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Spinner } from "../component/Spinner.jsx"


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
        <div className="container text-danger">
            <div className="row align-items-center">
                <div className="col-md-3">
                    <img src={selectedStarship.imageUrl} alt={selectedStarship.imageUrl}
                        onError={(e) => { e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'; }} className="img-fluid" />
                </div>
                <div className="col-md-9">
                    <h1 className="text-danger-light">{selectedStarship.name}</h1>
                    {!starship? <Spinner /> :
                    
                    <ul className="text-light" >
                        <li>Starship Class: {starship.starship_class}</li>
                        <li>Crew: {starship.crew}</li>
                        <li>Hyperdrive Rating: {starship.hyperdrive_rating}</li>
                        <li>Passengers: {starship.passengers}</li>
                    </ul>
                    }
                </div>
            </div>

        </div>
    )
};