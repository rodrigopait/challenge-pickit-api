const mongoose = require("mongoose");
const service = require("./service");

const Schema = mongoose.Schema;

const carServiceSchema = new Schema(
  {
    carId: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

carServiceSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("CarService", carServiceSchema);
