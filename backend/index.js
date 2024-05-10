//.env
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const products = require("./products");

//Routes
const register = require("./routes/register");
const login = require("./routes/login");

//Declare vars
const port = process.env.PORT || 5000;
const mongo_uri = process.env.MONGODB_URI;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/register", register);

app.use("/api/login", login);

app.get("/", (req, res) => {
  res.send(`Welcome to shop api`);
});

app.get("/products", (req, res) => {
  res.send(products);
});

mongoose
  .connect(`${mongo_uri}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB Server");
    app.listen(port, console.log(`Server running on port ${port}`));
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
