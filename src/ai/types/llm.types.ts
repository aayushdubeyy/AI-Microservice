import { ZodTypeAny } from "zod/v3";

export type LLMProviderType = "openai" | "gemini";

export interface LLMGenerateOptions {
    prompt: string;
    temperature?: number;
    maxTokens?: number;
    model?: string;
    reasoningLevel?: LLMReasoningLevel;
    showThinking?: boolean;
}

export interface LLMJsonGenerateOptions extends LLMGenerateOptions {
    zodSchema: ZodTypeAny;
}

export interface LLMResponse<T = any> {
    text: string | object | T;
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