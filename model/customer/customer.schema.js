import { model, Schema } from "mongoose";
import { emailValidator } from "../../utils/utils.js";

const schema = {
  companyName: {
    type: String,
    minLength: [5, "Minimum 5 characters needed!"],
    maxLength: [80, "Maximum 80 characters allowed!"],
    required: true,
    trim: true,
  },
  email: {
    type: String,
    minLength: [5, "Minimum 5 characters needed!"],
    maxLength: [80, "Maximum 80 characters allowed!"],
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: function (email) {
        return emailValidator(email);
      },
      message: (prop) => `Invalid Email: ${prop.value}`,
    },
  },
  address: {
    type: String,
    minLength: [10, "Minimum 10 characters needed!"],
    maxLength: [255, "Maximum 255 characters allowed!"],
    required: true,
    trim: true,
  },
  purchaseOrder: {
    type: String,
    required: true,
  },
  userRef: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
};



const customerSchema = new Schema(schema, { timestamps: true });

customerSchema.index({ companyName: "text" }, { default_language: "english" });

const customer = model("Customer", customerSchema);

export default customer;
