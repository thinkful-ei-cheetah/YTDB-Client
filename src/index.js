import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { YTProvider } from './contexts/YTContext';
import './index.css';
import App from './components/App/App';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <YTProvider>
        <App />
      </YTProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)