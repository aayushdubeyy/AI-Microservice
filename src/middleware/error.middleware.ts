import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { HTTP_STATUS } from "../constants/httpStatusCodes";
import { logger } from "../utils/logger";

export const errorMiddleware = (err: Error, req: Request, res: Response, _next: NextFunction) => {
    let statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let message = "Internal Server Error";
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    logger.error({
        requestId: req.headers["x-request-id"],
        message: err.message,
        stack: err.stack,
    });
    return res.status(statusCode).json({message});
};