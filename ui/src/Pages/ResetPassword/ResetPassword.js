import React, { useState } from "react";
import axios from "axios"; // You need to install axios using npm or yarn
import "./ResetPassword.css";
import { BASE_URL } from "../../config/urls";
function ResetPassword() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [verificationNumber, setVerificationNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const resetPassword = async () => {
    if (verificationNumber !== "1234") {
      alert("Error: Invalid verification number.");
      return;
    }

    try {
      const response = await axios.put(`${BASE_URL}/users/reset-password`, {
        username,
        email,
        newPassword,
      });

      if (response.data.success) {
        alert("Password reset successfully.");
        redirectToLogin();
      } else {
        alert(response.data.message || "Error resetting password.");
      }
    } catch (error) {
      alert("An error occurred while resetting the password.");
    }
  };

  return (
    <div className="reset-container">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="reset-input"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="reset-input"
      />
      <input
        type="text"
        placeholder="Verification number (1234)"
        value={verificationNumber}
        onChange={(e) => setVerificationNumber(e.target.value)}
        className="reset-input"
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="reset-input"
      />
      <a onClick={redirectToLogin} className="reset-link">
        Go to Login Page
      </a>
      <button onClick={resetPassword} className="reset-button">
        Reset Password
      </button>
    </div>
  );
}

const redirectToLogin = () => {
  // window.location.href = "http://localhost:3000";
};

export default ResetPassword;
