import { verify } from "jsonwebtoken";
import { deleteCookie,getCookie } from 'cookies-next';
const Verify = (fn) => async (req,res) => {
  const token = getCookie('accessToken', { req, res });
  if(!token) return res.status(401).json("You are not authenticated");
   await verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
    if(!err && decoded) {
        req.decoded = decoded;
      return await fn(req, res)
    }
    res.status(500).json('Token is not valid');
  })
  return await fn(req, res);
};
export default Verify;