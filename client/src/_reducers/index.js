import { combineReducers } from "redux";
import errorReducers from './errorReducers';
import usersReducers from './usersReducers';
import restaurantsReducers from "./restaurantsReducers";
export default combineReducers({
 restaurants:restaurantsReducers,
 auth:usersReducers,
 errors:errorReducers
 
});