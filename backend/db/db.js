import dotenv from 'dotenv';
dotenv.config(); // ✅ This must be at the top

import mongoose from 'mongoose';

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // optional but useful
        });
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.log("❌ MongoDB connection error:", err.message);
        setTimeout(connect, 5000); // Retry after 5 seconds if needed
    }
}

export default connect;
