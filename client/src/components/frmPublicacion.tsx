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

  const handleDescripcionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescripcion(e.target.value);
  };

  const handleArchivoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArchivo(file);

      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleRemoveArchivo = () => {
    setArchivo(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id_usuario', user.id);
    formData.append('descripcion', descripcion);
    if (archivo) {
      formData.append('archivo', archivo);
    }
    try
    {
      await createPost(formData);
      setDescripcion('');
      setArchivo(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error('Error al crear la publicación:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 border border-gray-200 rounded-md shadow-sm mb-4"
    >
      <h3 className="font-semibold text-xl mb-2">Haz una publicación</h3>

      <textarea
        className="w-full p-2 border border-gray-300 rounded-md mb-2"
        rows={4}
        placeholder="Escribe una descripción..."
        value={descripcion}
        onChange={handleDescripcionChange}
        required
      />

      <input
        type="file"
        accept="image/*,.pdf"
        onChange={handleArchivoChange}
        className="mb-2"
      />

      {previewUrl && archivo && (
        <div className="mb-2">
          {archivo.type.startsWith('image/') ? (
            <img
              src={previewUrl}
              alt="Vista previa"
              className="w-full max-h-64 object-contain border rounded"
            />
          ) : (
            <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded">
              <span className="text-sm text-gray-700">
                Archivo: {archivo.name}
              </span>
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm"
              >
                Ver archivo
              </a>
            </div>
          )}
          <button
            type="button"
            onClick={handleRemoveArchivo}
            className="text-red-500 text-sm underline mt-1"
          >
            Quitar archivo
          </button>
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Publicar
      </button>
    </form>
  );
}

export default FrmPublicacion;
