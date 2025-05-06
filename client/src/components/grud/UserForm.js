import React from 'react';

const UserForm = ({ 
  formData, 
  editingId, 
  handleInputChange, 
  handleSubmit, 
  handleCancel 
}) => {
  return (
    <form onSubmit={handleSubmit} className="grud-form">
      <h3>{editingId ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h3>
      
      <div className="form-group">
        <label>Nombre de usuario:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required={!editingId}
          placeholder={editingId ? "Dejar en blanco para no cambiar" : ""}
        />
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingId ? 'Actualizar' : 'Crear'}
        </button>
        
        {editingId && (
          <button 
            type="button" 
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;