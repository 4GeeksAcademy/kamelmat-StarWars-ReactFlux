import React from "react";

export const Contacts = () => {

    return (
        <div className="container justify-content-center">

            <h1 className="text-danger text-center">Join The Empire</h1>
            <h1 className="text-danger text-center"><i class="fab fa-galactic-republic"></i></h1>
            <h4 className="text-center text-dark">New Recruits to the 501</h4>
            <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action active">Cras justo odio</a>
                <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
                <a href="#" class="list-group-item list-group-item-action disabled">Morbi leo risus</a>
            </div>
        </div>
    )
}