import model from "../models";
import accountRepository from "./account-repository";
const { clinic, doctor, doctorClinic, patient, user } = model;
import { Op } from 'sequelize';

export default {
/**
   * get list of all clinics
   * @param {Object} req
   * @returns
   */
  async getList(req) {
    try {
      let result = await clinic.findAll();
      return result;
    }
    catch (error) {
      throw Error(error);
    }
  },

  /**
   * doctor and patient of particular clinic
   * @param {Object} req
   * @returns
   */
  async getClinicList(req) {
    try {
      const { query: { clinicId } } = req;
      let where = {};
      if (clinicId) {
        where.clinicId = { [Op.like]: `%${clinicId}%` };
      }

      let searchCriteriaDoctor = {
        where,
        include: [{
          model: doctor,
          include: [user],
          required: true
        }]
      };
      let searchCriteriaPatient = {
        where,
        include: [{ model: user }]
      };

      const result = { doctorList: [], patientList: [] };
      if (clinicId) {
        const doctorClinicData = await doctorClinic.findAll(searchCriteriaDoctor);
        const patientClinicData = await patient.findAll(searchCriteriaPatient);

        if (doctorClinicData.length > 0) {
          await Promise.all(
            doctorClinicData.map(async (item) => {
              result.doctorList.push(item.dataValues);
            }),
          );
        }

        if (patientClinicData.length > 0) {
          await Promise.all(
            patientClinicData.map(async (item) => {
              result.patientList.push(item.dataValues);
            }),
          );
        }

      }
      return result;
    } catch (error) {
      throw Error(error);
    }
  },

/**
   * create a clinic
   * @param {Object} req
   * @returns
   */
  async createClinic(req) {
    try {
      const { name, address, contact, image,email,password } = req.body;
      const newPassword = await accountRepository.createHashPassword(password);
      const result = await clinic.create({ name, address, contact, image,email,password:newPassword });
      return result;
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  },
  async checkClinicAvialibility(req) {
    try {
      const { name } = req?.body;
      const result = await clinic.findOne({ name });
      return result?.id;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * update clinic profile
   * @param {Object} req
   * @returns
   */
  async updateClinic(req) {
    try {
      const clinicId = await this.checkClinicAvialibility(req);
      const { name, address, contact, image } = req?.body;
      return await clinic.update({ name, address, contact, image }, { where: { id: clinicId } });
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   * delete any clinic
   * @param {Object} req
   * @returns
   */
  async deleteClinic(req) {
    try {
      const { id } = req?.body;
      const isDelete = await clinic.destroy({ where: { id } });
      return isDelete;
    } catch (error) {
      throw Error(error);
    }
  }
}
// async getClinicList(req) {
  //   try {
  //     const { query: { clinicId, doctorId } } = req;
  //     let where = {};

  //     if (clinicId) {
  //       where.clinicId = { [Op.like]: `%${clinicId}%` };
  //     }
  //     // if (doctorId) {
  //     //   where.doctorId = { [Op.like]: `%${doctorId}%` };
  //     // }

  //     let searchCriteria = {
  //       where,
  //       include: doctor
  //       // include:[
  //       //   {
  //       //     model:doctor,
  //       //     required: true
  //       //   }
  //       // ]
  //     };

  //     if (clinicId) {
  //       const doctorClinicData = await doctorClinic.findAll(searchCriteria);
  //       // return doctorClinicData
  //       const result = { doctorList: [], patientList: [] };
  //       if (doctorClinicData.length > 0) {
  //         await Promise.all(
  //           doctorClinicData.map(async (item) => {
  //             const objectValue = item;
  //             const condition = { id: item.doctorId };
  //             let output = await doctor.findOne({
  //               where: { id: condition.id },
  //             });
  //             let userData = await user.findOne({
  //               where: { id: output.userId }
  //             })
  //             item.doctorId = output;
  //             output.userId = userData
  //             result.doctorList.push(objectValue);
  //           }),
  //         );
  //       }
  //       // const patientClinicData = await patientClinic.findAll(searchCriteria);
  //       // const result1 = [];
  //       // if (patientClinicData.length > 0) {
  //       //   await Promise.all(
  //       //     patientClinicData.map(async (item) => {
  //       //       const objectValue = item;
  //       //       const condition = { id: item.patientId };
  //       //       let output = await patient.findOne({
  //       //         where: { id: condition.id },
  //       //       });
  //       //       let userData = await user.findOne({
  //       //         where: { id: output.userId }
  //       //       })
  //       //       item.patientId = output;
  //       //       output.userId = userData
  //       //       result.patientList.push(objectValue);
  //       //     }),
  //       //   );
  //       //   return result;
  //       // }

  //     }

  //     // if (doctorId) {
  //     //   const doctorClinicData = await doctorClinic.findAll(searchCriteria);
  //     //   const result = [];

  //     //   if (doctorClinicData.length > 0) {
  //     //     await Promise.all(
  //     //       doctorClinicData.map(async (item) => {
  //     //         const objectValue = item;
  //     //         const user = { id: item.clinicId };
  //     //         let output = await clinic.findAll({
  //     //           where: { id: user.id },
  //     //         });
  //     //         await output.map((data) => {
  //     //           item.clinicId = data
  //     //         })
  //     //         result.push(objectValue);
  //     //       }),
  //     //     );
  //     //     return result;
  //     //   }
  //     // }


  //   } catch (error) {
  //   }
  // },

