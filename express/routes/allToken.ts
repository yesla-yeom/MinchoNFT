import { Router, Request, Response } from "express";
import pinataSDK from "@pinata/sdk";
import { Op } from "sequelize";

import dummyDataList from "../data/dummyData.json";
import Token from "../models/token";

const pinata = new pinataSDK(
  "4c64f4e382099ae14866",
  "a7b9d3c02c40095d07400a5a82fb09c6b201d0259faf79bfe21d5f0f51b4dc7c"
);

const router = Router();

router.get("/list", async (req: Request, res: Response) => {
  let jsonResultArr = [];
  let result = [];
  for (let i = 0; i < dummyDataList.length; i++) {
    const tempResult = await pinata.pinJSONToIPFS(dummyDataList[i], {
      pinataMetadata: { name: Date.now().toString() + ".json" },
      pinataOptions: { cidVersion: 0 },
    });
    jsonResultArr.push(tempResult);
    result.push(
      await Token.create(
        {
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
        },
        { ignoreDuplicates: true }
      )
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
      list = await Token.findAll();

      res.send({ list, status: 200, tempInfo });
    } else {
      list = await Token.findAll({ order: [["price", order]] });
      res.send({ list, status: 200, tempInfo });
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
    res.send({ list, status: 200, tempInfo });
  }
});
export default router;
