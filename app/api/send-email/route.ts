import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { formData, pageUrl } = await request.json();
    
    // Configurar el transporte de correo
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Enviar el correo
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'mjhoycas@uis.edu.co',
      subject: 'Autoevaluación PTA - Nuevo formulario',
      html: `
        <h1>Nueva autoevaluación PTA</h1>
        <p>Se ha generado una nueva autoevaluación. Puede acceder a los datos mediante el siguiente enlace:</p>
        <p><a href="${pageUrl}" target="_blank">Ver autoevaluación</a></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json({ error: 'Error al enviar el correo' }, { status: 500 });
  }
}