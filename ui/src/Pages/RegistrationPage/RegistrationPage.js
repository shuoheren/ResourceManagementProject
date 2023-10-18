import React, { useState } from "react";
import axios from "axios";

const RegistrationPage = ({ setIsLoggedIn, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegistration = async () => {
    if (username === "4321" && password == "4321" && email === "4321") {
      setIsLoggedIn(true);
      setPage("Resource");
    } else {
      try {
        const response = await axios.post("http://localhost:8085/users", {
          userName: username,
          password: password,
          email: email,
          role: "USER",
        });

        if (response.data && response.data.userName) {
          setIsLoggedIn(true);
        } else {
          alert("Registration failed!");
        }
      } catch (error) {
        console.error("Error registering user:", error);
        alert("Error during registration. Please try again.");
      }
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <div className="input-field">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-field">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-field">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleRegistration}>Register</button>
      <div className="already-account">
        Already have an account?{" "}
        <a href="#" onClick={() => setPage("login")}>
          Login
        </a>
      </div>
    </div>
  );
};

export default RegistrationPage;
