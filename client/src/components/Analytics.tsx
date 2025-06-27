import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ExportTableToPDF from "../utils/ExportTableToPDF";
interface UsuarioPublicaciones {
  id: number;
  usuario: string;
  total_publicaciones: number;
}

function Analytics() {
  const { consulta } = useAuth();
  const [usuariosConMasPublicaciones, setUsuariosConMasPublicaciones] = useState<UsuarioPublicaciones[]>([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const data = await consulta();
        setUsuariosConMasPublicaciones(data || []);
      } catch (error) {
        console.error("Error al obtener datos de análisis", error);
      }
    };

    fetchDatos();
  }, [consulta]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-gray-600 mt-1">Usuarios con más publicaciones:</p>
      </div>

      {usuariosConMasPublicaciones.length > 0 ? (
        <div className="overflow-x-auto">
          <table id="analytics-table" className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publicaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usuariosConMasPublicaciones.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.usuario}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.total_publicaciones}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ExportTableToPDF 
            tableData={usuariosConMasPublicaciones} 
            fileName="usuarios_mas_publicaciones.pdf" 
          />
        </div>
      ) : (
        <p className="text-gray-500 italic">No hay datos disponibles aún.</p>
      )}
    </div>
  );
}

export default Analytics;

