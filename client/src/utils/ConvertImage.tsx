import { Buffer } from 'buffer';
export const convertImageToDataURL = (
    foto: { data: number[]; contentType?: string }
  ): string | null => {
    if (foto && Array.isArray(foto.data)) {
      try {
        const buffer = Buffer.from(foto.data);
        const base64Image = buffer.toString('base64');
        const contentType = foto.contentType || 'image/jpeg';
        return `data:${contentType};base64,${base64Image}`;
      } catch (err) {
        console.error('Error al convertir imagen:', err);
        return null;
      }
    }
  
    console.warn('La foto no tiene el formato esperado:', foto);
    return null;
  };
  