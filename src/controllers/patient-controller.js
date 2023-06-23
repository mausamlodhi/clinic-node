import repositories from "../repositories";
import HttpStatus from "http-status";

const { patientRepository } = repositories;

export default {
    async getPatients(req, res, next) {
        try {
            const result = await patientRepository.getPatientList(req);
            if (result) {
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: null,
                });
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    data: null,
                });
            }
        } catch (error) {
            console.log(error)
        }
    },

    async updatePatientProfile(req, res, next) {

    },
    async becomePatient(req, res, next){
        try {
            const updatedUser = await patientRepository.becomePatient(req.body,req.body.email);
            if (updatedUser) {
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: null,
                });
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    data: null,
                });
            }
        } catch (error) {
            console.log(error);
            throw Error(error);
        }
    }
}