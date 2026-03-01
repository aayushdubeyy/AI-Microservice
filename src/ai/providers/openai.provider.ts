import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { AbstractLLMProvider } from "./abstract-llm.provider";
import { LLMGenerateOptions, LLMJsonGenerateOptions } from "../types/llm.types";

export class OpenAIProvider extends AbstractLLMProvider {
    protected providerName = "openai" as const;
    protected defaultModel = "gpt-5.1-mini";

    private client: OpenAI;

    constructor() {
        super();
        this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    protected async callModel(options: LLMGenerateOptions): Promise<string> {
        const reasoning = options.reasoningLevel || "low";
        const response = await this.client.responses.create({
            model: options.model!,
            input: options.prompt,
            temperature: options.temperature ?? 0.7,
            max_output_tokens: options.maxTokens ?? 2048,
            reasoning: {
                effort: this.mapReasoning(reasoning),
                summary: options.showThinking ? "detailed" : "auto",
            }
        });
        return response.output_text;
    }
    
    private mapReasoning(level: string) {
        switch (level) {
            case "none": return "none";
            case "low": return "low";
            case "medium": return "medium";
            case "high": return "high";
            case "max": return "xhigh";
            default: return "low";
        }
    }

    protected async callJsonModel(options: LLMJsonGenerateOptions) {
        const zodSchema = options.zodSchema;
        if (!zodSchema) {
            throw new Error("Zod schema is required for JSON response");
        }

        const response = await this.client.responses.parse({
            model: options.model!,
            input: options.prompt,
            text: {
                format: zodTextFormat(zodSchema, "event"),
            }
        });
        
        return response.output_parsed;
    }
}