import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";



const app: Express = express();

dotenv.config();

app.use(cors({ origin: true, credential: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(8080, () => {
  console.log("Server Opened");
});
