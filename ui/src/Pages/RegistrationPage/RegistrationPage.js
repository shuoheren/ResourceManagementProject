import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";
import "./RegistrationPage.css";
import { BASE_URL } from "../../config/urls";
const RegistrationPage = () => {
  const { setIsLoggedIn, setPage } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const redirectToLogin = () => {
    // window.location.href = "http://localhost:3000";
  };
  const handleRegistration = async () => {
    // Check if username is hardcoded value
    if (username === "4321" && password === "4321" && email === "4321") {
      setIsLoggedIn(true);
      setPage("Resource");
      return;
    }

    try {
      // Check if username already exists
      const checkResponse = await axios.get(`${BASE_URL}/users/${username}`);

      if (checkResponse.status === 200) {
        alert("Username is already taken. Please choose another.");
        return;
      }
    } catch (error) {
      // If the error is due to a 404 status (username not found), continue with registration.
      // Otherwise, show a generic error.
      if (error.response && error.response.status !== 404) {
        console.error("Error checking username:", error);
        alert("Error during registration. Please try again.");
        return;
      }
    }

    // Register the user
    try {
      const registerResponse = await axios.post(`${BASE_URL}/users`, {
        userName: username,
        password: password,
        email: email,
        role: "USER",
      });

      if (registerResponse.data && registerResponse.data.userName) {
        setIsLoggedIn(true);
        AppContext.username = username;
        AppContext.user = registerResponse.data;
        setPage("Resource");
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error during registration. Please try again.");
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <a href="#" onClick={redirectToLogin} className="signin-link">
          Already have an account? Sign in here
        </a>
        <button onClick={handleRegistration}>Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
