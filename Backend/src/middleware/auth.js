import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

export const verifyToken = async (req, res, next) => {
  //extract token from req.headers
  const { authorization: token } = req.headers;
  if (!token) {
    return next(createHttpError(403, "You are unathenticated!"));
  }
  //if token does not begin with the word - Bearer
  if (!token.startsWith("Bearer")) {
    return next(createHttpError(401, "Token format is invalid"));
  }
  //remove bearer word from token
  const extractedToken = token.split(" ")[1];
  try {
    //verify token using jwt
    const decodedToken = jwt.verify(extractedToken, process.env.JWT_SECRET_KEY);
    //assign our decodedToken to req.user
    req.user = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
};

//authorised roles
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ status: "error", message: "Forbidden" });
  next();
};
