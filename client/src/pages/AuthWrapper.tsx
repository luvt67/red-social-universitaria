import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

export const AuthWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(true);
  const [loginAnim, setLoginAnim] = useState('');
  const [registerAnim, setRegisterAnim] = useState('hidden');

  // Sincroniza el estado con la ruta
  useEffect(() => {
    if (location.pathname === '/register') {
      setShowLogin(false);
      setLoginAnim('hidden');
      setRegisterAnim('slide-in-right');
      setTimeout(() => setRegisterAnim(''), 500);
    } else {
      setShowLogin(true);
      setRegisterAnim('hidden');
      setLoginAnim('slide-in-left');
      setTimeout(() => setLoginAnim(''), 500);
    }
  }, [location.pathname]);

  const switchToRegister = () => {
    setLoginAnim('slide-out-left');
    setTimeout(() => {
      setShowLogin(false);
      setLoginAnim('hidden');
      setRegisterAnim('slide-in-right');
      navigate('/register');
      setTimeout(() => setRegisterAnim(''), 500);
    }, 250);
  };

  const switchToLogin = () => {
    setRegisterAnim('slide-out-right');
    setTimeout(() => {
      setShowLogin(true);
      setRegisterAnim('hidden');
      setLoginAnim('slide-in-left');
      navigate('/login');
      setTimeout(() => setLoginAnim(''), 500);
    }, 250);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 overflow-hidden relative">
      {/* Fondo animado global */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Large circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full opacity-20 shape-blur float-animation"></div>
        <div className="absolute top-1/4 right-16 w-24 h-24 bg-blue-300 rounded-full opacity-30 shape-blur float-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-500 rounded-full opacity-15 shape-blur float-reverse"></div>
        {/* Abstract shapes*/}
        <div className="absolute top-1/3 left-20 w-16 h-16 bg-cyan-400 opacity-25 shape-blur float-animation" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}></div>
        <div className="absolute bottom-1/3 right-20 w-20 h-20 bg-blue-300 opacity-20 shape-blur float-slow" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-indigo-400 opacity-30 shape-blur float-reverse" style= {{borderRadius: '80% 20% 55% 45% / 25% 75% 25% 75%'}}></div>
        {/* Wave-like shapes */}
        <div className="absolute top-16 right-1/4 w-28 h-8 bg-blue-400 opacity-20 shape-blur float-animation" style = {{borderRadius: '50px'}}></div>
        <div className="absolute bottom-16 left-1/3 w-20 h-6 bg-cyan-300 opacity-25 shape-blur float-reverse" style={{borderRadius: '50px'}}></div>
        {/* Additional decorative elements */}
        <div className="absolute top-3/4 left-16 w-6 h-6 bg-white opacity-30 rounded-full float-slow"></div>
        <div className="absolute top-1/4 left-1/2 w-4 h-4 bg-blue-200 opacity-40 rounded-full float-animation"></div>
        <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-indigo-300 opacity-20 rounded-full float-reverse"></div>
      </div>
      {/* Contenido centrado */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <div id="formContent" className="space-y-6 form-transition">
            <div id="loginForm" className={`space-y-6 ${showLogin ? loginAnim : 'hidden'}`}>
              <Login onSwitch={switchToRegister} />
            </div>
            <div id="registerForm" className={`space-y-6 ${!showLogin ? registerAnim : 'hidden'}`}>
              <Register onSwitch={switchToLogin} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
