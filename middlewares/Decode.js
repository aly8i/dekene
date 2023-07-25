import { verify } from "jsonwebtoken";
const Decode = (token) => {
  if(!token) throw new Error("Token is not Found !");;
   verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
    if(!err && decoded) {
      return decoded;
    }
    else{
        throw new Error("Token is not valid !");
    }
  })
};
export default Decode;