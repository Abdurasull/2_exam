import { connection } from "../lib/db.js";
import { customerRegisterSchema } from "../lib/joi.auth.validator.js";
import { ClientError, globalError } from "../utils/error.js"

export const costumersController = async (req, res) => {
    try {
        const costumer = await connection.query(`SELECT * FROM costumers WHERE id = ?`, [req.costumer]);
        res.status(200).json({
            message: "Costumer found",
            data: costumer[0]
        })


    } catch (err) {
        globalError(res, err);
    }
}

export const updateCostumer = async (req, res) => {
    try {

        const validate = customerRegisterSchema.validate(req.body, { abortEarly: true });
        if (validate.error) throw new ClientError(validate.error.message, 400);

        const costumer = await connection.query(`SELECT * FROM costumers WHERE id = ?`, [req.costumer]);
        if ((!costumer[0])) throw new ClientError("Costumer not found", 404);

        await connection.query(`UPDATE costumers SET ? WHERE id = ?`, [req.body, req.costumer]);

        res.status(200).json({
            message: "Costumer updated",
            data: req.body
        });

    } catch (err) {
        globalError(err, res);
    }
};

export const getAllCostumers = async (req, res) => {
    try{
        const [costumers] = await connection.query(`SELECT * FROM costumers`);
        if(costumers.length == 0) throw new ClientError("Costumers not found", 404);
        res.status(200).json({
            message: "Costumers found",
            data: costumers
        })
    }catch(err){
        globalError(err, res);
    }
}