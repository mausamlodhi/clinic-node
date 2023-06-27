import httpStatus from "http-status";
import models from "../models";
const {doctorClinic} = models;
export default {
    async insertData(req,res,next){
        try{
            const {clinicId,doctorId} = req?.body;
            const data = await doctorClinic.create({clinicId,doctorId});
            console.log("Doctor Data : "+data);
            return data;
        }catch(error){
            throw Error(error);
        }
    }
}