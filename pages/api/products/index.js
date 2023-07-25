import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";
import { verify } from "jsonwebtoken";
import { getCookie } from 'cookies-next';
const handler = async(req, res) => {
  const { method } = req;
  await dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    const token = getCookie('accessToken', { req, res });
    await verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
      if(!err && decoded) {
        if(decoded.role=='admin'){
          try {
            const product = await Product.create(req.body);
            res.status(201).json(product);
          } catch (err) {
            res.status(700).json(err);
          }
        }else{
          return res.status(500).json({message: 'Sorry you are not authorized'});
        }
      }else{
        return res.status(600).json({message: `Sorry you are not authenticated`,error:err, token: `${token}`})
      }
    })
  }
};
export default handler;
