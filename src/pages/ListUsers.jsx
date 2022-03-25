/* eslint-disable object-curly-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import {
  Button,
  Container,
  Input,
  Title,
  ItemList,
} from '../components/Components';
import {
  addedChat,
  addUserToChat,
  findChat,
} from '../store/actions/chatAction';
import { getUsers } from '../store/actions/userAction';
import DashboardPage from './DashboardPage';

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
      <DashboardPage />
      <div style={{ width: '90%' }}>
        <Title>Lista de Usuarios</Title>

        <form
          onSubmit={handlerSearch}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Input
            type="text"
            placeholder="ingrese usuario a buscar"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          <Button type="submit">Buscar</Button>
        </form>
        <ul>
          {usersList.map((userL) => (
            <ItemList key={userL.id} onClick={() => handlerChat(userL.id)}>
              {userL.nickname}
            </ItemList>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default ListUsers;
