import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
// ====================================================================================
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import { AuthWrapper } from './pages/AuthWrapper';
// ====================================================================================

function App() {
  return (
  <Routes>
    {/*============================= rutas publicas ============================= */}
    <Route path="/login" element={<AuthWrapper/>}/>
    <Route path="/register" element={<AuthWrapper/>}/>

    {/*============================= rutas privadas =============================*/}
    <Route element={<PrivateRoute/>}>
      <Route path="/" element={<Home/>}/>  
      <Route path="/perfil" element={<Perfil/>}/>
    </Route>
  </Routes>  
)
}

export default App
