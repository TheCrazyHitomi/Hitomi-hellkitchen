import React from "react";
import './header.css';
import logo from '../../assets/images/HHK-logo.png';
import Navbar from "./navbar/navbar";
import { Link } from "react-router-dom";

const Header = () => {
    return (
    <header>
        <div className="header-container">
        <Navbar/>
        <Link to="/">
            <img src={logo} alt="Hitomi's Hell Kitchen Logo" className="header-logo" />
        </Link>
        </div>
    </header>
    );
};

export default Header;
