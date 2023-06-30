import repositories from "../repositories";
import httpStatus from "http-status";
const {appointmentRepository}=repositories;
export default {
    async checkAppointment(req,res,nex){
        try{
            const data = req.body;
            const result=await appointmentRepository.checkAppointment(req);
            res.status(httpStatus.OK).json({data:result,success:true});
        }catch(error){
            res.status(httpStatus.BAD_REQUEST).json({success:false,data:[]});
        }
    },
    async makeAnAppointment(req,res,next){
        try{
            const newData = await appointmentRepository.makeAnAppointment(req);
            res.status(httpStatus.OK).json({data:newData,success:true,message:"erdgerte"});
        }catch(error){
            res.status(httpStatus.BAD_REQUEST).json({data:[],success:"dfgvdgsr",message:"sefsgsf"});
        }
    }
}