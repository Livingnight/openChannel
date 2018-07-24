// import allEmployeeAPI from "../../client/src/utils/allEmployeeAPI";

const router = require("express").Router();
const allEmployeeItemsAPI = require("../../controllers/allEmployeeItemController");

// Matches with "/api/books"
router.route("/")
    .get(allEmployeeItemsAPI.findAll)


// Matches with "/api/books/:id"
router
    .route("/:id")
    .post(allEmployeeItemsAPI.create)
    .get(allEmployeeItemsAPI.findById)
    .put(allEmployeeItemsAPI.update)
    .delete(allEmployeeItemsAPI.remove);

module.exports = router;