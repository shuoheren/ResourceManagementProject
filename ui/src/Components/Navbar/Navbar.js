import React, { useState, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import App from "../../App";

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
            <i>user</i>
            {showLogout && (
              <div className="popout">
                <p>Username: {username}</p>
                <p>Joined: {memberSince}</p>
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
