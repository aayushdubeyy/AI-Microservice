import { HTTP_STATUS } from "../constants/httpStatusCodes";
import { AppError } from "./AppError";

export class UnsupportedProviderError extends AppError {
    constructor(provider: string) {
        super(`Unsupported LLM provider: ${provider}`, HTTP_STATUS.BAD_REQUEST);
    }
}