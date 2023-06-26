import repositories from "../repositories";
import HttpStatus from "http-status";

const { doctorRepository } = repositories;

export default {
    async getDoctors(req, res, next) {
        try {
            const result = await doctorRepository.getDoctorList(req);
            if (result) {
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: result,
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
    async updateDoctorProfile(req, res, next) {
        try {
            const updatedUser = await doctorRepository.updateProfile(req.body);
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
    },
    async becomeDoctor(req, res, next) {
        try {
            const updatedUser = await doctorRepository.becomeDoctor(req.body, req.body.email);
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