import { Router } from "express";

import nftToken from "./nftToken";
import mint from "./mint";
import allToken from "./allToken";
import sortToken from "./sortToken";

const router = Router();

router.use("/nftToken", nftToken);
router.use("/mint", mint);
router.use("/allToken", allToken);
router.use("/sortToken", sortToken);

export default router;
