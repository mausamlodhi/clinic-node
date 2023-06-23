import repositories from "../repositories";
import HttpStatus from "http-status";

const { clinicRepository } = repositories;

export default {
    async getClinics(req, res, next) {
        try {
            const result = await clinicRepository.getClinicList(req);
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
}