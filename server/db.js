import mongoose from 'mongoose';

// Replace with your MongoDB URI
const uri = 'mongodb://localhost:27017/messageBoard';

const connectDB = async () => {
   try {
      await mongoose.connect(uri);
      console.log('MongoDB connected');
   } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
   }
};

export default connectDB;