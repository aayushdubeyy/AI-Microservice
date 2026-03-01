import OpenAI from "openai";
import { AbstractLLMProvider } from "./abstract-llm.provider";
import { LLMGenerateOptions } from "../types/llm.types";

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
        const response = await this.client.responses.create({
            model: options.model!,
            input: options.prompt,
            temperature: options.temperature ?? 0.7,
            max_output_tokens: options.maxTokens ?? 2048,
        });
        return response.output_text;
    }
}