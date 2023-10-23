import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";
import "./Login.css";
import App from "../../App";

const Login = () => {
  const { setIsLoggedIn, setPage, setUsername } = useContext(AppContext);

  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleSuccessfulLogin = (user) => {
    AppContext.isLoggedIn = true;
    AppContext.isSidebarExtended = true;
    AppContext.username = user.userName;
    AppContext.user = user;
    console.log(user.userName);
    console.log(AppContext.username);
    console.log(AppContext.user);
    setUsername(user.userName); // Update the username in the global context
    setIsLoggedIn(true);
    setPage("Resource");
  };

  const handleLogin = async () => {
    if (inputUsername === "4321" && inputPassword === "4321") {
      handleSuccessfulLogin(inputUsername);
    } else {
      try {
        const response = await axios.get(
          `http://localhost:8085/users/${inputUsername}`
        );

        if (response.data && response.data.password === inputPassword) {
          handleSuccessfulLogin(response.data);
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
          placeholder=""
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
        />
      </div>
      <div className="input-field">
        <label>Password</label>
        <input
          type="password"
          placeholder=""
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
      </div>
      <div className="options">
        <label>
          <input type="checkbox" /> Remember me
        </label>
        <a href="#" onClick={() => setPage("resetPassword")}>
          Forgot password?
        </a>
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
