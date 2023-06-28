import repositories from "../repositories";
import httpStatus from "http-status";
const {scheduleRepository} = repositories;
export default {
    async getCreateSchedulee(req,res,next){
        try{
            const {time,wholeDayTime,doctorId}=req.body;
            const data = await scheduleRepository.getTime(time,wholeDayTime,doctorId);
            if(data)
                res.status(httpStatus.OK).json({success:true,data:data});
        }catch(error){
            res.status(httpStatus.BAD_REQUEST).json({data : [],success:false});
        }
    },
    async getAllScheduleList(req,res,next){
        try{
            const list = await scheduleRepository.getAllSchedule(req);
            res.status(httpStatus.OK).json({data:list,success:true});
        }catch(error){
            res.status(httpStatus.BAD_REQUEST).json({data:[],success:false});
        }
    }
}