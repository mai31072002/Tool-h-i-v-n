import axios from "axios";
import apiConfig from "../../../../configs/api.config";
import jwt from "../../../../services/jwt";

export const FETCHED = "FETCHED";
export const FETCHING = "FETCHING";
export const ERROR = "ERROR";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const RESET_UPDATE_PASSWORD = "RESET_UPDATE_PASSWORD";

export const getDataUserDetail = () => async (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    apiConfig.accessTokenKey
  )}`;

  dispatch({ type: FETCHING });

  try {
    const res = await axios.post("/user/detail-user");
    dispatch({
      type: FETCHED,
      payload: res.data,
    });
    console.log("res user detail :", res);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      try {
        let tokenNew = null;
        if (!tokenNew) {
          tokenNew = await jwt.signInWithToken();
        }
        axios.defaults.headers.common.Authorization = `Bearer ${tokenNew}`;
        const res = await axios.post("/user/detail-user");
        dispatch({
          type: FETCHED,
          payload: res.data,
        });
      } catch (refreshError) {
        dispatch({
          type: ERROR,
          payload: refreshError,
        });
      }
    } else {
      dispatch({
        type: ERROR,
        payload: error,
      });
      throw error;
    }
  }
};

export const updatePassword = (dataBody) => async (dispatch) => {
  dispatch({ type: FETCHING });
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    apiConfig.accessTokenKey
  )}`;
  try {
    const res = await axios.post("/user/update-password", dataBody);
    dispatch({
      type: UPDATE_PASSWORD,
      payload: res.data,
    });
    console.log("res update password :", res);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      try {
        let tokenNew = null;
        if (!tokenNew) {
          tokenNew = await jwt.signInWithToken();
        }
        axios.defaults.headers.common.Authorization = `Bearer ${tokenNew}`;
      } catch (refreshError) {
        dispatch({
          type: ERROR,
          payload: refreshError,
        });
      }
    } else {
      dispatch({
        type: ERROR,
        payload: error,
      });
      throw error;
    }
  }
};
export const resetUpdatePassword = () => async (dispatch) => {
  dispatch({ type: FETCHING });
  try {
    dispatch({ type: RESET_UPDATE_PASSWORD });
    console.log("check !!!");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
