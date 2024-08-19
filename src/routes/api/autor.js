const router = require("express").Router();
const authorController = require("../../controller/autor");

router.get("/", authorController.getAllAuthors);
router.get("/:idAutor", authorController.getAuthorsById);
router.get("/discharge/:idAutor", authorController.discharge);

router.post("/", authorController.createAuthor);

router.put("/:idAutor", authorController.updateAuthor);

router.delete("/:idAutor", authorController.deleteAuthor);

module.exports = router;
