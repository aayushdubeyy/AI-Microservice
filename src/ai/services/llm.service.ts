import { createLLM } from "../factory/llm.factory";

export class LLMService {
    private provider;

    constructor(provider: "openai" | "gemini") {
        this.provider = createLLM(provider);
    }

    async generate(prompt: string): Promise<string> {
        return this.provider.generateText(prompt);
    }
}