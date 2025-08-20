import bcrypt from "bcryptjs";
import User from "../models/user.js";
import createHttpError from "http-errors";
import { generateAccessToken } from "../config/generateJWT.js";

export const registerUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body; //get info from client via form
  try {
    if (!firstName || !lastName || !email || !password) {
      return next(createHttpError(400, "All Fields are required"));
    }
    //check if user already exists in db
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return next(createHttpError(409, "Email already exists"));
    }
    //proceed to register user if user dont exists
    const salt = await bcrypt.genSalt(10); //encryption mechanism for to handle password
    const hashedPassword = await bcrypt.hash(password, salt); //encrypt the user password
    //proceed to create the user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      ConfirmPassword: hashedPassword,
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

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(createHttpError(400, "Username or password is missing"));
    }
    //find user - password is hidden by default, using select method brings it back
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(createHttpError(404, "Account not found"));
    }
    //handle password check
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createHttpError(401, "Invalid credentials"));
    }

    const safeUser = await User.findById(user._id).select("-password");

    //if all checks out, genrate and send accessToken
    const accessToken = generateAccessToken(user._id, user.role);
    res.status(200).json({
      success: true,
      accessToken,
      message: `Welcome ${user.name}`,
      safeUser,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  const userId = req.user.id;
  try {
    if (!userId) return next(createHttpError(400, "User not found"));
    const user = await User.findById(userId);
    if (!user) return next(404, "user does not exits");
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const changeToAdmin = async (req, res, next) => {
  const { role } = req.body;

  const { id } = req.params;
  try {
    if (!role) return next(createHttpError(400, "Role is requires"));

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return next(createHttpError(404, "User not found"));
    }

    res
      .status(200)
      .json({ success: true, message: "Role changed", user: updatedUser });
  } catch (error) {
    next(error);
  }
};
