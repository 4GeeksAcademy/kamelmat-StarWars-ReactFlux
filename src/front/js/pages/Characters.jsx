import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Characters = () => {
    const { store, actions } = useContext(Context);

    const handleLearnMore = (person, imageUrl) => {
        actions.settingPerson({ ...person, imageUrl: imageUrl })
    }
   
    
    const handleFavorites = (person) => {
        console.log(person);
        actions.handleAddFavorites(person);
    }

    return (
        <div className="container-fluid text-center mt-5 bg-black">
            <h1 className="bg-black text-danger text-start">Characters</h1>
            <div className="row justify-content-center">
                {store.persons.map((person, index) => (
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card bg-dark text-light space">
                            <img src={`https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`} className="card-img-top image-fluid" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title text-danger-emphasis">{person.name}</h5>
                                <div className="container d-flex justify-content-between">
                                    <Link to="/cardppl" onClick={() => { handleLearnMore(person, `https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`) }} className="btn btn-primary">
                                        Learn More
                                    </Link>
                                    <span onClick={()=> handleFavorites(person)} className="btn btn-warning">
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