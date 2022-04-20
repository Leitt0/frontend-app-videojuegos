import React, { useEffect, useState } from "react";
import { getVideogamesById } from "./apiCore";
import Navigation from "../layout/Navigation"
import ShowImage from './ShowImage';
import { useParams } from "react-router-dom";


const Videogame = (props) => {
    const [videogame, setVideogame] = useState({});
    const [error, setError] = useState(false)

    const loadSingleVideogame = videogameId => {
        getVideogamesById(videogameId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setVideogame(data);
            }
        })
    }
    const { videogameId } = useParams();

    useEffect(() => {
        loadSingleVideogame(videogameId)
    }, [props])

    const mostrarInfo = () => (
        <div className="card card-cont ">
            <div>
                <ShowImage className="img" item={videogame} url="videogame"></ShowImage>
                <h2>{videogame.name}</h2>
                <p> ${videogame.price}</p>
                <p>Descripcion: {videogame.description}</p>
                <p>Cantidad disponible: {videogame.quantity}</p>
            </div>
        </div>
    )


    return (
        <>
            <Navigation></Navigation>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col col-xs-10 col-sm-9 col-md-7 col-lg-4">
                        {mostrarInfo()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Videogame;