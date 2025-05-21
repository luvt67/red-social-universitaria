import Publicacion from './Publicacion';
import { usePost } from '../context/PostContext';

function PostList() {
  const { posts } = usePost();

  const postsOrdenados = [...posts].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  return (
    <div>
      {postsOrdenados.map((post: any) => (
        <Publicacion
          key={post.id}
          id_usuario={post.id_usuario}
          descripcion={post.descripcion}
          fecha={post.fecha}
          nombre_archivo={post.nombre_archivo}
        />
      ))}
    </div>
  );
}

export default PostList;
