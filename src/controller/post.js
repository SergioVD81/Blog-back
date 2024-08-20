/**
 * @module PostController
 *
 * Este módulo contiene los controladores para manejar las operaciones CRUD de las publicaciones (posts).
 * Los métodos incluyen la obtención de todas las publicaciones, la obtención de una publicación por su ID,
 * la creación, actualización y eliminación de publicaciones en la base de datos.
 *
 * @requires ../model/post
 * @requires ../helpers/schemaPosts
 * @requires ../helpers/schemaAuthor
 */

const modelPost = require("../model/post");
const { validatePost } = require("../helpers/schemaPosts");
const { validateIdAuthor } = require("../helpers/schemaAuthor");

/**
 * Obtiene todas las publicaciones de la base de datos.
 *
 * @async
 * @function getPost
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {JSON} Lista de publicaciones en formato JSON.
 */
const getPost = async (req, res) => {
  try {
    const [result] = await modelPost.getAllPost();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Obtiene una publicación por su ID.
 *
 * @async
 * @function getPostById
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {JSON} Información de la publicación en formato JSON.
 */
const getPostById = async (req, res) => {
  try {
    const idpost = Number(req.params.idPost);
    const id = validateIdAuthor(idpost);

    if (id.error)
      return res.status(422).json({ message: JSON.parse(id.error.message) });
    const [post] = await modelPost.getPostById(idpost);
    if (post.length === 0)
      return res.status(422).json({
        message: "No se encuentra registro con el idpost introducido",
      });
    res.status(200).json(post[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Crea una nueva publicación en la base de datos.
 *
 * @async
 * @function createPost
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {JSON} Información de la publicación creada en formato JSON.
 */
const createPost = async (req, res) => {
  try {
    const idpost = Number(req.params.idPost);

    const id = validateIdAuthor(idpost);
    if (id.error)
      return res.status(422).json({ message: JSON.parse(id.error.message) });
    const body = validatePost(req.body);
    if (body.error)
      return res.status(422).json({ message: JSON.parse(body.error.message) });

    const [idInsertPost] = await modelPost.insertPost(idpost, req.body);

    const [post] = await modelPost.getPostById(idInsertPost.insertId);

    res.status(200).json(post[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Actualiza una publicación existente en la base de datos.
 *
 * @async
 * @function updatePost
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {JSON} Información de la publicación actualizada en formato JSON.
 */
const updatePost = async (req, res) => {
  try {
    const idpost = Number(req.params.idPost);

    const id = validateIdAuthor(idpost);
    if (id.error)
      return res.status(422).json({ message: JSON.parse(id.error.message) });

    const body = validatePost(req.body);
    if (body.error)
      return res.status(422).json({ message: JSON.parse(body.error.message) });

    await modelPost.updatePost(idpost, req.body);

    const [post] = await modelPost.getPostById(idpost);

    res.status(200).json(post[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Elimina una publicación de la base de datos.
 *
 * @async
 * @function deletePost
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {JSON} Mensaje de confirmación en formato JSON.
 */
const deletePost = async (req, res) => {
  try {
    const idpost = Number(req.params.idPost);

    const id = validateIdAuthor(idpost);
    if (id.error)
      return res.status(422).json({ message: JSON.parse(id.error.message) });
    const dev = await modelPost.deletePost(idpost);
    if (dev.affectedRows === 0)
      return res
        .status(422)
        .json({ message: "No se ha procesado la solicitud de borrado" });

    return res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getPost, getPostById, createPost, updatePost, deletePost };
