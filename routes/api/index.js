const router = require("express").Router();
const goalRoutes = require("./goals");
const itemRoutes = require("./items");
const userRoutes = require ("./AllEmployees");
const AllEmployeeItemRoutes = require('./AllEmployeeItems');


router.use("/goals", goalRoutes );
router.use("/items", itemRoutes);
router.use("/AllEmployees", userRoutes);
router.use('/AllEmployeeItems', AllEmployeeItemRoutes);

module.exports = router;
