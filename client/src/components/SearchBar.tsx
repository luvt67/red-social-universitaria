import { useState, useEffect, useRef } from 'react';
import { searchUsers } from '../services/userService';
import PerfilSee from './PerfilSee';

interface User {
  id: number;
  usuario: string;
  correo: string;
  foto?: Buffer;
  biografia?: string;
  institucion?: string;
  escuela_profesional?: string;
  facultad?: string;
  tipo_usuario: string;
}

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setIsLoading(true);
        try {
          const response = await searchUsers(query);
          setResults(response.data);
          setShowResults(true);
        } catch (error) {
          console.error('Error al buscar usuarios:', error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleUserClick = (user: User) => {
    setQuery(user.usuario);
    setShowResults(false);
    setSelectedUserId(user.id);
  };

  const closeProfile = () => {
    setSelectedUserId(null);
  };

  const getUserTypeLabel = (tipo: string) => {
    switch (tipo) {
      case 'E': return 'Estudiante';
      case 'D': return 'Docente';
      case 'A': return 'Administrativo';
      default: return 'Invitado';
    }
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="flex items-center w-full h-12 bg-[#e7edf4] rounded-lg overflow-hidden">
        <div className="text-[#49739c] flex items-center justify-center pl-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
          </svg>
        </div>
        <input
          placeholder="Buscar usuarios..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-input w-full px-3 py-2 text-[#49739c] bg-[#e7edf4] placeholder-[#49739c] focus:outline-none border-none"
        />
        {isLoading && (
          <div className="pr-4">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#49739c]"></div>
          </div>
        )}
      </div>

      {/* Resultados de búsqueda */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-80 overflow-y-auto z-50">
          {results.length > 0 ? (
            results.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserClick(user)}
                className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    {user.foto ? (
                      <img
                        src={`data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(user.foto)))}`}
                        alt={user.usuario}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" className="text-gray-500">
                        <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-[#0d141c]">{user.usuario}</div>
                    <div className="text-sm text-gray-600">
                      {getUserTypeLabel(user.tipo_usuario)}
                      {user.escuela_profesional && ` • ${user.escuela_profesional}`}
                    </div>
                    {user.biografia && (
                      <div className="text-xs text-gray-500 mt-1 truncate">
                        {user.biografia}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-gray-500">
              {query.length < 2 ? 'Escribe al menos 2 caracteres para buscar' : 'No se encontraron usuarios'}
            </div>
          )}
        </div>
      )}

      {/* Modal de perfil */}
      {selectedUserId && (
        <PerfilSee 
          id={selectedUserId} 
          onClose={closeProfile} 
        />
      )}
    </div>
  );
}

export default SearchBar;
