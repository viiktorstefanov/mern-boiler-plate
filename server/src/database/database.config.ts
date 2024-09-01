import mongoose from "mongoose";

export const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL!);
        console.log('Database is successfully connected.');
    } catch(error: unknown) {
        if (error instanceof Error) {
            console.log('Error with initializing database.');
            console.log(error.message);
        } else {
            console.log('An unexpected error occurred.');
            console.log(error);
        }
        process.exit(1);
    }
}