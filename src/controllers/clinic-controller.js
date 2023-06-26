import repositories from "../repositories";
import HttpStatus from "http-status";

const { clinicRepository } = repositories;

export default {
    async getList(req, res, next) {
        try {
            const result = await clinicRepository.getList();
            console.log(result)
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


    async getClinics(req, res, next) {
        try {
            const result = await clinicRepository.getClinicList(req);
            // console.log("-------------------------------------------------------------")
            // console.log(result )
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
}