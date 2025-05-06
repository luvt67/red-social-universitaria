import React from 'react';

const UserActions = ({ user, currentUserId, onEdit, onDelete }) => {
  return (
    <div className="user-actions">
      <button 
        onClick={() => onEdit(user)}
        className="btn btn-edit"
      >
        Editar
      </button>
      
      {user.id !== currentUserId && (
        <button
          onClick={() => {
            if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
              onDelete(user.id);
            }
          }}
          className="btn btn-delete"
        >
          Eliminar
        </button>
      )}
    </div>
  );
};

export default UserActions;