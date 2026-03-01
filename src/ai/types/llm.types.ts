export type LLMProviderType = "openai" | "gemini";

export interface LLMGenerateOptions {
    prompt: string;
    temperature?: number;
    maxTokens?: number;
    model?: string;
    reasoningLevel?: LLMReasoningLevel;
    showThinking?: boolean;
}

export interface LLMResponse {
    text: string;
    provider: LLMProviderType;
    model: string;
}

export type LLMReasoningLevel =
  | "none"
  | "low"
  | "medium"
  | "high"
  | "max"
  | "dynamic";