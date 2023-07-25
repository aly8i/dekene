import { verify } from "jsonwebtoken";
const Authenticated = (fn) => async (req,res) => {
  const token = req.headers.authorization;
  await verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
    if(!err && decoded) {
      req.decoded = decoded
      return await fn(req, res)
    }else{
      return res.status(500).json({message: 'Sorry you are not authenticated'})
    }
  })
};
export default Authenticated;