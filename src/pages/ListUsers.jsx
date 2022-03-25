/* eslint-disable object-curly-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import styled from 'styled-components';
import {
  Button,
  Container,
  Input,
  Title,
  ItemList,
  ChatContainer,
} from '../components/Components';
import {
  addedChat,
  addUserToChat,
  findChat,
} from '../store/actions/chatAction';
import { getUsers } from '../store/actions/userAction';
import SideBar from '../components/SideBar';

const Form = styled.form`
  display: flex;
  align-items: center;
`;
const ListUsers = () => {
  const { users, user } = useSelector((state) => state.userReducer);
  const [loader, setLoader] = useState(false);
  const [nickName, setNickName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = users.filter((userL) => userL.id !== user.id);
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    dispatch(getUsers());
    setLoader(true);
    setUsersList([...data]);
  }, [loader]);

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
  const getProductsSearch = (dataUsers, name = '') => {
    if (name === '') {
      return dataUsers;
    }
    const nameMinuscula = name.toLocaleLowerCase();
    return dataUsers.filter((dataUser) =>
      dataUser.nickname.toLocaleLowerCase().includes(nameMinuscula),
    );
  };
  const handlerSearch = (e) => {
    e.preventDefault();
    const newUserList = getProductsSearch(data, nickName);
    setUsersList(newUserList);
  };
  return (
    <Container>
      <SideBar />
      <ChatContainer>
        <Title>Lista de Usuarios</Title>

        <Form onSubmit={handlerSearch}>
          <Input
            type="text"
            placeholder="ingrese usuario a buscar"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          <Button type="submit">Buscar</Button>
        </Form>
        <ul>
          {usersList.map((userL) => (
            <ItemList key={userL.id} onClick={() => handlerChat(userL.id)}>
              {userL.nickname}
            </ItemList>
          ))}
        </ul>
      </ChatContainer>
    </Container>
  );
};

export default ListUsers;
