import { Router, Request, Response } from "express";
import AllToken from "../models/allToken";

const router = Router();

router.post("/latestToken", async (req: Request, res: Response) => {
  const tempTokenArr = await AllToken.findAll({
    attributes: ["image", "price", "name"],
    order: [["createdAt", "DESC"]],
  });
  res.send(tempTokenArr);
  // 빠른거 기준으로 다 가져온다.
});
router.post("/ownToken", async (req: Request, res: Response) => {
  const tempTokenArr = await AllToken.findAll({
    where: { tokenOwner: req.body.userAccount },
    attributes: ["image", "price", "name"],
    order: [["createdAt", "DESC"]],
  });

  // 해당 지갑 주소를 기준으로 소유하고있는 모든 토큰을 가져온다.
  res.send(tempTokenArr);
});
router.post("/mintToken", async (req: Request, res: Response) => {
  const tempTokenArr = await AllToken.findAll({
    attributes: ["image", "price", "name"],
    order: [["createdAt", "DESC"]],
  });
  console.log("mint", req.body);
  // 제작자를 넣고 수정을 하면 되는 부분
  res.send(tempTokenArr);
});
router.post("/salesToken", async (req: Request, res: Response) => {
  const tempTokenArr = await AllToken.findAll({
    where: { tokenOwner: req.body.userAccount, sale: 1 },
    attributes: ["image", "price", "name"],
    order: [["createdAt", "DESC"]],
  });
  // 해당 지갑 주소를 기준으로(소유하고있는) 판매중인 토큰을 불러온다.
  res.send(tempTokenArr);
});

export default router;
