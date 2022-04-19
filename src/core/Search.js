import React from "react";
import { Link } from 'react-router-dom'
import Navigation from "../layout/Navigation";


const Search = () => {
    return (
        <div>
            <Navigation></Navigation>
            <Link to="/">al inicio</Link>
            <h2> Search Component</h2>
        </div>
    )
}

export default Search;