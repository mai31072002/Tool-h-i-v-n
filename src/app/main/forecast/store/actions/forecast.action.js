import axios from "axios";
import apiConfig from "../../../../configs/api.config";
import jwtService from "../../../../services/jwt";

export const FORECAST_ERROR = "FORECAST_ERROR";
export const FORECAST_FETCHING = "FORECAST_FETCHING";
export const FORECAST_DATA_FETCHED = "FORECAST_DATA_FETCHED";

export const fetchDataForecastWithType = (param) => async (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    apiConfig.accessTokenKey
  )}`;
  dispatch({ type: FORECAST_FETCHING });
  try {
    const res = await axios.post(
      "/wind-electricity/get-data-by-type-forecast",
      param
    );
    dispatch({
      type: FORECAST_DATA_FETCHED,
      payload: res.data,
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      let tokenNew = null;
      if (!tokenNew) {
        tokenNew = jwtService.signInWithToken();

        axios.defaults.headers.common.Authorization = `Bearer ${tokenNew}`;
        const res = await axios.post(
          "/wind-electricity/get-data-by-type-forecast",
          param
        );
        dispatch({
          type: FORECAST_DATA_FETCHED,
          payload: res.data,
        });
      }
    } else {
      dispatch({
        type: FORECAST_ERROR,
        payload: error,
      });
      throw error;
    }
  }
};
