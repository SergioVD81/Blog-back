/**
 * @module LoggerConfig
 *
 * Este módulo configura el sistema de registro (logging) utilizando la librería Log4js.
 * Se crean dos loggers separados: uno para las operaciones relacionadas con autores y otro para publicaciones.
 * Los archivos de registro se generan en la carpeta `logs/` y se separan según la categoría del logger.
 *
 * @requires log4js
 */
const log4js = require("log4js");

log4js.configure({
  appenders: {
    multi: {
      type: "multiFile",
      base: "logs/",
      property: "categoryName",
      extension: ".log",
    },
  },
  categories: {
    default: { appenders: ["multi"], level: "debug" },
  },
});

/**
 * Logger para las operaciones relacionadas con autores.
 * Los registros se almacenarán en un archivo llamado `logs/author.log`.
 *
 * @type {Logger}
 */
const logAuthor = log4js.getLogger("author");

/**
 * Logger para las operaciones relacionadas con publicaciones (posts).
 * Los registros se almacenarán en un archivo llamado `logs/posts.log`.
 *
 * @type {Logger}
 */
const logPost = log4js.getLogger("posts");

module.exports = { logAuthor, logPost };
