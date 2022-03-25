import {
  ADD_USER,
  LOAD_USER,
  UPDATE_USER,
  UPDATE_USERS,
  LOAD_USERS,
} from '../types/userTypes';

const initialState = {
  user: JSON.parse(window.sessionStorage.getItem('user')) || {},
  users: JSON.parse(localStorage.getItem('users')) || [],
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, user: action.payload };
    case LOAD_USER:
      return state;
    case UPDATE_USER:
      return { ...state, user: action.payload };
    case UPDATE_USERS:
      return { ...state, users: action.payload };
    case LOAD_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

export default userReducer;
