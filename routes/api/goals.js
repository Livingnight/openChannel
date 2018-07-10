const router = require("express").Router();
const goalsController = require("../../controllers/goalsController");

// Matches with "/api/books"
router.route("/Goals")
    .get(goalsController.findAll)
    .post(goalsController.create);

// Matches with "/api/books/:id"
router
    .route("/Goals:id")
    .get(goalsController.findById)
    .put(goalsController.update)
    .delete(goalsController.remove);

module.exports = router;

