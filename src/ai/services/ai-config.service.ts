import { HTTP_STATUS } from "../../constants/httpStatusCodes";
import { AppError } from "../../errors/AppError";
import { AIAgentConfig } from "../../models/ai-agent-config.model";
import { v7 as uuidv7 } from "uuid";

export class AIConfigService {
    async getAgentConfig(agentKey: string) {
        const config = await AIAgentConfig.findOne({
            agentKey,
            isActive: true
        }).lean();

        if (!config) throw new AppError(`AI config not found for agent: ${agentKey}`, HTTP_STATUS.NOT_FOUND);
        return config;
    }

    async create(body: any) {
        const payload = { ...body, clientId: uuidv7() };
        return await AIAgentConfig.create(payload);
    }

    validate(body: any) {
        if (!body || !Object.keys(body).length) throw new AppError("Body is required", HTTP_STATUS.BAD_REQUEST);
        const allowedFields = ["clientId", "agentKey", "prompt", "settings", "tools"];
        Object.keys(body).forEach(ele => {
            if (!allowedFields.includes(ele)) throw new AppError("Invalid or extra keys", HTTP_STATUS.BAD_REQUEST);
        })
    }
}