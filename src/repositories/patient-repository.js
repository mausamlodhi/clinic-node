import model from "../models";
import constant from "../constants";
import moment from "moment";

const { user, patient, role, userRole } = model;
const { commonConstant } = constant;

export default {
  /**
   *get patient list
   * @param {Object} req
   * @returns
   */
  async getPatientList(req) {
    let searchCriteriaPatient = {
      include: [{ model: user }],
    };
    let result = await patient.findAll(searchCriteriaPatient);
    return result;
  },

  /**
   * update profile become patient
   * @param {Object} req
   * @returns
   */
  async becomePatient(req, email) {
    const transaction = await model.sequelize.transaction();
    try {
      const userResult = await user.findOne({ where: { email } });
      if (userResult) {
        let result = await patient.create(
          {
            dateOfBirth: req.dateOfBirth,
            address: req.address,
            diabitic: req.diabitic,
            insurance: req.insurance,
            userId: userResult.dataValues.id,
          },
          { transaction }
        );
        const roleData = await role.findOne({
          where: { role: commonConstant.ROLE.PATIENT },
        });

        await userRole.update(
          { roleId: roleData.id },
          {
            where: { userId: userResult.dataValues.id },
          },
          { transaction }
        );

        await transaction.commit();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      await transaction.rollback();
      throw Error(error);
    }
  },

  async updateProfile(data) {
    const transaction = await model.sequelize.transaction();
    try {
      const userData = await this.getUserData(data.email);
      const patientData = await this.getPatientData(userData.dataValues.id);
      const formattedDate = moment(patientData.dateOfBirth).format("YYYY-MM-DD");

      let firstName = data?.firstName || userData.firstName;
      let lastName = data?.lastName || userData.lastName;
      let contact = data?.contact || userData?.contact;
      let gender = data?.gender || userData?.gender;

      let dateOfBirth = data?.dateOfBirth || patientData?.dateOfBirth;
      let address = data?.address || patientData?.address;

      const result = await user?.update(
        {
          firstName,
          lastName,
          phoneNumber: contact,
          gender,
        },
        { where: { email: userData.email } },
        { transaction }
      );

      const output = await patient?.update(
        {
          dateOfBirth: formattedDate,
          address,
        },
        { where: { userId: patientData.userId } },
        { transaction }
      );
      await transaction.commit();
      return result, output;
    } catch (error) {
      await transaction.rollback();
      throw Error(error);
    }
  },

  async getUserData(email) {
    try {
      const userData = await user.findOne({ where: { email } });
      return userData;
    } catch (error) {
      throw Error(error);
    }
  },

  async getPatientData(id) {
    try {
      const userData = await patient.findOne({ where: { userId: id } });
      return userData;
    } catch (error) {
      throw Error(error);
    }
  },
};
