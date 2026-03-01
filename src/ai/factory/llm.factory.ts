import { UnsupportedProviderError } from "../../errors/unsupported-provider.error";
import { AbstractLLMProvider } from "../providers/abstract-llm.provider";
import { GeminiProvider } from "../providers/gemini.provider";
import { OpenAIProvider } from "../providers/openai.provider";
import { LLMProviderType } from "../types/llm.types";

const providers: Record<LLMProviderType, new () => AbstractLLMProvider> = {
    openai: OpenAIProvider,
    gemini: GeminiProvider
};

export function createLLM(provider: LLMProviderType): AbstractLLMProvider {
    const ProviderClass = providers[provider];
    if (!ProviderClass) {
        throw new UnsupportedProviderError(provider);
    }
    return new ProviderClass();
}