import models from "../../models";
const {clinic} = models;
export default {
    async createClinic(req){
        try{
            const {name,address,contact,image} = req.body;
            const result = await user.create({name,address,contact,image});
            return result;
        }catch(error){
            console.log(error);
            throw Error(error);
        }
    },
    async checkClinicAvialibility(req){
        try{
                const {name} = req?.body;
                const result = await clinic.findOne({name});
                return result?.id;
        }catch(error){
            console.log(error);
            throw Error(error);
        }
    },
    async updateClinic(req){
        try{
            const clinicId = await this.checkClinicAvialibility(req);
            const {name,address,contact,image} = req?.body;
            return await clinic.update({name,address,contact,image},{where : {id:clinicId}});
        }catch(error){
            throw Error(error);
        }
    },
    async getAllClinicList(){
        try{
            return await clinic.findAll
            
            ();
        }catch(error){
            console.log(error);
            throw Error(error);
        }
    },
    async deleteClinic(req){
        try{
            const {id} = req?.body;
            const isDelete = await clinic.destroy({where : {id}});
            console.log("Delete clinic : "+isDelete);
            return isDelete;
        }catch(error){
            console.log(error);
            throw Error(error);
        }
    }
}