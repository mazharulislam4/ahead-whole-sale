import { Schema, model } from "mongoose";

const schema = {
  categoryName: {
    type: String,
    minLength: [7, "Minimum 7 characters needed!"],
    maxLength: [255, "Maximum 255 characters allowed!"],
    required: true,
    trim: true,
  },
  subCategory: [String],
  item: {
    type: String,
    unique: true,
  },
  productRef: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
};

const categorySchema = new Schema(schema);

categorySchema.index({ categoryName: "text" }, { default_language: "english" });

const Category = model("Category", categorySchema);

export default Category;