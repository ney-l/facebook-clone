import mongoose from 'mongoose';

export const connectToDatabase = async (dbUrl: string) => {
  try {
    mongoose.connect(dbUrl);
    console.log('Connected to database ✅');
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
    console.error(error);
  }
};
