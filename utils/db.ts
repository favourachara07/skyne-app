import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGO_URI);
}

export default mongoose;
