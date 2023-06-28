import user from "../models/user";
import repositories from "../repositories";
import HttpStatus from "http-status";

const { accountRepository } = repositories;

export default {
    /**
         * sign up user
         * @param {Object} req
         * @param {Object} res
         * @param {Function} next
         */
    async signup(req, res, next) {
        try {
            console.log(req.body);
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
            next(error);
        }
    },

    /**
        * sign out user
        * @param {Object} req
        * @param {Object} res
        * @param {Function} next
        */
    async logout(req, res, next) {
        try {
            if (await accountRepository.signout(req, res, next))
                return res.status(HttpStatus.OK).json({
                    success: true,
                    message: null
                });
            else
                return res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "User doesn't exists"
                })
        } catch (error) {
            next(error);
        }
    },

    /**
     * login user
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    async login(req, res, next) {
        try {
            const user = await accountRepository.checkLogin(req);
            //console.log(user)
            if (user?.token) {
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: user,
                });
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    data: [],
                });
            }
        } catch (error) {
            next(error);
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
            next(error);
        }
    },

    /**
        * admin login
        * @param {Object} req
        * @param {Object} res
        * @param {Function} next
        */
    async adminLogin(req, res, next) {
        try {
            const user = await accountRepository.adminLogin(req);
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
            next(error);
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
            const user = await accountRepository.resetPassword(req);
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

            next(error);
        }
    },

    /**
                * update profile  user
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
            next(error);
        }
    }
}  