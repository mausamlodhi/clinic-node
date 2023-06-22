import repositories from "../repositories";
import httpStatus from "http-status";
const {clinicRepository} = repositories
export default {
    async createClinic(req,res,next){
        try{
            const clinic = await clinicRepository.createClinic(req);
            if(clinic){
                res.status(httpStatus.OK).json({message : "Clinic added success...",success  :true});
            }
            else
                res.status(httpStatus.BAD_REQUEST).json({message : "Ohho someThing went wrong",success : false
            })
        }catch(error){
            console.log(error);
            next(error);
        }
    },
    async deleteClinic(req,res,next){
        try{
            await clinicRepository.deleteClinic(req)? res.status(httpStatus.OK).json({message : "Clinic deleted success...",success  :true}):res.status(httpStatus.BAD_REQUEST).json({message : "Ohhoo something went wrong",success : false});
        }catch(error){
            next(error);
        }
    },
    async getAllClinic(req,res,next){
        try{
            const list = await clinicRepository.getAllClinicList();
            list.len
        }catch(error){
            console.log(error);
            next(error);
        }
    },
    async updateClinic(req,res,next){
        try{
            const updated = await clinicRepository.updateClinic(req);
            updated?res.status(httpStatus.OK).json({message : "Clinic updated success...",success  :true}):res.status(httpStatus.BAD_REQUEST).json({message : "Ohho something went wrong",success  :false});
        }catch(error){
            next(error);
        }
    }
}