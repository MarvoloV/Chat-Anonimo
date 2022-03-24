import React from 'react';
import { useSelector /* , useDispatch */ } from 'react-redux';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.userReducer);
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '280px' }}>
        <h2>{user.nickname}</h2>
        <hr />
        <ul>
          <li>Chat Grupales</li>
          <Link to="/chatprivate">
            <li>Chat Privados</li>
          </Link>

          <Link to="/listusers">
            <li>Lista de Usuarios</li>
          </Link>

          <li>Chats</li>
          <Link to="/settings">
            <li>Ajustes</li>
          </Link>
        </ul>
      </div>
      <div>Content</div>
    </div>
  );
};

export default DashboardPage;
