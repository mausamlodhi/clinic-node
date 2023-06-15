import patientModels from "../models";
import repositories from "../repositories";
import httpStatus from "http-status";
const {patient} = repositories;
export default {
    async patientSignUp(request,response,next){
        try{
            console.log("Yaha per aa gya 3");
            const patientSignUp = await patient.signUp(request);
            if(patientSignUp){
                return response.status(httpStatus.OK).json({
                    success : true,
                    message : "Sign Up success"
                })
            }else{
                return response.status(httpStatus.BAD_REQUEST).json({
                    success : false,
                    message : "Sign Up failed"
                })
            }
        }catch(error){
            console.log(error);
            next(error);
        }
    },
    async patientLogIn(request,response,next){
        try{
            const patientData = await patient.checkPatient(request);
            if(patientData.email){
                return response.status(httpStatus.OK).json({message : "Sign In success...",patient : patientData,status : true});
            }
        }catch(error){
            console.log(error);
            next(error);
        }
    },
    async forgottPassword(request,response,next){
        try{
            
        }catch(error){
            console.log(error);
            throw Error(error);
        }
    }
}