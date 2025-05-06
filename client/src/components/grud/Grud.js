import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import UserForm from './UserForm';
import UserTable from './UserTable';
import './Grud.css'; // Estilos específicos para el GRUD

const Grud = () => {
  const { users, createUser, updateUser, deleteUser, user: currentUser } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await users();
      if (result.success) {
        setUsuarios(result.users);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Error al cargar usuarios");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      let result;
      if (editingId) {
        result = await updateUser(editingId, formData);
      } else {
        result = await createUser(formData);
      }
      
      if (result.success) {
        setFormData({ username: '', email: '', password: '' });
        setEditingId(null);
        await loadUsers();
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Error al procesar la solicitud");
      console.error(err);
    }
  };

  const handleEdit = (usuario) => {
    setFormData({
      username: usuario.username,
      email: usuario.email,
      password: ''
    });
    setEditingId(usuario.id);
  };

  const handleDelete = async (id) => {
    const result = await deleteUser(id);
    if (result.success) {
      await loadUsers();
    } else {
      setError(result.error);
    }
  };

  const handleCancel = () => {
    setFormData({ username: '', email: '', password: '' });
    setEditingId(null);
  };

  if (loading) return <div className="loading">Cargando usuarios...</div>;

  return (
    <div className="grud-container">
      <h2>Administración de Usuarios</h2>
      
      {error && <div className="error-message">{error}</div>}

      <UserForm 
        formData={formData}
        editingId={editingId}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />

      <UserTable 
        users={usuarios}
        currentUserId={currentUser?.id}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Grud;