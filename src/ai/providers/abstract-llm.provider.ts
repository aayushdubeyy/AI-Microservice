import { LLMError } from "../../errors/llm.errors";
import { LLMGenerateOptions, LLMProviderType, LLMResponse } from "../types/llm.types";

export abstract class AbstractLLMProvider {
    protected abstract providerName: LLMProviderType;
    protected abstract defaultModel: string;

    protected abstract callModel(options: LLMGenerateOptions) : Promise<string>;

    async generateText(options: LLMGenerateOptions): Promise<LLMResponse> {
        try {
            const model = options.model || this.defaultModel;
            const text = await this.callModel({
                ...options,
                model,
            });
            return this.buildResponse(text, model);
        }
        catch (error: any) {
            throw new LLMError(
                error?.message || `Failed to generate text with ${this.providerName}`
            );
        }
    }

    protected buildResponse(text: string, model: string): LLMResponse {
        return {
            text,
            provider: this.providerName,
            model,
        };
  }
}