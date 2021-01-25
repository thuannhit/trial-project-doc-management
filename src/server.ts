import mongoose from "mongoose";
import app from "./app";
import config from "./config";

// Make sure we are running node 10+
const [major, minor] = process.versions.node.split(".").map(parseFloat);
if (major < 10 || (major === 10 && minor <= 8)) {
  // tslint:disable-next-line:no-console
  console.log("Tracking node version");
  process.exit();
}

// Connect to our Database and handle any bad connections
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", (err) => {
  // tslint:disable-next-line:no-console
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

const server = app.listen(config.port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Express running → PORT ${config.port}`);
});

export default server;
