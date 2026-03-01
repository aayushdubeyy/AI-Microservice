import { Request, Response, NextFunction } from "express";

export const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;
    res.json = function (data: any) {
        const wrappedResponse = {
            success: res.statusCode < 400,
            requestId: req.headers["x-request-id"],
            ...data,
        };

        return originalJson.call(this, wrappedResponse);
    };

    next();
};