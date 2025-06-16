import React from "react";
import './navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
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
                    <Link to="/nouvelle-recette" className="new-recipe">Nouvelle Recette</Link>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;