import { Router, Request, Response } from "express";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import dotenv from "dotenv";

import { abi as SaleAbi } from "../contracts/artifacts/SaleToken.json";
import Token from "../models/token";
import TransactionLog from "../models/transactionLog";
import Likes from "../models/likes";

dotenv.config();

const web3 = new Web3(
  "wss://goerli.infura.io/ws/v3/2ca09ab04a7c44dcb6f886deeba97502"
);

const router = Router();

interface tokenData {
  tokenId: number;
  ca?: string;
  tokenImage?: string;
  blockChainNetwork?: string;
  tokenOwner?: string;
  tokenStandard?: string;
  name: string;
  description: string;
  type?: string;
  rank?: number;
}

let obj: {
  to?: string;
  from?: string;
  data?: string;
  ca?: string;
  price?: number | string;
  value?: number;
} = {
  to: "",
  from: "",
  data: "",
};

router.post("/detail", async (req: Request, res: Response) => {
  try {
    const { tokenId }: { tokenId: number } = req.body;
    const detailData: tokenData = await Token.findOne({ where: { tokenId } });
    res.send(detailData);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/buyToken", async (req: Request, res: Response) => {
  const { account, tokenId, price } = req.body;

  const saleDeployed = new web3.eth.Contract(
    SaleAbi as AbiItem[],
    process.env.SALE_CA
  );
  obj.from = account;
  obj.to = process.env.SALE_CA;
  obj.data = await saleDeployed.methods.PurchaseToken(tokenId).encodeABI();
  obj.value = price * 10 ** 18;
  res.send(obj);
});

router.post("/updateList", async (req: Request, res: Response) => {
  try {
    const {
      tokenId,
      account,
    }: { tokenId: number; account: string; price: number } = req.body;

    const tempToken: Token = await Token.findOne({ where: { tokenId } });

    await TransactionLog.create({
      from: tempToken.tokenOwner,
      to: account,
      price: tempToken.price,
      ca: tempToken.ca,
      tokenId,
    });

    await Token.update(
      { price: 0, saleState: 0, tokenOwner: account },
      { where: { tokenId } }
    );

    res.end();
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/txLog", async (req: Request, res: Response) => {
  try {
    const { tokenId } = req.body;
    const txLogInfo = await TransactionLog.findOne({ where: { tokenId } });
    if (!txLogInfo) res.send({ status: 201 });
    else res.send({ txLogInfo, status: 200 });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/like", async (req: Request, res: Response) => {
  const { account, tokenId }: { account: string; tokenId: number } = req.body;

  const tempLike = await Likes.findOne({
    where: { likeFrom: account, likeTokenId: tokenId },
  });

  if (tempLike) {
    await Token.increment("likeCount", {
      by: -1,
      where: { tokenId },
    });
    await Likes.destroy({
      where: { likeFrom: account, likeTokenId: tokenId },
    });
    res.send({ status: 201 });
  } else {
    await Token.increment("likeCount", {
      by: 1,
      where: { tokenId },
    });
    await Likes.create({ likeFrom: account, likeTokenId: tokenId });
    res.send({ status: 200 });
  }
});

router.post("/likeState", async (req: Request, res: Response) => {
  const { account, tokenId }: { account: string; tokenId: number } = req.body;

  const tempLike = await Likes.findOne({
    where: { likeFrom: account, likeTokenId: tokenId },
  });

  if (tempLike) res.send({ status: 201 });
  else res.send({ status: 202 });
});
export default router;
