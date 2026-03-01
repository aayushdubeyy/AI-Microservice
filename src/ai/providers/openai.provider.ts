import OpenAI from "openai";
import { LLMProvider } from "../interfaces/llm.interface";

export class OpenAIProvider implements LLMProvider {
    private client: OpenAI;

    constructor() {
        this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async generateText(prompt: string): Promise<string> {
        const response = await this.client.responses.create({
            model: "gpt-5.1-mini",
            input: prompt,
        });
        return response.output_text;
    }
}
