import React from "react";

const defaultContextValues = {
  isSidebarExtended: false,
  setIsSidebarExtended: null,
  page: "login",
  setPage: null,
  username: "",
  setUsername: null,
};

export const AppContext = React.createContext(defaultContextValues);
