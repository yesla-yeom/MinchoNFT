import { Router, Request, Response } from "express";
import Web3 from "web3";
import { abi as SaleAbi } from "../contracts/artifacts/SaleToken.json";
import { abi as NftAbi } from "../contracts/artifacts/NftToken.json";
import dotenv from "dotenv";
import { AbiItem } from "web3-utils";
import { BigNumber } from "@ethersproject/bignumber";
import db from "../models/index";
import { where } from "sequelize";

const web3 = new Web3(
  "wss://goerli.infura.io/ws/v3/417c70b502174e5cb15ef580dae6b3d8"
);

dotenv.config();

const router = Router();

const { Token } = db;

router.post("/find", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    let data = await Token.findOne({
      where: {
        name: name,
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
});

router.post("/tokendata", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    let data = await Token.findOne({
      where: {
        name: name,
      },
    });

    res.send({ data });
  } catch (error) {
    console.log(error);
  }
});

router.post("/approve", async (req: Request, res: Response) => {
  try {
    const deployed = new web3.eth.Contract(
      NftAbi as AbiItem[],
      process.env.NFT_CA
    );
    const approve = {
      data: "",
      to: "",
      from: "",
    };

    approve.data = await deployed.methods
      .setApprovalForAll(process.env.SALE_CA, true)
      .encodeABI();
    approve.to = process.env.NFT_CA;
    approve.from = req.body.account;
    res.send(approve);
  } catch (error) {
    console.log(error);
  }
});

router.post("/listing", async (req: Request, res: Response) => {
  try {
    const { ethValue, tokendata, account } = req.body;
    const bigNumberValue = BigNumber.from(
      Math.floor(ethValue * 10 ** 18).toString()
    );

    const saledeployed = new web3.eth.Contract(
      SaleAbi as AbiItem[],
      process.env.SALE_CA
    );

    let saletoken = await saledeployed.methods
      .SalesToken(tokendata.tokenId, bigNumberValue)
      .encodeABI();
    const obj: {
      to: string;
      from: string;
      data: string;
    } = {
      to: "",
      from: "",
      data: "",
    };
    obj.to = process.env.SALE_CA;
    obj.from = account;
    obj.data = saletoken;

    res.send(obj);
  } catch (error) {
    console.log(error);
  }
});

router.post("/update", async (req: Request, res: Response) => {
  try {
    const { ethValue, tokendata, account } = req.body;

    let data = await Token.update(
      {
        price: ethValue,
        saleState: 1,
      },
      { where: { tokenId: tokendata.tokenId } }
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/cancle", async (req: Request, res: Response) => {
  const { tokenId, tokenOwner } = req.body.tokendata;

  const saledeployed = new web3.eth.Contract(
    SaleAbi as AbiItem[],
    process.env.SALE_CA
  );
  let cancletoken = await saledeployed.methods
    .cancelSaleToken(tokenId)
    .encodeABI();
  const obj: {
    to: string;
    from: string;
    data: string;
  } = {
    to: "",
    from: "",
    data: "",
  };
  obj.to = process.env.SALE_CA;
  obj.from = tokenOwner;
  obj.data = cancletoken;

  res.send(obj);
});

router.post("/cancleUpdate", async (req: Request, res: Response) => {
  const { tokenId } = req.body.tokendata;
  let data = await Token.update(
    {
      price: 0,
      saleState: 0,
    },
    { where: { tokenId: tokenId } }
  );
  res.send(data);
});

export default router;
