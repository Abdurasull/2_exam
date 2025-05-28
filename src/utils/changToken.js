import { jwtService } from "../lib/jwt.js";
import { ClientError, globalError } from "./error.js";

export const changeToken = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        if (!token) throw new ClientError("Token not found");
        const result = jwtService.verifyToken(token);
        if (!result) throw new ClientError("Token not found");
        next();
    }catch(err){
        globalError(err, res);
    }
}