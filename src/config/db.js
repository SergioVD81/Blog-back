/**
 * @module DatabaseConnection
 * @requires mysql2
 *
 * Este módulo configura una conexión a una base de datos MySQL utilizando un pool de conexiones.
 * Los parámetros de conexión se obtienen de las variables de entorno (`process.env`).
 * La conexión global a la base de datos se realiza a través de `global.db`, que está configurada como una promesa.
 *
 */
const mysql = require("mysql2");
/**
 * Crea un pool de conexiones MySQL con los parámetros de configuración proporcionados en las variables de entorno.
 *
 * @type {mysql2.Pool}
 * @property {string} host - La dirección del host de la base de datos.
 * @property {string} user - El nombre de usuario para la conexión a la base de datos.
 * @property {string} database - El nombre de la base de datos a la que se va a conectar.
 * @property {number} port - El puerto de la base de datos.
 * @property {string} password - La contraseña del usuario de la base de datos.
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
});
/**
 * Establece la conexión global a la base de datos como una promesa.
 *
 * @global
 * @type {Promise<mysql2.Pool>}
 */

global.db = pool.promise();
