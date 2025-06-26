import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePost } from '../context/PostContext';
import type { ChangeEvent, FormEvent } from 'react';

function FrmPublicacion() {
  const { createPost} = usePost();
  const { user } = useAuth();
  const [descripcion, setDescripcion] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDescripcionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescripcion(e.target.value);
  };

  const handleArchivoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // liberar el objeto URL anterior si existe
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      
      setArchivo(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleRemoveArchivo = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setArchivo(null);
    setPreviewUrl(null);

    // Limpiar el input de archivo
    const fileInput = document.getElementById('archivo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const LimpiarFormulario = () => {
    setDescripcion('');
    setArchivo(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validacion basica
    if (!descripcion.trim()) {
      alert('La descripción no puede estar vacía.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('id_usuario', user.id);
    formData.append('descripcion', descripcion);
    if (archivo) {
      formData.append('archivo', archivo);
    }
    try
    {
      await createPost(formData);
      LimpiarFormulario();
      // setDescripcion('');
      // setArchivo(null);
      // setPreviewUrl(null);
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      alert('Error al crear la publicación. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (descripcion.trim() || archivo) {
      const confirmCancel = window.confirm(
        '¿Estás seguro de que quieres cancelar? Se perderán los cambios.'
      );
      if (confirmCancel) {
        LimpiarFormulario();
      } else {
        LimpiarFormulario();
      }
    }
  };

  // return (
  //   <form
  //     onSubmit={handleSubmit}
  //     className="bg-white p-4 border border-gray-200 rounded-md shadow-sm mb-4"
  //   >
  //     <h3 className="font-semibold text-xl mb-2">Haz una publicación</h3>

  //     <textarea
  //       className="w-full p-2 border border-gray-300 rounded-md mb-2"
  //       rows={4}
  //       placeholder="Escribe una descripción..."
  //       value={descripcion}
  //       onChange={handleDescripcionChange}
  //       required
  //     />

  //     <input
  //       type="file"
  //       accept="image/*,.pdf"
  //       onChange={handleArchivoChange}
  //       className="mb-2"
  //     />

  //     {previewUrl && archivo && (
  //       <div className="mb-2">
  //         {archivo.type.startsWith('image/') ? (
  //           <img
  //             src={previewUrl}
  //             alt="Vista previa"
  //             className="w-full max-h-64 object-contain border rounded"
  //           />
  //         ) : (
  //           <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded">
  //             <span className="text-sm text-gray-700">
  //               Archivo: {archivo.name}
  //             </span>
  //             <a
  //               href={previewUrl}
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               className="text-blue-500 underline text-sm"
  //             >
  //               Ver archivo
  //             </a>
  //           </div>
  //         )}
  //         <button
  //           type="button"
  //           onClick={handleRemoveArchivo}
  //           className="text-red-500 text-sm underline mt-1"
  //         >
  //           Quitar archivo
  //         </button>
  //       </div>
  //     )}

  //     <button
  //       type="submit"
  //       className="bg-blue-500 text-white px-4 py-2 rounded-md"
  //     >
  //       Publicar
  //     </button>
  //   </form>
  // );
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full mb-3"
    >
      {/* Campo de texto y subida */}
      <div className="w-full border border-[#cedbe8] rounded-lg bg-slate-50">
        <div className="flex w-full flex-1 items-stretch">
          {/* Imagen de perfil */}
          <div className="flex justify-end pl-[15px] pr-[15px] pt-[15px]">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
              style={{
                backgroundImage: user.foto ? `url(${user.foto})` : 'none',
              }}
            ></div>
          </div>

          {/* Texto y botones */}
          <div className="flex flex-1 flex-col">
            <label htmlFor="descripcion" className="sr-only">Descripción de la publicación</label>
            <textarea
              id="descripcion"
              className="w-full p-2 bg-transparent border-none resize-none focus:outline-none placeholder-gray-500"
              rows={4}
              placeholder="Escribe una descripción..."
              value={descripcion}
              onChange={handleDescripcionChange}
              disabled={isLoading}
              required
            />
            
            <div className="flex justify-end pr-[15px] px-[15px] pb-[15px]">
              <div className="flex items-center gap-4 justify-end">
                {/* Subir archivo */}
                <div className="flex items-center gap-1">
                  <input
                    id="archivo"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleArchivoChange}
                    disabled={isLoading}
                    className="hidden"
                  />
                  <label
                    htmlFor="archivo"
                    className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#e7edf4] pl-4 pr-4 cursor-pointer transition-opacity ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#d4e2f0]'
                    }`}
                  >
                    <p className="text-[#0d141c] text-sm font-medium leading-normal">Subir archivo</p>
                  </label>
                </div>

                {/* Botón Cancelar */}
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-red-100 hover:bg-red-200 pl-4 pr-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <p className="text-red-700 text-sm font-medium leading-normal">Cancelar</p>
                </button>

                {/* Botón Publicar */}
                <button
                  type="submit"
                  disabled={isLoading || !descripcion.trim()}
                  className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-green-200 hover:bg-green-300 pl-4 pr-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <p className="text-green-700 text-sm font-medium leading-normal">
                    {isLoading ? 'Publicando...' : 'Publicar'}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Vista previa dentro del contenedor */}
        {previewUrl && archivo && (
          <div className="w-full px-4 pb-4">
            <div className="bg-white rounded-lg p-3 border">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Vista previa:</h4>
              {archivo.type.startsWith('image/') ? (
                <img
                  src={previewUrl}
                  alt="Vista previa"
                  className="w-full max-h-64 object-contain border rounded mb-2"
                />
              ) : (
                <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded border mb-2">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-gray-700 truncate block">{archivo.name}</span>
                    <span className="text-xs text-gray-500">
                      {(archivo.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 underline text-sm flex-shrink-0"
                  >
                    Ver archivo
                  </a>
                </div>
              )}
              <button
                type="button"
                onClick={handleRemoveArchivo}
                disabled={isLoading}
                className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-red-100 hover:bg-red-200 pl-4 pr-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <p className="text-red-700 text-sm font-medium leading-normal">Quitar archivo</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

export default FrmPublicacion;
