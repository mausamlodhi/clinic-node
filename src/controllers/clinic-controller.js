import repositories from "../repositories";
import HttpStatus from "http-status";

const { clinicRepository } = repositories;

export default {
    /**
        * get list of all clinics
        * @param {Object} req
        * @param {Object} res
        * @param {Function} next
        */
    async getList(req, res, next) {
        try {
            const result = await clinicRepository.getList();
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
        * get list of all clinics under certain condition
        * @param {Object} req
        * @param {Object} res
        * @param {Function} next
        */
    async getClinics(req, res, next) {
        try {
            const result = await clinicRepository.getClinicList(req);
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
        * create a clinic
        * @param {Object} req
        * @param {Object} res
        * @param {Function} next
        */
    async createClinic(req, res, next) {
        try {
            const clinic = await clinicRepository.createClinic(req);
            if (clinic) {
                res.status(HttpStatus.OK).json({ message: "Clinic added success...", success: true });
            }
            else
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: "Ohho someThing went wrong", success: false
                })
        } catch (error) {

            next(error);
        }
    },

    /**
        * delete a clinic
        * @param {Object} req
        * @param {Object} res
        * @param {Function} next
        */
    async deleteClinic(req, res, next) {
        try {
            const deleted = await clinicRepository.deleteClinic(req);
            if (deleted) {
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
        * update  clinic details
        * @param {Object} req
        * @param {Object} res
        * @param {Function} next
        */
    async updateClinic(req, res, next) {
        try {
            const updated = await clinicRepository.updateClinic(req);
            if (updated) {
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