import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';
import configureStore from '../store/index';

const { store } = configureStore();
const AppRouter = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
export default AppRouter;
