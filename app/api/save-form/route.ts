import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Simulación de una base de datos para almacenar los formularios
// En un entorno real, usarías una base de datos como MongoDB, PostgreSQL, etc.
const formStorage: Record<string, any> = {};

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    // Generar un ID único para el formulario
    const formId = uuidv4();
    
    // Guardar los datos del formulario
    formStorage[formId] = {
      data: formData,
      createdAt: new Date().toISOString(),
    };
    
    // Generar la URL para acceder al formulario
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const pageUrl = `${baseUrl}/form/${formId}`;
    
    return NextResponse.json({ 
      success: true, 
      formId, 
      pageUrl 
    });
  } catch (error) {
    console.error('Error al guardar el formulario:', error);
    return NextResponse.json({ error: 'Error al guardar el formulario' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const formId = url.searchParams.get('id');
  
  if (!formId || !formStorage[formId]) {
    return NextResponse.json({ error: 'Formulario no encontrado' }, { status: 404 });
  }
  
  return NextResponse.json(formStorage[formId]);
}