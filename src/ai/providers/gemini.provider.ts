import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { LLMProvider } from "../interfaces/llm.interface";

export class GeminiProvider implements LLMProvider {
    private client : GoogleGenAI;

    constructor() {
        this.client = new GoogleGenAI({
            apiKey: process.env.GOOGLE_GENAI_API_KEY,
        });
    }

    async generateText(prompt: string): Promise<string> {
        const response = await this.client.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                thinkingConfig: {
                    thinkingLevel: ThinkingLevel.LOW
                }
            }
        });
        return response.text || "";
    }
}