import express, { json } from "express";

const app = express();

app.use(json({ limit: "25mb" })); //parses requests to client side in json body format
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.disable("x-powered-by"); //disable tech stack

app.get("/", (_, res) => {
  res.send("Hi");
});

export default app;
