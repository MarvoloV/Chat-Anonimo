import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';
import configureStore from '../store/index';
import SettingsPage from '../pages/SettingsPage';
import ListUsers from '../pages/ListUsers';
import ChatPage from '../pages/ChatPage';
import ChatsPrivate from '../pages/ChatsPrivate';
import ChatsGroup from '../pages/ChatsGroup';
import CreateChatGroup from '../pages/CreateChatGroup';
import ChatsExistent from '../pages/ChatsExistent';

const { store } = configureStore();
const AppRouter = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/listusers" element={<ListUsers />} />
        <Route path="/chatprivate" element={<ChatsPrivate />} />
        <Route path="/chatgroup" element={<ChatsGroup />} />
        <Route path="/listchatexistent" element={<ChatsExistent />} />
        <Route path="/createchatgroup" element={<CreateChatGroup />} />
        <Route path="/chat/:chatid" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
export default AppRouter;
