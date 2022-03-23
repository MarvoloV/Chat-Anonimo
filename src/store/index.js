/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/userReducer';

const storeConbined = combineReducers({
  user: userReducer,
});

const configureStore = () => {
  const store = createStore(
    storeConbined,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  return { store };
};

export default configureStore;
