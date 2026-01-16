# Manual de Instalación y Despliegue - VisionPlus

Este documento explica cómo echar a andar el proyecto desde cero, ya sea en tu computadora (Local) o usando contenedores (Docker).

## Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

1. **Node.js** (Versión 18 o superior).
2. **Git** (Para descargar el código).
3. **Docker Desktop** (Opcional, pero recomendado para el despliegue final).
4. Una cuenta en **MongoDB Atlas** (Base de datos en la nube).

---

## 1. Instalación Local (Paso a Paso)

Ideal para desarrollar y probar cambios rápidamente.

### Paso A: Clonar el Proyecto

Descarga la carpeta del proyecto a tu escritorio o documento.

### Paso B: Configurar el Backend

Es el cerebro del sistema. Necesita conectarse a la base de datos.

1. Abre una terminal en la carpeta `backend`.
2. Crea un archivo llamado `.env` (si no existe) y agrega tus secretos:

    ```env
    MONGO_URI=mongodb+srv://<usuario>:<password>@cluster0.exaple.mongodb.net/visionplus
    JWT_SECRET=palabra_super_secreta_para_tokens
    TMDB_API_KEY=tu_api_key_de_tmdb
    PORT=3000
    ```

3. Instala las librerías:

    ```bash
    npm install
    ```

4. **Iniciar el Cluster (Recomendado)**:
    Para probar la arquitectura de 2 servidores:

    ```bash
    node start-cluster.js
    ```

    *Verás en la consola que se inician "Backend-1", "Backend-2" y "Load-Balancer".*

### Paso C: Configurar el Frontend

Es la cara bonita que ve el usuario.

1. Abre otra terminal en la carpeta `frontend`.
2. Crea un archivo `.env` (opcional, por defecto usa localhost:3000):

    ```env
    VITE_API_URL=http://localhost:3000
    ```

3. Instala las librerías:

    ```bash
    npm install
    ```

4. Inicia la app:

    ```bash
    npm run dev
    ```

5. Abre tu navegador en `http://localhost:5173`. ¡Listo!

---

## 2. Despliegue con Docker (Modo Profesional)

Esta es la forma en la que se entregaría el proyecto final, usando contenedores para que funcione igual en cualquier máquina.

### Arquitectura de Contenedores

Hemos creado un sistema de 2 contenedores:

1. **visionplus-backend**: Un "Cluster en una Caja". Dentro de este contenedor corren los 2 servidores NestJS y el Balanceador de Carga automáticamente.
2. **visionplus-frontend**: Un servidor Nginx optimizado que sirve la aplicación web.

### Pasos para Desplegar

1. Asegúrate de que **Docker Desktop** esté abierto y corriendo.
2. Desde la carpeta raíz (`login-visionplus`), ejecuta nuestro script de automatización:
    - En Windows (PowerShell):

      ```powershell
      ./deploy.ps1
      ```

    - O manualmente en terminal:

      ```bash
      docker-compose up --build -d
      ```

3. Espera unos minutos a que descargue y construya todo.
4. Accede a tu aplicación "en producción":
    - **URL Principal**: <http://localhost:8080>

### ¿Cómo verifico que funciona el balanceo?

Mientras usas la app en el puerto 8080, puedes ver los logs del contenedor backend:

```bash
docker logs -f visionplus-backend
```

Verás mensajes como `[Load Balancer] Routing ... to http://localhost:3001` y luego al `3002`, confirmando que el tráfico se distribuye.

---

## Solución de Problemas Comunes

- **Error: "MongoNetworkError"**: Revisa tu IP en la "Whitelist" de MongoDB Atlas. Asegúrate de permitir acceso desde cualquier lugar (`0.0.0.0/0`) para pruebas.
- **Error: "Address in use"**: Asegúrate de no tener otro servidor corriendo en el puerto 3000 o 8080.
- **Video no carga**: Verifica que tengas internet (para videos de Bunny) o que hayas corrido el script de demos locales para HLS.

---
*Hecho para el proyecto final de Ingeniería de Software.*
