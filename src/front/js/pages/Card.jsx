import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Card = () => {

    const { store, actions } = useContext(Context)
    const selectedPlanet = store.currentPlanet
    console.log("Funciona");
    return (
        <div className="container text-danger">
            <div className="row align-items-center">
                <div className="col-md-3">
                    <img src={selectedPlanet.imageUrl} alt={selectedPlanet.imageUrl} className="img-fluid" />
                </div>
                <div className="col-md-9">
                    <h1 className="text-danger-light">{selectedPlanet.name}</h1>
                    <ul className="text-light" >
                        <li>Terrain: {selectedPlanet.terrain}</li>
                        <li>Rotation Period: {selectedPlanet.rotation_period}</li>
                        <li>Climate {selectedPlanet.climate}</li>
                        <li>Gravity {selectedPlanet.gravity}</li>
                    </ul>

                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-md-6 text-warning">
                    <h2>Residents:</h2>
                    <ul>
                        {selectedPlanet.residents.map((resident, index) => (
                            <li className="text-info fs-6" key={index}>{resident}</li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6 text-warning">
                    <h2>Films:</h2>
                    <ul>
                        {selectedPlanet.films.map((film, index) => (
                            <li className="text-info fs-6" key={index}>{film}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
};