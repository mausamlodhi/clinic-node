import { Op, Sequelize } from "sequelize";
import models from "../models";
const {appointment} = models;
export default {
    async checkAppointment(req){
        try{
            const date = req.body.appointmentDate;
            const duration=req.body.appointmentDuration;
            const doctorId=req.body.doctorId;
            // const isAvialable = await appointment.findAll({
            //     where:Sequelize.where(Sequelize.fn("29/06/2023",Sequelize.col("appointmentDate")),{[Op.eq]:""})
            // });
            const isAvialable=await appointment.findAll({
                where:{
                    doctorId,
                    appointmentDate:date,
                    appointmentDuration:duration
                }
            });
            return isAvialable;
        }catch(error){
            throw error;
        }
    },
    async makeAnAppointment(req){
        try{
            const check = await this.checkAppointment(req);
            if(!check){
                const data=await appointment.create(req.body);
                return data;
            }
            else{
                return false;
            }
        }catch(error){
            throw error;
        }
    }
}