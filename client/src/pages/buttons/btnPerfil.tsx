import { useAuth } from "../../context/AuthContext";
import default_perfil from '../../assets/default_perfil.png';
function btnPerfil({ onClick }: { onClick: () => void })
{
    const { user } = useAuth();
    return (
        <div
            onClick={onClick} 
            className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition"
        >
        <img
            src={user.foto === null?default_perfil: user.foto}
            alt="Avatar"
            className="w-12 h-12 rounded-full border-2 border-gray-300"
        />
        <h1 className="text-lg font-semibold">{user?.usuario}</h1>
        </div>
    );
}
export default btnPerfil;

// task:
// - [ ] manejar información de usuario