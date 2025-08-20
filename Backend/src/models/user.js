import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, //prevent this field from being sent to the client,
      minLength: [5, "Password must be at least 5 characters"],
    },
    ConfirmPassword: {
      type: String,
      required: [true, "Password is required"],
      select: false, //prevent this field from being sent to the client,
      minLength: [5, "Password must be at least 5 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"], //predefined values specified that must be picked from
      default: "user",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
