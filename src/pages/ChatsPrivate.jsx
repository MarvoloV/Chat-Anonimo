/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { findChatsOfUser } from '../store/actions/chatAction';
import { findUserinListUsers, getUser } from '../store/actions/userAction';
import DashboardPage from './DashboardPage';

const ChatsPrivate = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const chats = findChatsOfUser(user.id);
  const navigate = useNavigate();
  const handlerChat = (idChat) => {
    navigate(`/chat/${idChat}`);
  };
  useEffect(() => {
    console.log('prueba');
    // /* dispatch(getUser); */
  }, []);

  return (
    <div>
      <DashboardPage />
      <h1>Selecciona el chat al que desear ingresar.</h1>
      <hr />
      {chats ? (
        chats.map((chat) => {
          const uuidFriend = chat.users.find((userF) => userF !== user.id);
          const friend = uuidFriend
            ? findUserinListUsers(uuidFriend).nickname
            : { nickname: '' };
          return (
            <li key={chat.id} onClick={() => handlerChat(chat.id)}>
              {friend}
            </li>
          );
        })
      ) : (
        <h3>No hay chats disponibles</h3>
      )}
    </div>
  );
};

export default ChatsPrivate;
