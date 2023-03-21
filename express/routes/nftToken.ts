import { Router, Request, Response } from "express";

const router = Router();

interface tokenData {
  tokenId?: string;
  CA?: string;
  price?: string;
  blockChain?: string;
  tokenOwner?: string;
  tokenBase?: string;
  name: string;
  description: string;
  image: string;
}

router.get("/detail", (req: Request, res: Response) => {
  const tempData: tokenData = {
    tokenId: "4282",
    CA: "0x682371274859",
    price: "123",
    blockChain: "Ethereum",
    tokenOwner: "0xasdasdasd",
    tokenBase: "ERC-721",
    name: "tempName",
    description: "asdasdasd",
    image: "dkdk",
  };
  res.send(tempData);
});

export default router;
