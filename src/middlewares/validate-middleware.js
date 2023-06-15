import httpStatus from "http-status";
const validateRequest = (options) => async (request,response,next)=>{
    try{
        await options.schema.validateAsync({
            ...request.body,
            ...request.query,
            ...request.params
        });
        next();
    }catch(error){
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