import axios from "axios";

export const AUTH_FETCH = "AUTH_FETCH";
export const AUTH_LOADING = "AUTH_LOADING";
export const AUTO_LOGIN = "AUTO_LOGIN";
export const AUTH_ERROR = " AUTH_ERROR";

// export const login = (payload) => async (dispatch) => {
//   dispatch({ type: AUTH_LOADING });
//   try {
//     const data = { ...payload };
//
//     let req = await axios.post("guest/login", data);
//     const res = req;
//     console.log("res :", res);
//     dispatch({
//       type: AUTH_FETCH,
//       payload: res.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: AUTH_ERROR,
//       payload: error,
//     });
//     throw error;
//   }
// };

export const autoLogin = (payload) => async (dispatch) => {
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: AUTH_LOADING });
  try {
    const data = { ...payload };

    let req = await axios.post("guest/token", data);
    const res = req;
    dispatch({
      type: AUTO_LOGIN,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error,
    });

    throw error;
  }
};
