import { LLMError } from "../../errors/llm.errors";
import { LLMGenerateOptions, LLMJsonGenerateOptions, LLMProviderType, LLMResponse } from "../types/llm.types";

export abstract class AbstractLLMProvider {
    protected abstract providerName: LLMProviderType;
    protected abstract defaultModel: string;    

    protected abstract callModel(options: LLMGenerateOptions) : Promise<string>;
    protected abstract callJsonModel<T>(options: LLMJsonGenerateOptions) : Promise<T>;

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
            throw new LLMError(error.message || `Failed to generate text with ${this.providerName}`);
        }
    }

    protected buildResponse<T>(text: string | object | T, model: string): LLMResponse<T> {
        return {
            text,
            provider: this.providerName,
            model,
        };
    }

    async generateJson<T>(options: LLMJsonGenerateOptions): Promise<T> {
        try {
            const model = options.model || this.defaultModel;
            const json = await this.callJsonModel<T>({...options, model});
            return this.buildResponse(json, model) as unknown as T;
        }
        catch (error: any) {
            throw new LLMError(error.message || `Failed to generate JSON with ${this.providerName}`);
        }
    }
}