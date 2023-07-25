import dbConnect from "../../../../util/mongo";
import User from "../../../../models/User";
import { setCookie } from 'cookies-next';
import generateAccessToken from "../../../../functions/generateAccessToken";
import { verify } from "jsonwebtoken";
export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  if (method === "POST") {
    await verify(req.body.jwt,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
      if(!err && decoded) {
        try {
          const user = await User.findOne({'googleID': decoded.googleID});
          const access = await generateAccessToken(user);
          await setCookie('accessToken',access,{req,res,maxAge: process.env.NEXT_PUBLIC_COOKIE_AGE,path:'/',httpOnly:true,secure:true,sameSite:"strict"});
          res.status(200).json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      }})
  }
}
