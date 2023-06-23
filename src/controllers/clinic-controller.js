import repositories from "../repositories";
import HttpStatus from "http-status";

const { clinicRepository } = repositories;

export default {
    async getClinics(req, res, next) {
        try {
            const result = await clinicRepository.getClinicList(req);
            res.status(HttpStatus.OK).json({
                success: true,
                data: result,
            });
        } catch (error) {
            console.log(error)
        }
    },
}