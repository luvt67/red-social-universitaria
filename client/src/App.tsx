import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
// ====================================================================================
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
// ====================================================================================

function App() {
  return (
  <Routes>
    {/*============================= rutas publicas ============================= */}
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>

    {/*============================= rutas privadas =============================*/}
    <Route element={<PrivateRoute/>}>
      <Route path="/" element={<Home/>}/>  
      <Route path="/perfil" element={<Perfil/>}/>
    </Route>
  </Routes>  
)
}

export default App
