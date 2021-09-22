// only for dev env
import devBundle from "./devBundle";
// import Template from "./../template";
// import path from "path";
// import { MongoClient } from "mongodb";
import config from "../config/config";
const CURRENT_WORKING_DIRECTORY = process.cwd();
import mongoose from "mongoose";

import app from "./express";
// only for dev env
// devBundle.compile(app);

// app.use("/dist", express.static(path.join(CURRENT_WORKING_DIRECTORY, "dist")));

// app.get("/", (req, res) => {
//   res.status(200).send(Template());
// });

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
