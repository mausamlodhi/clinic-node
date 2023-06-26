import repositories from "../repositories";
import HttpStatus from "http-status";

const { adminRepository } = repositories;

export default {
    async dashboard(req, res, next) {
        try {
            //console.log(req.body);
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
            console.log(error);
        }
    },
}