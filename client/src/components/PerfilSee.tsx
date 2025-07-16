import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import default_perfil from "../assets/default_perfil.png";

interface PerfilInfoProps {
  id: number;
  onClose: () => void;
}

function PerfilSee({ id, onClose }: PerfilInfoProps) {
  const { getuser } = useAuth();
  const [user, setUser] = useState<any>(null); // Ajusta el tipo si tienes uno definido

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getuser(id);
        setUser(data.user);
      } catch (error) {
        console.error("Error cargando usuario:", error);
      }
    }
    fetchUser();

    // Bloquear scroll al abrir modal y desbloquear al cerrar
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [id, getuser]);

  const avatar = user?.foto ? user.foto : default_perfil;

  if (!user) {
    return (
      <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm z-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-10 shadow-xl w-full max-w-md text-center">
          Cargando perfil...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-2xl relative">
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-2xl font-bold z-10"
        >
          ×
        </button>

        {/* Portada */}
        <div className="relative h-48 bg-blue-500">
          <img
            src="https://noticias.upc.edu.pe/wp-content/uploads/2019/05/minecraft.jpg"
            alt="Portada"
            className="w-full h-full object-cover"
          />
          <div className="absolute left-6 bottom-[-2.5rem]">
            <img
              src={avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md"
            />
          </div>
        </div>

        {/* Información del perfil */}
        <div className="bg-white pt-20 pb-10 px-6">
          <h1 className="text-3xl font-semibold text-gray-800">{user.usuario}</h1>
          <p className="text-gray-500 mt-2">{user.correo}</p>
          <p className="text-gray-500 mt-2">{user.biografia}</p>
          <p className="text-gray-500 mt-2">{user.institucion}</p>
          <p className="text-gray-500 mt-2">{user.escuela_profesional}</p>
          <p className="text-gray-500 mt-2">{user.facultad}</p>
        </div>
      </div>
    </div>
  );
}

export default PerfilSee;
