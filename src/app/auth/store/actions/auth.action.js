import jwtService from "app/services/jwt";
import * as UserActions from "./user.action";
// import axios from "axios";
export const AUTH_ERROR = "AUTH_ERROR";
export const AUTH_SUCCESSS = "AUTH_SUCCESSS";
export const AUTH_LOADING = "AUTH_LOADING";
export const AUTH_FETCH = "AUTH_FETCH";
export const AUTH_RESET = "AUTH_RESET";

export const register =
  ({ email, password }) =>
  (dispatch) => {
    dispatch({ type: AUTH_LOADING });

    jwtService
      .register(email, password)
      .then(() => dispatch({ type: AUTH_SUCCESSS }))
      .catch((error) => {
        dispatch({
          type: AUTH_ERROR,
          payload: error,
        });
        window.alert(error);
      });
  };

export const submitLogin = (param) => (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  return jwtService
    .signInWithUsernameAndPassword(param)
    .then((user) => {
      dispatch(UserActions.setUserData(user));
      dispatch({ type: AUTH_SUCCESSS });
      dispatch({
        type: AUTH_FETCH,
        payload: user.data,
      });
      return user;
    })
    .catch((error) => {
      dispatch({
        type: AUTH_ERROR,
        payload: error,
      });

      throw error;
    });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: AUTH_RESET,
  });
  return jwtService.logout();
};
