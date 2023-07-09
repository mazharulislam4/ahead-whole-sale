import { model, Schema } from "mongoose";
import { emailValidator } from "../../utils/utils.js";

const schema = {
  fullName: {
    type: String,
    minLength: [5, "Minimum 5 characters needed!"],
    maxLength: [30, "Maximum 30 characters allowed!"],
    required: true,
    trim: true,
  },
  username: {
    type: String,
    minLength: [5, "Minimum 5 characters needed!"],
    maxLength: [16, "Maximum 16 characters allowed!"],
    required: true,
  },
  email: {
    type: String,
    minLength: [5, "Minimum 5 characters needed!"],
    maxLength: [80, "Maximum 80 characters allowed!"],
    required: true,
    trim: true,
    validate: {
      validator: function (email) {
        return emailValidator(email);
      },
      message: (prop) => `Invalid Email: ${prop.value}`,
    },
  },
  phone: {
    type: String,
    minLength: [11, "Minimum 11 characters needed!"],
    maxLength: [14, "Maximum 14 characters allowed!"],
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "manager"],
    default: "manager",
  },
  password: {
    type: String,
    minLength: [8, "Minimum 8 characters needed!"],
    // maxLength: 30,
    required: true,
  },
};

const userSchema = new Schema(schema, { timestamps: true });

userSchema.index({ username: "text" }, { default_language: "english" });

const User = model("User", userSchema);

export default User;
