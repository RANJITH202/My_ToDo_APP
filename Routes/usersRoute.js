const express = require("express");
const router = express.Router();
const { getAllUsers, getUser, registerUser } = require("../Controllers/user-controller");

router.route("/getAllUsers").get(getAllUsers);

router.route("/getUser/:id").get(getUser);

router.route("/registerUser").post(registerUser);


module.exports = router;
