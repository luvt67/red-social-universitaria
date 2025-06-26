// src/pages/Register.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/animation.css'; // Asegúrate de tener este archivo CSS

interface RegisterProps {
  onSwitch: () => void;
}

export default function Register({onSwitch}: RegisterProps) {
  const { register } = useAuth();
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
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setError(result.error);
      setSuccess(null);
    }
  };

  return (
  //   <div style={{
  //     display: 'flex',
  //     flexDirection: 'column',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     height: '60vh'
  //   }}>
  <div>
      {/*Main Content*/}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          {/* Login Card */}
          <div className="glass-effect rounded-3xl p-8 w-full max-w-md shadow-2xl">
            {/* Dynamic Form Content */}
            <div id="formContent" className="space-y-6 form-transition">
              {/* Register Form */}
              <div id="registerForm" className="space-y-6 ">
                <h1 className="text-white text-2xl font-bold text-center">Registro</h1>
                  <form className='space-y-4' onSubmit={handleSubmit}>
                    {/* Full Name Field */}
                    <div>
                        <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                        <input 
                            type="text" 
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 backdrop-blur-sm"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    {/* Email Fields */}
                    <div>
                        <label className="block text-white text-sm font-medium mb-2">Email</label>
                        <input 
                            type="email" 
                            placeholder="someone@gmail.com"
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 backdrop-blur-sm"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* Password Field */}
                    <div>
                        <label className="block text-white text-sm font-medium mb-2">Password</label>
                        <input 
                            type="password" 
                            placeholder="Create a strong password"
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 backdrop-blur-sm"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* Create Account Button */}
                    <button 
                      type="submit"
                      className='w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl'
                    >
                      Registrar
                    </button>
                  </form>

                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  {success && <p style={{ color: 'green' }}>{success}</p>}

                  {/* Enlace a login */}
                  {/* <Link to="/login" style={{ display: 'block', marginTop: '10px', textAlign: 'center' }}>
                    ¿Ya tienes una cuenta? Inicia sesión aquí
                  </Link> */}
                  <div className="text-center mt-6">
                    <span className="text-white/70 text-sm">
                      Ya tienes una cuenta?
                    </span>
                    <button
                      onClick={onSwitch}
                      className="text-blue-200 hover:text-white text-sm font-medium transition-colors"
                    >
                      Inicia sesión aquí
                    </button>
                  </div>
              </div>
            </div>
          </div>
      </div>  
  </div>
  );
}
