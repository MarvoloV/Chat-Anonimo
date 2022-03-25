/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import { Button, Container } from '../components/Components';
import { addedChat, addUserToChat } from '../store/actions/chatAction';
import { getUser } from '../store/actions/userAction';
import DashboardPage from './DashboardPage';

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
      <DashboardPage />
      <div style={{ width: '50%', margin: 'auto' }}>
        <form
          onSubmit={handleCreate}
          style={{
            display: 'flex',
            flexDirection: 'column',
            /* alignItems: 'center', */
          }}
        >
          <label
            htmlFor="name"
            style={{ fontSize: '30px', margin: '20px 0px' }}
          >
            Ingresar Nombre del grupo:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ fontSize: '30px', margin: '20px 0px', padding: '10px' }}
          />
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ fontSize: '30px', margin: '20px 0px', padding: '10px' }}
          >
            <option value="Trading">Trading</option>
            <option value="Noticias">Noticias</option>
            <option value="Entrenimiento">Entretenimiento</option>
          </select>
          <Button type="submit">Agregar</Button>
        </form>
      </div>
    </Container>
  );
};

export default CreateChatGroup;
