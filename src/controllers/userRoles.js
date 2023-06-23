import repositories from "../repositories";
import httpStatus from "http-status";
const {userRoles} = repositories;
export default {
    async assignRole(req,res,next){
        try{
            const result = await userRoles.assignRole(req.body);
            res.status(httpStatus.OK).json({message : "Role assigned",data : result});
        }catch(error){
            console.log(error);
            throw Error(error);
        }
    }
}