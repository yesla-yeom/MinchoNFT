import { Router, Request, Response } from "express";
import { Op } from "sequelize";

import Token from "../models/token";

const router = Router();

router.post("/collectionList", async (req: Request, res: Response) => {
  try {
    let list = [];
    let searchInfo = {};
    const {
      search,
      order,
      tokenName,
    }: { search: string; order: string; tokenName: string } = req.body;
    let orderBenchMark: string;
    let orderStandard: string;
    searchInfo = await Token.findOne({ where: { tokenName } });
    if (!search) {
      if (!order) {
        list = await Token.findAll({
          order: [["tokenId", "ASC"]],
          where: { tokenName },
        });
      } else {
        orderBenchMark = order.slice(0, order.indexOf("/"));
        orderStandard = order.slice(order.indexOf("/") + 1);
        list = await Token.findAll({
          order: [[orderBenchMark, orderStandard]],
          where: { tokenName },
        });
      }
    } else {
      const tempSearch = await Token.findOne({
        where: { name: { [Op.like]: "%" + search + "%" } },
      });
      if (!tempSearch) {
        return res.send({ msg: "No search result", status: 401, searchInfo });
      }
      orderBenchMark = order.slice(0, order.indexOf("/"));
      orderStandard = order.slice(order.indexOf("/") + 1);
      list = await Token.findAll({
        where: { name: { [Op.like]: "%" + search + "%" }, tokenName },
        order: [[orderBenchMark, orderStandard]],
      });
    }
    res.send({ list, status: 200, searchInfo });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
export default router;
