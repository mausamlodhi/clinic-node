import bcrypt from "bcryptjs";
import models from "../models";
import jwt from "../services/jwt";
import constant from "../constants";
import utility from "../services/utility";
import Email from "../services/email";

const { commonConstant } = constant;

const { user, role, userRole, doctor, doctorSpecialization, patient } = models;
export default {
    /**
     * Check user email and password for login
     * @param {Object} req
     * @returns
     */

    async signOut(id) {
        try {
            const data = await user.update({ token: null }, { where: { id } });
        } catch (error) {
            throw error;
        }
    },
    async checkLogin(req) {
        try {
            let doctorData, doctorSpecializationData;
            const { email, password } = req.body;
            const userResult = await user.findOne({ where: { email: email } });
            const userRoles = await userRole.findOne({
                where: { userId: userResult.id },
            });
            if (userResult) {
                const isPasswordMatch = await bcrypt.compare(
                    password,
                    userResult.password
                );

                if (isPasswordMatch) {
                    // here token will be created and send the reponse
                    const { ...userData } = userResult.get();
                    const token = jwt.createToken({
                        name: userData?.name,
                        email: userData?.email,
                        password: userData?.password,
                    });
                    const updateToken = await user.update(
                        { token },
                        { where: { id: userResult.id } }
                    );
                    // user.findOne({ where: { id: userResult.id } })
                    //   .on('success', function (project) {
                    //     // Check if record exists in db
                    //     if (project) {
                    //       project.update({
                    //         token:newToken,
                    //       })
                    //         .success(function () { })
                    //     }
                    //   })
                    if (userRoles.roleId == 2) {
                        doctorData = await doctor.findOne({
                            where: { userId: userResult.id },
                            // include: [{ model: user }],
                        });
                        await doctorSpecialization.findAll({
                            where: { doctorId: doctorData.id },
                        });
                    }
                    return {
                        token,
                        ...userData,
                        roleId: userRoles.roleId,
                        doctorData,
                        doctorSpecializationData,
                    };
                }
            } else {
                return { status: commonConstant.STATUS.INVALID };
            }
        } catch (error) {
            throw Error(error);
        }
    },
    async verifyUser(token) {
        try {
            const validUser = jwt.verifyToken(token);
            return true;
        } catch (error) {
            throw Error(error);
        }
    },
    async signout(req, res, next) {
        try {
            const isValid = await this.verifyUser(req.body.credential);
            const checkUser = await admin.update(
                { createdAt: null },
                { where: { email: req.body.email } }
            );
            return true;
        } catch (error) {
            throw Error(error);
        }
    },
    async adminLogin(req, res, next) {
        try {
            const { email, password } = req.body;
            const userResult = await user.findOne({ where: { email: email } });
            // const adminData = await userRole.findOne({
            //   where: { userId: userResult.userId },
            // });
            if (userResult) {
                const isPasswordMatch = await bcrypt.compare(
                    password,
                    userResult.password
                );
                if (isPasswordMatch) {
                    const { ...userData } = userResult.get();
                    const token = jwt.createToken(userData);
                    return { ...userData, token };
                } else {
                    return { status: "badpassword" };
                }
            } else {
                return { status: commonConstant.STATUS.INVALID };
            }
        } catch (error) {
            throw Error(error);
        }
    },
    /**
     * Check data for user sign up
     * @param {Object} req
     * @returns
     */
    async userSignup(req) {
        const transaction = await models.sequelize.transaction();
        try {
            const userResult = await user.findOne({
                where: { email: req.body.email },
            });
            if (!userResult) {
                const bodyData = req.body;
                //let hashPassword= this.createHashPassword(bodyData.password);
                const salt = await bcrypt.genSalt();
                const hashPassword = await bcrypt.hash(bodyData.password, salt);
                bodyData.password = hashPassword;
                const userData = await user.create(bodyData, { transaction });
                const roleData = await role.findOne({
                    where: { role: commonConstant.ROLE.USER },
                });
                if (userData) {
                    const data = {
                        userId: userData.id,
                        roleId: roleData.id,
                    };
                    await userRole.create(data, { transaction });
                    await transaction.commit();
                }
                return true;
            } else {
                return false;
            }
        } catch (error) {
            await transaction.rollback();
            throw Error(error);
        }
    },
    async forgotPassword(req) {
        try {
            const userResult = await user.findOne({
                where: { email: req.body.email },
            });
            if (userResult) {
                req.forgotUser = userResult;
                const data = {
                    to: userResult.dataValues.email,
                    // name: `${userResult.dataValues.firstName} ${userResult.dataValues.lastName}`,
                };
                const result = await this.generatePasswordResetToken(req);
                data.token = result.passwordResetToken;
                return await Email.sendOtp(data)
                    .then(() => ({ status: "sent" }))
                    .catch((error) => ({ status: "send_error", error }));
            }
            return false;
        } catch (error) {
            throw Error(error);
        }
    },
    async generatePasswordResetToken(req) {
        const { forgotUser } = req;
        try {
            const token = utility.generateRandomString(32);
            const userData = { passwordResetToken: token };
            await forgotUser.update(userData);
            return userData;
        } catch (error) {
            throw Error(error);
        }
    },
    async resetPassword(req) {
        try {
            const { newPassword ,id} = req.body;
            const userResult = await user.findOne({
                where: { password_reset_token: id },
            });
            if (userResult) {
                await this.updatePassword(userResult, newPassword);
                return true;
            }
            return { status: commonConstant.STATUS.INACTIVE };
        } catch (error) {
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
    async getUserData(email) {
        try {
            const userData = await user.findOne({ email });
            return userData;
        } catch (error) {
            throw Error(error);
        }
    },
    async updateProfile(data, userEmail) {
        try {
            const userData = await this.getUserData(userEmail);
            let firstName = data?.firstName || userData.firstName;
            let lastName = data?.lastName || userData.lastName;
            let phoneNumber = data?.phoneNumber || userData?.phoneNumber;
            let gender = data?.gender || userData?.gender;
            const bodyData = { firstName, lastName, phoneNumber, gender };
            const condition = { where: { email: userEmail } };
            const result = await user?.update(
                { ...bodyData },
                { where: { id: userData.id } }
            );
            return result[0];
        } catch (error) {
            throw Error(error);
        }
    },
    async getUserData(email) {
        try {
            const userData = await user.findOne({ email });
            return userData;
        } catch (error) {
            throw Error(error);
        }
    },
};
