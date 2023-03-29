import { Router } from "express";

import nftToken from "./nftToken";
import mint from "./mint";
import allToken from "./allToken";
import sortToken from "./sortToken";
import sellToken from "./sellToken";

const router = Router();

router.use("/nftToken", nftToken);
router.use("/mint", mint);
router.use("/allToken", allToken);
router.use("/sortToken", sortToken);
router.use("/sellToken", sellToken);

export default router;
