import { LLMProvider } from "../interfaces/llm.interface";
import { GeminiProvider } from "../providers/gemini.provider";
import { OpenAIProvider } from "../providers/openai.provider";

export function createLLM(provider: "openai" | "gemini") : LLMProvider {
    switch (provider) {
        case "openai": return new OpenAIProvider();
        case "gemini": return new GeminiProvider();
        default: throw new Error("Unsupported provider");
    }
} 