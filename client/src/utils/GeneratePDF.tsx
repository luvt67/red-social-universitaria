// src/utils/generatePDF.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface UserPublication {
  usuario: string;
  total_publicaciones: number;
}

const generateUserPublicationsPDF = (
  data: UserPublication[],
  filename: string = 'usuarios_mas_publicaciones.pdf'
) => {
  const doc = new jsPDF('l', 'mm', 'a4');
  doc.setFontSize(16);
  doc.text("Usuarios con más publicaciones", 10, 10);

  const tableData = data.map((item) => [item.usuario, item.total_publicaciones]);

  autoTable(doc, {
    head: [['Usuario', 'Publicaciones']],
    body: tableData,
    startY: 20,
    theme: 'grid',
    styles: { fontSize: 10 },
  });

  doc.save(filename);
};

export default generateUserPublicationsPDF;