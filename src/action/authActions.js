import Axios from "axios";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

import setAuthToken from "../utils/setAuthToken";

// Register User
export const registerUser = (userData, history) => dispatch => {
  Axios.post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login User

export const loginUser = userData => dispatch => {
  Axios.post("/api/users/login", userData)
    .then(res => {
      // save localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      //  decode token to get data
      const decode = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decode));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// set logged user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// set user log out
export const logoutUser = () => dispatch => {
  // remove token from localStorage
  // localStorage.clear();
  localStorage.removeItem("jwtToken");
  // remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
