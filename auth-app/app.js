require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = process.env.port || 3000;
const passport = require("passport");
const bodyParser = require("body-parser");
require("./api/models/db");
require("./api/config/passport");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const apiRouter = require("./api/routes/index");

app.use(cookieParser());
app.use(passport.initialize());

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Auth app listening at http://localhost:${port}`)
);

//add cors
app.use("/api", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:9000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/api", apiRouter);
