import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { AbstractLLMProvider } from "./abstract-llm.provider";
import { LLMGenerateOptions } from "../types/llm.types";

export class GeminiProvider extends AbstractLLMProvider {
    protected providerName = "gemini" as const;
    protected defaultModel = "gemini-3-flash-preview";

    private client: GoogleGenAI;

    constructor() {
        super();
        this.client = new GoogleGenAI({
            apiKey: process.env.GOOGLE_GENAI_API_KEY,
        });
    }

    protected async callModel(options: LLMGenerateOptions): Promise<string> {
        const response = await this.client.models.generateContent({
            model: options.model!,
            contents: options.prompt,
            config: {
                thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
            },
        });
        return response.text || "";
    }
}