import jwt from "jsonwebtoken";
import config from "../config/config";

export default {
    createToken(payload){
        return jwt.sign(payload,config.jwtSecret,{expiresIn : config.jwtExpiry});
    },
    verifyToken(token){
        return jwt.verify(token,config.jwtSecret,{expiresIn : config.jwtExpiry});
    },
    decodeToken(token){
        return jwt.decode(token,{complete:true});
    }
}