import * as Actions from "../actions";

const initialState = () => ({
  error: null,
  fetching: false,
  dataForecast: {
    status: null,
    message: "",
    data: null,
  },
});

const forecastReducer = (state = initialState(), { type, payload }) => {
  switch (type) {
    case Actions.FORECAST_FETCHING:
      return {
        ...state,
        fetching: true,
      };
    case Actions.FORECAST_DATA_FETCHED:
      return {
        ...state,
        fetching: false,
        dataForecast: {
          status: payload.status,
          message: payload.message,
          data: payload.data,
        },
      };
    default:
      return state;
  }
};

export default forecastReducer;
