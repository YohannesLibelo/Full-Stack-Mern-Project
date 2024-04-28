import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { MainState } from "./AppLayout";
import React, { useState, useEffect, useContext } from "react";

const Navbar = (props) => {
  const [click, setClick] = useState(false);
  const value = useContext(MainState);
  const [isAdmin, setIsAdmin] = value; // Use the isAdmin and setIsAdmin variables from the context
  const { isLoggedIn, setIsLoggedIn } = props; // Destructure setIsLoggedIn prop

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  const handleLogout = () => {
    // Perform any necessary logout actions 
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <>
      <div>
        <div
          className={click ? "main-container" : ""}
          onClick={() => Close()}
        />
        <nav className="navbar" onClick={(e) => e.stopPropagation()}>
          <div className="nav-container">
            <NavLink to="/" className="nav-logo">
              <div className="logo"></div>
            </NavLink>

            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-links"
                  onClick={click ? handleClick : null}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/viewstock" className="nav-links">
                  View Stock
                </NavLink>
              </li>
              {isAdmin ? (
                <li className="nav-item">
                  <NavLink to="/addstock" className="nav-links">
                    Add Stock
                  </NavLink>
                </li>
              ) : null}
              {!isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-links"
                      onClick={click ? handleClick : null}
                    >
                      Sign in
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/signup"
                      className="nav-links"
                      onClick={click ? handleClick : null}
                    >
                      Signup
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              )}
            </ul>
            <div className="nav-icon" onClick={handleClick}>
              <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
