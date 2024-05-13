import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
		<img src="https://m.media-amazon.com/images/I/71ED-2t6SaL._AC_SL1000_.jpg"/>
		</div>
	);
};
