import React from 'react';
import { useSelector /* , useDispatch */ } from 'react-redux';

const DashboardPage = () => {
  const user = useSelector((state) => state.user);
  console.log('🚀 ~ file: DashboardPage.jsx ~ line 6 ~ DashboardPage ~ user', user);
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '280px' }}>
        <h2>Username</h2>
        <hr />
        <ul>
          <li>Chat Grupales</li>
          <li>Chat Privados</li>
          <li>Lista de Usuarios</li>
          <li>Chats</li>
          <li>Ajustes</li>
        </ul>
      </div>
      <div>Content</div>
    </div>
  );
};

export default DashboardPage;
