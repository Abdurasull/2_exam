import { jwtService } from "../lib/jwt.js";
import { globalError } from "../utils/error.js";

export  const costumersValidator = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        
        if(!token) throw new ClientError('Token not found');
        req.costumer = jwtService.verifyToken(token).payload;
        next();
    }catch(err){
        globalError(err, res);
    }
};

