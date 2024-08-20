/**
 * @module Middleware/FileLogger
 *
 * Este módulo define y exporta un middleware para registrar información de las solicitudes HTTP.
 * Utiliza `log4js` para registrar información específica sobre autores y publicaciones en archivos de log diferentes.
 *
 * @requires dayjs
 * @requires module:helpers/file.log
 */

const dayjs = require("dayjs");
const { logAuthor, logPost } = require("../helpers/file.log");

/**
 * Middleware que registra información de las solicitudes HTTP en un archivo de log.
 * Registra la fecha, hora y método HTTP de la solicitud. Si la URL de la solicitud es "/posts",
 * se registra en el archivo de log de publicaciones; en caso contrario, se registra en el archivo de log de autores.
 *
 * @function fileAuthor
 * @param {Object} req - Objeto de solicitud (request) HTTP.
 * @param {Object} res - Objeto de respuesta (response) HTTP.
 * @param {Function} next - Función que pasa el control al siguiente middleware.
 */
const fileAuthor = (req, res, next) => {
  const date = dayjs().format("dddd-MM-YYYY  HH:mm:ss");
  if (req.url === "/posts") {
    logPost.info(`[Date: ${date}  Method:${req.method}] `);
  } else {
    logAuthor.info(`[Date: ${date}  Method:${req.method} ]`);
  }
  next();
};

module.exports = { fileAuthor };
