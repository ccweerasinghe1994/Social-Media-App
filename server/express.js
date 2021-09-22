import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import Template from "../template";
import userRoutes from "./routes/user.routes";
import AuthRoutes from "./routes/auth.routes.js";
import path from "path";
const CURRENT_WORKING_DIRECTORY = process.cwd();
// only for development
import devBundle from "./devBundle";
// ----------------------

const app = express();

// only for development
devBundle.compile(app);
// -----------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use("/", userRoutes);
app.use("/", AuthRoutes);

app.get("/", (req, res) => {
  res.status(200).send(Template());
});

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIRECTORY,'dist')));
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});
export default app;
