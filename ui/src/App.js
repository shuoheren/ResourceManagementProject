import React, { useState } from "react";
import Navbar from "./Bars/Navbar/Navbar";
import SidebarToggler from "./Bars/SidebarToggler/SidebarToggler";
import Sidebar from "./Bars/Sidebar/Sidebar";
import Login from "./Pages/Login/Login";
import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage";
import ResourcePage from "./Pages/Resources/ResourcePage/ResourcePage";
import Project from "./Pages/Projects/ProjectPage/ProjectPage";
import Formula from "./Pages/Formulas/Formula";
import { AppContext } from "./Context/AppContext";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarExtended, setIsSidebarExtended] = useState(true);
  const [page, setPage] = useState("login");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
    isSidebarExtended,
    setIsSidebarExtended,
    page,
    setPage,
    username,
    setUsername,
    user,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div>
        <Navbar />
        <div className="container">
          {isLoggedIn && (
            <div className="sidebar-container">
              {isSidebarExtended && <Sidebar />}
              <SidebarToggler />
            </div>
          )}
          <div className="main-content">
            {page === "login" && <Login />}
            {page === "registration" && <RegistrationPage />}
            {page === "Resource" && <ResourcePage />}
            {page === "Project" && <Project />}
            {page === "Formula" && <Formula />}
            {page === "resetPassword" && <ResetPassword />}
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
