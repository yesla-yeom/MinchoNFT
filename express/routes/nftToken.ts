import { Router, Request, Response } from "express";
import Web3 from "web3";
import pinataSDK from "@pinata/sdk";
import { AbiItem } from "web3-utils";
import { Readable } from "stream";
import fs from "fs";
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
const pinata = new pinataSDK(process.env.API_Key, process.env.API_Secret);

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

router.post("/detail", async (req: Request, res: Response) => {
  const { tokenId }: { tokenId: number } = req.body;
  console.log(tokenId);
  const tempData: tokenData = await Token.findOne({ where: { tokenId } });
  console.log(tempData);
  res.send(tempData);
});

router.post("/buy", async (req: Request, res: Response) => {
  try {
    const {
      tokenId,
      name,
      description,
      tokenImage,
      ca,
      price,
      blockChainNetwork,
      tokenOwner,
      tokenBase,
    } = dummyDataList[req.body.tokenId];
    const checkToken = await SaleToken.findOne({ where: { tokenId } });
    if (checkToken) return res.status(202).send({ msg: "already Buy Token" });
    let imgName: string;
    let tempBuf: fs.ReadStream;
    if (!tokenImage.includes("imgs"))
      tempBuf = fs.createReadStream(`./upload/${tokenImage}`);

    imgName = tokenImage.slice(tokenImage.lastIndexOf("/") + 1);
    tempBuf = fs.createReadStream(`./upload/${imgName}`);

    const tempResult: {
      IpfsHash: string;
      PinSize: number;
      Timestamp: string;
      isDuplicate?: boolean;
    } = await pinata.pinFileToIPFS(Readable.from(tempBuf), {
      pinataMetadata: { name: Date.now().toString() },
      pinataOptions: { cidVersion: 0 },
    });
    console.log(tempResult);
    if (tempResult.isDuplicate) console.log("img dupli");

    const jsonResult = await pinata.pinJSONToIPFS(
      dummyDataList[req.body.tokenId],
      {
        pinataMetadata: { name: Date.now().toString() + ".json" },
        pinataOptions: { cidVersion: 0 },
      }
    );
    const deployed = new web3.eth.Contract(
      SaleAbi as AbiItem[],
      process.env.SALE_CA
    );

    const obj: { nonce: number; to: string; from: string; data: string } = {
      nonce: 0,
      to: "",
      from: "",
      data: "",
    };
    // obj.nonce = await web3.eth.getTransactionCount(req.body.from);
    obj.to = process.env.SALE_CA;
    obj.from = req.body.from;
    obj.data = deployed.methods.PurchaseToken(tokenId).encodeABI();

    const tempData = await Token.findOne({
      where: {
        tokenId: req.body.tokenId,
      },
    });
    if (!tempData) return res.status(201).send({ msg: "No this token" });

    await SaleToken.create({
      from: req.body.from,
      to: process.env.SALE_CA,
      price,
      ca,
      tokenId,
    });

    res.send({ msg: "success buy Token", obj });
  } catch (err) {
    console.log(err);
    res.send({ err });
  }
});

router.post("/buyToken", async (req: Request, res: Response) => {
  const { from, tokenId, tokenOwner } = req.body;
  const deployed = new web3.eth.Contract(
    SaleAbi as AbiItem[],
    process.env.SALE_CA
  );

  await deployed.methods.setApprovalForAll(process.env.SALE_CA, true).call();
  let tempPrice = web3.utils.toWei("0.00001", "ether");

  const obj: {
    to: string;
    from: string;
    data: string;
  } = {
    to: "",
    from: "",
    data: "",
  };
  obj.from = tokenOwner;
  obj.to = from;
  obj.data = deployed.methods.PurchaseToken(tokenId).encodeABI();

  web3.eth
    .subscribe("logs", { address: process.env.SALE_CA })
    .on("data", (log) => {
      console.log("back", log);
    });

  res.send({ obj, price: tempPrice, ca: process.env.SALE_CA });
});
export default router;
