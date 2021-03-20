const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");


router.get("/", controller.getAllData);

router.get("/add", controller.addData);

router.post("/save", controller.saveData);

router.get("/edit/:userId", controller.getSpecificUser);

router.post("/update", controller.updateData);

router.get("/delete/:userId", controller.deleteData);


module.exports = router;
