import { model, Schema } from "mongoose";
import { emailValidator } from "../../utils/utils";



const schema = {
  fullName: {
    type: String,
    maxLength: 30,
    minLength: 5,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    minLength: 5,
    maxLength: 16,
    required: true,
  },
  email: {
    type: String,
    maxLength: 80,
    minLength: 5,
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
    maxLength:14,
    minLength: 11,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "manager"],
    default: "manager",
  },
};

const userSchema = new Schema(schema, { timestamps: true });

userSchema.index({ username: 'text' }, { default_language: 'english' });

const User = model("User", userSchema);

export default User;
