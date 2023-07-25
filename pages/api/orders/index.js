import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";
import Authorized from "../../../middlewares/Authorized";
import { verify } from "jsonwebtoken";
const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    await verify(req.body.jwt,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
      if(!err && decoded) {
        try {
          const order = await Order.create({ name:decoded.name, total:decoded.total,products:decoded.products ,location:decoded.location, customerID:decoded.customerID, phoneNumber:decoded.phoneNumber, address:decoded.address, deliveryCharge:decoded.deliveryCharge});
          res.status(201).json(order);
        } catch (err) { 
          res.status(500).json(err);
        }
    }})
  }
};

export default handler;
