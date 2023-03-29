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
  // 빠른거 기준으로 다 가져온다.
});
router.post("/ownToken", async (req: Request, res: Response) => {
  const tempTokenArr = await Token.findAll({
    where: { tokenOwner: req.body.userAccount },
    attributes: ["tokenImage", "price", "name", "tokenName", "tokenId"],
    order: [["createdAt", "DESC"]],
  });

  // 해당 지갑 주소를 기준으로 소유하고있는 모든 토큰을 가져온다.
  res.send(tempTokenArr);
});
router.post("/mintToken", async (req: Request, res: Response) => {
  const tempTokenArr = await Token.findAll({
    attributes: ["tokenImage", "price", "name", "tokenName", "tokenId"],
    order: [["createdAt", "DESC"]],
    where: { tokenAuthor: req.body.userAccount },
  });
  console.log("mint", req.body);
  // 제작자를 넣고 수정을 하면 되는 부분
  res.send(tempTokenArr);
});
router.post("/salesToken", async (req: Request, res: Response) => {
  const tempTokenArr = await Token.findAll({
    where: { tokenOwner: req.body.userAccount, saleState: 1 },
    attributes: ["tokenImage", "price", "name"],
    order: [["createdAt", "DESC"]],
  });
  // 해당 지갑 주소를 기준으로(소유하고있는) 판매중인 토큰을 불러온다.
  res.send(tempTokenArr);
});

router.post("/searchName", async (req: Request, res: Response) => {
  const { name }: { name: string } = req.body;
  console.log(name);
  const findName = await Token.findAll({
    where: { name: { [Op.like]: "%" + name + "%" } },
  });
  console.log(findName);
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
