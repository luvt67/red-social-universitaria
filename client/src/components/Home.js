import React from 'react';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="mt-5 text-center">
      <h1>Bienvenido a Mini Twitter</h1>
      {user ? (
        <p>Has iniciado sesión como {user.username}</p>
      ) : (
        <p>Por favor inicia sesión o regístrate</p>
      )}
    </div>
  );
}

export default Home;