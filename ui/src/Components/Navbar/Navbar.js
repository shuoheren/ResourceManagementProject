import React, { useState } from "react";
import "./Navbar.css";

function Navbar({ isLoggedIn, setIsLoggedIn, currentUsername }) {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setShowLogout(false);
  };
  console.log("currentUsername", currentUsername);

  return (
    <nav>
      <div className="navbar-content">
        <h2>Resource Management</h2>

        <div> hello {currentUsername}</div>

        {isLoggedIn && (
          <div
            className="user-section"
            onClick={() => setShowLogout(!showLogout)}
          >
            <i>user</i>
            {showLogout && (
              <div className="popout">
                {/* <div> {{currentUsername}}<div/> */}
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
