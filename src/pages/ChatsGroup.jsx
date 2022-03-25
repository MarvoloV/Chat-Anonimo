/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/ai';
import styled from 'styled-components';
import { ItemList, Title, Container } from '../components/Components';
import {
  addUserToChat,
  findAllGroupChats,
  findUserInChat,
} from '../store/actions/chatAction';
import { getUser } from '../store/actions/userAction';
import SideBar from '../components/SideBar';

const LinkGroup = styled(Link)`
  display: block;
  width: 300px;

  border: 2px solid blue;
  border-radius: 30px;
  padding: 20px;
  margin-left: 30px;
  margin-bottom: 30px;
  text-decoration: none;
  font-size: 25px;
  color: black;
  &:hover {
    background: red;
    color: white;
  }
`;
const ChatsGroup = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const chats = findAllGroupChats();
  const navigate = useNavigate();
  const handlerChat = (idChat) => {
    if (!findUserInChat(idChat, user.id)) {
      addUserToChat(idChat, user.id);
    }
    navigate(`/chat/${idChat}`);
  };
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <Container>
      <SideBar />
      <div style={{ width: '90%' }}>
        <Title>Selecciona el chat al que desear ingresar.</Title>
        <LinkGroup to="/createchatgroup">
          Crear Chat Grupal
          <AiOutlineUserAdd />
        </LinkGroup>
        {chats ? (
          chats.map((chat) => (
            <ItemList key={chat.id} onClick={() => handlerChat(chat.id)}>
              {chat.name}
            </ItemList>
          ))
        ) : (
          <h3>No hay chats disponibles</h3>
        )}
      </div>
    </Container>
  );
};

export default ChatsGroup;
