import mongoose, { Document, Schema } from "mongoose";

export interface IAIAgentConfig extends Document {
    clientId: string;
    agentKey: string;
    prompt: {
        system: string;
        version: number;
    };
    settings: {
        model: string;
        temperature: number;
        topP?: number;
        maxTokens?: number;
    };
    tools: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const aiAgentConfigSchema = new Schema(
    {
        clientId: { type: String, required: true, index: true },
        agentKey: { type: String, required: true, unique: true },

        prompt: {
            system: { type: String, required: true },
            version: { type: Number, default: 1 }
        },

        settings: {
            model: { type: String, default: "gpt-5-mini" },
            temperature: { type: Number, default: 0.2 },
            topP: { type: Number, default: 1 },
            maxTokens: { type: Number, default: 1000 }
        },

        tools: {
            type: [String],
            default: []
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

export const AIAgentConfig = mongoose.model<IAIAgentConfig>(
    "AIAgentConfig",
    aiAgentConfigSchema
);