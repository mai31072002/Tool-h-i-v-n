import * as Actions from "../actions";

const initialState = () => ({
  error: null,
  fetching: false,
  userDetail: {
    status: null,
    message: "",
    data: null,
  },
  updatePassword: {
    status: null,
    message: "",
    data: null,
  },
});

const accountReducer = (state = initialState(), { type, payload }) => {
  switch (type) {
    case Actions.FETCHING:
      return {
        ...state,
        fetching: true,
      };
    case Actions.FETCHED:
      return {
        ...state,
        fetching: false,
        userDetail: {
          status: payload.status,
          message: payload.message,
          data: payload.data,
        },
      };
    case Actions.UPDATE_PASSWORD:
      return {
        ...state,
        fetching: false,
        updatePassword: {
          status: payload.status,
          message: payload.message,
          data: payload.data,
        },
      };
    case Actions.RESET_UPDATE_PASSWORD:
      return {
        ...state,
        fetching: false,
        updatePassword: {
          status: null,
          message: "",
          data: null,
        },
      };
    case Actions.ERROR:
      return {
        ...state,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default accountReducer;
