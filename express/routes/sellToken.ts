import { Router, Request, Response } from "express";
import Web3 from "web3";
import { abi as SaleAbi } from "../contracts/artifacts/SaleToken.json";
import dotenv from "dotenv";

import db from "../models/index";
import { where } from "sequelize";

dotenv.config();

const router = Router();

const { Token } = db;

router.post("/find", async (req: Request, res: Response) => {
  try {
    const { account } = req.body;
    console.log("게정지갑:", account);
    let data = await Token.findAll({
      where: {
        tokenOwner: account,
      },
    });

    if (data.length == 0) {
      res.send({ status: 201 });
    } else {
      res.send({ data, status: 200 });
    }
  } catch (error) {
    console.log(error);
  }

  //   console.log(data);
});

router.post("/tokendata", async (req: Request, res: Response) => {
  try {
    const { tokenId } = req.body;

    let data = await Token.findOne({
      where: {
        tokenId: tokenId,
      },
    });

    res.send({ data });
  } catch (error) {
    console.log(error);
  }
});

export default router;
