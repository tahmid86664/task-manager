const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("./db/connect");
const taskRoutes = require("./routes/tasks");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const port = process.env.PORT || 3000;

// middleware
app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/tasks", taskRoutes);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
// server will listen when there will no error in connecting mongodb
// after successfully connection of mongoDB then, server will listen
