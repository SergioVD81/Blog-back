const router = require("express").Router();

router.use("/autores", require("./api/autor"));
router.use("/posts", require("./api/posts"));
module.exports = router;
