import React from "react";
import 'beercss';
import './navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {

    
    return (
        <div className="navbar">
        <nav className="navbar-container">
            <ul>
                <li>
                    <Link to="/entrees">Entrées</Link>
                </li>
                <li>
                    <Link to="/plats">Plats</Link>
                </li>
                <li>
                    <Link to="/desserts">Desserts</Link>
                </li>
                <li >
                    <Link to="/connexion" className="connexion">Connexion</Link>
                </li>
            </ul>
        </nav>
        </div>
    );
}
export default Navbar;