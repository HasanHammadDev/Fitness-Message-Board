import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.URI;

const connectDB = async () => {
   try {
      await mongoose.connect(uri);
      console.log('MongoDB connected');
   } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1);
   }
};

export default connectDB;