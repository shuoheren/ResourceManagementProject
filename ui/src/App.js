import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import SidebarToggler from "./Components/SidebarToggler/SidebarToggler";
import Sidebar from "./Components/Sidebar/Sidebar";
import Login from "./Pages/Login/Login";
import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage";
import ResourcePage from "./Pages/ResourcePage/ResourcePage";
import Project from "./Pages/Project/ProjectPage";
import Formula from "./Pages/Formula/Formula";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarExtended, setIsSidebarExtended] = useState(false);
  const [page, setPage] = useState("login");
  const [username, setUsername] = useState(""); // State to hold the logged-in username

  return (
    <div>
      <Navbar
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        currentUsername={username} // Pass the username to the Navbar
      />
      <div className="container">
        {!isLoggedIn && (
          <div>
            {page === "login" && (
              <Login
                setIsLoggedIn={setIsLoggedIn}
                setPage={setPage}
                setCurrentUsername={setUsername}
                currentUsername={username}
              />
            )}
            {page === "registration" && (
              <RegistrationPage
                setIsLoggedIn={setIsLoggedIn}
                setPage={setPage}
              />
            )}
          </div>
        )}
        {isLoggedIn && (
          <div className="sidebar-container">
            {isSidebarExtended && <Sidebar setPage={setPage} />}
            <SidebarToggler
              isExtended={isSidebarExtended}
              toggle={() => setIsSidebarExtended(!isSidebarExtended)}
            />
          </div>
        )}
        <div className="main-content">
          {isLoggedIn && page === "Resource" && (
            <ResourcePage currentUsername={username} />
          )}
          {isLoggedIn && page === "Project" && (
            <Project currentUsername={username} />
          )}
          {isLoggedIn && page === "Formula" && (
            <Formula currentUsername={username} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
