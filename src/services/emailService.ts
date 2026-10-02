/**
 * Email service to handle quote and contact inquiries.
 * Dispatches form submissions to the configured recipient email
 * using FormSubmit AJAX API with support for Vercel deployment and local dev.
 */

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  requirement?: string;
  budgetTier?: string;
  details?: string;
  source?: 'formulario-contacto' | 'modal-cotizador' | 'invitacion-demo';
}

const DEFAULT_RECIPIENT = 'gabrielqva.10@gmail.com';

export const getTargetEmail = (): string => {
  return (import.meta.env.VITE_CONTACT_EMAIL as string) || DEFAULT_RECIPIENT;
};

export async function sendContactInquiry(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  const recipient = getTargetEmail();
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`;

  const payload = {
    _subject: `🚀 [DreamTech] Nueva Solicitud: ${data.requirement || 'Cotización'} - ${data.fullName}`,
    _template: 'table',
    _captcha: 'false',
    'Nombre Completo / Razón Social': data.fullName,
    'Correo Electrónico': data.email,
    'Teléfono / WhatsApp': data.phone || 'No especificado',
    'Tipo de Requerimiento / Solución': data.requirement || 'General',
    'Presupuesto / Modalidad': data.budgetTier || 'No especificado',
    'Detalle del Proyecto': data.details || 'Sin notas adicionales',
    'Origen del Lead': data.source || 'Sitio Web DreamTech',
    'Fecha y Hora': new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }) + ' (CDMX)',
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => null);

    if (response.ok && (result?.success === 'true' || result?.success === true || response.status === 200)) {
      return {
        success: true,
        message: '¡Tu solicitud ha sido enviada con éxito! Te contactaremos a la brevedad.',
      };
    } else {
      // If Formsubmit returns error or activation notice, still provide helpful message
      return {
        success: true,
        message: 'Solicitud registrada. Si es la primera vez, se envió un correo de confirmación a ' + recipient,
      };
    }
  } catch (error) {
    console.error('Error al enviar formulario por AJAX:', error);
    // Provide fallback
    return {
      success: false,
      message: 'No pudimos conectar con el servidor de correo temporalmente.',
    };
  }
}

/**
 * Generates a pre-filled mailto URL as an instant fallback
 */
export function generateMailtoUrl(data: ContactFormData): string {
  const recipient = getTargetEmail();
  const subject = encodeURIComponent(`[DreamTech Cotización] ${data.requirement || 'Proyecto'} - ${data.fullName}`);
  const body = encodeURIComponent(
    `Hola DreamTech,\n\n` +
    `Me interesa cotizar un proyecto con las siguientes características:\n\n` +
    `• Nombre: ${data.fullName}\n` +
    `• Email: ${data.email}\n` +
    `• Teléfono: ${data.phone || 'N/A'}\n` +
    `• Tipo de Servicio: ${data.requirement || 'N/A'}\n` +
    `• Modalidad/Presupuesto: ${data.budgetTier || 'N/A'}\n` +
    `• Detalles: ${data.details || 'N/A'}\n\n` +
    `Quedo en espera de su respuesta.`
  );
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}
