import { Router, Request, Response } from "express";
import pinataSDK from "@pinata/sdk";
import { Op } from "sequelize";
import dotenv from "dotenv";

import dummyDataList from "../data/dummyData.json";
import Token from "../models/token";

dotenv.config();

const pinata = new pinataSDK(process.env.API_Key, process.env.API_Secret);

const router = Router();

router.get("/list", async (req: Request, res: Response) => {
  try {
    let jsonResultArr = [];
    let result = [];
    for (let i = 0; i < dummyDataList.length; i++) {
      const tempToken = await Token.findOne({
        where: { tokenId: dummyDataList[i].tokenId },
      });
      if (tempToken) continue;

      const tempResult = await pinata.pinJSONToIPFS(dummyDataList[i], {
        pinataMetadata: { name: Date.now().toString() + ".json" },
        pinataOptions: { cidVersion: 0 },
      });
      jsonResultArr.push(tempResult);
      result.push(
        await Token.create({
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
});

router.post("/collectionList", async (req: Request, res: Response) => {
  try {
    let list = [];
    let searchInfo = {};
    const {
      search,
      order,
      tokenName,
    }: { search: string; order: string; tokenName: string } = req.body;
    let orderBenchMark: string;
    let orderStandard: string;
    searchInfo = await Token.findOne({ where: { tokenName } });
    if (!search) {
      if (!order) {
        list = await Token.findAll({
          order: [["tokenId", "ASC"]],
          where: { tokenName },
        });
      } else {
        orderBenchMark = order.slice(0, order.indexOf("/"));
        orderStandard = order.slice(order.indexOf("/") + 1);
        list = await Token.findAll({
          order: [[orderBenchMark, orderStandard]],
          where: { tokenName },
        });
      }
    } else {
      const tempSearch = await Token.findOne({
        where: { name: { [Op.like]: "%" + search + "%" } },
      });
      if (!tempSearch) {
        return res.send({ msg: "No search result", status: 401, searchInfo });
      }
      orderBenchMark = order.slice(0, order.indexOf("/"));
      orderStandard = order.slice(order.indexOf("/") + 1);
      list = await Token.findAll({
        where: { name: { [Op.like]: "%" + search + "%" }, tokenName },
        order: [[orderBenchMark, orderStandard]],
      });
    }
    res.send({ list, status: 200, searchInfo });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
export default router;
