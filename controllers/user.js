const User = require("../model/user");
const handleError = require("../utils/errorHandler");

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json({ data: users });
    })
    .catch((error) => {
      handleError(error, next);
    });
};

exports.createUser = (req, res, next) => {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const user = new User({
    name: name,
    lastName: lastName,
  });
  user
    .save()
    .then((user) => {
      res.status(201).json({
        message: "User created successfully!",
        data: user,
      });
    })
    .catch((err) => {
      handleError(error, next);
    });
};
