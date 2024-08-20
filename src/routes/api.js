/**
 * @module Routes
 *
 * Este módulo configura las rutas principales de la aplicación.
 * Define las rutas para manejar los recursos relacionados con los autores y las publicaciones.
 *
 * @requires express.Router
 * @requires ./api/autor
 * @requires ./api/posts
 */
const router = require("express").Router();

router.use("/autores", require("./api/autor"));
router.use("/posts", require("./api/posts"));
module.exports = router;
