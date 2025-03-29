import { combineReducers } from "redux";
import auth from "./auth.reducer";
import user from "./user.reducer";

const authReducers = combineReducers({
  user,
  auth,
});

export default authReducers;
