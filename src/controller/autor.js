/**
 * @module AuthorController
 *
 * Este módulo contiene los controladores para manejar las operaciones CRUD de autores.
 * Los métodos incluyen la obtención de todos los autores, la obtención de un autor por su ID,
 * la creación, actualización, eliminación y alta de autores en la base de datos.
 *
 * @requires ../helpers/schemaAuthor
 * @requires ../model/autor
 */
const { validateAuthor, validateIdAuthor } = require("../helpers/schemaAuthor");
const modelAuthor = require("../model/autor");

/**
 * Obtiene todos los autores de la base de datos.
 *
 * @async
 * @function getAllAuthors
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {JSON} Lista de autores en formato JSON.
 */
const getAllAuthors = async (req, res) => {
  try {
    const [authors] = await modelAuthor.getAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Obtiene un autor por su ID.
 *
 * @async
 * @function getAuthorsById
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {JSON} Información del autor en formato JSON.
 */

const getAuthorsById = async (req, res) => {
  try {
    const { idAutor } = req.params;
    const [author] = await modelAuthor.getAuthorById(idAutor);

    if (author.length === 0)
      return res
        .status(200)
        .json({ message: "Error, el autor no se encuentra en la BBDD" });

    res.status(200).json(author[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Crea un nuevo autor en la base de datos.
 *
 * @async
 * @function createAuthor
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {JSON} Información del autor creado en formato JSON.
 */

const createAuthor = async (req, res) => {
  try {
    const result = validateAuthor(req.body);
    if (result.error)
      return res
        .status(422)
        .json({ message: JSON.parse(result.error.message) });
    const [idAuthor] = await modelAuthor.insertAuthor(req.body);

    const [author] = await modelAuthor.getAuthorById(idAuthor.insertId);

    res.status(200).json(author[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Actualiza un autor existente en la base de datos.
 *
 * @async
 * @function updateAuthor
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {JSON} Información del autor actualizado en formato JSON.
 */
const updateAuthor = async (req, res) => {
  try {
    const { idAutor } = req.params;

    const result = validateAuthor(req.body);
    if (result.error)
      return res
        .status(422)
        .json({ message: JSON.parse(result.error.message) });

    await modelAuthor.updateAuthor(idAutor, req.body);

    const [author] = await modelAuthor.getAuthorById(idAutor);

    res.status(200).json(author[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Elimina un autor de la base de datos.
 *
 * @async
 * @function deleteAuthor
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {JSON} Mensaje de confirmación en formato JSON.
 */
const deleteAuthor = async (req, res) => {
  try {
    const idAuthor = Number(req.params.idAutor);
    const validaId = validateIdAuthor(idAuthor);
    if (validaId.error)
      return res
        .status(422)
        .json({ message: JSON.parse(result.error.message) });

    await modelAuthor.deleteAuthor(idAuthor);
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Da de alta a un autor en la base de datos.
 *
 * @async
 * @function discharge
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {JSON} Información del autor dado de alta en formato JSON.
 */
const discharge = async (req, res) => {
  try {
    const idAuthor = Number(req.params.idAutor);
    const validaId = validateIdAuthor(idAuthor);
    if (validaId.error)
      return res
        .status(422)
        .json({ message: JSON.parse(result.error.message) });
    await modelAuthor.discharge(idAuthor);
    const [author] = await modelAuthor.getAuthorById(idAuthor);

    res.status(200).json(author[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = {
  getAllAuthors,
  getAuthorsById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  discharge,
};
