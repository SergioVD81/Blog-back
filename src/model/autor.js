/**
 * @module Model/Author
 *
 * Este módulo maneja las operaciones de base de datos relacionadas con la entidad "author".
 * Proporciona funciones para obtener, insertar, actualizar, eliminar y reactivar autores.
 *
 * @requires module:db - Se refiere al módulo que maneja la conexión a la base de datos.
 */

/**
 * Obtiene todos los autores que no han sido eliminados lógicamente.
 *
 * @function getAllAuthors
 * @returns {Promise<Object[]>} - Promesa que resuelve con una lista de objetos de autores.
 */
const getAllAuthors = () => {
  return db.query("select * from author as a where a.delete=1 ");
};

/**
 * Obtiene un autor por su ID, siempre que no haya sido eliminado lógicamente.
 *
 * @function getAuthorById
 * @param {number} id - El ID del autor.
 * @returns {Promise<Object[]>} - Promesa que resuelve con un array que contiene al autor encontrado.
 */
const getAuthorById = (id) => {
  return db.query(
    "select * from author as a where idauthor=? and a.delete=1 ",
    [id]
  );
};

/**
 * Inserta un nuevo autor en la base de datos.
 *
 * @function insertAuthor
 * @param {Object} author - Un objeto que contiene los datos del autor.
 * @param {string} author.name - El nombre del autor.
 * @param {string} author.email - El correo electrónico del autor.
 * @param {string} author.image - La URL de la imagen del autor.
 * @returns {Promise<Object>} - Promesa que resuelve con el resultado de la inserción.
 */

const insertAuthor = ({ name, email, image }) => {
  return db.query("insert into author(name,email,image)values(?,?,?)", [
    name,
    email,
    image,
  ]);
};

/**
 * Actualiza la información de un autor existente que no ha sido eliminado lógicamente.
 *
 * @function updateAuthor
 * @param {number} id - El ID del autor a actualizar.
 * @param {Object} author - Un objeto que contiene los nuevos datos del autor.
 * @param {string} author.name - El nuevo nombre del autor.
 * @param {string} author.email - El nuevo correo electrónico del autor.
 * @param {string} author.image - La nueva URL de la imagen del autor.
 * @returns {Promise<Object>} - Promesa que resuelve con el resultado de la actualización.
 */
const updateAuthor = (id, { name, email, image }) => {
  return db.query(
    "update author as a  set name=?, email=?,image=? where idauthor=? and a.delete=1",
    [name, email, image, id]
  );
};

/**
 * Elimina lógicamente un autor marcándolo como eliminado en la base de datos.
 *
 * @function deleteAuthor
 * @param {number} id - El ID del autor a eliminar.
 * @returns {Promise<Object>} - Promesa que resuelve con el resultado de la eliminación.
 */
const deleteAuthor = (id) => {
  return db.query(
    "update author as a set a.delete=0 where idauthor=? and a.delete=1",
    [id]
  );
};

/**
 * Reactiva un autor previamente eliminado lógicamente en la base de datos.
 *
 * @function discharge
 * @param {number} idAuthor - El ID del autor a reactivar.
 * @returns {Promise<Object>} - Promesa que resuelve con el resultado de la reactivación.
 */
const discharge = (idAuthor) => {
  return db.query("update author as a set a.delete=1 where idauthor=?", [
    idAuthor,
  ]);
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  insertAuthor,
  updateAuthor,
  deleteAuthor,
  discharge,
};
//  {
//     "title": "Los excesos de los jugadores de élite",
//     "description": "La gean mayoría de estos jugadores piensan que están por encima de la ley.",
//     "category": "De actualidad"
//   }
