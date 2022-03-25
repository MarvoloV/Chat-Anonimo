/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import styled from 'styled-components';
import { Button, Container } from '../components/Components';
import { addedChat, addUserToChat } from '../store/actions/chatAction';
import { getUser } from '../store/actions/userAction';
import SideBar from '../components/SideBar';

const ContainerCreate = styled.div`
  width=50%;
  margin:auto;
`;
const Select = styled.select`
  font-size: 30px;
  margin: 20px 0px;
  padding: 10px;
`;
const Input = styled.input`
  font-size: 30px;
  margin: 20px 0px;
  padding: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  font-size: 30px;
  margin: 10px 0px;
`;
const CreateChatGroup = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState('Trading');
  const [name, setName] = useState('');
  useEffect(() => {
    dispatch(getUser);
  }, []);
  const handleCreate = (e) => {
    e.preventDefault();
    if (category !== '') {
      const idChat = uuid();
      dispatch(addedChat(idChat, 'grupal', category, name));
      dispatch(addUserToChat(idChat, user.id));
      navigate(`/chat/${idChat}`);
    }
  };
  return (
    <Container>
      <SideBar />
      <ContainerCreate>
        <Form onSubmit={handleCreate}>
          <Label
            htmlFor="name"
            style={{ fontSize: '30px', margin: '20px 0px' }}
          >
            Ingresar Nombre del grupo:
          </Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Trading">Trading</option>
            <option value="Noticias">Noticias</option>
            <option value="Entrenimiento">Entretenimiento</option>
          </Select>
          <Button type="submit">Agregar</Button>
        </Form>
      </ContainerCreate>
    </Container>
  );
};

export default CreateChatGroup;
