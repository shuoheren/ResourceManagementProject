import React from "react";

const defaultContextValues = {
  isSidebarExtended: true,
  setIsSidebarExtended: null,
  page: "login",
  setPage: null,
  username: "",
  setUsername: null,
  user: null,
};

export const AppContext = React.createContext(defaultContextValues);
