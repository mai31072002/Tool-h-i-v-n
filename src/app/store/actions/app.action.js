export const APP_RESET = "APP_RESET";
export const APP_ERROR = "APP_ERROR";
export const APP_TOGGLE_DRAWER = "APP_TOGGLE_DRAWER";
export const APP_SET_MINI_DRAWER = "APP_SET_MINI_DRAWER";

export const toggleMiniDrawer = () => (dispatch) =>
  dispatch({ type: APP_TOGGLE_DRAWER });

export const setMiniDrawer = (value) => (dispatch) =>
  dispatch({
    type: APP_SET_MINI_DRAWER,
    payload: value,
  });
