import repositories from "../repositories";
import HttpStatus from "http-status";

const { accountRepository } = repositories;

export default {
    /**
         * sign up doctor
         * @param {Object} req
         * @param {Object} res
         * @param {Function} next
         */
    async signup(req, res, next) {
        try {
            //console.log(req.body);
            const userSignup = await accountRepository.userSignup(req);
            if (userSignup) {
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: null,
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

    /**
     * login doctor
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    async login(req, res, next) {
        try {
            const user = await accountRepository.checkLogin(req);
            console.log(user);
            if (user.token) {
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: user,
                });
            } else if (user.status === 'inactive') {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    data: [],
                });
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    data: [],
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    /**
             * forget password  
             * @param {Object} req
             * @param {Object} res
             * @param {Function} next
             */
    async forgotPassword(req, res, next) {
        try {
            const result = await accountRepository.forgotPassword(req);
            console.log(result)
            if (result) {
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: result,
                });
            }
            else {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    data: null,
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    /**
             * login admin
             * @param {Object} req
             * @param {Object} res
             * @param {Function} next
             */
    async adminLogin(req, res, next) {
        try {
            const user = await accountRepository.adminLogin(req);
            console.log(user);
            if (user.token) {
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: user,
                });
            } else if (user.status === 'inactive') {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    data: [],
                });
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    data: [],
                });
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
             * reset password 
             * @param {Object} req
             * @param {Object} res
             * @param {Function} next
             */
    async resetPassword(req, res) {
        try {
            const user = await accountRepository.resetDoctorPassword(req);
            if (user) {
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: null,
                });
            }
            else {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    data: null,
                });
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
                * update profile  
                * @param {Object} req
                * @param {Object} res
                * @param {Function} next
                */

    async updateProfile(req, res, next) {
        try {
            const updatedUser = await accountRepository.updateProfile(req.body, req.body.email);
            return res.status(HttpStatus.OK).json({
                success: true,
                message: "Profile Updated..."
            })
        } catch (error) {
            console.log(error);
            throw Error(error);
        }
    }




}  