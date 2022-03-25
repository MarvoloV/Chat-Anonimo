/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Title,
  ItemList,
  Container,
  ChatContainer,
} from '../components/Components';
import { findChatsOfUser } from '../store/actions/chatAction';
import { findUserinListUsers, getUser } from '../store/actions/userAction';
import SideBar from '../components/SideBar';

const ChatsPrivate = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const chats = findChatsOfUser(user.id);
  const navigate = useNavigate();
  const handlerChat = (idChat) => {
    navigate(`/chat/${idChat}`);
  };
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <Container>
      <SideBar />
      <ChatContainer>
        <Title>Selecciona el chat al que desear ingresar.</Title>

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
      </ChatContainer>
    </Container>
  );
};

export default ChatsPrivate;
