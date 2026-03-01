import { HTTP_STATUS } from "../constants/httpStatusCodes";
import { AppError } from "./AppError";


export class LLMError extends AppError {
    constructor(message: string) {
        super(message, HTTP_STATUS.BAD_GATEWAY);
    }
}