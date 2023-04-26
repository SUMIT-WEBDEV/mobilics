const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

// app.use(bodyParser.json)
app.use(cors());
app.use(express.json({ extended: false }));

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () =>
  console.log("mongoDB connection established successfully!!")
);

const userRouter = require("./Routes/users");

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`ICANSIR app listening at http://localhost:${port}`);
});
