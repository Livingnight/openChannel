const router = require("express").Router();
const goalsController = require("../../controllers/goalsController");

// Matches with "/api/"
router.route("/")
    .get(goalsController.findAll)
    .post(goalsController.create);

router.route('/all')
    .get(goalsController.findAllEmployee);
router
    .route("/:id")
    .get(goalsController.findById)
    .put(goalsController.update)
    .delete(goalsController.remove);

module.exports = router;

