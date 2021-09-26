const Service = require("../model/service");
const handleError = require("../utils/errorHandler");


exports.getServices = (req, res, next) => {
  Service.find()
    .then((services) => {
      res.status(200).json({ data: services });
    })
    .catch((error) => {
      handleError(error, next);
    });
};
