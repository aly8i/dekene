import mongoose from "mongoose";
import User from "./User";
const TokenSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,ref: 'User'
    },
  },
  { timestamps: true }
);

export default mongoose.models.Token || mongoose.model("Token", TokenSchema);
