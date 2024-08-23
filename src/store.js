import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index'; 
import logger from "./middleware/logger";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger) 
);

export default store;

