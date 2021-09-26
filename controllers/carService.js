const CarService = require("../model/carService");
const Service = require("../model/service");
const handleError = require("../utils/errorHandler");

exports.getCarServices = (req, res, next) => {
  CarService.find()
    .populate({
      path: "carId",
      populate: { path: "userId" },
    })
    .populate("services")
    .then((carServices) => {
      res.status(200).json({ data: carServices });
    })
    .catch((error) => {
      handleError(error, next);
    });
};

exports.createCarService = (req, res, next) => {
  const carId = req.body.carId;
  const servicesIds = req.body.services;
  Service.find({ _id: { $in: servicesIds } })
    .then((services) => {
      const price = req.body.total; // se podria mejorar calculando el precio en la api, validandolo
      const carService = new CarService({
        carId: carId,
        services: services,
        price: price,
      });
      carService
        .save()
        .then((carService) => {
          carService
            .populate({
              path: "carId",
              populate: { path: "userId" },
            })
            .populate("services")
            .then((carService) => {
              res.status(201).json({
                message: "carService created successfully!",
                data: carService,
              });
            });
        })
        .catch((err) => {
          handleError(error, next);
        });
    })
    .catch((err) => {
      handleError(error, next);
    });
};
