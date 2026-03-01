import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatusCodes";
import { asyncHandler } from "../utils/asyncHandler";

const router = require('express').Router();

router.get('/health', asyncHandler(async (_: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({ status: 'ok' });
}));

export default router;