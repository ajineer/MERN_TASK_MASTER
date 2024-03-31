import { Router } from "express";
import requireAuth from "../middleware/requireAuth.js";
import {
  getLists,
  getList,
  createList,
  deleteList,
  updateList,
} from "../controllers/listController.js";

const router = Router();

// require Auth for all list routes
router.use(requireAuth);

router.get("/", getLists);
router.get("/:id", getList);
router.post("/", createList);
router.delete("/:id", deleteList);
router.patch("/:id", updateList);

export default router;
