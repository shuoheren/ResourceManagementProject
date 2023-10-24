import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import "./SidebarToggler.css";

function SidebarToggler() {
  const { isSidebarExtended, setIsSidebarExtended } = useContext(AppContext);

  const toggle = () => {
    setIsSidebarExtended((prev) => !prev);
  };

  return (
    <button className="sidebar-toggler" onClick={toggle}>
      {isSidebarExtended ? "<" : ">"}
    </button>
  );
}

export default SidebarToggler;
