import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './HomePage/HomePage.jsx';
import LoginPage from './LoginPage/LoginPage.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>
);
