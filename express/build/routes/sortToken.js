var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { Router } from "express";
import Token from "../models/token.js";
import { Op } from "sequelize";
const router = Router();
router.post("/latestToken", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const tempTokenArr = yield Token.findAll({
      attributes: ["tokenImage", "price", "name", "tokenName"],
      order: [["createdAt", "DESC"]],
      limit: 8,
    });
    res.send(tempTokenArr);
  })
);
router.post("/ownToken", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const tempTokenArr = yield Token.findAll({
      where: { tokenOwner: req.body.userAccount },
      attributes: ["tokenImage", "price", "name", "tokenName", "tokenId"],
      order: [["createdAt", "DESC"]],
    });
    res.send(tempTokenArr);
  })
);
router.post("/mintToken", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const tempTokenArr = yield Token.findAll({
      attributes: ["tokenImage", "price", "name", "tokenName", "tokenId"],
      order: [["createdAt", "DESC"]],
      where: { tokenAuthor: req.body.userAccount },
    });
    res.send(tempTokenArr);
  })
);
router.post("/salesToken", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const tempTokenArr = yield Token.findAll({
      where: { tokenOwner: req.body.userAccount, saleState: 1 },
      attributes: ["tokenImage", "price", "name"],
      order: [["createdAt", "DESC"]],
    });
    res.send(tempTokenArr);
  })
);
router.post("/searchName", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const findName = yield Token.findAll({
      where: { name: { [Op.like]: "%" + name + "%" } },
    });
    res.send(findName);
  })
);
router.post("/bestToken", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const tempTokenArr = yield Token.findAll({
      attributes: ["tokenImage", "price", "name", "tokenName"],
      order: [["likeCount", "DESC"]],
      limit: 8,
    });
    res.send(tempTokenArr);
  })
);
export default router;
