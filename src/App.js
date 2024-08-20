/**
 * @module App
 *
 * Este módulo configura la aplicación Express y sus middleware.
 * Configura la aplicación para usar JSON y define las rutas para manejar las solicitudes.
 *
 * @requires express
 * @requires cors
 * @requires ./middleware/fileLogs
 * @requires ./routes/api
 */

const express = require("express");
const cors = require("cors");
const { fileAuthor } = require("./middleware/fileLogs");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", fileAuthor, require("./routes/api"));

module.exports = app;
