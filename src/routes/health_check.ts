import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatusCodes";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadAIConfig } from "../controller/ai_config.controller";
import { apiKeyMiddleware } from "../middleware/api-key.middleware";

const router = require('express').Router();

router.get('/health', asyncHandler(async (_: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({ status: 'ok' });
}));

router.post("/ai-config", apiKeyMiddleware, uploadAIConfig);

export default router;