import React from "react";
import { Link } from "react-router-dom";
import starWarsLogo from "../../img/Star_Wars_Logo.png"
import "../../styles/navbar.css"

export const Navbar = () => {
	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<nav className="navbar navbar-black bg-black mb-3">
						<div className="d-flex justify-content-between w-100">
							<Link to="/">
								<span className="navbar-brand mb-0 logo-container">
									<img src={starWarsLogo} className="thumb" alt="Star Wars Logo" />
								</span>
							</Link>
							<Link to="/characters">
								<button type="button" class="btn btn-outline-secondary">Characters</button>
							</Link>
							<Link to="/planets">
								<button type="button" class="btn btn-outline-secondary">Planets</button>
							</Link>
							<Link to="/starships">
								<button type="button" class="btn btn-outline-secondary">Starships</button>
							</Link>
							<div className="col-2 ml-auto">
								<select className="form-select bg-primary text-light" aria-label="Small select example">
									<option defaultValue>Favorites</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</select>
							</div>
						</div>
					</nav>
				</div>
			</div>

		</div>
	);
};
