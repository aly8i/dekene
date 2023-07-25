import dbConnect from "../../util/mongo";
import User from "../../models/User";
import Token from "../../models/Token";
import cookie from "cookie";
import generateAccessToken from "../../functions/generateAccessToken";
const handler = async(req, res) => {
  await dbConnect();
  if (req.method === "POST") {
    var access = "";
    const user = req.body;
    try {
      try{
        access = generateAccessToken(user);
      }catch(err){
        res.status(500).json(err);
      }
      
      try {
        await Token.create({value:access,userID:user._id});
      } catch (err) {
        res.status(800).json(err);
      }
      res.setHeader("Set-Cookie",cookie.serialize("accessToken", access, {
        maxAge: 2*24*60*60*1000,
        sameSite: "strict",
        httpOnly: true,
        path: "/",
      })
    );
    res.status(200).json(user);
    } catch (err) {
      res.status(700).json(err);
    }
  }
}
export default handler;