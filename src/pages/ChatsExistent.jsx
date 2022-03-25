/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ItemList, Title } from '../components/Components';
import {
  addUserToChat,
  findAllGroupChats,
  findChatsOfUser,
  findUserInChat,
} from '../store/actions/chatAction';
import { findUserinListUsers, getUser } from '../store/actions/userAction';
import DashboardPage from './DashboardPage';

const ChatsExistent = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const chats = findChatsOfUser(user.id);
  const chatsGroup = findAllGroupChats();
  const navigate = useNavigate();
  const handlerChat = (idChat) => {
    navigate(`/chat/${idChat}`);
  };
  const handlerChatGroup = (idChat) => {
    if (!findUserInChat(idChat, user.id)) {
      addUserToChat(idChat, user.id);
    }
    navigate(`/chat/${idChat}`);
  };
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <DashboardPage />
      <div style={{ width: '90%' }}>
        <Title>Selecciona el chat al que desear ingresar.</Title>

        {chatsGroup
          ? chatsGroup.map((chat) => (
              <ItemList key={chat.id} onClick={() => handlerChatGroup(chat.id)}>
                {chat.name}
              </ItemList>
            ))
          : ''}
        {chats ? (
          chats.map((chat) => {
            const uuidFriend = chat.users.find((userF) => userF !== user.id);
            const friend = uuidFriend
              ? findUserinListUsers(uuidFriend).nickname
              : { nickname: '' };
            return (
              <ItemList key={chat.id} onClick={() => handlerChat(chat.id)}>
                {friend}
              </ItemList>
            );
          })
        ) : (
          <h3>No hay chats disponibles</h3>
        )}
      </div>
    </div>
  );
};

export default ChatsExistent;
