import bcrypt from "bcryptjs";
import models from "../models";
import jwt from "../services/jwt";
import constant from "../constants";
import utility from "../services/utility";
import Email from "../services/email";

const { commonConstant } = constant;

const { user, role, userRole, doctor, doctorSpecialization } = models;
export default {
  /**
   * Check user email and password for login
   * @param {Object} req
   * @returns
   */
  async checkLogin(req) {
    try {
      let doctorData, doctorSpecializationData;
      const { email, password } = req.body;
      const userResult = await user.findOne({ where: { email: email } });
      //console.log(userResult.id); //user ki id
      const userRoles = await userRole.findOne({
        where: { userId: userResult.id },
      });
      // console.log(userRoles) // role id from role table

      if (userResult) {
        const isPasswordMatch = await bcrypt.compare(
          password,
          userResult.password
        );
        //console.log(isPasswordMatch)
        if (isPasswordMatch) {
          // here token will be created and send the reponse
          const { ...userData } = userResult.get();
          const token = jwt.createToken(userData);

          if (userRoles.roleId == 2) {
            doctorData = await doctor.findOne({
              where: { userId: userResult.id },
              // include: [{ model: user }],
            });

            // console.log(doctorData)

            await doctorSpecialization.findAll({
              where: { doctorId: doctorData.id },
            });
            console.log(doctorSpecializationData);
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
      console.log(error);
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
      if (userResult) {
        const isPasswordMatch = await bcrypt.compare(
          password,
          userResult.password
        );
        if (isPasswordMatch) {
          // here token will be created and send the reponse
          const { ...userData } = userResult.get();
          const token = jwt.createToken(userData);
          return { token, ...userData };
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
        return true;
      } else {
        return false;
      }
    } catch (error) {
      await transaction.rollback();
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
      const { id } = req.params;
      const { newPassword } = req.body;
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

  async updateProfile(data, email) {
    console.log(email);
    try {
      const userData = await user.findOne({ where: { email: email } });
      let firstName = data?.firstName || userData.firstName;
      let lastName = data?.lastName || userData.lastName;
      let contact = data?.contact || userData?.contact;
      let gender = data?.gender || userData?.gender;
      const result = await user?.update(
        { firstName, lastName, phoneNumber: contact, gender },
        { where: { email: userData.email } }
      );

      return result;
    } catch (error) {
      throw Error(error);
    }
  },
};
