import express from "express";
import { UserController } from "../../controllers/index.js";
import { UserMiddlewares } from "../../middlewares/index.js";

const router = express.Router();

// /api/v1/user/transactions - GET
router.get(
  "/transactions/:userAddress",
  UserMiddlewares.validateAddress,
  UserController.fetchTransactions
);

// /api/v1/user/expenses - GET
router.get(
  "/expenses/:userAddress",
  UserMiddlewares.validateAddress,
  UserController.fetchTotalExpense
);

export default router;
