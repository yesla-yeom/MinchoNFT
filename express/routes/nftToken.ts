import { Router, Request, Response } from "express";

import dummyDataList from "../data/dummyData.json";

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

router.post("/buy", (req: Request, res: Response) => {
  const { tokenId }: { tokenId: string } = req.body;

  console.log(tokenId, dummyDataList);
  // PurchaseToken(uint _tokenId)

  res.end();
});

export default router;
