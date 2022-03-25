import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { updatedUser } from '../store/actions/userAction';
import SideBar from '../components/SideBar';
import { Button, Container, Input } from '../components/Components';

const SettingContainer = styled.div`
  width: 90%;
`;
const Title = styled.h1`
  text-align: center;
`;
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
      <SettingContainer>
        <Title>Cambiar Nombre de Usuario</Title>
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
      </SettingContainer>
    </Container>
  );
};

export default SettingsPage;
