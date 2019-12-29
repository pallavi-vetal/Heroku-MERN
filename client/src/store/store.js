import { applyMiddleware, createStore } from 'redux';
import thunk from "redux-thunk";
import rootReducer from "../_reducers";
import logger from 'redux-logger';
const initialState = {};



const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(logger,thunk)
);

export default store;