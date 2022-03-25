import React from 'react';
import { useSelector /* , useDispatch */ } from 'react-redux';
import styled from 'styled-components';
import ListOptions from '../components/ListOptions';

const H2 = styled.h2`
  font-size: 50px;
`;

const Options = [
  { id: 1, title: 'Chat Grupales', source: '/chatgroup' },
  { id: 2, title: 'Chat Privados', source: '/chatprivate' },
  { id: 3, title: 'Lista de Usuarios', source: '/listusers' },
  { id: 4, title: 'Chats', source: '/listchatexistent' },
  { id: 5, title: 'Ajustes', source: '/settings' },
];
const DashboardPage = () => {
  const { user } = useSelector((state) => state.userReducer);
  return (
    <div style={{ width: '300px', background: 'yellow', minHeight: '100vh' }}>
      <H2>{user.nickname}</H2>
      <hr />
      <ul>
        {Options.map((option) => (
          <ListOptions
            title={option.title}
            source={option.source}
            key={option.id}
          />
        ))}
      </ul>
      <hr />
    </div>
  );
};

export default DashboardPage;
