import { ADD_USER, LOAD_USER } from '../types/userTypes';

const initialState = {
  user: JSON.parse(window.sessionStorage.getItem('user')) || {},
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return { user: action.payload };
    case LOAD_USER:
      return state;
    default:
      return state;
  }
};

export default userReducer;
