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

const insertPost = (idAuthor, { title, description, category }) => {
  return db.query(
    " insert into post(title,description,category,author_idauthor) values(?,?,?,?)",
    [title, description, category, idAuthor]
  );
};

const updatePost = (idPost, { title, description, category }) => {
  return db.query(
    "update post set title=? ,description=?,category=? where idpost=?",
    [title, description, category, idPost]
  );
};

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
