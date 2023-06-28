import repositories from "../repositories";
import HttpStatus from "http-status";

const { adminRepository } = repositories;

export default {
     /**
         * get all dashboard details
         * @param {Object} req
         * @param {Object} res
         * @param {Function} next
         */
    async dashboard(req, res, next) {
        try {
            const result = await adminRepository.dashboard(req);
            if (result) {
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: result,
                });
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    data: null,
                    message: "Something went wrong"
                });
            }
        } catch (error) {
            next(error); 
        }
    },
}