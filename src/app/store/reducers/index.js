import auth from "app/auth/store/reducers";
import appReducer from "./app.reducer";
import { combineReducers } from "redux";

const createReducer = (asyncReducers) =>
  combineReducers({
    auth,
    appReducer,
    ...asyncReducers,
  });

export default createReducer;
