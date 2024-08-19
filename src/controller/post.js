const modelPost = require("../model/post");
const { validatePost } = require("../helpers/schemaPosts");
const { validateIdAuthor } = require("../helpers/schemaAuthor");
const getPost = async (req, res) => {
  try {
    const [result] = await modelPost.getAllPost();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getPostById = async (req, res) => {
  try {
    const idpost = Number(req.params.idPost);
    const id = validateIdAuthor(idpost);
    console.log(id);
    if (id.error)
      return res.status(422).json({ message: JSON.parse(id.error.message) });
    const [post] = await modelPost.getPostById(idpost);
    res.status(200).json(post[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

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

const deletePost = async (req, res) => {
  try {
    const idpost = Number(req.params.idPost);

    const id = validateIdAuthor(idpost);
    if (id.error)
      return res.status(422).json({ message: JSON.parse(id.error.message) });
    const dev = await modelPost.deletePost(idpost);
    console.log(dev);
    return res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getPost, getPostById, createPost, updatePost, deletePost };
