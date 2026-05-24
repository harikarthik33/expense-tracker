import mongoose from "mongoose";

const connectMongo = async () => {

  try {

    if (mongoose.connections[0].readyState) {
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected");

  } catch (error) {

    console.log(error);

  }
};

export default connectMongo;