import model from "../models";

const { clinic, doctor, doctorClinic, patient, user } = model;
import { Op } from 'sequelize';

export default {

  async getList(req) {
    try {
        let result = await clinic.findAll();
        return result;
      }
    catch (error) {
      console.log(error)
    }
  },


  async getClinicList(req) {
    try {
      const { query: { clinicId } } = req;
      console.log(clinicId)
      let where = {};
      if (clinicId) {
        where.clinicId = { [Op.like]: `%${clinicId}%` };
      }
      
      let searchCriteriaDoctor = {
        where,
        include: [{ model: doctor,
          include: [user],
           required: true }]
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
      console.log(error)
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
  //       //       console.log(output.userId)
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
  //     //   //console.log(doctorClinicData);
  //     //   const result = [];

  //     //   if (doctorClinicData.length > 0) {
  //     //     await Promise.all(
  //     //       doctorClinicData.map(async (item) => {
  //     //         const objectValue = item;
  //     //         const user = { id: item.clinicId };
  //     //         //console.log(user)
  //     //         let output = await clinic.findAll({
  //     //           where: { id: user.id },
  //     //         });
  //     //         console.log(output);
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
  //     console.log(error)
  //   }
  // },

