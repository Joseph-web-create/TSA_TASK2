import express, { json } from "express";
import createHttpError, { isHttpError } from "http-errors";
import userRoutes from "./src/routes/user.js";
import postRoute from "./src/routes/post.js";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://tsa-internship-task-3-fr6m.vercel.app",
  ],
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
};

app.use(json({ limit: "25mb" })); //parses requests to client side in json body format
app.use(express.json());
app.use(cors(corsOptions)); //allows external origin points to communicate with server
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.disable("x-powered-by"); //disable tech stack

app.get("/", (_, res) => {
  res.send("Hi TSA");
});

app.use("/api/auth", userRoutes);
app.use("/api/post", postRoute);

//handle route errors
app.use((req, _, next) => {
  return next(createHttpError(404, `Route ${req.originalUrl} not found`));
});

app.use((error, req, res, next) => {
  console.error(error);
  let errorMessage = "Internal Server Error";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: error.message });
});

export default app;
