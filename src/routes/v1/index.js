import express from 'express'
import {InfoController, UserController} from '../../controllers/index.js'
import { UserMiddlewares } from '../../middlewares/index.js';

const router = express.Router();

// /api/v1/info - GET
router.get("/info", InfoController.info);

// /api/v1/user/transactions - GET
router.get("/user/transactions", UserMiddlewares.validateAddress, UserController.fetchTransactions)

// /api/v1/user/expenses - GET
router.get("/user/expenses", UserMiddlewares.validateAddress, UserController.fetchTotalExpense)

export default router;
