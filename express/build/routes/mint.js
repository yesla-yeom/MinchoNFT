var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { Router } from "express";
import pinataSDK from "@pinata/sdk";
import multer from "multer";
import Web3 from "web3";
import fs from "fs";
import dotenv from "dotenv";
import { Readable } from "stream";
import db from "../models/index.js";
import NftToken from "../contracts/artifacts/NftToken.json" assert { "type": "json" };
const TOTALTOKENCOUNT = 1000;
const NftAbi = NftToken.abi;
const web3 = new Web3(
  "wss://goerli.infura.io/ws/v3/2ca09ab04a7c44dcb6f886deeba97502"
);
dotenv.config();
const router = Router();
const { Token } = db;
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
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
let type = "";
let rank = 0;
let lastRandomValue;
let price = 0;
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
router.post("/minting", upload.single("file"), (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { name, description } = req.body;
      let checkname = yield Token.findAll({
        where: { name },
      });
      if (checkname.length > 0) {
        res.send("same name");
      } else {
        let imgBuffer = fs.createReadStream(`./upload/${req.file.filename}`);
        const imgResult = yield pinata.pinFileToIPFS(Readable.from(imgBuffer), {
          pinataMetadata: {
            name: Date.now().toString(),
          },
          pinataOptions: {
            cidVersion: 0,
          },
        });
        if (imgResult.isDuplicate) {
        }
        let dbTable = yield Token.findAll({
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
        const deployed = new web3.eth.Contract(NftAbi, process.env.NFT_CA);
        let tokenName = yield deployed.methods.name().call();
        const jsonResult = yield pinata.pinJSONToIPFS(
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
        const obj = {
          to: "",
          from: "",
          data: "",
        };
        obj.to = process.env.NFT_CA;
        obj.from = req.body.from;
        obj.data = deployed.methods.safeMint(jsonResult.IpfsHash).encodeABI();
        if (imgResult && jsonResult) {
          let dbTable = yield Token.findAll({
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
          yield Token.create({
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
      }
    } catch (error) {
      console.error(error);
    }
  })
);
router.post("/create", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { transactionResult } = req.body;
    let tokendata = transactionResult.logs[1].data;
    let totaldata = transactionResult.logs[2].data;
    let tokenId = parseInt(tokendata, 16);
    let totalsupply = parseInt(totaldata, 16);
    if (tokenId) {
      yield Token.update(
        { tokenId: tokenId },
        { where: { tokenId: TOTALTOKENCOUNT } }
      );
      res.send({ msg: "잘가고있다" });
    } else {
      yield Token.update(
        { tokenId: 0 },
        { where: { tokenId: TOTALTOKENCOUNT } }
      );
      res.send({ msg: "No update" });
    }
  })
);
router.post("/destroy", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield Token.destroy({
      where: {
        tokenId: 1000,
      },
    });
    res.send("cancle");
  })
);
export default router;
