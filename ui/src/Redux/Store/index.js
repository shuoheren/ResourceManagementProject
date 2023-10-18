import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../Reducers/appReducer";

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export default store;
