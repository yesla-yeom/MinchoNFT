import { Router, Request, Response } from "express";

import pinataSDK from "@pinata/sdk";
import multer from "multer";
import Web3 from "web3";
// import WebsocketProvider from "web3-providers-ws";

// import axios from "axios";
import dotenv from "dotenv";
import db from "../models/index";
import { Readable } from "stream";
const router = Router();
const upload: multer.Multer = multer();
import { AbiItem } from "web3-utils";
import NftContract from "../contracts/artifacts/NftToken.json";

// import { MetaMaskInpageProvider } from "@metamask/providers";

dotenv.config();
const { Minting } = db;
import { abi as NftAbi } from "../contracts/artifacts/NftToken.json";
import { abi as SaleAbi } from "../contracts/artifacts/SaleToken.json";
const web3 = new Web3("https://goerli.infura.io/v3");
// const web3 = new Web3("http://ganache.test.errorcode.help:8545");

// declare global {
//   interface Window {
//     ethereum?: MetaMaskInpageProvider;
//   }
// }

// const web3 = new Web3("http://localhost:8545");
// const _web3 = new Web3(window.ethereum);

// const provider = new WebsocketProvider("ws://localhost:8545");
// const web3 = new Web3(provider);

const pinata = new pinataSDK(process.env.API_Key, process.env.API_Secret);
let randomnum = Math.floor(Math.random() * 100);

// let rankvalue = Math.floor(Math.random() * 10001);
// console.log(rankvalue);
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

if (randomnum < 6) {
  type = "Legendary";
} else if (randomnum < 18) {
  type = "Epic";
} else if (randomnum < 36) {
  type = "Rare";
} else if (randomnum < 60) {
  type = "Uncommon";
} else type = "Common";

router.post(
  "/minting",
  upload.single("file"),
  async (req: Request, res: Response) => {
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

        attributes: [
          { trait_type: "Rank", value: rank },
          { trait_type: "type", value: type },
          // {
          //   trait_type: "BackGround",
          //   value: "Off White A",
          // },
          // {
          //   trait_type: "CLOTHING",
          //   value: "Azuki Tech Jacket",
          // },
          // { trait_type: "EYES", value: "Closed" },
          // {
          //   trait_type: "Level",
          //   value: 5,
          // },
          // {
          //   trait_type: "Stamina",
          //   value: 1.4,
          // },
          // {
          //   trait_type: "Personality",
          //   value: "Sad",
          // },
          // {
          //   display_type: "boost_number",
          //   trait_type: "Aqua Power",
          //   value: 40,
          // },
          // {
          //   display_type: "boost_percentage",
          //   trait_type: "Stamina Increase",
          //   value: 10,
          // },
          // {
          //   display_type: "number",
          //   trait_type: "Generation",
          //   value: 2,
          // },
          // {
          //   display_type: "date",
          //   trait_type: "birthday",
          //   value: 1546360800,
          // },
        ],
      },
      {
        pinataMetadata: {
          name: Date.now().toString() + ".json",
          //json파일이름
        },
        pinataOptions: {
          cidVersion: 0,
        },
      }
    );
    console.log(jsonResult);

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

    console.log(obj);
    // console.log("2");
    //   //   res.send(obj);
    if (imgResult && jsonResult) {
      // console.log(name);
      // console.log(description);
      // console.log(imgResult.IpfsHash);
      // console.log(jsonResult.IpfsHash);
      // console.log(req.body.from);

      await Minting.create({
        tokenId: 1,
        name: name,
        description: description,
        imgipfshash: imgResult.IpfsHash,
        jsonipfshash: jsonResult.IpfsHash,
        from: req.body.from,
        rank: rank,
        type: type,
      });
    }
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
  }
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
});

export default router;
