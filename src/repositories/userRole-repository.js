import model from "../models";
const {userRole} = model;
export default {
    async assignRole(data){
        try{
            const {userId,roleId} = data;
            const isroled = await userRole.update({userId,roleId},{where : {userId}});
            console.log("Roled : "+isroled);
            return isroled;
        }catch(error){
            console.log(error);
            throw Error(error);
        }
    }
}