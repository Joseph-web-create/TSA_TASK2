import bcrypt from "bcryptjs";
import User from "../models/user.js";
import createHttpError from "http-errors";
import { generateAccessToken } from "../config/generateJWT.js";

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body; //get info from client via form
  try {
    if (!name || !email || !password) {
      return next(createHttpError(400, "All Fields are required"));
    }
    //check if user already exists in db
    const [existingUsername, existingEmail] = await Promise.all([
      User.findOne({ name }),
      User.findOne({ email }),
    ]);
    if (existingUsername) {
      return next(createHttpError(409, "Username already exists"));
    }
    if (existingEmail) {
      return next(createHttpError(409, "Email already exists"));
    }
    //proceed to register user if user dont exists
    const salt = await bcrypt.genSalt(10); //encryption mechanism for to handle password
    const hashedPassword = await bcrypt.hash(password, salt); //encrypt the user password
    //proceed to create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const accessToken = generateAccessToken(user._id, user.role);
    //send a response to the client
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
