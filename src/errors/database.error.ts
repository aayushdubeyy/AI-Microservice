import { HTTP_STATUS }
from '../constants/httpStatusCodes';

import { AppError }
from './AppError';

export class DatabaseError
extends AppError {
    constructor(message = 'Database connection failed') {
        super(message,HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}