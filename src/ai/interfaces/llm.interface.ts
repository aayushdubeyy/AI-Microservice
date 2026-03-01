import { LLMGenerateOptions, LLMResponse } from "../types/llm.types";

export interface LLMProvider {
    generateText(prompt: LLMGenerateOptions): Promise<LLMResponse>;
}