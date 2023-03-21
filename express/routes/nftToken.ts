import { Router, Request, Response } from "express";

import dummyDataList from "../data/dummyData.json";
import BuyToken from "../models/buyToken";

const router = Router();

interface tokenData {
  tokenId: number;
  CA?: string;
  price?: number;
  blockChain?: string;
  tokenOwner?: string;
  tokenBase?: string;
  name: string;
  description: string;
  image: string;
  atrributes?: Array<{ trait_type: string; value: number }>;
}

router.post("/detail", (req: Request, res: Response) => {
  const { tokenId }: { tokenId: number } = req.body;
  const tempData: tokenData = dummyDataList[tokenId];
  res.send(tempData);
});

router.post("/buy", async (req: Request, res: Response) => {
  try {
    const {
      tokenId,
      name,
      description,
      imgSrc,
      CA,
      price,
      blockChain,
      tokenOwner,
      tokenBase,
    } = dummyDataList[req.body.tokenId];

    const tempData = await BuyToken.findOne({
      where: {
        tokenId: req.body.tokenId,
      },
    });
    if (tempData) return res.status(201).send({ msg: "already exist Token" });

    await BuyToken.create({
      tokenId,
      name,
      description,
      image: imgSrc,
      ca: CA,
      price,
      blockChain,
      tokenOwner,
      tokenBase,
      value: 1,
    });

    // PurchaseToken(uint _tokenId)

    res.send({ msg: "correct buy Token" });
  } catch (err) {
    console.log(err);
    res.send({ err });
  }
});

export default router;
