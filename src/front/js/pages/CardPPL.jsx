import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/lists.css"

export const CardPPL = () => {

    const { store, actions } = useContext(Context)
    const selectedPerson = store.currentPerson

    console.log('Esta Info tiene: ', store.currentPerson);
    return (
        <div className="container text-danger">
            {!store.currentPerson ? 'This is not the character you are looking for' :
                <>
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <img src={selectedPerson.imageUrl} alt={selectedPerson.imageUrl} className="img-fluid" />
                        </div>
                        <div className="col-md-9">
                            <h1 className="text-danger-emphasis">{selectedPerson.name}</h1>
                            <ul className="text-light" >
                                <li>Height: {selectedPerson.height}</li>
                                <li>Mass: {selectedPerson.mass}</li>
                                <li>Hair Color: {selectedPerson.hair_color}</li>
                                <li>Skin Color: {selectedPerson.skin_color}</li>
                                <li>Eye Color: {selectedPerson.eye_color}</li>
                            </ul>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h4 className="text-primary-emphasis">Films:</h4>
                            <ul className="film-list">
                            {selectedPerson.films.map((film, index) => {
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
                        <div className="col-md-6">
                            <h4 className="text-primary-emphasis">Starships:</h4>
                            <ul className="second-list">
                            {selectedPerson.starships.map((starship, index) => {
                                const starshipNumber = starship.split('/').filter(Boolean).pop();
                                const imageUrl = `https://starwars-visualguide.com/assets/img/starships/${starshipNumber}.jpg`;
                                return (
                                    <li className="text-secondary fs-6" key={index}>
                                        <img src={imageUrl} alt={`Starship ${starshipNumber}`} />
                                    </li>
                                );
                            })}
                            </ul>
                        </div>
                    </div>
                </>
            }

        </div>
    )
};