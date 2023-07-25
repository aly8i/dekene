import dbConnect from "../../util/mongo";
import User from "../../models/User";
import generateAccessToken from "../../functions/generateAccessToken";
import { setCookie } from 'cookies-next';

const handler = async(req, res) => {
    await dbConnect();
    if (req.method === "POST") {
      const username = req.body.username;
      const phonenumber = req.body.phonenumber;
          
          const user = await User.create({username,phonenumber});
          const access = await generateAccessToken(user);
          await setCookie('accessToken',access,{req,res,maxAge: process.env.NEXT_PUBLIC_COOKIE_AGE,path:'/',httpOnly:true,secure:true,sameSite:"strict"});
          res.status(201).json(user);
    }
};

export default handler;