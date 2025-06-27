// src/components/ExportTableToPDF.tsx
import React from 'react';
import GeneratePDF  from './GeneratePDF';

interface UserPublication {
  usuario: string;
  total_publicaciones: number;
}

interface ExportTableToPDFProps {
  tableData: UserPublication[];
  fileName?: string;
}

const ExportTableToPDF: React.FC<ExportTableToPDFProps> = ({ tableData, fileName = "usuarios_mas_publicaciones.pdf" }) => {
  const handleExport = () => {
    GeneratePDF(tableData, fileName);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
    >
      Exportar a PDF
    </button>
  );
};

export default ExportTableToPDF;