import express from 'express'
import {InfoController} from '../../controllers/index.js'
import userRoutes from "./user-routes.js"

const router = express.Router();

// /api/v1/info - GET
router.get("/info", InfoController.info);

router.use("/user", userRoutes)

export default router;
