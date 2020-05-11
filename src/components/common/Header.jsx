import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from "./logo.png"
import "./Header.css";
import Search from "./Search";

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <Link to="/">
                    <img src={logo} alt="Logo" className="Header-logo" />
                </Link>

                <Search />
            </div>
        );
    }
}

export default Header;