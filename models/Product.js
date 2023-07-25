import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    barcode:{
      type: String,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 400,
    },
    img: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    prices: {
      type: [Number],
      required: true,
    },
    extraOptions: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
    category: {
      type : String,
      required: true,
    },
    measurment: {
      type : String,
      required: true,
    },
    priceperkg: {
      type : Number,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
