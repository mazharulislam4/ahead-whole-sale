import { Schema, model } from "mongoose";

const schema = {
  productName: {
    type: String,
    minLength: [7, "Minimum 7 characters needed!"],
    maxLength: [255, "Maximum 255 characters allowed!"],
    required: true,
    trim: true,
  },
  category: [String],
  returnPeriod: {
    type: String,
    default: "12",
  },
  model: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    minLength: [20, "Minimum 20 characters needed!"],
    maxLength: [3000, "Maximum 255 characters allowed!"],
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userRef: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerRef: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  }
};


const productSchema = new Schema(schema)

productSchema.index({productName: "text"}, {default_language: "english"})

const product = model("Product", productSchema)

export default product; 