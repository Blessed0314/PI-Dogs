# Dog's Breeds Portal

Este proyecto es una aplicación web llamada Dog's Breeds Portal que permite registrar nuevas razas de perro utilizando la API [The Dog API](https://thedogapi.com/). El backend está desarrollado en Node.js y Express, mientras que el frontend está construido con React.

## Funcionalidades

- Mostrar una lista de razas de perro obtenidas desde la API.
- Permitir el registro de nuevas razas de perro mediante un formulario.
- Guardar la información de las razas registradas en el servidor del backend utilizando Sequelize como ORM y una base de datos PostgreSQL.

## Configuración

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

### Backend (Node.js y Express)

1. Clona este repositorio en tu máquina local.
2. Navega hasta la carpeta `Api`.
3. Instala las dependencias ejecutando el comando `npm install`.
4. Crea un archivo `.env` en la raíz de la carpeta `Api` y configura las variables de entorno necesarias, incluyendo la URL de conexión a la base de datos PostgreSQL. Asegúrate de proporcionar la siguiente configuración para la base de datos:

DB_HOST=tu_host_de_PostgreSQL
DB_PORT=tu_puerto_de_PostgreSQL
DB_NAME=dogs
DB_USER=tu_usuario_de_PostgreSQL
DB_PASSWORD=tu_contraseña_de_PostgreSQL

markdown
Copy code

5. Ejecuta el backend con el comando `npm start`. La API estará disponible en `http://localhost:8000`.

### Frontend (React)

1. Navega hasta la carpeta `client`.
2. Instala las dependencias ejecutando el comando `npm install`.
3. Configura la URL de la API en el archivo `src/api.js` (por ejemplo, `const apiUrl = 'http://localhost:8000'`).
4. Ejecuta el frontend con el comando `npm start`. La aplicación estará disponible en `http://localhost:3000`.

**Importante**: Antes de ejecutar el frontend, asegúrate de haber iniciado el backend para que la aplicación pueda comunicarse correctamente con la API.

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas colaborar con este proyecto, por favor sigue los siguientes pasos:

1. Realiza un fork de este repositorio.
2. Crea una nueva rama con la descripción de la función o mejora que deseas implementar.
3. Realiza tus cambios y realiza commits descriptivos.
4. Envía un pull request explicando tus cambios y por qué deberían ser incorporados.

## Licencia

Este proyecto se distribuye bajo la licencia MIT.

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme a través de mi dirección de correo electrónico o mis redes sociales.
