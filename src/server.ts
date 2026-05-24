import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { connectMongoDB } from './ai/config/mongo';
import { DatabaseError } from './errors/database.error';

const PORT = Number(process.env.PORT) || 5000;

const bootstrap = async () => {
    try {
        await connectMongoDB();
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    } catch (error) {
        throw new DatabaseError(`Failed to start server: ${error}`)
    }
};

bootstrap();