import jwt from "jsonwebtoken";
import { serverConfig } from "../config.js";


export const jwtService = {
    generateToken: (payload) => {
        return jwt.sign({payload}, serverConfig.TOKEN_SECRET, {expiresIn: serverConfig.JWT_EXPIRES_IN});
    },
    verifyToken: (token) => {
        return jwt.verify(token, serverConfig.TOKEN_SECRET);
    }
}