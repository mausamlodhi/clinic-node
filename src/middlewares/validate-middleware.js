import HttpStatus from 'http-status';
import utility from '../services/utility';

const validateRequest = (options) => async (req, res, next) => {
  try {
    await options.schema.validateAsync({
      ...req.query,
      ...req.body,
      ...req.params,
    });

    next();
  } catch (error) {
    console.log(error);
  }
};

export default validateRequest;
