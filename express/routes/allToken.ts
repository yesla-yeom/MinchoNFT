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
        tokenBase: dummyDataList[i].tokenBase,
        tokenName: dummyDataList[i].tokenName,
        saleState: dummyDataList[i].saleState,
        tokenAuthor: dummyDataList[i].tokenAuthor,
        rank: dummyDataList[i].rank,
        type: dummyDataList[i].type,
      })
    );
  }
  res.send({ jsonResultArr, result });
});

router.post("/collectionList", async (req: Request, res: Response) => {
  let list = [];
  let tempInfo = {};
  const {
    search,
    order,
    tokenName,
  }: { search: string; order: string; tokenName: string } = req.body;
  tempInfo = await Token.findOne({ where: { tokenName } });
  if (!search) {
    if (!order) {
      list = await Token.findAll({ order: [["tokenId", "ASC"]] });
    } else {
      list = await Token.findAll({ order: [["price", order]] });
    }
  } else {
    const tempSearch = await Token.findOne({
      where: { name: { [Op.like]: "%" + search + "%" } },
    });
    if (!tempSearch) {
      return res.send({ msg: "No search result", status: 401, tempInfo });
    }
    list = await Token.findAll({
      where: { name: { [Op.like]: "%" + search + "%" } },
      order: [["price", order]],
    });
  }

  res.send({ list, status: 200, tempInfo });
});
export default router;
