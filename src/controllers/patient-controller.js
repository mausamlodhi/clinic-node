import repositories from "../repositories";
import HttpStatus from "http-status";

const { patientRepository } = repositories;

export default {
    async getPatients(req, res, next) {
        try {
            const result = await patientRepository.getPatientList(req);
            res.status(HttpStatus.OK).json({
                success: true,
                data: result,
            });
        } catch (error) {
            console.log(error)
        }
    },

    async updatePatientProfile(req, res, next) {

    },
    async becomePatient(req, res, next){
        try {
            const updatedUser = await patientRepository.becomePatient(req.body,req.body.email);
            return res.status(HttpStatus.OK).json({
                success: true,
                message: "You became patient"
            })
        } catch (error) {
            console.log(error);
            throw Error(error);
        }
    }
}