
import config from "../config/config";
const CURRENT_WORKING_DIRECTORY = process.cwd();
import mongoose from "mongoose";

import app from "./express";

app.listen(config.port, (error) => {
  if (error) {
    console.log(error);
  }
  console.info("server started on port %s", config.port);
});

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});
