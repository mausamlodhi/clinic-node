import model from "../models";
const { user, patient, patientclinic } = model;

export default {
  async getPatientList(req) {

  },
  async becomePatient(req, email) {
    const transaction = await model.sequelize.transaction();
    try {
      const userResult = await user.findOne({ where: { email } });
      console.log(userResult);
      if (userResult) {
        let result = await patient.create({
          dateOfBirth: req.dateOfBirth,
          address: req.address,
          diabitic: req.diabitic,
          insurance: req.insurance,
          userId: userResult.dataValues.id
        }, { transaction });
        //console.log(result);
        await patientclinic.create({
            userId: userResult.dataValues.id,
            clinicId: req.clinicId
        }, { transaction })

        await transaction.commit();
        return true;
      }
      else {
        return false;
      }
    } catch (error) {
      console.log(error);
      await transaction.rollback();
    }
  },
}
