import { Router } from "express";

// controller functions
import { signupUser, loginUser } from "../controllers/userController.js";

const router = Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

export default router;
