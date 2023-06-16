import path from "path";
import dotenv from "dotenv";
dotenv.config();
export default{
    app:{
        swaggerHost : process.env.SWAGGER_HOST,
        mediaStorage : 'local'
    },
    database : {
        mysql:{
            host : process.env.DB_HOST,
            port : process.env.DB_PORT,
            user : process.env.DB_USERNAME,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME,
            timezone : '+00:00'
        }
    },
    jwtSecret : process.env.JWT_SECRET,
    jwtExpiry : process.env.JWT_EXPIRY,
}