const getAllAuthors = () => {
  return db.query("select * from author as a where a.delete=1 ");
};

const getAuthorById = (id) => {
  return db.query(
    "select * from author as a where idauthor=? and a.delete=1 ",
    [id]
  );
};
const insertAuthor = ({ name, email, image }) => {
  return db.query("insert into author(name,email,image)values(?,?,?)", [
    name,
    email,
    image,
  ]);
};

const updateAuthor = (id, { name, email, image }) => {
  return db.query(
    "update author as a  set name=?, email=?,image=? where idauthor=? and a.delete=1",
    [name, email, image, id]
  );
};

const deleteAuthor = (id) => {
  return db.query(
    "update author as a set a.delete=0 where idauthor=? and a.delete=1",
    [id]
  );
};
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
