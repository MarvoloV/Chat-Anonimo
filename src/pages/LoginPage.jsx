/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import uuid from 'react-uuid';
import styled from 'styled-components';
import randomName from 'node-random-name';
import chat from '../assets/chat.jpg';
import { addedUser } from '../store/actions/userAction';

const ContainerContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;
const Input = styled.input`
  width: 100%;
  margin: 10px 0px;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;
const Button = styled.button`
  width: 100%;
  color: #fff;
  font-size: 1rem;
  height: calc(1.5em + 0.75rem + 2px);
  background-color: #23272b;
  border-color: #23272b;
  cursor: pointer;
  &:hover {
    background: blue;
  }
  &:disabled {
    background: #575757;
    cursor: default;
  }
`;
const TitleApp = styled.h2`
  text-align: center;
`;
const Label = styled.label`
  display: block;
  font-weigh: bold;
  margin-top: 10px;
`;
const LoginPage = () => {
  const [user, setUser] = useState(randomName());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = uuid();
    dispatch(addedUser(id, user));
    navigate('/dashboard');
  };
  const handlerUser = (e) => {
    e.preventDefault();
    setUser(e.target.value);
  };
  return (
    <ContainerContent>
      <div>
        <img src={chat} alt="" />
      </div>
      <div>
        <h1>ID Bussiness Intelligence</h1>
        <TitleApp>CHAT ANONIMO</TitleApp>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="user">NickName:</Label>
          <Input
            type="text"
            name="user"
            id="user"
            value={user}
            onChange={handlerUser}
            placeholder="ingrese Nick Name"
          />
          <Button type="submit" disabled={!user}>
            Ingresar
          </Button>
        </form>
      </div>
    </ContainerContent>
  );
};

export default LoginPage;
