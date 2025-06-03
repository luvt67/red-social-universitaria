interface CommentProps {
  usuario: string;
  texto: string;
  fecha: string;
}

function Comment({ usuario, texto, fecha }: CommentProps) {
  const fechaObj = new Date(fecha);
  const fechaFormateada = fechaObj.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="border-t pt-2 mt-2">
      <div className="text-sm">
        <span className="font-semibold">{usuario}</span>
        <span className="text-gray-500 ml-2">{fechaFormateada}</span>
      </div>
      <p className="text-gray-700 mt-1 whitespace-pre-wrap">{texto}</p>
    </div>
  );
}

export default Comment;
