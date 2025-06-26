import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/animation.css'; // Asegúrate de tener este archivo CSS

interface LoginProps {
  onSwitch: () => void;
}

export default function Login({ onSwitch }: LoginProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      setSuccess('Login exitoso 🎉');
      setError(null);
      navigate('/');
    } else {
      setError(result.error);
      setSuccess(null);
    }
  };

  return (
    // <div style={{
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   height: '60vh'
    // }}>
    <div>      
        {/*Main Content*/}
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          {/* Login Card */}
          <div className="glass-effect rounded-3xl p-8 w-full max-w-md shadow-2xl">
            {/* Dynamic Form Content */}
            <div id="formContent" className="space-y-6 form-transition">
              {/* Login Form */}
              <div id="loginForm" className="space-y-6">
                <h1 className="text-white text-2xl font-bold text-center">Login</h1>
                {/* <div style={{ border: '1px solid #000', padding: '10px', width: '300px' }}> */}
                  <form className='space-y-4' onSubmit={handleSubmit}>
                    {/* Email Input */}
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
                    {/* Password Input */}
                    <div>
                        <label className="block text-white text-sm font-medium mb-2">Password</label>
                        <input 
                            type="password" 
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 backdrop-blur-sm"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>     
                    {/* Forgot Password */}
                    <div className="text-right">
                        <a href="#" className="text-blue-200 text-sm hover:text-white transition-colors">Forgot Password?</a>
                    </div>               
                    {/* Submit Button */}
                    <button 
                        type="submit"
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        Sign in
                    </button>
                  </form>

                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  {success && <p style={{ color: 'green' }}>{success}</p>}

                  {/* Enlace para registrarse */}
                  {/* <div className="text-center mt-6">
                    <Link to="/register" style={{ display: 'block', marginTop: '10px', textAlign: 'center' }}>
                      <span className="text-white/70 text-sm">¿No tienes una cuenta? Regístrate aquí</span>
                    </Link>
                  </div> */}

                  <div className="text-center mt-6">
                    <span className="text-white/70 text-sm">
                      No tienes una cuenta?{" "}
                    </span>
                    <button
                      onClick={onSwitch}
                      className="text-blue-200 hover:text-white text-sm font-medium transition-colors"
                    >
                      Registrate aqui
                    </button>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
    
    </div>

    // </div>
  );
}
