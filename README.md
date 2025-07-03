# VetiSync - Plataforma de Gestión de Clínicas Veterinarias

VetiSync es una aplicación web full-stack moderna diseñada para la gestión integral de clínicas veterinarias. Cuenta con un backend robusto construido con Node.js/Express y un frontend interactivo y responsivo con Next.js.

## Características

- **Dashboard Interactivo:** Métricas clave de la clínica.
- **Historial Médico Digital:** Gestión completa de los pacientes y sus consultas.
- **Autenticación Segura:** Sistema basado en JWT con roles de usuario.
- **API RESTful:** Backend que sirve los datos de forma segura.
- **Interfaz Moderna:** Frontend construido con Next.js y estilizado con Tailwind CSS.

---

## Requisitos Previos

Para ejecutar este proyecto localmente, necesitarás tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 20.x o superior)
- [MongoDB](https://www.mongodb.com/try/download/community) (la base de datos)
- Un gestor de paquetes como `npm` (que viene con Node.js)

---

## Guía de Instalación y Ejecución

Sigue estos pasos para poner en marcha el proyecto en tu máquina local (por ejemplo, en Visual Studio Code):

### 1. Clonar el Repositorio

Abre una terminal y clona el repositorio de GitHub:

```bash
git clone https://github.com/DarwingSa/veti-sync-app.git
cd veti-sync-app
```

### 2. Configurar el Backend

El backend requiere variables de entorno para conectarse a la base de datos y gestionar la autenticación.

a. **Navega a la carpeta del servidor:**
   ```bash
   cd server
   ```

b. **Instala las dependencias del servidor:**
   ```bash
   npm install
   ```

c. **Crea el archivo de entorno:**
   Crea un archivo llamado `.env` dentro de la carpeta `server/` y añade el siguiente contenido. Este archivo guarda tus "secretos".

   ```env
   # Puerto para el servidor Express
   PORT=5000

   # Secreto para firmar los JSON Web Tokens (JWT)
   JWT_SECRET=tu_secreto_super_secreto_aqui

   # Cadena de conexión a tu base de datos MongoDB local
   MONGO_URI=mongodb://localhost:27017/vetisync-db
   ```

### 3. Configurar el Frontend

a. **Abre una nueva terminal.** Navega de nuevo a la raíz del proyecto y luego a la carpeta del cliente:
   ```bash
   cd client 
   # (Si ya estás en la carpeta 'server', primero haz 'cd ..' para volver a la raíz)
   ```

b. **Instala las dependencias del cliente:**
   ```bash
   npm install
   ```

### 4. Ejecutar la Aplicación

Ahora que todo está configurado, necesitas tener **dos terminales abiertas** para ejecutar la aplicación: una para el backend y una para el frontend.

a. **En la terminal del backend (`/server`):**
   - Asegúrate de que tu servicio de MongoDB esté corriendo.
   - Inicia el servidor:
     ```bash
     npm start
     ```
   Deberías ver un mensaje como `Servidor corriendo en el puerto 5000` y `Conectado a MongoDB`.

b. **En la terminal del frontend (`/client`):**
   - Inicia la aplicación de Next.js:
     ```bash
     npm run dev
     ```
   Deberías ver un mensaje indicando que el servidor está listo en `http://localhost:3000`.

¡Y eso es todo! Ahora puedes abrir `http://localhost:3000` en tu navegador para ver y usar la aplicación.
