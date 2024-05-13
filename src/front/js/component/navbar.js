import React from "react";
import { Link } from "react-router-dom";
import starWarsLogo from "../../img/Star_Wars_Logo.png"
import "../../styles/navbar.css"

export const Navbar = () => {
	return (
		<nav className="navbar navbar-black bg-black mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">
					<img src={starWarsLogo} className="thumb" alt="Star Wars Logo" />
				</span>
			</Link>
			<Link to="/characters">
				<h3>Characters</h3>
			</Link>
			<Link to="/planets">
				<h3>Planets</h3>
			</Link>
			<Link to="/starships">
				<h3>Starships</h3>
			</Link>
			<div className="ml-auto">				
					<select className="form-select bg-primary text-light" aria-label="Small select example">
						<option defaultValue>Favorites</option>
						<option value="1">One</option>
						<option value="2">Two</option>
						<option value="3">Three</option>
					</select>			
			</div>
		</nav>
	);
};
