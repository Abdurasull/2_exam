import { statusSchema } from "../lib/joi.status.validator.js";
import { jwtService } from "../lib/jwt.js";
import { ClientError, globalError } from "../utils/error.js";

export const statusValidator = (req, res, next) => {
    try{
        
        const token = req.headers.authorization.split(' ')[1];
        if(!token) throw new ClientError("Token not found", 401);


        const validate = statusSchema.validate(req.body, { abortEarly: true });
        if (validate.error) throw new ClientError(validate.error.message, 400);
        
        req.costumer = jwtService.verifyToken(token).payload;
        next();
    }catch(err){
        globalError(err, res);
    }
};


