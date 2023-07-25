import mongoose from "mongoose";

const StaticSchema = new mongoose.Schema(
  {
    company:{
      type:String,
      default:"happy",
    },
    name: {
      type: String,
    //   required: true,
      maxlength: 60,
      unique: true,
    },
    description: {
        type: String,
        // required: true,
    },
    rate: {
      type: Number,
      // required: true,
    },
    slider1: {
      type: [String],
    //   required: true,
    },
    slider2: {
        type: [String],
        // required: true,
      },
    
    location: {
      type : String,
    //   required: true,
    },
    phonenumber1: {
        type : String,
        // required: true,
    },
    phonenumber2: {
        type : String,
        // required: true,
    },
    facebook:{
        type : String,
        // required: true,
    },
    whatsapp:{
        type : String,
        // required: true,
    },
    twitter:{
        type : String,
        // required: true,
    },
    gmail:{
        type : String,
        // required: true,
    },
    instagram:{
        type : String,
        // required: true,
    },
    github:{
        type : String,
        // required: true,
    },
    linkedin:{
      type : String,
      // required: true,
    },
    mapLocation:{
      type : {
        lat:{type:Number,required:true},
        lng:{type:Number,required:true},
      },
      // required: true,
    },
    deliveryChargePerKm:{
      type : Number,
      required:true,
      default:0.1
    }
  },
  { timestamps: true }
);

export default mongoose.models.Static ||
  mongoose.model("Static", StaticSchema);
