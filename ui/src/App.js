import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import SidebarToggler from "./Components/SidebarToggler/SidebarToggler";
import Sidebar from "./Components/Sidebar/Sidebar";
import Login from "./Pages/Login/Login";
import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage"; // Remember to create this component as shown in the previous responses
import ResourcePage from "./Pages/ResourcePage/ResourcePage";
import Project from "./Pages/Project/ProjectPage";
import Formula from "./Pages/Formula/Formula";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarExtended, setIsSidebarExtended] = useState(false);
  const [page, setPage] = useState("login");

  return (
    <div>
      <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      <div className="container">
        {!isLoggedIn && (
          <div>
            {page === "login" && (
              <Login setIsLoggedIn={setIsLoggedIn} setPage={setPage} />
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
          {isLoggedIn && page === "Resource" && <ResourcePage />}
          {isLoggedIn && page === "Project" && <Project />}
          {isLoggedIn && page === "Formula" && <Formula />}
        </div>
      </div>
    </div>
  );
}

export default App;
