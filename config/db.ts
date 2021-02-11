import mongoose from 'mongoose';
import config from 'config';

const db: string = config.get('mongoURI') || process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

export = connectDB;