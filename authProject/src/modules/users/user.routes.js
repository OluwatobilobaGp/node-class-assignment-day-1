import { Router } from "express";
import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";
import { getUsers } from "./user.controller.js";

const router = Router();

router.get("/", authenticate, authorize("admin"), getUsers);

export default router;
