/**
 * @module Model/Post
 *
 * Este módulo maneja las operaciones de base de datos relacionadas con la entidad "post".
 * Proporciona funciones para obtener, insertar, actualizar y eliminar publicaciones.
 *
 * @requires module:db - Se refiere al módulo que maneja la conexión a la base de datos.
 */

/**
 * Obtiene todas las publicaciones, incluyendo la información del autor asociado,
 * siempre que el autor no haya sido eliminado lógicamente.
 *
 * @function getAllPost
 * @returns {Promise<Object[]>} - Promesa que resuelve con una lista de publicaciones, incluyendo los datos del autor.
 */
const getAllPost = () => {
  return db.query(`select a.name as nombre,
            a.email as Email,
            a.image as Imagen,
            p.title as Título,
            p.description as descripción,
            p.creation_date as 'Fecha de creación',
            p.category as Categoría
            from author as a
            join post as p on a.idauthor=p.author_idauthor
            where a.delete=1`);
};

/**
 * Obtiene una publicación específica por su ID, incluyendo la información del autor asociado,
 * siempre que el autor no haya sido eliminado lógicamente.
 *
 * @function getPostById
 * @param {number} idPost - El ID de la publicación.
 * @returns {Promise<Object[]>} - Promesa que resuelve con los datos de la publicación encontrada, incluyendo los datos del autor.
 */
const getPostById = (idPost) => {
  return db.query(
    `select a.name as nombre,
            a.email as Email,
            a.image as Imagen,
            p.title as Título,
            p.description as descripción,
            p.creation_date as 'Fecha de creación',
            p.category as Categoría
            from author as a
            join post as p on a.idauthor=p.author_idauthor
            where p.idpost=? and a.delete=1`,
    [idPost]
  );
};

/**
 * Inserta una nueva publicación en la base de datos, asociándola con un autor existente.
 *
 * @function insertPost
 * @param {number} idAuthor - El ID del autor asociado a la publicación.
 * @param {Object} post - Un objeto que contiene los datos de la publicación.
 * @param {string} post.title - El título de la publicación.
 * @param {string} post.description - La descripción de la publicación.
 * @param {string} post.category - La categoría de la publicación.
 * @returns {Promise<Object>} - Promesa que resuelve con el resultado de la inserción.
 */
const insertPost = (idAuthor, { title, description, category }) => {
  return db.query(
    " insert into post(title,description,category,author_idauthor) values(?,?,?,?)",
    [title, description, category, idAuthor]
  );
};

/**
 * Actualiza la información de una publicación existente.
 *
 * @function updatePost
 * @param {number} idPost - El ID de la publicación a actualizar.
 * @param {Object} post - Un objeto que contiene los nuevos datos de la publicación.
 * @param {string} post.title - El nuevo título de la publicación.
 * @param {string} post.description - La nueva descripción de la publicación.
 * @param {string} post.category - La nueva categoría de la publicación.
 * @returns {Promise<Object>} - Promesa que resuelve con el resultado de la actualización.
 */
const updatePost = (idPost, { title, description, category }) => {
  return db.query(
    "update post set title=? ,description=?,category=? where idpost=?",
    [title, description, category, idPost]
  );
};

/**
 * Elimina una publicación por su ID.
 *
 * @function deletePost
 * @param {number} idPost - El ID de la publicación a eliminar.
 * @returns {Promise<Object>} - Promesa que resuelve con el resultado de la eliminación.
 */
const deletePost = (idPost) => {
  return db.query("delete from post where idpost=?", [idPost]);
};

module.exports = {
  getAllPost,
  getPostById,
  insertPost,
  updatePost,
  deletePost,
};
