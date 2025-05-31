// ============================== GRUD USERS ==============================
// PENDIENTE
// - create user x
// - update user x 
// - delete user x
// ========================================================================
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

interface User {
  id: number;
  usuario: string;
  correo: string;
  password: string;
  biografia: string;
  institucion: string;
  escuela_profesional: string;
  facultad: string;
  tipo_usuario: "I" | "E" | "A";
  estado_cuenta: "activo" | "inactivo" | "baneado";
  foto?: string;
  siguiendo: string[];
  seguidos: string[];
}

interface FormState {
  usuario: string;
  correo: string;
  password: string;
  foto: File | null;
  fotoPreview: string | null;
  biografia: string;
  institucion: string;
  escuela_profesional: string;
  facultad: string;
  tipo_usuario: "I" | "E" | "A";
  estado_cuenta: "activo" | "inactivo" | "baneado";
  siguiendo: string[];
  seguidos: string[];
}

function UsersGrud() {
  const {users, createUser, updateUserAdmin, deleteUser, user} = useAuth(); // Agregamos 'user' del contexto
  const [usuario, setUsuario] = useState<User[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const [form, setForm] = useState<FormState>({
    usuario: "",
    correo: "",
    password: "",
    foto: null,
    fotoPreview: null,
    biografia: "",
    institucion: "",
    escuela_profesional: "",
    facultad: "",
    tipo_usuario: "I",
    estado_cuenta: "activo",
    siguiendo: [],
    seguidos: [],
  });

  // Obtener el ID del usuario actual autenticado
  const currentUserId = user?.id;

  const fetchUsers = async () => {
    try {
      const datausers = await users();
      if (datausers?.users) {
        const parsedUsers = datausers.users.map((user: any) => ({
          ...user,
          siguiendo: parseJSONorEmptyArray(user.siguiendo),
          seguidos: parseJSONorEmptyArray(user.seguidos),
        }));
        setUsuario(parsedUsers);
      } else {
        setUsuario([]);
      }
    } catch (e) {
      console.error("Error al obtener los usuarios", e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);

  function parseJSONorEmptyArray(value: any): string[] {
    if (!value) return [];
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    if (Array.isArray(value)) return value;
    return [];
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "foto" && files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          foto: file,
          fotoPreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else if (name === "siguiendo" || name === "seguidos") {
      const arr = value.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
      setForm((prev) => ({ ...prev, [name]: arr }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("usuario", form.usuario);
    formData.append("correo", form.correo);
    formData.append("password", form.password);
    formData.append("biografia", form.biografia);
    formData.append("institucion", form.institucion);
    formData.append("escuela_profesional", form.escuela_profesional);
    formData.append("facultad", form.facultad);
    formData.append("tipo_usuario", form.tipo_usuario);
    formData.append("estado_cuenta", form.estado_cuenta);
    formData.append("siguiendo", JSON.stringify(form.siguiendo));
    formData.append("seguidos", JSON.stringify(form.seguidos));
    if (form.foto) {
      formData.append("foto", form.foto);
    }
    if (editId !== null) {
      formData.append("id", editId.toString());
      const result = await updateUserAdmin(formData);
      if(!result) {
        alert("Error al actualizar el usuario");
        return;
      } 
      else await fetchUsers();

    } else {
      const result = await createUser(formData);
      if (!result) {
        alert("Error al crear usuario");
        return;
      }
      else await fetchUsers();
    }

    setForm({
      usuario: "",
      correo: "",
      password: "",
      foto: null,
      fotoPreview: null,
      biografia: "",
      institucion: "",
      escuela_profesional: "",
      facultad: "",
      tipo_usuario: "I",
      estado_cuenta: "activo",
      siguiendo: [],
      seguidos: [],
    });
    setEditId(null);
  };

  const handleEdit = (user: User) => {
    // Verificar si el usuario intenta editarse a sí mismo
    if (user.id === currentUserId) {
      alert("No puedes editar tu propio usuario desde esta interfaz de administración.");
      return;
    }

    setForm({
      usuario: user.usuario,
      correo: user.correo,
      password: user.password,
      foto: null,
      fotoPreview: user.foto || null,
      biografia: user.biografia,
      institucion: user.institucion,
      escuela_profesional: user.escuela_profesional,
      facultad: user.facultad,
      tipo_usuario: user.tipo_usuario,
      estado_cuenta: user.estado_cuenta,
      siguiendo: user.siguiendo,
      seguidos: user.seguidos,
    });
    setEditId(user.id);
  };

  const handleDelete = async (id: number) => {
    // Verificar si el usuario intenta eliminarse a sí mismo
    if (id === currentUserId) {
      alert("No puedes eliminar tu propio usuario.");
      return;
    }

    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      return;
    }

    const result = await deleteUser(id);
    if (result) {
      setUsuario((prev) => prev.filter((user) => user.id !== id));
      await fetchUsers();
    } else {
      alert("Error al eliminar el usuario.");
    }
  };

  const tipoUsuarioTexto = (tipo: "I" | "E" | "A") => {
    switch (tipo) {
      case "I":
        return "Invitado";
      case "E":
        return "Estudiante";
      case "A":
        return "Administrador";
      default:
        return "Desconocido";
    }
  };

  return (
    <div className="mt-6 overflow-x-auto max-w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Usuario CRUD</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow mb-8 max-w-4xl mx-auto"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Usuario</label>
          <input
            name="usuario"
            placeholder="Usuario"
            value={form.usuario}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Correo</label>
          <input
            name="correo"
            type="email"
            placeholder="Correo"
            value={form.correo}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required={editId === null}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Foto de perfil</label>
          <input
            name="foto"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          
          {(form.fotoPreview || (editId !== null && usuario.find(u => u.id === editId)?.foto)) && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Previsualización:</p>
              <div className="relative w-32 h-32 border rounded-md overflow-hidden">
                <img 
                  src={form.fotoPreview || (editId !== null && usuario.find(u => u.id === editId)?.foto || '')} 
                  alt="Previsualización" 
                  className="w-full h-full object-cover"
                />
                {form.fotoPreview && (
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({...prev, foto: null, fotoPreview: null}))}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    title="Eliminar imagen"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Biografía</label>
          <textarea
            name="biografia"
            placeholder="Biografía"
            value={form.biografia ?? ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Institución</label>
          <input
            name="institucion"
            placeholder="Institución"
            value={form.institucion ?? ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Escuela Profesional</label>
          <input
            name="escuela_profesional"
            placeholder="Escuela Profesional"
            value={form.escuela_profesional ?? ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Facultad</label>
          <input
            name="facultad"
            placeholder="Facultad"
            value={form.facultad ?? ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Tipo de usuario</label>
          <select
            name="tipo_usuario"
            value={form.tipo_usuario}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="I">Invitado</option>
            <option value="E">Estudiante</option>
            <option value="A">Administrador</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Estado de cuenta</label>
          <select
            name="estado_cuenta"
            value={form.estado_cuenta}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="baneado">Baneado</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Siguiendo (separados por comas)</label>
          <input
            name="siguiendo"
            placeholder="Siguiendo"
            value={form.siguiendo.join(", ") ?? ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Seguidos (separados por comas)</label>
          <input
            name="seguidos"
            placeholder="Seguidos"
            value={form.seguidos.join(", ") ?? ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex space-x-4 md:col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex-1"
          >
            {editId !== null ? "Actualizar usuario" : "Crear usuario"}
          </button>
          {editId !== null && (
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition flex-1"
              onClick={() => {
                setForm({
                  usuario: "",
                  correo: "",
                  password: "",
                  foto: null,
                  fotoPreview: null,
                  biografia: "",
                  institucion: "",
                  escuela_profesional: "",
                  facultad: "",
                  tipo_usuario: "I",
                  estado_cuenta: "activo",
                  siguiendo: [],
                  seguidos: [],
                });
                setEditId(null);
              }}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usuario.map((u) => {
              
              const isCurrentUser = u.id === currentUserId;
              return (
                <tr key={u.id} className={`hover:bg-gray-50 ${isCurrentUser ? 'bg-blue-50' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {u.id}
                    {isCurrentUser && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Tú
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.usuario}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.correo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {u.foto && (
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                        <img 
                          src={u.foto} 
                          alt="Foto de perfil" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tipoUsuarioTexto(u.tipo_usuario)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${u.estado_cuenta === 'activo' ? 'bg-green-100 text-green-800' : 
                        u.estado_cuenta === 'inactivo' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {u.estado_cuenta}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className={`${isCurrentUser 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'text-indigo-600 hover:text-indigo-900'}`}
                        onClick={() => handleEdit(u)}
                        disabled={isCurrentUser}
                        title={isCurrentUser ? 'No puedes editarte a ti mismo' : 'Editar usuario'}
                      >
                        Editar
                      </button>
                      <button
                        className={`${isCurrentUser 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'text-red-600 hover:text-red-900'}`}
                        onClick={() => handleDelete(u.id)}
                        disabled={isCurrentUser}
                        title={isCurrentUser ? 'No puedes eliminarte a ti mismo' : 'Eliminar usuario'}
                      >
                        Eliminar
                      </button>
                    </div>
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

export default UsersGrud;