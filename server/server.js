// only for dev env
import devBundle from "./devBundle";
import Template from "./../template";
import express from "express";
import path from "path";
import { info } from "console";
import { MongoClient } from "mongodb";
const CURRENT_WORKING_DIRECTORY = process.cwd();
const app = express();

// only for dev env
devBundle.compile(app);

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIRECTORY, "dist")));

app.get("/", (req, res) => {
  res.status(200).send(Template());
});

let port = process.env.PORT || 3000;

app.listen(port, function onstart(error) {
  info("server started on port %s", port);
});

const url =
  process.env.MONGODB_URI || "mongodb://localhost:27017/mernSimpleSetup";
MongoClient.connect(url, (err, db) => {
  console.log("Connected successfully to mongodb server");
  db.close();
});
