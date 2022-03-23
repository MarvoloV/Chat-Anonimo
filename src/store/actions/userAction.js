import { ADD_USER, LOAD_USER } from '../types/userTypes';

const loadUser = (user) => ({
  type: LOAD_USER,
  payload: user,
});
const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});
export const getUser = () => {
  const user = JSON.parse(window.sessionStorage.getItem('user'));
  return loadUser(user);
};
export const postUser = (id, nickname) => {
  const user = {
    id,
    nickname,
  };
  sessionStorage.setItem('user', JSON.stringify(user));
  return addUser(user);
};
