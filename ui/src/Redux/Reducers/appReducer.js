import { SET_LOGIN_STATUS } from "../Actions/appActions";

const initialState = {
  isLoggedIn: false,
  // other state variables
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    // other cases
    default:
      return state;
  }
};

export default appReducer;
