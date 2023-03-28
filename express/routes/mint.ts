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
      console.log(req.file.filename);

      const { name, description }: { name: string; description: string } =
        req.body;

      console.log(name);

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
      console.log(imgResult);

      let dbTable = await Token.findAll({
        order: [["tokenId", "DESC"]],
      });
      // console.log("testtemp:", dbTable);

      if (dbTable.length == 0) {
        console.log("1");
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
        // console.log("2");

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
          // console.log(dbTable[i].rank);
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
      // console.log(tokenName);

      const jsonResult = await pinata.pinJSONToIPFS(
        {
          name,
          description,

          //   image: "https://gateway.pinata.cloud/ipfs/" + imgResult.IpfsHash,
          image: `https://gateway.pinata.cloud/ipfs/${imgResult.IpfsHash}`,

          attributes: [
            { trait_type: "Rank", value: lastRandomValue },
            { trait_type: "type", value: type },
            { trait_type: "price", value: price },
            { trait_type: "tokenName", value: tokenName },

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
      // console.log(jsonResult);

      // const deployed = new web3.eth.Contract(
      //   NftAbi as AbiItem[],
      //   process.env.NFT_CA
      // );
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
      // console.log(obj);
      // let tokenName = await deployed.methods.name().call();
      // console.log(tokenName);
      if (imgResult && jsonResult) {
        let dbTable = await Token.findAll({
          order: [["tokenId", "DESC"]],
        });

        if (dbTable.length == 0) {
          // console.log("1");
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
          // console.log("2");

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
            // console.log(dbTable[i].rank);
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
  // console.log("transactionResult:", transactionResult);
  let tokendata = transactionResult.logs[1].data;
  let totaldata = transactionResult.logs[2].data;
  let tokenId = parseInt(tokendata, 16);
  let totalsupply = parseInt(totaldata, 16);
  console.log(tokenId);

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
