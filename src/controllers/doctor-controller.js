import repositories from "../repositories";
import HttpStatus from "http-status";

const { doctorRepository } = repositories;

export default {
    async getDoctors(req, res, next) {
        try {
            const result = await doctorRepository.getDoctorList(req);
            res.status(HttpStatus.OK).json({
                success: true,
                data: result,
            });
        } catch (error) {
            console.log(error)
        }
    },
    async updateDoctorProfile(req, res, next) {
        try {
            const updatedUser = await doctorRepository.updateProfile(req.body);
            return res.status(HttpStatus.OK).json({
                success: true,
                message: "Profile Updated..."
            })
        } catch (error) {
            console.log(error);
            throw Error(error);
        }
    },
    async becomeDoctor(req, res, next) {
        try {
            const updatedUser = await doctorRepository.becomeDoctor(req.body, req.body.email);
            return res.status(HttpStatus.OK).json({
                success: true,
                message: "You became doctor"
            })
        } catch (error) {
            console.log(error);
            throw Error(error);
        }
    }
}