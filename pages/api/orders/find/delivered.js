import dbConnect from "../../../../util/mongo";
import Order from "../../../../models/Order";
import Product from "../../../../models/Product";
import { getCookie } from 'cookies-next';
import { verify } from "jsonwebtoken";
export default async function handler(req, res) {
  const { method } = req;
  const token = req.headers.authorization;
  await dbConnect();
  if (method === "POST") {
    await verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
      if(!err && decoded) {
        if(decoded.role=='admin'){
            try {
              await Order.find({'deliveryID': req.body.deliveryID})
              .populate('products.product')
              .exec()
              .then(docs=>{
               return res.status(200).json(docs);
              })
            } catch (err) {
              return res.status(500).json(err);
            }
          }else{
            return res.status(500).json({message: 'Sorry you are not authorized'})
          }
        }else{
          return res.status(600).json({message: "Sorry you are not authenticated"})
        }
    })
  }
}