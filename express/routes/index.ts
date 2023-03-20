import { Router } from "express";

import nftToken from "./nftToken";
import mint from "./mint";

const router = Router();

router.use("/nftToken", nftToken);
router.use("/mint", mint);

export default router;
