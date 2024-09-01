import express from 'express'
import {InfoController, UserController} from '../../controllers/index.js'

const router = express.Router();

// /api/v1/info - GET
router.get("/info", InfoController.info);

// /api/v1/user/transactions - GET
router.get("/user/transactions", UserController.fetchTransactions)

// /api/v1/user/expenses - GET
router.get("/user/expenses",  UserController.fetchTotalExpense)

export default router;
