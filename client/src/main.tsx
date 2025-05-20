// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>  {/* Este es el Router que envuelve la App */}
      <AuthProvider>   {/* AuthProvider envuelve la App */}
        <PostProvider>   {/* PostProvider envuelve la App */}
          <App />
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
