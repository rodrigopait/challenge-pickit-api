const mongoose = require("mongoose");
const Service = require("../../model/service");

const MONGODB_URI =
  "mongodb+srv://rodrigopait:4xlBHJtqhhY0Kxx1@cluster0.4ycgg.mongodb.net/pickit?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    Service.create([
      {
        name: "Cambio de Aceite",
        price: 300,
      },
      {
        name: "Cambio de Filtro",
        price: 400,
      },
      {
        name: "Cambio de Correa",
        price: 1000,
      },
      {
        name: "Revision general",
        price: 700,
      },
      {
        name: "Otro",
        price: 100,
      },
    ])
      .then(() => mongoose.connection.close())
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });
