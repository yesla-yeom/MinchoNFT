import { Router } from "express";

import nftToken from "./nftToken";
import mint from "./mint";
import allToken from "./allToken";

const router = Router();

router.use("/nftToken", nftToken);
router.use("/mint", mint);
router.use("/allToken", allToken);

export default router;
