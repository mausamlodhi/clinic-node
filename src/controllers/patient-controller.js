import repositories from "../repositories";
import HttpStatus from "http-status";

const { patientRepository } = repositories;

export default {
  /**
   * get list of all patients
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async getPatients(req, res, next) {
    try {
      const result = await patientRepository.getPatientList(req);
      if (result) {
        res.status(HttpStatus.OK).json({
          success: true,
          data: result,
        });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          data: null,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * update patient profile details
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async updatePatientProfile(req, res, next) {
    try {
      console.log(req.body);
      const updatedUser = await patientRepository.updateProfile(req.body);
      if (updatedUser) {
        res.status(HttpStatus.OK).json({
          success: true,
          data: null,
        });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          data: null,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * update profile become patient
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async becomePatient(req, res, next) {
    try {
      const updatedUser = await patientRepository.becomePatient(
        req.body,
        req.body.email
      );
      if (updatedUser) {
        res.status(HttpStatus.OK).json({
          success: true,
          data: null,
        });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          data: null,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
