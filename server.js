const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./Config/ConnectDb");
// for hosting perpose
const path = require("path");

// config dot env file
  dotenv.config();

// database connected
connectDb();

const app = express();
// middleware or '0to connected with forntend '
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Craeate routes
app.use("/api/v1/transection", require("./Routes/TranstionRoute"));
app.use("/api/v1/users", require("./Routes/UserRoute"));

// static files
// app.use(express.static(path.join(__dirname, "./client/build")));

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// Craete port
const PORT = 8000 || process.env.PORT;

// Lising on port

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
