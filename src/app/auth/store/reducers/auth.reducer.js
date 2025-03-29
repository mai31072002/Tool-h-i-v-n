import * as Actions from "../actions";

const initialState = {
  success: false,
  error: null,
  isLoading: false,
  login: {
    isLoading: false,
    data: null,
    status: null,
  },
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case Actions.AUTH_SUCCESSS:
      return {
        ...initialState,
        success: true,
        isLoading: false,
      };
    case Actions.AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.AUTH_FETCH:
      return {
        ...state,
        login: {
          isLoading: true,
          data: action.payload,
          status: 200,
        },
      };
    case Actions.AUTH_ERROR:
      return {
        success: false,
        error: action.payload,
        isLoading: false,
      };
    case Actions.AUTH_RESET:
      return {
        success: false,
        error: null,
        isLoading: false,
        login: {
          isLoading: false,
          data: null,
          status: null,
        },
      };
    default:
      return initialState;
  }
};

export default login;
