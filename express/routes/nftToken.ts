import { Router, Request, Response } from "express";
import Web3 from "web3";
import pinataSDK from "@pinata/sdk";
import { AbiItem } from "web3-utils";
import dotenv from "dotenv";

import { abi as NftAbi } from "../contracts/artifacts/NftToken.json";
import { abi as SaleAbi } from "../contracts/artifacts/SaleToken.json";
import dummyDataList from "../data/dummyData.json";
import Token from "../models/token";
import SaleToken from "../models/saleToken";

dotenv.config();

const web3 = new Web3(
  "wss://goerli.infura.io/ws/v3/2ca09ab04a7c44dcb6f886deeba97502"
);

const router = Router();

interface tokenData {
  tokenId: number;
  ca?: string;
  tokenImage?: string;
  blockChain?: string;
  tokenOwner?: string;
  tokenBase?: string;
  name: string;
  description: string;
  atrributes?: Array<{ trait_type: string; value: number }>;
}

let obj: {
  to?: string;
  from?: string;
  data?: string;
  ca?: string;
  price?: number | string;
} = {
  to: "",
  from: "",
  data: "",
  ca: "",
  price: 0,
};

router.post("/detail", async (req: Request, res: Response) => {
  const { tokenId }: { tokenId: number } = req.body;
  const tempData: tokenData = await Token.findOne({ where: { tokenId } });
  res.send(tempData);
});

router.post("/buyToken", async (req: Request, res: Response) => {
  const { account, tokenId, tokenOwner } = req.body;
  const checkToken = await SaleToken.findOne({ where: { tokenId } });
  if (checkToken) return res.status(202).send({ msg: "already Bought Token" });

  const saleDeployed = new web3.eth.Contract(
    SaleAbi as AbiItem[],
    process.env.SALE_CA
  );

  obj.from = account;
  obj.to = process.env.SALE_CA;
  obj.data = saleDeployed.methods.PurchaseToken(tokenId).encodeABI();

  res.send(obj);
});

router.post("/approve", async (req: Request, res: Response) => {
  const { tokenOwner, tokenId } = req.body;
  const deployed = new web3.eth.Contract(
    SaleAbi as AbiItem[],
    process.env.SALE_CA
  );

  let tempPrice: number = 1000000000000000;

  obj.from = tokenOwner;
  obj.to = process.env.SALE_CA;
  obj.data = deployed.methods
    .setApprovalForAll(process.env.SALE_CA, true)
    .encodeABI();

  res.send(obj);
});

router.post("/updateList", async (req: Request, res: Response) => {
  const { tokenId, account, tokenOwner } = req.body;

  const tempToken = await Token.findOne({ where: { tokenId } });

  await SaleToken.create({
    from: tokenOwner,
    to: account,
    price: tempToken.price,
    ca: tempToken.ca,
    tokenId,
  });

  res.end();
});

router.post("/sale", async (req: Request, res: Response) => {
  const { tokenOwner, tokenId } = req.body;
  const deployed = new web3.eth.Contract(
    SaleAbi as AbiItem[],
    process.env.SALE_CA
  );

  let tempPrice: number = 1000000000000000;

  obj.from = tokenOwner;
  obj.to = process.env.SALE_CA;
  obj.data = deployed.methods.saleToken(tokenId, tempPrice).encodeABI();

  res.send(obj);
});
export default router;
