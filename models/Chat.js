import mongoose from "mongoose";
// import User from "../models/User"
const ChatSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    messages:{type:[{ status: {type: String}, message:{type: String} , time: {type:String}, date: {type:String}}],default:[]}
  }
);
export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);