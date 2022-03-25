/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import chatReducer from './reducers/chatReducer';
import userReducer from './reducers/userReducer';

const storeConbined = combineReducers({
  userReducer,
  chatReducer,
});

const configureStore = () => {
  const store = createStore(
    storeConbined,
    composeWithDevTools(applyMiddleware(thunk)),
  );
  return { store };
};

export default configureStore;
