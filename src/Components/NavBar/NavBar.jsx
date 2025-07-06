import React from "react";
import coats from "../../assets/Coat_of_arms_of_Uruguay.svg.png";
import "./NavBar.css";
import { Link } from "react-router-dom";


const NavBar = () => {
    return (
        <header className="navbar-container">
            <Link to="/MainScreen" className="navbar-left">
                <div className="logo">
                    <div className="navbar-logo-container">
                        <img src={coats} alt="Escudo de armas" className="navbar-logo" />
                    </div>
                    <div className="navbar-logo-text">
                        <h1 className="navbar-title">Sistema Electoral</h1>
                    </div>
                </div>
            </Link>

            <nav className="navbar-right">
                <ul className="navbar-menu">
                    <li><a href="/">Log In</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;
