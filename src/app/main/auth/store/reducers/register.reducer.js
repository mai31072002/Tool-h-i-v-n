import * as Actions from "../actions";
const initialState = () => ({
  login: {
    isLoading: false,
    data: null,
  },
  autoLogin: {
    isLoading: false,
    status: null,
  },
  error: null,
});

const registerReducer = (state = initialState(), payload) => {
  switch (payload.type) {
    case Actions.AUTH_FETCH:
      return {
        ...state,
        login: {
          isLoading: true,
          data: payload.payload,
        },
      };
    case Actions.AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.AUTO_LOGIN:
      return {
        ...state,
        autoLogin: {
          isLoading: true,
          status: payload.payload,
        },
      };
    case Actions.AUTH_ERROR:
      return {
        error: payload.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
export default registerReducer;
