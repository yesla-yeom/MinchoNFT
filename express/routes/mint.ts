import { Router, Request, Response } from "express";
import pinataSDK from "@pinata/sdk";
import multer from "multer";
import Web3 from "web3";
// import WebsocketProvider from "web3-providers-ws";

// import axios from "axios";
import dotenv from "dotenv";
import { Readable } from "stream";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import fs from "fs";

import db from "../models/index";

import { abi as NftAbi } from "../contracts/artifacts/NftToken.json";

dotenv.config();

const router = Router();
const { Minting } = db;
// const _web3 = new Web3(window.ethereum);

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./upload/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const pinata = new pinataSDK(process.env.API_Key, process.env.API_Secret);
const upload: multer.Multer = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const web3 = new Web3(
  "wss://goerli.infura.io/ws/v3/2ca09ab04a7c44dcb6f886deeba97502"
);
let type = "";
// 형이 현재 있는 토큰들의 rank를 전부 받아서 배열로 만든다.
// let randomCorr =  rankArr.filter((item)=> item==randomnum)
// 길이가 0 아니면 1이 무조건 나온다.
// 길이가 0이면 => 아에 없는것 => 추가해도 되는 숫자
// 길이가 1이면 =>추가하면 안됨
// 길이가 1이면 =>다시 뽑는다
let rank = 0;

// if (rank == 0) {
//   Minting.findOne({ id: 1 }).then((data) => {
//     rank += 1;
//   });
// }

  let imgBuffer = fs.createReadStream(`./upload/${req.file.filename}`);

  const imgResult: {
    IpfsHash: string;
    PinSize: number;
    Timestamp: string;
    isDuplicate?: boolean;
  } = await pinata.pinFileToIPFS(Readable.from(imgBuffer), {
    pinataMetadata: {
      name: Date.now().toString(),
    },
    pinataOptions: {
      cidVersion: 0,
    },
  });
  if (imgResult.isDuplicate) {
    console.log("같은 이미지!");
  }
  console.log("imgResult", imgResult);
if (randomnum < 6) {
  type = "Legendary";
} else if (randomnum < 18) {
  type = "Epic";
} else if (randomnum < 36) {
  type = "Rare";
} else if (randomnum < 60) {
  type = "Uncommon";
} else type = "Common";
  const jsonResult = await pinata.pinJSONToIPFS(
    {
      name,
      description,
      image: `https://gateway.pinata.cloud/ipfs/${imgResult.IpfsHash}`,

    const imgResult: {
      IpfsHash: string;
      PinSize: number;
      Timestamp: string;
      isDuplicate?: boolean;
    } = await pinata.pinFileToIPFS(Readable.from(req.file.buffer), {
      pinataMetadata: {
        name: Date.now().toString(),
      },
      pinataOptions: {
        cidVersion: 0,
      },
    });
    if (imgResult.isDuplicate) {
      console.log("같은 이미지!");
    }
    console.log(imgResult);

    const jsonResult = await pinata.pinJSONToIPFS(
      {
        name,
        description,
        //   image: "https://gateway.pinata.cloud/ipfs/" + imgResult.IpfsHash,
        image: `https://gateway.pinata.cloud/ipfs/${imgResult.IpfsHash}`,
  // NftAbi as AbiItem[] NftAbi 이건 AbiItem[] 이형식갖고있다



  console.log("test");
  console.log(req.body.from);
  obj.nonce = await web3.eth.getTransactionCount(req.body.from);
  console.log("test2");
  obj.to = process.env.NFT_CA;
  obj.from = req.body.from;
  obj.data = deployed.methods.safeMint(jsonResult.IpfsHash).encodeABI();

  const temp = await deployed.methods.name().call();
  console.log("temp", temp);
);

router.post("/create", async (req: Request, res: Response) => {
  console.log("req.body는:", req.body.from);
  const saleDeployed = new web3.eth.Contract(
    SaleAbi as AbiItem[],
    process.env.SALE_CA
  );
  // console.log(await saleDeployed.methods.getLatestToken(req.body.from).call());

  // console.log(tokenIdGet);
  res.send({ msg: "잘가고있다" });
  // if (imgResult && jsonResult) {
  //   console.log(name);
  //   console.log(description);
  //   console.log(imgResult.IpfsHash);
  //   console.log(jsonResult.IpfsHash);
  //   await Minting.create({
  //     tokenId: 1,
  //     name: name,
  //     description: description,
  //     imgipfshash: imgResult.IpfsHash,
  //     jsonipfshash: jsonResult.IpfsHash,
  //   });
  // }
});

export default router;
