export type LLMProviderType = "openai" | "gemini";

export interface LLMGenerateOptions {
    prompt: string;
    temperature?: number;
    maxTokens?: number;
    model?: string;
}

export interface LLMResponse {
    text: string;
    provider: LLMProviderType;
    model: string;
}