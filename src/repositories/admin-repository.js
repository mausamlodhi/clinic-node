import models from '../models';

const { patient, clinic, doctor } = models;
export default {
    async dashboard() {
        try {
            const data = {};

            // TOTAL DOCTORS
            const doctorData = await doctor.findAll();
            data.totalDoctor = (doctorData.length > 0) ? doctorData.length : 0;

            // TOTAL CLINICS
            const clinicData = await clinic.findAll();
            data.totalClinic = (clinicData.length > 0) ? clinicData.length : 0;

            // TOTALPATIENTS
            const patientData = await patient.findAll();
            data.totalPatient = (patientData.length > 0) ? patientData.length : 0;
            
            return data;
        } catch (error) {
            console.log(error);
            throw Error(error);
        }
    }
}