import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatedUser } from '../store/actions/userAction';
import DashboardPage from './DashboardPage';

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
    <div>
      <DashboardPage />
      <h1>Cambiar Nombre de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ingrese su NickName"
          onChange={handlerNickName}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default SettingsPage;
