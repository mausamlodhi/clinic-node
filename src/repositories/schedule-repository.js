import model from "../models";
import constants from "../constants";
const {schedule} = model;
export default{
    async getTime(durationTime,wholeDayTime,doctorId){
        try{
            const length = wholeDayTime*1/durationTime*1;
            const schedule1 = [];
            let duration = '';
            let hours = 9;
            let minutes = 0;
            let AMPM = "AM"
            let appointmentTime = [];
            let time = "";
            for(let i=0;i<length;i++){
                minutes+=durationTime*1;
                if(minutes>=60){
                    hours++;
                    if(hours>12)
                        hours=1;
                    if(hours>=12)
                        AMPM = "PM"
                    minutes-=60;
                }
                duration = hours+":"+minutes+AMPM;
                schedule1.push(duration);
            }
            for(let i=0;i<length-1;i++){
                time = schedule1[i]+"-"+schedule1[i+1];
                appointmentTime.push(time);
            }
            const isScheduleCreated = await schedule.create({doctorId,appointmentDuration : appointmentTime+""});
            return isScheduleCreated;
        }catch(error){
            throw error;
        }
    },
    async getAllSchedule(){
       try{
        const data = await schedule.findOne({where : {id:2}});
        const list = data.appointmentDuration.split(",");
        const newData = {list,doctorId:data.doctorId,id:data.id};
        return newData;
       }catch(error)
       {
        throw error;
       }
    }
}