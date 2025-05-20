import { useState } from 'react';
import EditarPerfil from './EditarPerfil';
import { useAuth } from "../context/AuthContext";
import default_perfil from '../assets/default_perfil.png';

function Perfil() {
    const { user } = useAuth();
    const [mostrarEditor, setMostrarEditor] = useState(false);
    return (
      <div className="w-full">
        {/* Imagen de portada (contenedor relativo) */}
        <div className="relative h-48 bg-blue-500">
          <img
            src="https://noticias.upc.edu.pe/wp-content/uploads/2019/05/minecraft.jpg"
            alt="Imagen de portada"
            className="w-full h-full object-cover"
          />
  
          {/* Imagen de perfil sobre portada */}
          <div className="absolute left-6 bottom-[-2.5rem]">
            <img
              src={user?.foto === null ? default_perfil : user?.foto}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md"
            />
          </div>
  
          {/* Botón Editar Perfil en esquina inferior derecha de la portada */}
          <button
          onClick={() => setMostrarEditor(true)}
          className="absolute right-6 bottom-4 px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
            Editar Perfil
          </button>
        </div>
  
        {/* Contenedor de perfil */}
        <div className="bg-white pt-20 pb-10 px-6 shadow-md w-full">
          {/* Nombre y descripción */}
          <div className="mt-4">
            <h1 className="text-3xl font-semibold text-gray-800">{user?.usuario}</h1>
            <p className="text-gray-500 mt-2">{user.correo}</p>
            <p className="text-gray-500 mt-2">{user.biografia}</p>
            <p className="text-gray-500 mt-2">{user.institucion}</p>
            <p className="text-gray-500 mt-2">{user.escuela_profesional}</p>
            <p className="text-gray-500 mt-2">{user.facultad}</p>
          </div>
  
          {/* Botones de acción */}
          {/* <div className="mt-6 flex justify-center space-x-4">
            <button className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
              Seguir
            </button>
            <button className="px-6 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
              Mensaje
            </button>
          </div> */}
        </div>
        {mostrarEditor && <EditarPerfil onClose={() => setMostrarEditor(false)} />}
      </div>
    );
  }
  
  export default Perfil;

  // Agregar 
  // - [ ] Imagen de portada a la tabla model
  