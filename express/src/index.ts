import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "../models/index";
import routes from "../routes/index";

const app: Express = express();

dotenv.config();

app.use("/upload", express.static("upload"));
app.use(cors({ origin: true, credential: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/api", routes);

app.listen(8080, () => {
  console.log("Server Opened");
});
