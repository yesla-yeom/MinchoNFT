import { Router, Request, Response } from "express";
import AllToken from "../models/allToken";

const router = Router();

router.post("/latestToken", async (req: Request, res: Response) => {
  const tempTokenArr = await AllToken.findAll({
    attributes: ["image", "price", "name"],
    order: [["createdAt", "DESC"]],
  });
  console.log(tempTokenArr);
  res.send(tempTokenArr);
});
router.post("/ownToken", async (req: Request, res: Response) => {
  const tempTokenArr = await AllToken.findAll({
    attributes: ["image", "price", "name"],
    order: [["createdAt", "DESC"]],
  });
  console.log("own");
  res.send(tempTokenArr);
});
router.post("/mintToken", async (req: Request, res: Response) => {
  const tempTokenArr = await AllToken.findAll({
    attributes: ["image", "price", "name"],
    order: [["createdAt", "DESC"]],
  });
  console.log("mint");
  res.send(tempTokenArr);
});
router.post("/salesToken", async (req: Request, res: Response) => {
  const tempTokenArr = await AllToken.findAll({
    attributes: ["image", "price", "name"],
    order: [["createdAt", "DESC"]],
  });
  console.log("sales");
  res.send(tempTokenArr);
});

export default router;
