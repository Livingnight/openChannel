const router = require("express").Router();
const goalRoutes = require("./goals");
const itemRoutes = require("./items");
const userRoutes = require ("./users");


router.use("/goals", goalRoutes );
router.use("/items", itemRoutes);
router.use("/users", userRoutes);

module.exports = router;
