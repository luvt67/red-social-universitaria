// interface CommentProps {
//   id_comentador: string;
//   descripcion: string;
//   fecha: string;
// }

import default_perfil from '../assets/default_perfil.png';
interface CommentProps {
  id_comentador: string;
  usuario: string;
  foto: string | null;
  descripcion: string;
  fecha: string;
}

function Comment({ usuario, foto, descripcion, fecha }: CommentProps) {
  const fechaObj = new Date(fecha);
  const fechaFormateada = fechaObj.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="border-t pt-2 mt-2 flex gap-2 items-start">
      {
        <img
          src={foto === null ? default_perfil : foto}
          alt="Foto de perfil"
          className="w-8 h-8 rounded-full object-cover"
        />
      }
      <div>
        <div className="text-sm">
          <span className="font-semibold">{usuario}</span>
          <span className="text-gray-500 ml-2">{fechaFormateada}</span>
        </div>
        <p className="text-gray-700 mt-1 whitespace-pre-wrap">{descripcion}</p>
      </div>
    </div>
  );
}
export default Comment;