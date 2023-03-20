import express, { Express } from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import path from "path";
import pinataSDK from "@pinata/sdk";
// import { Readable } from "stream";
import Web3 from "web3";
// import {AbiItem} from "web3-utils"
// import axios from "axios"

import db from "../models/index";
import routes from "../routes/index";

const app: Express = express();

app.use("/upload", express.static(path.join(__dirname, "uploads")));

dotenv.config();

const web3 = new Web3("http://ganache.test.errorcode.help:8545");

const pinata = new pinataSDK(process.env.API_Key, process.env.API_Secret);

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

const upload: multer.Multer = multer();

app.use("/api", routes);

app.listen(8080, () => {
  console.log("Server Opened");
});
