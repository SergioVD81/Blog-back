/**
 * @fileoverview Configuración y ejecución del servidor HTTP.
 *
 * Este módulo configura y ejecuta un servidor HTTP utilizando el módulo `http` de Node.js.
 * También importa y configura la aplicación Express desde el archivo `App.js` y establece
 * la conexión con la base de datos.
 *
 * @module Server
 */
const http = require("http");
const app = require("./src/App");

//Crea el servidor HTTP utilizando Express
const server = http.createServer(app);

//Importa la configuración de la base de datos
require("./src/config/db");

//Se define el puerto de escucha del servidor
const port = process.env.PORT ?? 3000;

/**
 * Inicia el servidor HTTP y comienza a escuchar en el puerto definido.
 *
 * @function
 * @name server.listen
 * @param {number} port - El puerto en el que el servidor escuchará. Si no se define en el entorno, se usa 3000.
 */
server.listen(port);

/**
 * Evento que se emite cuando el servidor comienza a escuchar en el puerto.
 *
 * Este evento se usa para mostrar un mensaje en la consola indicando que el servidor está
 * en funcionamiento.
 *
 * @event
 * @name listening
 * @memberof module:Server
 */
server.on("listening", () => {
  console.log(`Escuchando a través del puerto ${port}`);
});

/**
 * Evento que se emite cuando ocurre un error en el servidor.
 *
 * Este evento captura y muestra errores que ocurren mientras el servidor está en funcionamiento.
 *
 * @event
 * @name error
 * @param {Error} error - El objeto de error que contiene información sobre el problema ocurrido.
 * @memberof module:Server
 */
server.on("error", (error) => {
  console.log(`${error.name}:${error.message}`);
});
