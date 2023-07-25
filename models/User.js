import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 60,
    },
    fullname: {
        type: String,
        maxlength: 60,
    },
    img: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/hfc-resto.appspot.com/o/pizzas%2Fguest-user.jpg?alt=media&token=db829d3e-873c-4f50-b876-179998e49ba5',
        maxlength: 2000,
    },
    phonenumber: {
      type: String,
      default: null,
      maxlength: 2000,
      unique: true,
    },
    address: {
        type: String,
        default: null,
        maxlength: 3000,
    },
    location: {
        type: {
            lat:{ type: String},
            long:{ type: String},
        },
        default: null,
        maxlength: 3000,
    },
    googleID:{
      type: String,
      unique: true,
      index: true,
      sparse: true, 
    },
    password:{
      type: String,
      default: null,
    },
    role:{
      type:String,
      default: "user",
    }
  },
  { timestamps: true }
);
UserSchema.methods = {
  authenticate: async function (googleID) {
    return await bcrypt.compare(googleID, this.googleIDhash);
  },
};
export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
