import React from "react";
import { NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import { isAuthenticated, signout } from "../core/apiCore";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' }
  } else {
    return { color: '#ffffff' }
  }
}

const Navigation = ({ history }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Videogames
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <NavItem className="nav-link">
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
              </NavItem>
            </ul>
            <ul className="navbar-nav ">
              {!isAuthenticated() && (
                <>
                  <NavItem className="nav-link">
                    <Link className="nav-link" to="/signup">
                      Singup
                    </Link>
                  </NavItem>
                  <NavItem className="nav-link">
                    <Link className="nav-link" to="/signin">
                      Login
                    </Link>
                  </NavItem>
                </>
              )}
              {isAuthenticated() && (
                <>
                  <NavItem className="nav-link">
                    <Link to="/" className="nav-link">Profile</Link>
                  </NavItem>
                  <NavItem className="nav-link">
                    <Link to="/addcategory" className="nav-link">Add Category</Link>
                  </NavItem>
                  <NavItem className="nav-link">
                    <Link to="/addvideogame" className="nav-link">Add Videogame</Link>
                  </NavItem>
                  <NavItem className="nav-link">
                    <Link
                      to="/"
                      onClick={() =>
                        signout(() => {
                          history.push("/");
                        })} className="nav-link">
                      Logout
                    </Link>
                  </NavItem>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
