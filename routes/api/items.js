const router = require("express").Router();
const itemsController = require("../../controllers/itemsController");

// Matches with "/api/"
router.route("/")
    .get(itemsController.findAll)
    .post(itemsController.create);

// Matches with "/api/:id"
router
    .route("/:id")
    .get(itemsController.findById)
    .put(itemsController.update)
    .delete(itemsController.remove);

module.exports = router;

