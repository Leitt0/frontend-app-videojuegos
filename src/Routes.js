import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./core/Home";
import Signup from './core/Signup'
import Signin from './core/Signin'
import AddCategory from "./core/AddCategory";
import AddVideogame from "./core/AddVideogame";

const Rutas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} ></Route>
                <Route path="/signin" element={<Signin />} ></Route>
                <Route path="/signup" element={<Signup />} ></Route>
                <Route path="/addcategory" element={<AddCategory />} ></Route>
                <Route path="/addvideogame" element={<AddVideogame />} ></Route>                
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas;