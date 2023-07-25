import dbConnect from "../../../../util/mongo";
import Order from "../../../../models/Order";
import Product from "../../../../models/Product";
import { getCookie } from 'cookies-next';
import { verify } from "jsonwebtoken";
export default async function handler(req, res) {
  const {
    method
  } = req;

  const token = getCookie('accessToken', { req, res });
  await dbConnect();
  if (method === "POST") {
    await verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
      if(!err && decoded) {
        

           await verify(req.body.jwt,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err2,decoded2){
                if(!err2 && decoded2) {
                    if(decoded.role=='admin' || decoded.sub==decoded2.customerID){
                        try {
                            await Order.find({"address":decoded2.address,"status":0})
                              .populate('products.product')
                              .exec()
                              .then(async docs=>{
                                const status = decoded2.status || 0;
                                if(docs.length==0){
                                    try {
                                        const order1 = await Order.create({ name:decoded2.name, total:decoded2.total,products:decoded2.products ,location:decoded2.location, status , customerID:decoded2.customerID, phoneNumber:decoded2.phoneNumber, address:decoded2.address, deliveryCharge:decoded2.deliveryCharge});
                                        return res.status(201).json({order1});
                                      } catch (err) { 
                                        return res.status(500).json(err);
                                      }
                                }else{
                                  const id = docs[0]._id.toString();
                                    try {
                                        const order2 = await Order.findByIdAndUpdate( id, { name:decoded2.name, total:decoded2.total,products:decoded2.products ,location:decoded2.location, status , customerID:decoded2.customerID, phoneNumber:decoded2.phoneNumber, address:decoded2.address, deliveryCharge:decoded2.deliveryCharge}, {
                                          new: true,
                                        });
                                        return res.status(201).json({order2});
                                      } catch (err) {
                                        return res.status(500).json(err);
                                      }
                                }
                                  
                              })
                          } catch (err) {
                            return res.status(501).json(err);
                          }
                    }else{
                        res.status(600).json({message: "Sorry you are not authorized"})
                    }

              }else{
                res.status(600).json({message: "Sorry you are not authenticated"})
              }
             
            })
                
        }else{
            res.status(600).json({message: "Sorry you are not authorized"})
        }

    })
        
  }else{
    res.status(503).json({message: "Sorry you are not authenticated"})
  }
}