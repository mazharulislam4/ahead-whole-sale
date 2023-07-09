import { Schema, model } from "mongoose";

const schema = {
  productName: {
    type: String,
    minLength: [7, "Minimum 7 characters needed!"],
    maxLength: [255, "Maximum 255 characters allowed!"],
    required: true,
    trim: true,
  },
  productId: {
    type: String,
    required: true,
  },
  sellDate: {
    type: Date,
    default: Date.now,
  },
  model: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    min: 0,
    max: 8,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  productRef: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
};

const orderSchema = new Schema(schema);

orderSchema.index({ productName: "text" }, { default_language: "english" });

const Order = model("order", orderSchema);

export default Order;
