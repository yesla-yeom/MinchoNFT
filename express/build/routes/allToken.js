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
import { Op } from "sequelize";
import dotenv from "dotenv";
import dummyDataList from "../data/dummyData.json" assert { "type": "json" };
import Token from "../models/token.js";
dotenv.config();
const pinata = new pinataSDK(process.env.API_Key, process.env.API_Secret);
const router = Router();
router.get("/list", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      let jsonResultArr = [];
      let result = [];
      for (let i = 0; i < dummyDataList.length; i++) {
        const tempToken = yield Token.findOne({
          where: { tokenId: dummyDataList[i].tokenId },
        });
        if (tempToken) continue;
        const tempResult = yield pinata.pinJSONToIPFS(dummyDataList[i], {
          pinataMetadata: { name: Date.now().toString() + ".json" },
          pinataOptions: { cidVersion: 0 },
        });
        jsonResultArr.push(tempResult);
        result.push(
          yield Token.create({
            tokenId: dummyDataList[i].tokenId,
            name: dummyDataList[i].name,
            description: dummyDataList[i].description,
            tokenImage: dummyDataList[i].tokenImage,
            ca: dummyDataList[i].ca,
            price: dummyDataList[i].price,
            blockChainNetwork: dummyDataList[i].blockChainNetwork,
            tokenOwner: dummyDataList[i].tokenOwner,
            tokenStandard: dummyDataList[i].tokenStandard,
            tokenName: dummyDataList[i].tokenName,
            saleState: dummyDataList[i].saleState,
            tokenAuthor: dummyDataList[i].tokenAuthor,
            rank: dummyDataList[i].rank,
            type: dummyDataList[i].type,
          })
        );
      }
      res.end();
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  })
);
router.post("/collectionList", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      let list = [];
      let searchInfo = {};
      const { search, order, tokenName } = req.body;
      let orderBenchMark;
      let orderStandard;
      searchInfo = yield Token.findOne({ where: { tokenName } });
      if (!search) {
        if (!order) {
          list = yield Token.findAll({
            order: [["tokenId", "ASC"]],
            where: { tokenName },
          });
        } else {
          orderBenchMark = order.slice(0, order.indexOf("/"));
          orderStandard = order.slice(order.indexOf("/") + 1);
          list = yield Token.findAll({
            order: [[orderBenchMark, orderStandard]],
            where: { tokenName },
          });
        }
      } else {
        const tempSearch = yield Token.findOne({
          where: { name: { [Op.like]: "%" + search + "%" } },
        });
        if (!tempSearch) {
          return res.send({ msg: "No search result", status: 401, searchInfo });
        }
        orderBenchMark = order.slice(0, order.indexOf("/"));
        orderStandard = order.slice(order.indexOf("/") + 1);
        list = yield Token.findAll({
          where: { name: { [Op.like]: "%" + search + "%" }, tokenName },
          order: [[orderBenchMark, orderStandard]],
        });
      }
      res.send({ list, status: 200, searchInfo });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  })
);
export default router;
