import React, { useState, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import App from "../../App";
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn, username, memberSince, setPage } =
    useContext(AppContext);

  const [showLogout, setShowLogout] = useState(false);

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setShowLogout(false);
    setPage("Login");
    AppContext.page = "Login";
    AppContext.isLoggedIn = false;

    // Redirect to localhost:3000
    window.location.href = "http://localhost:3000";
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <nav>
      <div className="navbar-content">
        <h2>Resource Management</h2>
        {isLoggedIn && (
          <div
            className="user-section"
            onClick={() => setShowLogout(!showLogout)}
          >
            <i>{AppContext.username}</i>
            {showLogout && (
              <div className="popout">
                <p>Username: {AppContext.username}</p>
                <p>Email {AppContext.user.email}</p>
                <p>Joined: {formatDate(AppContext.user.createDate)} </p>
                <button onClick={handleLogoutClick}>Log Out</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
