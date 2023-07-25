import dbConnect from "../../util/mongo";
import User from "../../models/User";
import { setCookie } from 'cookies-next';
import generateAccessToken from "../../functions/generateAccessToken";
const handler = async(req, res) => {
  await dbConnect();
  if (req.method === "POST") {
    var user={};
    var access = "";
    const phonenumber = req.body.phonenumber;
    try {
      try{
        user = await User.findOne({'phonenumber': phonenumber});
        access = await generateAccessToken(user);
      }catch(err){
        res.status(500).json(err);
      }
      await setCookie('accessToken',access,{req,res,maxAge: process.env.NEXT_PUBLIC_COOKIE_AGE,path:'/',httpOnly:true,secure:true,sameSite:"strict"});
    res.status(200).json(user);
    } catch (err) {
      res.status(700).json(err);
    }
  }
}
export default handler;