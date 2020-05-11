import React from 'react';
import { Link } from 'react-router-dom';
import "./notFound.css";

const notFound = () => {
    return (
        <div className="NotFound">
            <h1 className="NotFound-title">Sorry! Page not found.</h1>

            <Link to="/" className="NotFound-link"> Goto homepage </Link>
        </div>
    )
}

export default notFound;