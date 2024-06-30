import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png"
import "../../styles/navbar.css"
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const handleClearAll = () => {
		actions.clearFavorites()
	}

	const logout = () => {
		console.log("estoy en logout");
		actions.setIsLogin(false)
		localStorage.removeItem("token")
	}
	const profile = () => {
		actions.profile()
	}

	return (
		<nav className="navbar navbar-expand-sm bg-dark" data-bs-theme="dark">
			<div className="container-fluid d-flex align-items-center justify-content-between">
				<div>
					<Link to="/">
						<span className="mb-0 logo-container">
							<img src={Logo} className="thumb" alt="Star Wars Logo" />
						</span>
					</Link>
				</div>
				<div>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02"
						aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse justify-content-end" id="navbarColor02">
						<ul className="navbar-nav me-auto">
							<li className="nav-item">
								<Link to="/signup">
									<button type="button" className="btn btn-outline-danger">Sign Up</button>
								</Link>
							</li>
							<li className="nav-item">
								{store.isLogin ?
									<>
										<Link to="/">
											<button type="button" onClick={logout} className="btn btn-outline-info">Logout</button>
										</Link>
										<Link to="/">
											<button type="button" onClick={Profile} className="btn btn-outline-info">Profile</button>
										</Link>
									</>
									:
									<Link to="/login">
										<button type="button" className="btn btn-outline-success">Login</button>
									</Link>
								}



							</li>
							<li className="nav-item">
								<Link to="/characters">
									<button type="button" className="btn btn-outline-secondary">Characters</button>
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/planets">
									<button type="button" className="btn btn-outline-secondary">Planets</button>
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/starships">
									<button type="button" className="btn btn-outline-secondary">Starships</button>
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/contacts">
									<button type="button" className="btn btn-outline-secondary">
										<span>
											<i className="fab fa-galactic-republic text-danger"></i>
										</span>
										Legion 501</button>
								</Link>
							</li>
							<li className="nav-item dropdown">
								<span className="btn bg-primary btn-outline-light dropdown-toggle" data-bs-toggle="dropdown"
									role="button" aria-haspopup="true" aria-expanded="false">
									Favorites
									<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
										{store.favorites.length}
									</span>
								</span>
								<div className="dropdown-menu dropdown-menu-end">
									{store.favorites.map((item, index) =>
										<span className="dropdown-item d-flex justify-content-between align-items-center position-relative" key={index}>
											{item}
											<span>
												<i className="fas fa-trash ms-2 text-danger" onClick={() => actions.removeFavorite(index)}></i>
											</span>
										</span>
									)}
									<div className="dropdown-divider"></div>
									<span className="dropdown-item" onClick={handleClearAll}>Clear All</span>

								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
