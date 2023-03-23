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
import { abi as SaleAbi } from "../contracts/artifacts/SaleToken.json";

const TOTALTOKENCOUNT: number = 1000;
const web3 = new Web3(
  "wss://goerli.infura.io/ws/v3/417c70b502174e5cb15ef580dae6b3d8"
);
// const web3 = new Web3("http://ganache.test.errorcode.help:8545");
// const web3 = new Web3("http://127.0.0.1:8545");

// wss://goerli-light.eth.linkpool.io/ws
// const web3 = new Web3(
//   new Web3.providers.HttpProvider("https://goerli.infura.io/v3")
// );

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

// Minting.findAll({
//   where: { id: req.body.id },
//   include: [
//     {
//       model: Individualuser_Info,
//       as: "RecruitInfo",
//     },
//   ],
// }).then((data) => {
//   res.send(data);
// });

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


router.post(
  "/minting",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const { name, description }: { name: string; description: string } =
        req.body;
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

      const deployed = new web3.eth.Contract(
        NftAbi as AbiItem[],
        process.env.NFT_CA
      );

      const obj: {
        // nonce: number;
        to: string;
        from: string;
        data: string;
      } = {
        // nonce: 0,
        to: "",
        from: "",
        data: "",
      };

      // let test = await web3.eth.getTransactionCount(req.body.from);
      // console.log(test);

      //   //   console.log("test2");
      obj.to = process.env.NFT_CA;
      obj.from = req.body.from;
      obj.data = deployed.methods.safeMint(jsonResult.IpfsHash).encodeABI();

      // let dd = web3.eth.abi.decodeParameter(testdecode, "");
      // console.log(dd);
      // let testone = await deployed.methods.totals().call();
      // console.log(testone);

      console.log(obj);
      // console.log("2");
      //   //   res.send(obj);
      //////////////////////////////
      let tokenName = await deployed.methods.name().call();
      console.log(tokenName);
      if (imgResult && jsonResult) {
        // console.log(name);
        // console.log(description);
        // console.log(imgResult.IpfsHash);
        // console.log(jsonResult.IpfsHash);
        // console.log(req.body.from);
        // let randomArray = await Minting.findAll({
        //   where: {},
        // });

        let randomArray = [];

        function generateUniqueRandomValue() {
          let value = Math.floor(Math.random() * 1000);
          while (randomArray.includes(value)) {
            value = Math.floor(Math.random() * 1000);
          }
          randomArray.push(value);
          return value;
        }

        let RandomValue = generateUniqueRandomValue();

        await Minting.create({
          tokenId: TOTALTOKENCOUNT,
          name: name,
          description: description,
          imgipfshash: imgResult.IpfsHash,
          jsonipfshash: jsonResult.IpfsHash,
          from: req.body.from,
          rank: RandomValue,
          type: type,
        });
      }
      /////////////////////
      // web3.eth
      //   .subscribe("logs", { address: process.env.NFT_CA })
      //   .on("data", (log) => {
      //     console.log(log);
      //     const params = [{ type: "uint", name: "tokenId" }];
      //     const value = web3.eth.abi.decodeLog(params, log.data, []);

      //     console.log(value);
      //   })
      //   .on("error", (error) => {
      //     console.error(error);
      //   });
      res.send(obj);
    } catch (error) {
      console.error(error);
    }
  }
);

router.post("/create", async (req: Request, res: Response) => {
  const { transactionResult } = req.body;
  // console.log("transactionResult:", transactionResult);
  let tokendata = transactionResult.logs[1].data;
  // let totaldata = transactionResult.logs[2].data;
  let tokenId = parseInt(tokendata, 16);
  // let totalsupply = parseInt(totaldata, 16);
  console.log(tokenId);
  // console.log(totalsupply);
  await Minting.update(
    { tokenId: tokenId },
    { where: { tokenId: TOTALTOKENCOUNT } }
  );

  // const saleDeployed = new web3.eth.Contract(
  //   SaleAbi as AbiItem[],
  //   process.env.SALE_CA
  // );

  // let tokenIdGet = await saleDeployed.methods.getLatestToken(req.body.from);

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
