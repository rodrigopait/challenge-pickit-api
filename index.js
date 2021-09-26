const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const carRoutes = require("./routes/car");
const serviceRoutes = require("./routes/service");
const carServiceRoutes = require("./routes/carService");

const MONGODB_URI =
  "mongodb+srv://rodrigopait:4xlBHJtqhhY0Kxx1@cluster0.4ycgg.mongodb.net/pickit?retryWrites=true&w=majority";

const app = express();

app.use(bodyParser.json());

// allow cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/user", userRoutes);
app.use("/car", carRoutes);
app.use("/service", serviceRoutes);
app.use("/carService", carServiceRoutes);

// handler express
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(8000);
  })
  .catch((error) => {
    console.log(error);
  });
