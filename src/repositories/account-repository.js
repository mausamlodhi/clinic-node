import bcrypt from 'bcryptjs';
import models from '../models';
import jwt from '../services/jwt';
import constant from '../constants';
import utility from '../services/utility';
import Email from '../services/email';

const { commonConstant } = constant;

const { user } = models;
export default {
    /**
   * Check doctor email and password for login
   * @param {Object} req
   * @returns
   */
    async checkLogin(req) {
        try {
            const { email, password } = req.body;
            const userResult = await user.findOne({ where: { email: email } });
            if (userResult) {
                const isPasswordMatch = await bcrypt.compare(password, userResult.password);

                if (isPasswordMatch) {
                    // here token will be created and send the reponse 
                    const { ...userData } = userResult.get();
                    const token = jwt.createToken(userData);
                    return { token, ...userData };
                }
            }
            else {
                return { status: commonConstant.STATUS.INVALID };
            }
        } catch (error) {
            console.log(error)
        }
    },

    async userSignup(req) {
        const transaction = await models.sequelize.transaction();
        try {
            const userResult = await user.findOne({ where: { email: req.body.email } });
            if (!userResult) {
                const bodyData = req.body;
                const salt = await bcrypt.genSalt();
                const hashPassword = await bcrypt.hash(bodyData.password, salt);
                bodyData.password = hashPassword;
                let role = req.body.userRole;
                console.log(role);
                let a = await user.create(bodyData, { transaction });
                await transaction.commit();
                return true;
            }
            else {
                return false;
            }
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            throw Error(error);
        }
    },
    async doctorForgotPassword(req) {
        try {

            const userResult = await doctor.findOne({ where: { email: req.body.email } });
            console.log(userResult.dataValues);
            if (userResult) {
                req.forgotUser = userResult;
                const data = {
                    to: userResult.dataValues.email,
                    name: `${userResult.dataValues.firstName} ${userResult.dataValues.lastName}`,
                };
                const result = await this.generatePasswordResetToken(req);
                data.token = result.passwordResetToken;
                return await Email.sendOtp(data)
                    .then(() => ({ status: 'sent' }))
                    .catch((error) => ({ status: 'send_error', error }));
            }
            return false;
        } catch (error) {
            console.log(error);
        };

    },

    async generatePasswordResetToken(req) {
        try {
            const token = utility.generateRandomString(10);
            const userData = { passwordResetToken: token };
            return userData;
        } catch (error) {
            throw Error(error);
        }
    },

    async resetDoctorPassword(req) {
        try {
            const { token, newPassword } = req.body;
            const userResult = await doctor.findOne({ passwordResetToken: token });
            if (userResult) {
                await this.updatePassword(userResult, newPassword);
                return true;
            }
            return { status: commonConstant.STATUS.INACTIVE };
        } catch (error) {
            console.log(error);
            throw Error(error);
        }
    },

    async updatePassword(userObject, newPassword) {
        try {
            const hashPassword = await this.createHashPassword(newPassword);
            return await userObject.update({
                password: hashPassword,
                passwordResetToken: null,
            });
        } catch (error) {
            throw Error(error);
        }
    },
    async createHashPassword(password) {
        try {
            const salt = await bcrypt.genSalt();
            return await bcrypt.hash(password, salt);
        } catch (error) {
            throw Error(error);
        }
    },


}