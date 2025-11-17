const express = require("express");

const userController = require("../controllers/users.controller");
const router = express.Router();

router.get("/:email", userController.getUserByEmail);
router.post("/", userController.createUser);

module.exports = router;
