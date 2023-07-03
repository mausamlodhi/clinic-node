import repositories from "../repositories";
import HttpStatus from "http-status";

const { doctorRepository } = repositories;

export default {
    /**
        * get list of all doctors
        * @param {Object} req
        * @param {Object} res
        * @param {Function} next
        */
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
            next(error);
        }
    },

    /**
            * get list of all doctors under certain condition 
            * @param {Object} req
            * @param {Object} res
            * @param {Function} next
            */
    async getDoctorListCondition(req, res, next) {
        try {
            const result = await doctorRepository.getDoctorListCondition(req);
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
            next(error);
        }
    },

    /**
              * get all specialization list
              * @param {Object} req
              * @param {Object} res
              * @param {Function} next
              */
    async specializationList(req, res, next) {
        try {
            const result = await doctorRepository.specializationList(req);
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
            next(error);
        }
    },

    /**
              * update profile doctor
              * @param {Object} req
              * @param {Object} res
              * @param {Function} next
              */
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
            next(error);
        }
    },

    /**
              * update profile and become doctor
              * @param {Object} req
              * @param {Object} res
              * @param {Function} next
              */
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
            next(error);
        }
    }
}