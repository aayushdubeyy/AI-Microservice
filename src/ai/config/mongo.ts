import mongoose from 'mongoose';
import { DatabaseError } from '../../errors/database.error';

export const connectMongoDB =
async (): Promise<void> => {
    try {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) throw new DatabaseError('MONGO_URI not found in .env');
        await mongoose.connect(mongoUri);

        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        throw new DatabaseError(`❌ MongoDB connection failed: ${error}`);
    }
};