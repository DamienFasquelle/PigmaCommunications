const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/usersControllers");
const authController = require("../controllers/authControllers");
const { usersModel } = require("../Db/sequelize");

router.route("/").get(usersControllers.findAllUsers);
router.route("/signin").post(authController.signIn);
router.route("/login").post(authController.login);

module.exports = router;
