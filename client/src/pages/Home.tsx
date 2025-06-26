import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BtnPerfil from './buttons/btnPerfil';
import Perfil from './Perfil';
import PostList from '../components/PostList';
import FrmPublicacion from '../components/frmPublicacion';
import SearchBar from '../components/SearchBar';
import Etiquetas from '../components/Etiquetas';
import UsersGrud from './Administration/Users.grud';
import PostsGrud from './Administration/Posts.grud';
import Notifications from '../components/Notifications';
import Settings from '../components/Settings';
import PendingPosts from '../components/PendingPosts';
import Help from '../components/Help';
import Analytics from '../components/Analytics';
import { useAuth } from '../context/AuthContext';
// import { login } from '../services/userService';

function Home() {
  const [currentView, setCurrentView] = useState('home');
  const [isActive, setIsActive] = useState(true); // Estado del usuario
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Contadores de elementos pendientes (estos vendrían de tu API/estado global)
  const [pendingPosts] = useState(3); // Publicaciones pendientes
  const [pendingNotifications] = useState(7); // Notificaciones pendientes

  const renderContent = () => {
    switch (currentView) {
      case 'perfil':
        return <Perfil />;
      case 'home':
        return (
          <div>
            <SearchBar/>
            <Etiquetas/>
            <FrmPublicacion/>
            <PostList/>
          </div>
        );
      case 'grud_users':
        return <UsersGrud/>;
      case 'grud_posts':
        return <PostsGrud/>;
      
      case 'pending_posts':
        return <PendingPosts/>;
      
      case 'notifications':
        return <Notifications/>;
      
      case 'analytics':
        return <Analytics/>;
  
      case 'settings':
        return <Settings/>;
      
      case 'help':
        return  <Help/>;

      default:
        return <div>HOME</div>;
    }
  };

  const handleLogout = () => {
    // Aquí agregarías tu lógica de cerrar sesión
    logout();
    // Redirigir al usuario a la página de inicio de sesión
    // Por ejemplo, podrías usar react-router-dom para redirigir:
    navigate('/login');
    // window.location.href = '/login';
  };

  return (
    <div className="relative flex size-full h-screen flex-col bg-slate-50 group/design-root overflow-hidden" style={{ fontFamily: '"Be Vietnam Pro", "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5 h-full">
          {/* Panel izquierdo - FIJO */}
          <aside className="layout-content-container flex flex-col w-80 h-full overflow-hidden">
            <div className="flex h-full flex-col justify-between bg-slate-50 p-4 overflow-y-auto">
              <div className="flex flex-col gap-4">
                {/* Perfil del usuario */}
                <div className="flex gap-3"> 
                  <h1 className="text-[#0d141c] text-base font-medium leading-normal">
                    <BtnPerfil onClick={() => setCurrentView('perfil')} />
                  </h1> 
                </div>

                {/* Indicador de estado */}
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-[#0d141c] text-sm font-medium">
                      {isActive ? 'En línea' : 'Desconectado'}
                    </span>
                    <button 
                      onClick={() => setIsActive(!isActive)}
                      className="text-xs text-blue-600 hover:text-blue-800 ml-2"
                    >
                      cambiar
                    </button>
                  </div>
                </div>

                {/* Navegación principal */}
                <div className="flex flex-col gap-2">
                  <div 
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => setCurrentView('home')}
                  >
                    <div className="text-[#0d141c]" data-icon="House" data-size="24px" data-weight="fill">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
                      </svg>
                    </div>
                    <p className="text-[#0d141c] text-sm font-medium leading-normal">Inicio</p>
                  </div>

                  <div 
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors rounded-lg"
                    onClick={() => setCurrentView('grud_users')}
                  >
                    <div className="text-[#0d141c]" data-icon="User" data-size="24px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                      </svg>
                    </div>
                    <p className="text-[#0d141c] text-sm font-medium leading-normal">Usuarios</p>
                  </div>

                  <div 
                    className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors rounded-lg"
                    onClick={() => setCurrentView('grud_posts')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-[#0d141c]" data-icon="DocumentText" data-size="24px" data-weight="regular"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M216,72.41V208a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32h96ZM160,48v40h40ZM88,104a8,8,0,0,0,0,16h80a8,8,0,0,0,0-16Zm0,32a8,8,0,0,0,0,16h80a8,8,0,0,0,0-16Zm0,32a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Z"></path>
                        </svg>
                      </div>
                      <p className="text-[#0d141c] text-sm font-medium leading-normal">Publicaciones</p>
                    </div>
                  </div>

                  {/* Publicaciones pendientes con contador */}
                  <div 
                    className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors rounded-lg"
                    onClick={() => setCurrentView('pending_posts')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-[#0d141c]" data-icon="Clock" data-size="24px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
                        </svg>
                      </div>
                      <p className="text-[#0d141c] text-sm font-medium leading-normal">Pendientes</p>
                    </div>
                    {pendingPosts > 0 && (
                      <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                        {pendingPosts}
                      </span>
                    )}
                  </div>

                  {/* Notificaciones con contador */}
                  <div 
                    className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors rounded-lg"
                    onClick={() => setCurrentView('notifications')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-[#0d141c]" data-icon="Bell" data-size="24px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
                        </svg>
                      </div>
                      <p className="text-[#0d141c] text-sm font-medium leading-normal">Notificaciones</p>
                    </div>
                    {pendingNotifications > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                        {pendingNotifications}
                      </span>
                    )}
                  </div>

                  {/* Analíticas */}
                  <div 
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors rounded-lg"
                    onClick={() => setCurrentView('analytics')}
                  >
                    <div className="text-[#0d141c]" data-icon="ChartBar" data-size="24px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z"></path>
                      </svg>
                    </div>
                    <p className="text-[#0d141c] text-sm font-medium leading-normal">Analíticas</p>
                  </div>

                  {/* Ajustes de cuenta */}
                  <div 
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors rounded-lg"
                    onClick={() => setCurrentView('settings')}
                  >
                    <div className="text-[#0d141c]" data-icon="Gear" data-size="24px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3.18-3.18L186.05,40.54a8,8,0,0,0-3.93-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3.18,3.18L40.54,69.94a8,8,0,0,0-6,3.93,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3.18,3.18L69.94,215.46a8,8,0,0,0,3.93,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3.18-3.18L215.46,186.05a8,8,0,0,0,6-3.93,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06ZM128,192a64,64,0,1,1,64-64A64.07,64.07,0,0,1,128,192Z"></path>
                      </svg>
                    </div>
                    <p className="text-[#0d141c] text-sm font-medium leading-normal">Ajustes</p>
                  </div>

                  {/* Ayuda y soporte */}
                  <div 
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors rounded-lg"
                    onClick={() => setCurrentView('help')}
                  >
                    <div className="text-[#0d141c]" data-icon="Question" data-size="24px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a16,16,0,1,1-16-16A16,16,0,0,1,144,176ZM128,56a36,36,0,0,0-36,36,8,8,0,0,0,16,0,20,20,0,0,1,40,0c0,7.78-3.58,15.23-9.4,19.94A28,28,0,0,0,124,140a8,8,0,0,0,16,0,12,12,0,0,1,6.77-10.79C153.75,125.8,164,113.45,164,92A36,36,0,0,0,128,56Z"></path>
                      </svg>
                    </div>
                    <p className="text-[#0d141c] text-sm font-medium leading-normal">Ayuda</p>
                  </div>
                </div>
              </div>

              {/* Botón de cerrar sesión en la parte inferior */}
              <div className="mt-auto pt-4 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2 w-full hover:bg-red-50 cursor-pointer transition-colors rounded-lg text-red-600 hover:text-red-800"
                >
                  <div className="text-green-600" data-icon="SignOut" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M124,216a12,12,0,0,1-12,12H48a20,20,0,0,1-20-20V48A20,20,0,0,1,48,28h64a12,12,0,0,1,0,24H52V204h60A12,12,0,0,1,124,216Zm108.49-96.49-40-40a12,12,0,0,0-17,17L195,116H112a12,12,0,0,0,0,24h83l-19.52,19.51a12,12,0,0,0,17,17l40-40A12,12,0,0,0,232.49,119.51Z"></path>
                    </svg>
                  </div>
                  <p className="text-sm font-medium leading-normal">Cerrar Sesión</p>
                </button>
              </div>
            </div>
          </aside>

          {/* Centro - CON SCROLL OCULTO */}
          <main className="layout-content-container flex flex-col max-w-[960px] flex-1 h-full overflow-hidden">
            <div className="px-4 py-3 h-full overflow-y-scroll scrollbar-hide" style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none',  /* Internet Explorer 10+ */
            }}>
              <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none; /* Safari and Chrome */
                }
              `}</style>
              <div className="flex w-full flex-1 items-stretch rounded-lg">
                {renderContent()}
              </div>
            </div>
          </main>

          {/* Panel derecho - FIJO */}
          <aside className="layout-content-container flex flex-col w-64 h-full overflow-hidden">
            <div className="bg-slate-50 p-4 h-full">
              <h3 className="text-lg font-semibold text-[#0d141c] mb-4">Panel Derecho</h3>
              <div className="text-sm text-gray-600">
                Contenido adicional, widgets, o información complementaria
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Home;