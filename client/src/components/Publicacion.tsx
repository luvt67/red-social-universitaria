interface PublicacionProps {
  id_usuario: number;
  descripcion: string;
  fecha: string;
  nombre_archivo: string | null;
}

function Publicacion({ id_usuario, descripcion, fecha, nombre_archivo }: PublicacionProps) {
  const fechaObj = new Date(fecha);
  const fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short'
  });

  const esPDF = nombre_archivo?.toLowerCase().endsWith('.pdf');
  const urlArchivo = nombre_archivo ? `http://localhost:3000/uploads/${nombre_archivo}` : '';

  return (
    <div className="border border-gray-300 shadow-md rounded-xl p-4 w-full mx-auto mb-4 bg-white hover:bg-gray-50 transition">
      <div className="flex gap-3">
        <img
          src={`https://i.pravatar.cc/100?u=${id_usuario}`}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold">Usuario {id_usuario}</span>
            <span className="text-gray-500">@usuario{id_usuario}</span>
            <span className="text-gray-400">· {fechaFormateada}</span>
          </div>
          <p className="text-base mt-1 whitespace-pre-wrap">
            {descripcion}
          </p>

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
            <button className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
              💬 <span>Comentar</span>
            </button>
            <button className="flex items-center gap-1 hover:text-green-500 cursor-pointer">
              🔁 <span>Retwittear</span>
            </button>
            <button className="flex items-center gap-1 hover:text-pink-500 cursor-pointer">
              ❤️ <span>Me gusta</span>
            </button>
            <button className="flex items-center gap-1 hover:text-gray-800 cursor-pointer">
              📤 <span>Compartir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Publicacion;
