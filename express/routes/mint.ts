import { Router, Request, Response } from "express";

import pinataSDK from "@pinata/sdk";
import multer from "multer";
import Web3 from "web3";

// import axios from "axios";
import dotenv from "dotenv";
import db from "../models/index";
import { Readable } from "stream";
const router = Router();
const upload: multer.Multer = multer();
import { AbiItem } from "web3-utils";

dotenv.config();
const { Minting } = db;
import { abi as NftAbi } from "../contracts/artifacts/NftToken.json";
import { abi as SaleAbi } from "../contracts/artifacts/SaleToken.json";
// const web3 = new Web3("https://goerli.infura.io/v3");
// const web3 = new Web3("http://ganache.test.errorcode.help:8545");
const web3 = new Web3("http://localhost:8545");

const pinata = new pinataSDK(process.env.API_Key, process.env.API_Secret);

// let rankvalue = Math.floor(Math.random() * 10001);
// console.log(rankvalue);

router.post("/", upload.single("file"), async (req: Request, res: Response) => {
  const { name, description }: { name: string; description: string } = req.body;

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
        { trait_type: "Rank", value: 1 },
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

  const saledeployed = new web3.eth.Contract(
    SaleAbi as AbiItem[],
    process.env.SALE_CA
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
  obj.data = deployed.methods.mintToken(jsonResult.IpfsHash).encodeABI();

  console.log(obj);
  console.log("2");
  //   //   res.send(obj);
  if (imgResult && jsonResult) {
    console.log(name);
    console.log(description);
    console.log(imgResult.IpfsHash);
    console.log(jsonResult.IpfsHash);
    console.log(req.body.from);

    await Minting.create({
      tokenId: 1,
      name: name,
      description: description,
      imgipfshash: imgResult.IpfsHash,
      jsonipfshash: jsonResult.IpfsHash,
      from: req.body.from,
      rank: 1,
    });
  }
  res.send(obj);
});

export default router;
