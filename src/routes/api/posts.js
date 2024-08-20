/**
 * @module Routes/Posts
 *
 * Este módulo maneja las rutas relacionadas con las operaciones CRUD de la entidad "posts".
 * Proporciona rutas para obtener, crear, actualizar, eliminar y restaurar posts.
 *
 * @requires express.Router
 * @requires controller/posts
 */

const router = require("express").Router();
const controllerPost = require("../../controller/post");

router.get("/", controllerPost.getPost);
router.get("/:idPost", controllerPost.getPostById);

router.post("/:idPost", controllerPost.createPost);

router.put("/:idPost", controllerPost.updatePost);

router.delete("/:idPost", controllerPost.deletePost);

module.exports = router;
