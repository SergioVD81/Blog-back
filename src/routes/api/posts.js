const router = require("express").Router();
const controllerPost = require("../../controller/post");
router.get("/", controllerPost.getPost);
router.get("/:idPost", controllerPost.getPostById);
router.post("/:idPost", controllerPost.createPost);
router.put("/:idPost", controllerPost.updatePost);
router.delete("/:idPost", controllerPost.deletePost);

module.exports = router;
