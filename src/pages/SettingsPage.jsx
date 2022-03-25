import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatedUser } from '../store/actions/userAction';
import SideBar from '../components/SideBar';
import { Button, Container, Input } from '../components/Components';

const SettingsPage = () => {
  const { user } = useSelector((state) => state.userReducer);
  const [nickName, setNickName] = useState(user.nickName);
  const dispatch = useDispatch();
  const handlerNickName = (e) => {
    e.preventDefault();
    setNickName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatedUser(user.id, nickName));
  };
  return (
    <Container>
      <SideBar />
      <div style={{ width: '90%' }}>
        <div style={{ margin: '200px' }}>
          <h1 style={{ textAlign: 'center' }}>Cambiar Nombre de Usuario</h1>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="ingrese su NickName"
              onChange={handlerNickName}
            />
            <Button type="submit" disabled={!nickName}>
              Guardar
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default SettingsPage;
