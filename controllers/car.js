const Car = require("../model/car");
const handleError = require("../utils/errorHandler");

exports.getCars = (req, res, next) => {
  Car.find()
    .populate("userId")
    .then((cars) => {
      res.status(200).json({ data: cars });
    })
    .catch((error) => {
      handleError(error, next);
    });
};

exports.getCar = (req, res, next) => {
  const carId = req.params.carId;
  Car.findById(carId)
    .populate("userId")
    .then((car) => {
      if (!car) {
        const error = new Error("Could not find car.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ data: car });
    })
    .catch((error) => {
      handleError(error, next);
    });
};

exports.createCar = (req, res, next) => {
  const brand = req.body.brand;
  const model = req.body.model;
  const year = req.body.year;
  const licencePlate = req.body.licencePlate;
  const color = req.body.color;
  const userId = req.body.userId;
  const car = new Car({
    brand,
    model,
    year,
    licencePlate,
    color,
    userId,
  });
  car
    .save()
    .then((car) => {
      car.populate("userId").then((car) => {
        res.status(201).json({
          message: "Car created successfully!",
          data: car,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      handleError(error, next);
    });
};

exports.updateCar = (req, res, next) => {
  const carId = req.params.carId;
  const brand = req.body.brand;
  const model = req.body.model;
  const year = req.body.year;
  const licencePlate = req.body.licencePlate;
  const color = req.body.color;
  const userId = req.body.userId;
  Car.findById(carId)
    .then((car) => {
      if (!car) {
        const error = new Error("Could not find car.");
        error.statusCode = 404;
        throw error;
      }
      car.brand = brand;
      car.model = model;
      car.year = year;
      car.licencePlate = licencePlate;
      car.color = color;
      car.userId = userId;
      car.save().then((car) => {
        car.populate("userId").then((car) => {
          res.status(200).json({ message: "Car updated!", data: car });
        });
      });
    })
    .catch((err) => {
      handleError(error, next);
    });
};

exports.deleteCar = (req, res, next) => {
  const carId = req.params.carId;
  Car.findById(carId)
    .then((car) => {
      if (!car) {
        const error = new Error("Could not find car.");
        error.statusCode = 404;
        throw error;
      }
      return Car.findByIdAndRemove(carId);
    })
    .then((result) => {
      res.status(200).json({ message: "Deleted car." });
    })
    .catch((err) => {
      handleError(error, next);
    });
};
