import { UnsupportedProviderError } from "../../errors/unsupported-provider.error";
import { LLMProvider } from "../interfaces/llm.interface";
import { GeminiProvider } from "../providers/gemini.provider";
import { OpenAIProvider } from "../providers/openai.provider";
import { LLMProviderType } from "../types/llm.types";

const providers: Record<LLMProviderType, new () => LLMProvider> = {
    openai: OpenAIProvider,
    gemini: GeminiProvider
};

export function createLLM(provider: LLMProviderType): LLMProvider {
    const ProviderClass = providers[provider];
    if (!ProviderClass) {
        throw new UnsupportedProviderError(provider);
    }
    return new ProviderClass();
}