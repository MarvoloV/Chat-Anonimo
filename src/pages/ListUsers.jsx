/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import {
  addedChat,
  addUserToChat,
  findChat,
} from '../store/actions/chatAction';
import DashboardPage from './DashboardPage';

const ListUsers = () => {
  const { users, user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = users.filter((userL) => userL.id !== user.id);
  const handlerChat = (idContact) => {
    const uuidChat = findChat(idContact, user.id);
    if (uuidChat) {
      navigate(`/chat/${uuidChat}`);
      return;
    }
    const idChat = uuid();
    dispatch(addedChat(idChat, 'privado'));
    dispatch(addUserToChat(idChat, idContact));
    dispatch(addUserToChat(idChat, user.id));
    navigate(`/chat/${idChat}`);
  };
  return (
    <div>
      <DashboardPage />
      <h1>Cambiar Nombre de Usuario</h1>
      <ul>
        {data.map((userL) => (
          <li key={userL.id} onClick={() => handlerChat(userL.id)}>
            {userL.nickname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListUsers;
