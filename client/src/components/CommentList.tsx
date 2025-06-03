import { useState } from 'react';
import Comment from './Comment';

interface Comentario {
  usuario: string;
  texto: string;
  fecha: string;
}

interface CommentListProps {
  idPublicacion: number;
  usuarioActual: string;
}

function CommentList({ idPublicacion, usuarioActual }: CommentListProps) {
  // Datos de prueba iniciales
  const [comentarios, setComentarios] = useState<Comentario[]>([
    {
      usuario: 'Maria23',
      texto: '¡Qué buena publicación!',
      fecha: new Date().toISOString(),
    },
    {
      usuario: 'CarlosDev',
      texto: 'Interesante punto de vista, gracias por compartir.',
      fecha: new Date().toISOString(),
    },
  ]);

  const [nuevoComentario, setNuevoComentario] = useState('');

  const agregarComentario = () => {
    if (nuevoComentario.trim() === '') return;

    const comentario: Comentario = {
      usuario: usuarioActual,
      texto: nuevoComentario.trim(),
      fecha: new Date().toISOString(),
    };

    setComentarios([...comentarios, comentario]);
    setNuevoComentario('');
  };

  return (
    <div className="mt-4">
      <textarea
        value={nuevoComentario}
        onChange={(e) => setNuevoComentario(e.target.value)}
        placeholder="Escribe un comentario..."
        className="w-full border rounded-md p-2 resize-none"
      />

      <button
        onClick={agregarComentario}
        className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
      >
        Comentar
      </button>

      <div className="mt-4">
        {comentarios.length === 0 ? (
          <p className="text-gray-500">No hay comentarios aún.</p>
        ) : (
          comentarios.map((comentario, index) => (
            <Comment
              key={index}
              usuario={comentario.usuario}
              texto={comentario.texto}
              fecha={comentario.fecha}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CommentList;
