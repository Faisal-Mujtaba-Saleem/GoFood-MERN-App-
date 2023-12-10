import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CartProvider from './ContextReducers/Cart_ContextReducer';
import { AlertProvider } from './contexts/alert/AlertContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </CartProvider>
  </React.StrictMode>
);
