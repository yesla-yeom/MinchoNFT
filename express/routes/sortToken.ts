import { Router, Request, Response } from "express";
import Token from "../models/token";
import { Op } from "sequelize";

const router = Router();

router.post("/latestToken", async (req: Request, res: Response) => {
  const tempTokenArr = await Token.findAll({
    attributes: ["tokenImage", "price", "name", "tokenName"],
    order: [["createdAt", "DESC"]],
    limit: 8,
  });
  res.send(tempTokenArr);
});
router.post("/ownToken", async (req: Request, res: Response) => {
  const tempTokenArr = await Token.findAll({
    where: { tokenOwner: req.body.userAccount },
    attributes: ["tokenImage", "price", "name", "tokenName", "tokenId"],
    order: [["createdAt", "DESC"]],
  });

  res.send(tempTokenArr);
});
router.post("/mintToken", async (req: Request, res: Response) => {
  const tempTokenArr = await Token.findAll({
    attributes: ["tokenImage", "price", "name", "tokenName", "tokenId"],
    order: [["createdAt", "DESC"]],
    where: { tokenAuthor: req.body.userAccount },
  });
  res.send(tempTokenArr);
});
router.post("/salesToken", async (req: Request, res: Response) => {
  const tempTokenArr = await Token.findAll({
    where: { tokenOwner: req.body.userAccount, saleState: 1 },
    attributes: ["tokenImage", "price", "name"],
    order: [["createdAt", "DESC"]],
  });
  res.send(tempTokenArr);
});

router.post("/searchName", async (req: Request, res: Response) => {
  const { name }: { name: string } = req.body;
  const findName = await Token.findAll({
    where: { name: { [Op.like]: "%" + name + "%" } },
  });
  res.send(findName);
});

router.post("/bestToken", async (req: Request, res: Response) => {
  const tempTokenArr = await Token.findAll({
    attributes: ["tokenImage", "price", "name", "tokenName"],
    order: [["likeCount", "DESC"]],
    limit: 8,
  });
  res.send(tempTokenArr);
});

export default router;
