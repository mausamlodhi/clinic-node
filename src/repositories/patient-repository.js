import bcrypt from "bcryptjs";
import utility from "../services/utility";
import {patient} from "../models";
import jwt from "../services/jwt.js"
export default {
    async createHashPassword(password){
        try{
            const salt = await bcrypt.genSalt(7);
            return await bcrypt.hash(password,salt);
        }catch(error){
            console.log(error);
            throw Error(error);
        }
    },
    async signUp(request){
        try{
            const verificationOtp = utility.genrateRandomNumber(6);
            const encryptedPassword = await this.createHashPassword(request.body.password);
            console.log(encryptedPassword);
            const {name,email,contact,dateOfBirth,gender,profileImage} = request.body;
            const patientData = await patient.create({name,email,contact,dateOfBirth,gender,password : encryptedPassword,profileImage});
            return true
        }catch(error){
            console.log(error);
            throw Error(error);
        }
    },
    async passwordCheck(password,newPassword){
        try{
            let isMatched = "";
            if(password && newPassword){
                isMatched = await bcrypt.compare(password,newPassword);
                return isMatched;
            }
        }catch(error){
            console.log(error);
            throw Error(error);
        }
    },
    async checkPatient(request){
        try{
            const {email,password} = request.body;
            const havingWhere = {email};
            const attributes = {exclude : ['createdAt','updatedAt']};
            const patientScope = {method:['patient',{where:{},havingWhere,attributes}]};
            const patientData = await patient.scope(patientScope).findOne();
            if(patientData.email===email){
                const passwordMatch = await this.passwordCheck(password,patientData.password);
                if(passwordMatch){
                    const {...patientDetails} = patientData.get();
                    const token = await jwt.createToken(patientDetails);
                    return {token,...patientDetails};
                }
            }
        }catch(error){
            console.log(error);
            throw Error(error);
        }
    },
    async forgottPassword(request){
        try{
            const {email,OTP} = request.body;
            const verifyOtp = patient.findOne({email});
            if(OTP===verifyOtp.otp){
                const passwordUpdated = patient.findOneAndUpdate()
            }
        }catch(error){
            console.log(error);
            throw Error(error);
        }
    }
}