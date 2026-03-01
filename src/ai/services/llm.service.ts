import { logger } from "../../utils/logger";
import { createLLM } from "../factory/llm.factory";
import { LLMGenerateOptions, LLMJsonGenerateOptions, LLMProviderType } from "../types/llm.types";

export class LLMService {
    private provider;

    constructor(provider: LLMProviderType) {
        this.provider = createLLM(provider);
    }

    async generate(options: LLMGenerateOptions) {
        logger.info({
            event: "LLM_REQUEST",
            provider: options.model,
        });
        const response = await this.provider.generateText(options);
        logger.info({
            event: "LLM_RESPONSE",
            provider: response.provider,
            model: response.model,
        });
        return response;
    }

    async generateJSON<T>(options: LLMJsonGenerateOptions) {
        return this.provider.generateJson(options);
    }
}