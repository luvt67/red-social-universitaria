import{ useState } from 'react';
import BtnPerfil from './buttons/btnPerfil';
import BtnHome from './buttons/btnHome';
import Perfil from './Perfil';
import PostList from '../components/PostList';
import FrmPublicacion from '../components/frmPublicacion';
import Button from '../components/Button';
// ========================= GRUDS ==========================
import UsersGrud from './Administration/Users.grud';
import PostsGrud from './Administration/Posts.grud';
// ==========================================================
function Home() {
  const [currentView, setCurrentView] = useState('home');

  const renderContent = () => {
    switch (currentView) {
      case 'perfil':
        return <Perfil />;
      case 'home':
        return <div>
          <FrmPublicacion/>
          <PostList/>
        </div>;
      case 'grud_users':
        return <UsersGrud/>;
      case 'grud_posts':
        return <PostsGrud/>;
      default:
        return <div>HOME</div>;
    }
  };
  return (
  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_200px] h-screen text-xl font-bold">
    {/* Panel izquierdo */}
    <aside className="hidden md:flex bg-red-200 border-4 border-black p-4 overflow-auto items-center">
      <div>
        <BtnHome onClick={() => setCurrentView('home')} />
        <BtnPerfil onClick={() => setCurrentView('perfil')} />
        <Button label='Users' onClick={()=>setCurrentView('grud_users')}/>
        <Button label='Publicaciones' onClick={()=>setCurrentView('grud_posts')}/>
      </div>
    </aside>

    {/* Centro */}
    <main className="bg-green-200 border-4 border-black p-4 overflow-y-auto flex flex-col justify-start w-full h-full hide-scrollbar">
      
      {renderContent()}
      
    </main>

    {/* Panel derecho */}
    <aside className="hidden md:flex bg-blue-200 border-4 border-black p-4 overflow-auto items-center">
      Panel Derecho
    </aside>
  </div>
  );
}
  
  export default Home;
  