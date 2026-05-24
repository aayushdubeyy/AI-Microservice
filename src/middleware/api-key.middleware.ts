import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { HTTP_STATUS } from "../constants/httpStatusCodes";

export const apiKeyMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    const apiKey = req.headers["x-api-key"];

    const expectedApiKey = process.env.AI_CONFIG_API_KEY;

    if (!expectedApiKey) throw new AppError("API key configuration missing", HTTP_STATUS.INTERNAL_SERVER_ERROR);
    if (!apiKey) throw new AppError("API key is required", HTTP_STATUS.UNAUTHORIZED);
    if (apiKey !== expectedApiKey) throw new AppError("Invalid API key", HTTP_STATUS.UNAUTHORIZED);
    next();
};