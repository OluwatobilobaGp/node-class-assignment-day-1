
import { Router } from "express";

import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";
import { getAllUsers } from "./admin.controller.js";

const router = Router();

// Only authenticated administrators can view all users.
router.get(
  "/users",
  authenticate,
  authorize("admin"),
  getAllUsers
);

export default router;
