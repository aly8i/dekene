import {sign} from 'jsonwebtoken';
const generateAccessToken = async(user) => {
    const payload = {sub:user._id , img:user.img , username:user.username , role:user.role};
    const jwt = sign(payload,process.env.NEXT_PUBLIC_JWT_SECRET,{expiresIn: '1d'});
    return jwt;
};
export default generateAccessToken;