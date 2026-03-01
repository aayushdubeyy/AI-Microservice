import { GoogleGenAI, ThinkingConfig, ThinkingLevel } from "@google/genai";
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
        const reasoning = options.reasoningLevel || "low";
        const thinkingConfig = this.mapReasoning(reasoning);
        const response = await this.client.models.generateContent({
            model: options.model!,
            contents: options.prompt,
            config: {
                thinkingConfig : {
                    ...thinkingConfig,
                    includeThoughts: options.showThinking || false,
                },
            },
        });
        return response.text || "";
    }

    private mapReasoning(level: string): ThinkingConfig  {
        switch (level) {
            case "none": return { thinkingBudget: 0 };
            case "dynamic": return { thinkingBudget: -1 };
            case "high": return { thinkingLevel: ThinkingLevel.HIGH };
            case "medium": return { thinkingLevel: ThinkingLevel.MEDIUM };
            case "low":
            default: return { thinkingLevel: ThinkingLevel.LOW };
        }
    }    
}