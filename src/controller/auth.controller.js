
import { connection } from "../lib/db.js";
import { HashingService } from "../lib/hash.js";
import { jwtService } from "../lib/jwt.js";
import { customerLoginSchema, customerRegisterSchema } from "../lib/joi.auth.validator.js";
import { ClientError, globalError } from "../utils/error.js"

export const authController = {
    register: async (req, res) => {
        try {

            let newUser = req.body;


            let validate = customerRegisterSchema.validate(newUser, { abortEarly: true });
            if (validate.error) throw new ClientError(validate.error.message, 400);

            const [findUser] = await connection.query(`SELECT * FROM costumers WHERE email = ? and passport_number = ?`, [newUser.email, newUser.passport_number]);

            if (findUser[0]) throw new ClientError("User already exists", 400);
            const withHashedPassword = await HashingService.hashingPassword(newUser.password);
            let [result] = await connection.query(`INSERT INTO costumers SET ?`, [{ ...newUser, password: withHashedPassword }]);
            res.status(201).json({
                message: "User created",
                data: {
                    id: result.insertId,
                    ...newUser
                }
            })

        } catch (err) {
            globalError(err, res);
        }
    },
    login: async (req, res) => {
        try {
            const User = req.body;
            let validate = customerLoginSchema.validate(User, { abortEarly: true });
            if (validate.error) throw new ClientError(validate.error.message, 400);

            const [findUser] = await connection.query(`SELECT * FROM costumers WHERE email = ?`, [User.email]);
            if (!findUser[0]) throw new ClientError("User not found", 404);
            const isPasswordValid = await HashingService.comparePassword(User.password, findUser[0].password);
            if (!isPasswordValid) throw new ClientError("Password is incorrect", 400);
            console.log(findUser[0].id);

            const Token = jwtService.generateToken(findUser[0].id);
            res.status(200).json({
                message: "Login success",
                token: Token
            })
        } catch (err) {
            globalError(err, res);
        }
    }
}