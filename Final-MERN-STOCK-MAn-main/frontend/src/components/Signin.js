import React, { useContext, useState } from "react";
import { MainState } from "./AppLayout";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; // Import the necessary components from react-bootstrap

export default function Signin(props) {
  const value = useContext(MainState);
  const navigate = useNavigate();

  let [isAdmin, setIsAdmin] = value;
  const [dbData, setDbData] = useState(sessionStorage.getItem("data"));
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleEmail = (e) => {
    setUser({ ...user, email: e.target.value });
  };

  const handlePass = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCloseModal = () => setShowModal(false);

  const LoginUser = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, password: user.password }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (!response.hasOwnProperty("data")) {
          // Show an alert if login credentials are incorrect or user doesn't exist
          setModalMessage("Wrong credentials or user doesn't exist");
          setShowModal(true);
        } else {
          // Show an alert for successful login
          setModalMessage("Login successful");
          setShowModal(true);
  
          // Update state and store token and user status in sessionStorage
          setDbData(response);
          setIsAdmin(response.data.admin);
          sessionStorage.setItem("token", response.token);
          sessionStorage.setItem("user", response.data.admin);
  
          // Update the isLoggedIn state in the AppLayout component via props
          props.setIsLoggedIn(true);
  
          // Redirect to the appropriate page based on admin status
          if (response.data.admin) {
            // Redirect to the AddStock page if the user is an admin
            navigate("/addstock");
          } else {
            // Redirect to the ViewStock page for regular logged-in users
            navigate("/viewstock");
          }
        }
      });
  };
  
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="text"
              name="email"
              id="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={handleEmail}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={handlePass}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={LoginUser}
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
