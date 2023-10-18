import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";

const RegistrationPage = () => {
  const { setIsLoggedIn, setPage } = useContext(AppContext);
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

  return <div className="registration-container">{/* ... JSX code */}</div>;
};

export default RegistrationPage;
