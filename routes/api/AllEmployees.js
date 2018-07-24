// import allEmployeeAPI from "../../client/src/utils/allEmployeeAPI";

const router = require("express").Router();
const allEmployeeAPI = require("../../controllers/allEmployeeController");

// Matches with "/api/books"
router.route("/")
    .get(allEmployeeAPI.findAll)
    .post(allEmployeeAPI.create);

// Matches with "/api/books/:id"
router
    .route("/:id")
    .get(allEmployeeAPI.findById)
    .put(allEmployeeAPI.update)
    .delete(allEmployeeAPI.remove);

module.exports = router;

