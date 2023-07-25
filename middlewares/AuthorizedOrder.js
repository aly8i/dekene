import { verify } from "jsonwebtoken";
import dbConnect from "../util/mongo";
import Order from "../models/Order";
import { getCookie } from 'cookies-next';
const AuthorizedOrder = (fn) => async (req,res) => {
  const { method } = req;
  const token = getCookie('accessToken', { req, res });
  if (method === "GET"){
    return await fn(req, res)
  }else{
    await dbConnect();
    await verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
      if(!err && decoded) {
        if(decoded.role=='admin'){
          return await fn(req, res)
        }else{
          return res.status(500).json({message: 'Sorry you are not authorized'})
        }
      }else{
        res.status(600).json({message: "Sorry you are not authenticated"})
      }
    })
  }
};
export default AuthorizedOrder;