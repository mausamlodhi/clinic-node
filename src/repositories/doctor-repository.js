import model from "../models";
import moment from "moment";
const { user, doctor, doctorSpecialization,specialization, userRole, role } = model;
import { Op } from 'sequelize';
import constant from '../constants';

const { commonConstant } = constant;

export default {
    async getDoctorList(req) {
        try {
            let searchCriteriaDoctor = {
                include: [{ model: user }]
              };
           let result = doctor.findAll(searchCriteriaDoctor);
           return result

        } catch (error) {
            console.log(error)
        }
    },
    async specializationList (req){
        try { 
           let result = specialization.findAll();
           return result;

        } catch (error) {
            console.log(error)
        }
    },
    async getDoctorListCondition (req){
        const { query: { experience, specializationId, clinicId } } = req;
        let where = {};
       // console.log(specializationId[0]);
        if (experience) {
            where.experience = { [Op.like]: `%${experience}%` };
        }
        if (specializationId) {
            where.specializationId = { [Op.like]: `%${specializationId}%` };
        }
        // if (clinicId) {
        //     where.clinicId = { [Op.like]: `%${clinicId}%` };
        // }

        let searchCriteria = {
            where,
            include:[{model: doctor,
                include: [user],
            }]
        };
        if (specializationId) {
            const doctorSpecializationData = await doctorSpecialization.findAll(searchCriteria);
            //console.log(doctorSpecializationData);
            const result = [];

            if (doctorSpecializationData.length > 0) {
               let x= await Promise.all(
                   doctorSpecializationData.map(async (item) => {
                        result.push(item);
                    }),
                );
                console.log(x)
                return result;
            }
        }
        
        if (experience) {
            const doctorResult = await doctor.findAll({where,include:[{model:user}]});
            const output = [];
            if (doctorResult.length > 0) {
                await Promise.all(
                    doctorResult.map(async (item) => {
                        const objectValue = item;
                        output.push(objectValue);
                    }),
                );
            }
            return output;
        }
        if (clinicId) {

        }
    },
    async becomeDoctor(req, email) {
        const transaction = await model.sequelize.transaction();
        try {
            const userResult = await user.findOne({ where: { email } });
            if (userResult) {
                await doctor.create({
                    dateOfBirth: req.dateOfBirth,
                    address: req.address,
                    experience: req.experience,
                    userId: userResult.dataValues.id
                }, { transaction });

                await doctorSpecialization.create({
                    userId: userResult.dataValues.id,
                    specializationId: req.specializationId
                }, { transaction })

                const roleData = await role.findOne({
                    where: { role: commonConstant.ROLE.DOCTOR }
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
            console.log(error);
            await transaction.rollback();
        }
    },
    async updateProfile(data) {
        const transaction = await model.sequelize.transaction();


        try {
            const userData = await this.getUserData(data.email);
            const doctorData = await this.getDoctorData(userData.dataValues.id);
            //const doctorSpecializationData = await this.getDoctorSpecializationData(userData.dataValues.id);

            const formattedDate = moment(doctorData.dateOfBirth).format('YYYY-MM-DD');

            let firstName = data?.firstName || userData.firstName;
            let lastName = data?.lastName || userData.lastName;
            let contact = data?.contact || userData?.contact;
            let gender = data?.gender || userData?.gender;

            let dateOfBirth = data?.dateOfBirth || doctorData?.dateOfBirth;
            let address = data?.address || doctorData?.address;
            let experience = data?.experience || doctorData?.experience;

            const result = await user?.update({
                firstName, lastName, phoneNumber: contact, gender
            },
                { where: { email: userData.email } },
                { transaction });

            const output = await doctor?.update({
                dateOfBirth: formattedDate,
                address, experience
            }, { where: { userId: doctorData.userId } },
                { transaction });

            // const data = await doctorSpecialization?.update({

            // },
            //     { where: { userId: doctorData.userId } },
            //     { transaction });

            //console.log(result);
            await transaction.commit();
            return result, output;
        } catch (error) {
            console.log(error);
            await transaction.rollback();
        }
    },
    async getUserData(email) {
        try {
            const userData = await user.findOne({ where: { email } });
            return userData;
        } catch (error) {
            console.log(error);
            throw Error(error);
        }
    },
    async getDoctorData(id) {
        try {
            const userData = await doctor.findOne({ where: { userId: id } });
            return userData;
        } catch (error) {
            console.log(error);
            throw Error(error);
        }
    },
    // async getDoctorSpecializationData(id) {
    //     try {
    //         const userData = await doctorSpecialization.findAll({ where: { userId: id } });
    //         return userData;
    //     } catch (error) {
    //         console.log(error);
    //         throw Error(error);
    //     }
    // }
}

