'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function FormPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFormData() {
      try {
        const response = await fetch(`/api/save-form?id=${id}`);
        
        if (!response.ok) {
          throw new Error('No se pudo cargar el formulario');
        }
        
        const data = await response.json();
        setFormData(data);
      } catch (err) {
        setError('Error al cargar el formulario');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchFormData();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando formulario...</div>;
  }

  if (error || !formData) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error || 'Formulario no encontrado'}</div>;
  }

  // Renderizar el formulario con los datos
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Autoevaluación PTA</h1>
      <div dangerouslySetInnerHTML={{ __html: formData.data.htmlContent }} />
    </div>
  );
}