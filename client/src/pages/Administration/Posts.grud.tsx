import { useEffect, useState } from "react";
import { usePost } from "../../context/PostContext";

interface Post {
  id: number;
  id_usuario: number;
  descripcion: string;
  nombre_archivo: string | null;
  tipo_archivo: "imagen" | "pdf";
  fecha: string;
  estado_publicacion: string;
}

interface FormState {
  descripcion: string;
  archivo: File | null;
  archivoPreview: string | null;
  tipo_archivo: "imagen" | "pdf";
  estado_publicacion: string;
}

function PublicationsGrud() {
  const { posts, createPost, getAllPosts } = usePost();
  const [editId, setEditId] = useState<number | null>(null);

  const [form, setForm] = useState<FormState>({
    descripcion: "",
    archivo: null,
    archivoPreview: null,
    tipo_archivo: "imagen",
    estado_publicacion: "publicado",
  });

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "archivo" && files && files[0]) {
      const file = files[0];
      const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : null;
      setForm((prev) => ({ ...prev, archivo: file, archivoPreview: preview }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("descripcion", form.descripcion);
    formData.append("tipo_archivo", form.tipo_archivo);
    formData.append("estado_publicacion", form.estado_publicacion);
    if (form.archivo) formData.append("archivo", form.archivo);

    await createPost(formData);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      descripcion: "",
      archivo: null,
      archivoPreview: null,
      tipo_archivo: "imagen",
      estado_publicacion: "publicado",
    });
    setEditId(null);
  };

  return (
    <div className="mt-6 max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">CRUD de Publicaciones</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow mb-8"
      >
        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            required
            placeholder="¿Qué estás pensando?"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Archivo (imagen o PDF)</label>
          <input
            type="file"
            name="archivo"
            accept="image/*,application/pdf"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {form.archivoPreview && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Previsualización:</p>
              <div className="relative w-32 h-32 border rounded-md overflow-hidden">
                <img
                  src={form.archivoPreview}
                  alt="Previsualización"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      archivo: null,
                      archivoPreview: null,
                    }))
                  }
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  title="Eliminar imagen"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Tipo de archivo</label>
          <select
            name="tipo_archivo"
            value={form.tipo_archivo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="imagen">Imagen</option>
            <option value="pdf">PDF</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            name="estado_publicacion"
            value={form.estado_publicacion}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="publicado">Publicado</option>
            <option value="borrador">Borrador</option>
          </select>
        </div>

        <div className="flex space-x-4 md:col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex-1"
          >
            {editId !== null ? "Actualizar publicación" : "Crear publicación"}
          </button>
          {editId !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition flex-1"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Archivo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((pub: Post) => {
              const fileUrl = pub.nombre_archivo
                ? `http://localhost:3000/uploads/${pub.nombre_archivo}`
                : null;

              return (
                <tr key={pub.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pub.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pub.descripcion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {fileUrl ? (
                      pub.tipo_archivo === "imagen" ? (
                        <img
                          src={fileUrl}
                          alt="archivo"
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          📄 Ver PDF
                        </a>
                      )
                    ) : (
                      <span className="text-gray-400 italic">Sin archivo</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-500">
                    {pub.tipo_archivo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${pub.estado_publicacion === "publicado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {pub.estado_publicacion}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(pub.fecha).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PublicationsGrud;
