import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    products: {
      type: [{
        product:{type: mongoose.Schema.Types.ObjectId,ref: 'Product', required: true},
        amount:{type: Number, required: true},
        size:{type:String},
        price:{type: Number},
        extras:{ type: [String] }
      }],
      required:true,
    },
    status: {
      type: Number,
      default: 0,
    },
    location:{
      type: {
        lat:{type: Number},
        lng:{type: Number}
      }
    },
    customerID:{
      type: String
    },
    deliveryID:{
      type: String
    },
    phoneNumber:{
      type:String
    },
    address:{
      type:String
    },
    deliveryCharge:{
      type:Number
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
