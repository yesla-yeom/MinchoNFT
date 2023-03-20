import { Router } from "express";

import nftToken from "./nftToken";

const router = Router();

router.use("/nftToken", nftToken);

export default router;
