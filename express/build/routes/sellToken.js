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
import Web3 from "web3";
import SaleToken from "../contracts/artifacts/SaleToken.json" assert { "type": "json" };
import NftToken from "../contracts/artifacts/NftToken.json" assert { "type": "json" };
import dotenv from "dotenv";
import { BigNumber } from "@ethersproject/bignumber";
import db from "../models/index.js";
const SaleAbi = SaleToken.abi;
const NftAbi = NftToken.abi;
const web3 = new Web3(
  "wss://goerli.infura.io/ws/v3/417c70b502174e5cb15ef580dae6b3d8"
);
dotenv.config();
const router = Router();
const { Token } = db;
router.post("/find", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { name } = req.body;
      let data = yield Token.findOne({
        where: {
          name: name,
        },
      });
      if (data.length == 0) {
        res.send({ status: 201 });
      } else {
        res.send({ data, status: 200 });
      }
    } catch (error) {
      console.log(error);
    }
  })
);
router.post("/tokendata", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { name } = req.body;
      let data = yield Token.findOne({
        where: {
          name: name,
        },
      });
      res.send({ data });
    } catch (error) {
      console.log(error);
    }
  })
);
router.post("/approve", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const deployed = new web3.eth.Contract(NftAbi, process.env.NFT_CA);
      const approve = {
        data: "",
        to: "",
        from: "",
      };
      approve.data = yield deployed.methods
        .setApprovalForAll(process.env.SALE_CA, true)
        .encodeABI();
      approve.to = process.env.NFT_CA;
      approve.from = req.body.account;
      res.send(approve);
    } catch (error) {
      console.log(error);
    }
  })
);
router.post("/listing", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { ethValue, tokendata, account } = req.body;
      const bigNumberValue = BigNumber.from(
        Math.floor(ethValue * Math.pow(10, 18)).toString()
      );
      const saledeployed = new web3.eth.Contract(SaleAbi, process.env.SALE_CA);
      let saletoken = yield saledeployed.methods
        .SalesToken(tokendata.tokenId, bigNumberValue)
        .encodeABI();
      const obj = {
        to: "",
        from: "",
        data: "",
      };
      obj.to = process.env.SALE_CA;
      obj.from = account;
      obj.data = saletoken;
      res.send(obj);
    } catch (error) {
      console.log(error);
    }
  })
);
router.post("/update", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { ethValue, tokendata, account } = req.body;
      let data = yield Token.update(
        {
          price: ethValue,
          saleState: 1,
        },
        { where: { tokenId: tokendata.tokenId } }
      );
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  })
);
router.post("/cancle", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { tokenId, tokenOwner } = req.body.tokendata;
    const saledeployed = new web3.eth.Contract(SaleAbi, process.env.SALE_CA);
    let cancletoken = yield saledeployed.methods
      .cancelSaleToken(tokenId)
      .encodeABI();
    const obj = {
      to: "",
      from: "",
      data: "",
    };
    obj.to = process.env.SALE_CA;
    obj.from = tokenOwner;
    obj.data = cancletoken;
    res.send(obj);
  })
);
router.post("/cancleUpdate", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { tokenId } = req.body.tokendata;
    let data = yield Token.update(
      {
        price: 0,
        saleState: 0,
      },
      { where: { tokenId: tokenId } }
    );
    res.send(data);
  })
);
export default router;
