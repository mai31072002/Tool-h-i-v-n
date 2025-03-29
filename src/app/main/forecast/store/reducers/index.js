import { combineReducers } from "redux";
import forecast from "./forecast.reducer";
import account from "../../../account/store/reducers/account.reducer";

const reducer = combineReducers({ forecast, account });

export default reducer;
