const express = require("express");

const carServiceController = require('../controllers/carService');

const router = express.Router();

router.get("", carServiceController.getCarServices);

router.post("", carServiceController.createCarService);

module.exports = router;
