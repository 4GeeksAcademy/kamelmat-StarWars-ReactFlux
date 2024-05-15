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
                    <img src={selectedPlanet.imageUrl} alt={selectedPlanet.imageUrl}
                        onError={(e) => { e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'; }} className="img-fluid" />
                </div>
                <div className="col-md-9">
                    <h1 className="text-danger-emphasis">{selectedPlanet.name}</h1>
                    <ul className="text-primary-emphasis" >
                        <li>Terrain:  {selectedPlanet.terrain}</li>
                        <li>Rotation Period:  {selectedPlanet.rotation_period}</li>
                        <li>Climate:  {selectedPlanet.climate}</li>
                        <li>Gravity:  {selectedPlanet.gravity}</li>
                    </ul>

                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-md-6">
                    <h4 className="text-primary-emphasis">Residents:</h4>
                    <ul className="film-list">
                        {selectedPlanet.residents.map((resident, index) => {
                            // Obtener el número al final de la URL del residente
                            const residentNumber = resident.split('/').filter(Boolean).pop();                            
                            const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${residentNumber}.jpg`;
                            return (
                                <li className="text-secondary fs-6" key={index}>
                                 <img src={imageUrl} alt={`Resident ${residentNumber}`} />
                                </li>
                            );
                        })}

                    </ul>
                </div>
                <div className="col-md-6 text-primary-emphasis">
                    <h4 className="text-primary-emphasis">Films:</h4>
                    <ul className="second-list">
                        {selectedPlanet.films.map((film, index) => {
                            const filmNumber = film.split('/').filter(Boolean).pop();
                            const imageUrl = `https://starwars-visualguide.com/assets/img/films/${filmNumber}.jpg`;
                            return (
                                <li className="text-secondary fs-6" key={index}>
                                    <img src={imageUrl} alt={`Film ${filmNumber}`} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
};