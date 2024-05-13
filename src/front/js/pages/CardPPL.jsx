import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

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
                    <h1 className="text-danger-light">{selectedPerson.name}</h1>
                    <ul className="text-light" >
                        <li>Height: {selectedPerson.height}</li>
                        <li>Mass: {selectedPerson.mass}</li>
                        <li>Hair Color: {selectedPerson.hair_color}</li>
                        <li>Skin Color: {selectedPerson.skin_color}</li>
                        <li>Eye Color: {selectedPerson.eye_color}</li>
                    </ul>

                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-md-6 text-warning">
                    <h2>Films</h2>
                    <ul>
                        {selectedPerson.films.map((resident, index) => (
                            <li className="text-info fs-6" key={index}>{resident}</li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6 text-warning">
                    <h2>Starships:</h2>
                    <ul>
                        {selectedPerson.starships.map((film, index) => (
                            <li className="text-info fs-6" key={index}>{film}</li>
                        ))}
                    </ul>
                </div>
            </div>
            </>
            }
            
        </div>
    )
};