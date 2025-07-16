import { useState } from 'react';
import default_avatar from '../assets/default_perfil.png';
import CommentList from './CommentList';
import PerfilUsuario from './PerfilSee';

interface Usuario {
  id: number;
  usuario: string;
  foto?: string | null;
}

interface PublicacionProps {
  id_publicacion: number;
  id_usuario: number;
  descripcion: string;
  fecha: string;
  nombre_archivo: string | null;
  usuario: Usuario | undefined;
}

function Publicacion({
  id_publicacion,
  id_usuario,
  descripcion,
  fecha,
  nombre_archivo,
  usuario
}: PublicacionProps) {
  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  const fechaObj = new Date(fecha);
  const fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short'
  });

  const esPDF = nombre_archivo?.toLowerCase().endsWith('.pdf');
  const urlArchivo = nombre_archivo ? `http://localhost:3000/uploads/${nombre_archivo}` : '';

  const avatar = usuario?.foto
    ? usuario.foto.startsWith('data:image')
      ? usuario.foto
      : `http://localhost:3000/fotos/${usuario.foto}`
    : `${default_avatar}`;

  const nombreUsuario = usuario?.usuario || `Usuario ${id_usuario}`;
  const arrobaUsuario = usuario?.usuario
    ? `@${usuario.usuario.toLowerCase()}`
    : `@usuario${id_usuario}`;

  return (
    <div className="border border-gray-300 shadow-md rounded-xl p-4 w-full mx-auto mb-4 bg-white hover:bg-gray-50 transition">
      <div className="flex gap-3">
        {/* Área clickeable para abrir modal */}
        <button
          onClick={() => setMostrarPerfil(true)}
          className="flex gap-3 text-left w-full focus:outline-none cursor-pointer
                    hover:shadow-lg hover:bg-gray-100 transition duration-200"
        >
          <img
            src={avatar}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold">{nombreUsuario}</span>
              <span className="text-gray-500">{arrobaUsuario}</span>
              <span className="text-gray-400">· {fechaFormateada}</span>
            </div>
          </div>
        </button>


      </div>

      <p className="text-base mt-3 whitespace-pre-wrap">{descripcion}</p>

      {nombre_archivo && (
        <div className="mt-3">
          {esPDF ? (
            <>
              <embed
                src={urlArchivo}
                type="application/pdf"
                className="w-full h-64 rounded-2xl border"
              />
              <div className="mt-2">
                <a
                  href={urlArchivo}
                  download
                  className="text-blue-600 hover:underline"
                >
                  📄 Descargar archivo PDF
                </a>
              </div>
            </>
          ) : (
            <img
              src={urlArchivo}
              alt="imagen publicacion"
              className="rounded-2xl w-full object-contain aspect-video"
            />
          )}
        </div>
      )}

      <div className="flex justify-between mt-4 text-gray-600 text-sm max-w-md">
        <button
          onClick={() => setMostrarComentarios(!mostrarComentarios)}
          className="flex items-center gap-1 hover:text-blue-500 cursor-pointer"
        >
          💬 <span>{mostrarComentarios ? 'Ocultar' : 'Comentar'}</span>
        </button>
      </div>

      {mostrarComentarios && (
        <div className="mt-4">
          <CommentList id_publicacion={id_publicacion} />
        </div>
      )}

      {/* Modal del perfil */}
      {mostrarPerfil && (
        <PerfilUsuario
          id={id_usuario}
          onClose={() => setMostrarPerfil(false)} // Aquí la función para cerrar el modal
        />
      )}
    </div>
  );
}

export default Publicacion;
