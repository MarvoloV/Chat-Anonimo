import {
  ADD_USER,
  LOAD_USER,
  LOAD_USERS,
  UPDATE_USER,
  UPDATE_USERS,
} from '../types/userTypes';

const loadUser = (user) => ({
  type: LOAD_USER,
  payload: user,
});
const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});
const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});
const loadUsers = (user) => ({
  type: LOAD_USERS,
  payload: user,
});
const updateUserList = (users) => ({
  type: UPDATE_USERS,
  payload: users,
});
export const updatedUserList = (user) => {
  const users = JSON.parse(window.localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  return updateUserList(users);
};
export const getUser = () => {
  const user = JSON.parse(window.sessionStorage.getItem('user'));
  return loadUser(user);
};
export const addedUser = (id, nickname) => {
  const user = {
    id,
    nickname,
  };
  sessionStorage.setItem('user', JSON.stringify(user));
  updatedUserList(user);
  return addUser(user);
};

export const getUsers = () => {
  const users = JSON.parse(window.localStorage.getItem('users'));
  return loadUsers(users);
};
export const findUserinListUsers = (uuid) => {
  const users = getUsers() ? getUsers() : [];
  const resultado = users.payload.find((user) => user.id === uuid);
  return resultado;
};
export const updatedUser = (id, nickname) => {
  const user = {
    id,
    nickname,
  };
  sessionStorage.setItem('user', JSON.stringify(user));
  const data = getUsers().payload;
  const users = data.filter((us) => us.id !== user.id);
  localStorage.setItem('users', JSON.stringify(users));
  updatedUserList(user);
  return updateUser(user);
};
