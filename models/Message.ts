import mongoose, { Schema, model, models } from "mongoose";

const messageSchema = new Schema(
  {
    user: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "user" },
    body: { type: String, required: true },
    fromChat: { type: Boolean, required: true },
    type: { type: String, enum: ["text", "csv"], required: true },
  },
  { timestamps: true }
);

// ✅ Only create model if it doesn't exist
const Message = models.Message || model("Message", messageSchema);

export default Message;
