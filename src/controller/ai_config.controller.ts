import { NextFunction, Request, Response } from "express";
import { AIConfigService } from "../ai/services/ai-config.service";
import { HTTP_STATUS } from "../constants/httpStatusCodes";

export const uploadAIConfig = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body : config } = req;
        const aiConfigService = new AIConfigService();

        aiConfigService.validate(config);
        const data = await aiConfigService.create(config);

        return res.status(HTTP_STATUS.CREATED).json({ data });
    } catch (error) {
        next(error);
    }
}
