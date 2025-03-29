import * as Actions from "../actions";

const initialState = () => ({
  miniActive: false,
  error: null,
});

const appReducer = (state = initialState(), action) => {
  switch (action.type) {
    case Actions.APP_SET_MINI_DRAWER:
      return {
        ...state,
        miniActive: action.payload,
      };
    case Actions.APP_TOGGLE_DRAWER:
      return {
        ...state,
        miniActive: !state.miniActive,
      };
    case Actions.APP_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case Actions.APP_RESET:
      return initialState();
    default:
      return state;
  }
};

export default appReducer;
