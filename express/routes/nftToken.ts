import { Router, Request, Response } from "express";
import Web3 from "web3";
import pinataSDK from "@pinata/sdk";
import { AbiItem } from "web3-utils";
import { Readable } from "stream";
import { Buffer } from "buffer";

import { abi } from "../contracts/artifacts/NftToken.json";
import dummyDataList from "../data/dummyData.json";
import AllToken from "../models/allToken";
import BuyToken from "../models/buyToken";

const web3 = new Web3("http://127.0.0.1:8545");
// const web3 = new Web3("http://ganache.test.errorcode.help:8545");
const pinata = new pinataSDK(
  "4c64f4e382099ae14866",
  "a7b9d3c02c40095d07400a5a82fb09c6b201d0259faf79bfe21d5f0f51b4dc7c"
);

const router = Router();

interface tokenData {
  tokenId: number;
  CA?: string;
  price?: number;
  blockChain?: string;
  tokenOwner?: string;
  tokenBase?: string;
  name: string;
  description: string;
  image: string;
  atrributes?: Array<{ trait_type: string; value: number }>;
}

router.post("/detail", async (req: Request, res: Response) => {
  const { tokenId }: { tokenId: number } = req.body;
  const tempData: tokenData = await AllToken.findOne({ where: { tokenId } });
  res.send(tempData);
});

router.post("/buy", async (req: Request, res: Response) => {
  try {
    const {
      tokenId,
      name,
      description,
      imgSrc,
      CA,
      price,
      blockChain,
      tokenOwner,
      tokenBase,
    } = dummyDataList[req.body.tokenId];
    const checkToken = await BuyToken.findOne({ where: { tokenId } });
    if (checkToken) return res.status(202).send({ msg: "already Buy Token" });
    let tempBuf = Buffer.from(imgSrc, "utf-8");

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
      abi as AbiItem[],
      process.env.Nft_CA
    );

    const obj: { nonce: number; to: string; from: string; data: string } = {
      nonce: 0,
      to: "",
      from: "",
      data: "",
    };
    // obj.nonce = await web3.eth.getTransactionCount(req.body.from);
    obj.to = process.env.NFT_CA;
    obj.from = req.body.from;
    obj.data = deployed.methods.safeMint(jsonResult.IpfsHash).encodeABI();

    const tempData = await AllToken.findOne({
      where: {
        tokenId: req.body.tokenId,
      },
    });
    if (!tempData) return res.status(201).send({ msg: "No this token" });

    await BuyToken.create({
      tokenId,
      name,
      description,
      image: imgSrc,
      ca: CA,
      price,
      blockChain,
      tokenOwner,
      tokenBase,
      value: 1,
    });

    res.send({ msg: "success buy Token", obj });
  } catch (err) {
    console.log(err);
    res.send({ err });
  }
});

export default router;
