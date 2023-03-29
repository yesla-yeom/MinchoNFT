import { Router, Request, Response } from "express";
import pinataSDK from "@pinata/sdk";
import multer from "multer";
import Web3 from "web3";
import fs from "fs";
import dotenv from "dotenv";
import { Readable } from "stream";
import { AbiItem } from "web3-utils";

import db from "../models/index";

import { abi as NftAbi } from "../contracts/artifacts/NftToken.json";
import { abi as SaleAbi } from "../contracts/artifacts/SaleToken.json";

const TOTALTOKENCOUNT: number = 1000;
const web3 = new Web3(
  "wss://goerli.infura.io/ws/v3/2ca09ab04a7c44dcb6f886deeba97502"
);

dotenv.config();

const router = Router();
const { Token } = db;
// const _web3 = new Web3(window.ethereum);
//res->file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/");
  },
  filename: (req, file, cb) => {
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    cb(null, file.originalname);
  },
});

const pinata = new pinataSDK(process.env.API_Key, process.env.API_Secret);
const upload: multer.Multer = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

let type: string = "";
// 형이 현재 있는 토큰들의 rank를 전부 받아서 배열로 만든다.
// let randomCorr =  rankArr.filter((item)=> item==randomnum)
// 길이가 0 아니면 1이 무조건 나온다.
// 길이가 0이면 => 아에 없는것 => 추가해도 되는 숫자
// 길이가 1이면 =>추가하면 안됨
// 길이가 1이면 =>다시 뽑는다
let rank: number = 0;
let lastRandomValue: number;
let price: number = 0;

let randomnum = Math.floor(Math.random() * 100);

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
    try {
      const { name, description }: { name: string; description: string } =
        req.body;

      let checkname = await Token.findAll({
        // order: [["name", "DESC"]],
      });

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
      }

      let dbTable = await Token.findAll({
        order: [["tokenId", "DESC"]],
      });

      if (dbTable.length == 0) {
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
        lastRandomValue = RandomValue;
      } else {
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

        for (let i = 0; i < dbTable.length; i++) {
          if (dbTable[i].rank != RandomValue) {
            lastRandomValue = RandomValue;
          } else {
            generateUniqueRandomValue();
          }
        }
      }
      const deployed = new web3.eth.Contract(
        NftAbi as AbiItem[],
        process.env.NFT_CA
      );
      let tokenName = await deployed.methods.name().call();

      const jsonResult = await pinata.pinJSONToIPFS(
        {
          name,
          description,

          image: `https://gateway.pinata.cloud/ipfs/${imgResult.IpfsHash}`,

          attributes: [
            { trait_type: "Rank", value: lastRandomValue },
            { trait_type: "type", value: type },
            { trait_type: "price", value: price },
            { trait_type: "tokenName", value: tokenName },
          ],
        },
        {
          pinataMetadata: {
            name: Date.now().toString() + ".json",
          },
          pinataOptions: {
            cidVersion: 0,
          },
        }
      );

      const obj: {
        to: string;
        from: string;
        data: string;
      } = {
        to: "",
        from: "",
        data: "",
      };
      obj.to = process.env.NFT_CA;
      obj.from = req.body.from;
      obj.data = deployed.methods.safeMint(jsonResult.IpfsHash).encodeABI();

      if (imgResult && jsonResult) {
        let dbTable = await Token.findAll({
          order: [["tokenId", "DESC"]],
        });

        if (dbTable.length == 0) {
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
          lastRandomValue = RandomValue;
        } else {
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

          for (let i = 0; i < dbTable.length; i++) {
            if (dbTable[i].rank != RandomValue) {
              lastRandomValue = RandomValue;
            } else {
              generateUniqueRandomValue();
            }
          }
        }

        await Token.create({
          blockChainNetwork: "Ethereum",
          tokenName: tokenName,
          tokenId: TOTALTOKENCOUNT,
          tokenImage: req.file.filename,
          name: name,
          description: description,
          imgIpfsHash: imgResult.IpfsHash,
          jsonIpfsHash: jsonResult.IpfsHash,
          tokenOwner: req.body.from,
          tokenStandard: "ERC-721",
          rank: lastRandomValue,
          saleState: 0,
          ca: process.env.NFT_CA,
          type: type,
          price: price,
          tokenAuthor: req.body.from,
        });
      }
      res.send(obj);
    } catch (error) {
      console.error(error);
    }
  }
);

router.post("/create", async (req: Request, res: Response) => {
  const { transactionResult } = req.body;
  let tokendata = transactionResult.logs[1].data;
  let totaldata = transactionResult.logs[2].data;
  let tokenId = parseInt(tokendata, 16);
  let totalsupply = parseInt(totaldata, 16);

  if (tokenId) {
    await Token.update(
      { tokenId: tokenId },
      { where: { tokenId: TOTALTOKENCOUNT } }
    );
    res.send({ msg: "잘가고있다" });
  } else {
    await Token.update({ tokenId: 0 }, { where: { tokenId: TOTALTOKENCOUNT } });
    res.send({ msg: "No update" });
  }
});
router.post("/destroy", async (req: Request, res: Response) => {
  await Token.destroy({
    where: {
      tokenId: 1000,
    },
  });
  res.send("cancle");
});
export default router;
