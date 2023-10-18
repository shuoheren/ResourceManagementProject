import React, { useState } from "react";
import "./Navbar.css";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setShowLogout(false);
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
