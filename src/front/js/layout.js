import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";


import { Home } from "./pages/home.js";
import { Demo } from "./pages/demo";

import { Characters } from "./pages/Characters.jsx"
import { Planets } from "./pages/Planets.jsx";
import { Card } from "./pages/Card.jsx";
import { CardPPL } from "./pages/CardPPL.jsx";
import { Starships} from "./pages/Starships.jsx"
import { CardSTS } from "./pages/CardSTS.jsx";
import { Contacts } from "./pages/Contacts.jsx";
import { AddLegion } from "./pages/AddLegion.jsx"
import injectContext from "./store/appContext";
import { EditLegion } from "./pages/EditLegion.jsx"
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Login } from "./pages/Login.jsx";
import { SignUp } from "./pages/SignUp.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div className="d-flex flex-column min-vh-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/demo" element={<Demo />} />
                        <Route path="/planets" element={<Planets />} />
                        <Route path="/contacts" element={<Contacts />} />
                        <Route path="/addlegion" element={<AddLegion />}/> 
                        <Route path="editlegion" element={<EditLegion />} />
                        <Route path="/card" element={<Card />} />
                        <Route path="/cardppl" element={<CardPPL />} />
                        <Route path="/characters" element={<Characters />} />
                        <Route path="/starships" element={<Starships />} />
                        <Route path="/cardsts" element={<CardSTS />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />                   
                 
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
