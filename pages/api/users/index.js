import dbConnect from "../../../util/mongo";
import User from "../../../models/User";
import generateAccessToken from "../../../functions/generateAccessToken";
import AuthorizedGet from "../../../middlewares/AuthorizedGet";
import { verify } from "jsonwebtoken";
import { setCookie } from 'cookies-next';
export default AuthorizedGet( async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    await verify(req.body.jwt,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
      if(!err && decoded) {
    try {
      const user = await User.create({      
        googleID:decoded.googleID,
        username:decoded.username,
        fullname:decoded.fullname,
        img:decoded.img
      });
      const access = await generateAccessToken(user);
      await setCookie('accessToken',access,{req,res,maxAge: process.env.NEXT_PUBLIC_COOKIE_AGE,path:'/',httpOnly:true,secure:true,sameSite:"strict"});
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }})
  }
});
