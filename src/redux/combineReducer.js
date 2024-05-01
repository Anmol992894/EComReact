import { combineReducers } from "redux";
import { userReducers } from "./userReducer";

export const combineReducer=combineReducers({userReducer: userReducers});