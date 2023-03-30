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
import dotenv from "dotenv";
import SaleToken from "../contracts/artifacts/SaleToken.json" assert { "type": "json" };
import Token from "../models/token.js";
import TransactionLog from "../models/transactionLog.js";
import Likes from "../models/likes.js";
const SaleAbi = SaleToken.abi;
dotenv.config();
const web3 = new Web3(
  "wss://goerli.infura.io/ws/v3/2ca09ab04a7c44dcb6f886deeba97502"
);
const router = Router();
let obj = {
  to: "",
  from: "",
  data: "",
};
router.post("/detail", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { tokenId } = req.body;
      const detailData = yield Token.findOne({ where: { tokenId } });
      res.send(detailData);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  })
);
router.post("/buyToken", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { account, tokenId, price } = req.body;
    const saleDeployed = new web3.eth.Contract(SaleAbi, process.env.SALE_CA);
    obj.from = account;
    obj.to = process.env.SALE_CA;
    obj.data = yield saleDeployed.methods.PurchaseToken(tokenId).encodeABI();
    obj.value = price * Math.pow(10, 18);
    res.send(obj);
  })
);
router.post("/updateList", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { tokenId, account } = req.body;
      const tempToken = yield Token.findOne({ where: { tokenId } });
      yield TransactionLog.create({
        from: tempToken.tokenOwner,
        to: account,
        price: tempToken.price,
        ca: tempToken.ca,
        tokenId,
      });
      yield Token.update(
        { price: 0, saleState: 0, tokenOwner: account },
        { where: { tokenId } }
      );
      res.end();
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  })
);
router.post("/txLog", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { tokenId } = req.body;
      const txLogInfo = yield TransactionLog.findOne({ where: { tokenId } });
      if (!txLogInfo) res.send({ status: 201 });
      else res.send({ txLogInfo, status: 200 });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  })
);
router.post("/like", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { account, tokenId } = req.body;
      const tempLike = yield Likes.findOne({
        where: { likeFrom: account, likeTokenId: tokenId },
      });
      if (tempLike) {
        yield Token.increment("likeCount", {
          by: -1,
          where: { tokenId },
        });
        yield Likes.destroy({
          where: { likeFrom: account, likeTokenId: tokenId },
        });
        res.send({ status: 201 });
      } else {
        yield Token.increment("likeCount", {
          by: 1,
          where: { tokenId },
        });
        yield Likes.create({ likeFrom: account, likeTokenId: tokenId });
        res.send({ status: 200 });
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  })
);
router.post("/likeState", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { account, tokenId } = req.body;
      const tempLike = yield Likes.findOne({
        where: { likeFrom: account, likeTokenId: tokenId },
      });
      if (tempLike) res.send({ status: 201 });
      else res.send({ status: 202 });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  })
);
router.post("/likeCount", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { tokenId } = req.body;
      const tempCount = yield Token.findOne({
        where: { tokenId },
        attributes: ["likeCount"],
      });
      res.send(tempCount);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  })
);
export default router;
