import { useState, useEffect} from 'react';
import Comment from './Comment';
import { useAuth } from '../context/AuthContext';
import { usePost} from '../context/PostContext';



interface Comentario {
  id_comentador: string;
  usuario: string;
  foto: string | null;
  descripcion: string;
  fecha: string;
}

interface CommentListProps {
  id_publicacion: number
}

function CommentList({id_publicacion }: CommentListProps) {

  const { user } = useAuth();
  const {createComment} = usePost();
  const { getAllCommentsPost } = usePost();
  // Datos de prueba iniciales
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  
  const [nuevoComentario, setNuevoComentario] = useState('');
  // =========== Cargar comentarios al montar el componente =====================
  useEffect(() => {
    async function fetchComentarios() {
      let db_comentarios = await getAllCommentsPost(id_publicacion.toString());
      // Ordenar por fecha descendente (más reciente primero)
      db_comentarios.sort(
        (a: Comentario, b: Comentario) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );
      setComentarios(db_comentarios);
    }
    fetchComentarios();
  }, [id_publicacion]);

// ============================================================================
  const agregarComentario = async () => {
    if (nuevoComentario.trim() === '') return;
    const formData = new FormData();
    formData.append('id_publicacion', id_publicacion.toString());
    formData.append('id_comentador', user.id);
    formData.append('descripcion', nuevoComentario.trim());
    
    const response = await createComment(formData);
    if (!response)
    {
      console.log(response.error);
      return;
    }
    const db_comentarioas = await getAllCommentsPost(id_publicacion.toString());
    db_comentarioas.sort(
      (a: Comentario, b: Comentario) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    );
    setComentarios(db_comentarioas);
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
              id_comentador={comentario.id_comentador}
              usuario={comentario.usuario}
              foto={comentario.foto}
              descripcion={comentario.descripcion}
              fecha={comentario.fecha}
              
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CommentList;
