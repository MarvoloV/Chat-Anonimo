/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers } from 'redux';
import chatReducer from './reducers/chatReducer';
import userReducer from './reducers/userReducer';

const storeConbined = combineReducers({
  userReducer,
  chatReducer,
});

const configureStore = () => {
  const store = createStore(
    storeConbined,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  return { store };
};

export default configureStore;
