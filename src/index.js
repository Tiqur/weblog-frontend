import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './HomePage/HomePage.jsx';
import LoginPage from './LoginPage/LoginPage.jsx';
import PageContainer from './PageContainer/PageContainer.jsx';
import "@fontsource/roboto";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PageContainer>
      <HomePage />
    </PageContainer>
  </React.StrictMode>
);
