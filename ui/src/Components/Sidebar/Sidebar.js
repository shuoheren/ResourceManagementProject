import React, { useState, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import "./Sidebar.css";

function Sidebar() {
  const { setPage, isLoggedIn } = useContext(AppContext);
  const [isExtended, setIsExtended] = useState(isLoggedIn);

  const handleItemClick = (page) => {
    setPage(page);
  };

  return (
    <div
      className={`sidebar ${isExtended ? "extended" : ""}`}
      onClick={() => setIsExtended(!isExtended)}
    >
      <ul>
        <li
          onClick={(e) => {
            e.stopPropagation();
            handleItemClick("Resource");
          }}
        >
          Resource
        </li>
        <li
          onClick={(e) => {
            e.stopPropagation();
            handleItemClick("Project");
          }}
        >
          Project
        </li>
        <li
          onClick={(e) => {
            e.stopPropagation();
            handleItemClick("Formula");
          }}
        >
          Formula
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
