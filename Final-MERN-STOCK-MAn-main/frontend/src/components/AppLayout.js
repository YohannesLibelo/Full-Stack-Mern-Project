// Import necessary modules and components
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect, useContext, createContext } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Signin from "./Signin";
import Signup from "./Signup";
import ViewStock from "./ViewStock";
import AddStock from "./AddStock";

// Create a context to manage the admin state
export const MainState = createContext();

export default function AppLayout(props) {
  // State to hold the current stock, login status, user data, admin status, and logged-in user
  const [currentStock, setCurrentStock] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const [dbData, setDbData] = useState(sessionStorage.getItem("data"));
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  // Retrieve the authentication token from the session storage
  const authToken = "" || sessionStorage.getItem("token");

  // Fetch the stock data when the login status changes
  useEffect(() => {
    fetchData();
  }, [isLoggedIn]);

  // Check and set admin status when the component mounts
  useEffect(() => {
    if (
      sessionStorage.getItem("user") !== null &&
      sessionStorage.getItem("user") == true
    ) {
      setIsAdmin(true);
      console.log("session storage", sessionStorage.getItem("user"));
      console.log("setIsAdmin", isAdmin);
    } else {
      setIsAdmin(false);
    }
  }, []);

  // Function to fetch stock data from the server
  const fetchData = () => {
    fetch("http://localhost:8080/stock/view", {
      headers: { Authorization: "Bearer " + authToken },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setCurrentStock(response);
      });
  };

  return (
    <MainState.Provider value={[isAdmin, setIsAdmin]}>
      <div className="app-container">
        <BrowserRouter>
          {/* Render the Navbar component */}
          <Navbar 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn}
           isAdmin={isAdmin}
            user={user} />

          {/* Render different components based on route */}
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Conditionally render ViewStock and AddStock based on login status */}
            {!isLoggedIn ? (
              <>
                <Route
                  path="/viewstock"
                  element={<Signin setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route
                  path="/addstock"
                  element={<Signin setIsLoggedIn={setIsLoggedIn} />}
                />
              </>
            ) : (
              <>
                <Route
                  path="/viewstock"
                  element={
                    <ViewStock userName={user.name} currentStock={currentStock} />
                  }
                />
                {isAdmin && (
                  <Route
                    path="/addstock"
                    element={
                      <AddStock userName={user.name} currentStock={currentStock} />
                    }
                  />
                )}
              </>
            )}

            {/* Render Signin and Signup components */}
            <Route
              path="/login"
              element={
                <Signin
                  admin={isAdmin}
                  setIsLoggedIn={setIsLoggedIn}
                  user={user}
                />
              }
            />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </div>
    </MainState.Provider>
  );
}
