import model from "../models";
import constant from '../constants';

const { user, patient } = model;
const { commonConstant } = constant;

export default {

  /**
  *get patient list
  * @param {Object} req
  * @returns
  */
  async getPatientList(req) {
    let searchCriteriaPatient = {
      include: [{ model: user }]
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
        let result = await patient.create({
          dateOfBirth: req.dateOfBirth,
          address: req.address,
          diabitic: req.diabitic,
          insurance: req.insurance,
          userId: userResult.dataValues.id
        }, { transaction });

        const roleData = await role.findOne({
          where: { role: commonConstant.ROLE.PATIENT }
        });

        await userRole.update({ roleId: roleData.id },
          {
            where: { userId: userResult.dataValues.id }
          }, { transaction })

        await transaction.commit();
        return true;
      }
      else {
        return false;
      }
    } catch (error) {
      await transaction.rollback();
      throw Error(error);
    }
  },
}
