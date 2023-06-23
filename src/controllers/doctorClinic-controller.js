import repositories from "../repositories";
import httpStatus from "http-status";
const {clinicDoctorRepository} = repositories;
export default {
    async createClinicData(req,res,next){
        try{
             await clinicDoctorRepository.insertData(req)?res.status(httpStatus.OK).json({message : "Data inserted success",data :[]}):res.status(httpStatus.BAD_REQUEST).json({message:"Ohho something went wrong",data:[]});
        }catch(error){
            console.log(error);
        }
    }
}