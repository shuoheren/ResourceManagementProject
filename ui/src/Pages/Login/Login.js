import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = ({ setIsLoggedIn, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (username === "4321" && password == "4321") {
      setIsLoggedIn(true);
      setPage("Resource");
    } else {
      try {
        const response = await axios.get(
          `http://localhost:8085/users/${username}`
        );
        console.log(response.data);
        if (response.data && response.data.password === password) {
          setIsLoggedIn(true);
        } else {
          alert("Invalid username or password");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("Error during login. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="input-field">
        <label>Username</label>
        <input
          type="text"
          placeholder="please enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-field">
        <label>Password</label>
        <input
          type="password"
          placeholder="****"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="options">
        <label>
          <input type="checkbox" /> Remember me
        </label>
        <a href="#">Forgot password?</a>
      </div>
      <button onClick={handleLogin}>Login</button>
      <div className="signup">
        or{" "}
        <a href="#" onClick={() => setPage("registration")}>
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default Login;

//login sign up :redux required
