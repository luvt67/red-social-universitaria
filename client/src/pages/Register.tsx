// src/pages/Register.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth(); // <-- Importamos la función del contexto
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await register(username, email, password);
    if (result.success) {
      setSuccess('Registro exitoso 🎉');
      setError(null);

      // Opcional: redirige al login después de registrarse
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setError(result.error);
      setSuccess(null);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '60vh'
    }}>
      <h1>Registro</h1>
      <div style={{ border: '1px solid #000', padding: '10px', width: '300px' }}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br />
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <button type="submit">Registrar</button>
        </form>
  
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </div>
    </div>
  );
  
}
