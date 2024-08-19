const { validateAuthor, validateIdAuthor } = require("../helpers/schemaAuthor");
const modelAuthor = require("../model/autor");
const getAllAuthors = async (req, res) => {
  try {
    const [authors] = await modelAuthor.getAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

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
