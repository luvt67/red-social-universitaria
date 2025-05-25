import React, { useState, useEffect } from 'react';
import default_perfil from '../assets/default_perfil.png';
import { useAuth } from '../context/AuthContext';

function EditarPerfil({ onClose }: { onClose: () => void }) {
  const { user, updateUser } = useAuth();
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [biografia, setBiografia] = useState('');
  const [institucion, setInstitucion] = useState('');
  const [escuela, setEscuela] = useState('');
  const [facultad, setFacultad] = useState('');

  const [showPassword, setShowPassword] = useState(false); // 👁️ Visibilidad

  useEffect(() => {
    if (user) {
      setUsuario(user.usuario || '');
      setCorreo(user.correo || '');
      setPassword(user.password || '');
      setBiografia(user.biografia || '');
      setInstitucion(user.institucion || '');
      setEscuela(user.escuela_profesional || '');
      setFacultad(user.facultad || '');
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('usuario', usuario);
    formData.append('correo', user.correo);
    formData.append('biografia', biografia);
    formData.append('institucion', institucion);
    formData.append('escuela_profesional', escuela);
    formData.append('facultad', facultad);

    if (password.trim() !== '') {
      formData.append('password', password);
    }

    if (selectedFile) {
      formData.append('foto', selectedFile);
    }

    try {
      await updateUser(formData);
      onClose();
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto" />
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-xl w-[90%] max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Editar Perfil</h2>

        <form className="space-y-4" onSubmit={handleUpdateUser}>
          {/* Imagen */}
          <div className="flex justify-center">
            <label htmlFor="foto" className="cursor-pointer relative w-32 h-32">
              <img
                src={preview || (user?.foto === null ? default_perfil : user?.foto)}
                alt="Foto de perfil"
                className="w-full h-full object-cover rounded-full border-2 border-gray-400"
              />
              <input
                id="foto"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <span className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow">
                ✏️
              </span>
            </label>
          </div>

          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full p-2 border rounded"
          />

          {/* Campo de contraseña con mostrar/ocultar */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-sm text-gray-600"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <textarea
            placeholder="Biografía"
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Institución"
            value={institucion}
            onChange={(e) => setInstitucion(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Escuela Profesional"
            value={escuela}
            onChange={(e) => setEscuela(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Facultad"
            value={facultad}
            onChange={(e) => setFacultad(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarPerfil;
