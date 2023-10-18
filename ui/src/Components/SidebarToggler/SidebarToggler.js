import React from "react";
import "./SidebarToggler.css";

function SidebarToggler({ isExtended, toggle }) {
  return (
    <button className="sidebar-toggler" onClick={toggle}>
      {isExtended ? "<" : ">"}
    </button>
  );
}

export default SidebarToggler;
