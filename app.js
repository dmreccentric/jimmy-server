require("dotenv").config();
require("express-async-errors");

// const cors = require("cors");

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const connectDB = require("./db/connect");
const items = require("./routes/menu");
const authRouter = require("./routes/auth");
const verifyRouter = require("./routes/verify");
const editItems = require("./routes/edit-menu");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const authenticateUser = require("./middleware/authentication");

app.use(cookieParser());

//middleware
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://improved-danell-gentlebot-a7291aca.koyeb.app",
    ],
    credentials: true,
  })
);

//routes
app.use("/api/v1/menu", items);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/auth", verifyRouter);
app.use("/api/v1/admin", authenticateUser, editItems);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is running on port ${port}...`));
  } catch (error) {
    console.log("error is from the start function");
  }
};

start();
