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
        const errors = [];
        if(errors.isJoi){
            error.details.forEach((errorData)=>{
                const errorObject = {
                    message : "Ohhh something went wrong",
                    field : errorData.path.join('_'),
                    type : errorData.type
                };
                errors.push(errorObject);
            });
            response.status(httpStatus.BAD_REQUEST).json({
                success : false,
                error : errors,
                message : ""
            });
        }
  }
};

export default validateRequest;
