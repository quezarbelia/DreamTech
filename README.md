# DreamTech Software Designer

Plataforma web de software inteligente, SaaS pospago e invitaciones digitales interactivas optimizada para **Vite** y lista para despliegue en **Vercel**.

## 🚀 Características Recientes

- **Nuevo Logo Oficial**: Integrado en alta resolución (`/public/logo.png`), en el Navbar, Hero Section y Favicon.
- **Animaciones Atmosféricas & Liquid UI**:
  - Estrellas fugaces cinematográficas en el cielo espacial con colas de luz dinámicas.
  - Efectos de flotación (`animate-float`), pulsos de resplandor (`animate-pulse-glow`) y tarjetas interactivas con `framer-motion`.
  - Transiciones fluidas entre pestañas y micro-interacciones táctiles.
- **Cuestionario y Cotizador con Envío por Correo**:
  - Envío automático de solicitudes a tu correo (`gabrielqva.10@gmail.com` por defecto o configurable mediante `VITE_CONTACT_EMAIL`).
  - Envío mediante AJAX sin necesidad de backend complejo, compatible con Vercel.
  - Botón de respaldo directo vía cliente de correo (`mailto:`).
- **Optimizado para Vercel**:
  - Configuración `vercel.json` con soporte SPA (rewrites) y caché optimizada de assets estáticos.
  - Compilación Vite 8 ultrarrápida sin advertencias.

## 🛠️ Ejecución Local

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Accede a [http://localhost:3000](http://localhost:3000).

3. Compilar para producción:
   ```bash
   npm run build
   ```

## 🌐 Despliegue en Vercel

1. Sube tus cambios a GitHub:
   ```bash
   git add .
   git commit -m "feat: nuevo logo, animaciones, optimizacion Vite y envio de cuestionario por correo"
   git push origin main
   ```
2. Conecta tu repositorio en [Vercel](https://vercel.com):
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. *(Opcional)* En las variables de entorno de Vercel puedes definir:
   - `VITE_CONTACT_EMAIL`: Tu correo de recepción (ej. `gabrielqva.10@gmail.com`).

