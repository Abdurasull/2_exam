import { connection } from "../lib/db.js";
import { carSchema, CarValidator } from "../lib/joi.cars.validator.js";
import { ClientError, globalError } from "../utils/error.js"

export const carsController = {
    async create(req, res) {
        try{
            const validator = carSchema.validate(new CarValidator(req.body));
            if(validator.error) {
                throw new ClientError(validator.error.message);
            }
            
            const [result] = await connection.query(`INSERT INTO cars SET ?`, [{ ...req.body, created_at: new Date() }]);
            res.status(201).json({
                message: "Car created",
                data: {
                    id: result.insertId,
                    ...req.body
                }
            }) 
        }catch(err) {
            console.log(err.code == "ER_DUP_ENTRY");
            if (err.code == "ER_DUP_ENTRY"){
                return res.status(400).json({
                    status: 400,
                    message: "Car already exists"
                });
            }
            
            globalError(err, res);
        }
    },
    async getAll(req, res) {
        try{
            const {limit = 10, page = 1} = req.query;
            const [result] = await connection.query(`SELECT * FROM cars LIMIT ${limit} OFFSET ${limit * (page - 1)}`);
            res.json({
                message: "Cars",
                data: result
            })
        }catch(err) {
            globalError(err, res);
        }
    },
    async getOne(req, res){
        try{
            const { id } = req.params;
            const [result] = await connection.query(`SELECT * FROM cars WHERE id = ?`, [id]);
            if (result.length == 0) {
                throw new ClientError("Car not found");
            }
            res.json({
                message: "Car",
                data: result[0]
            })
        }catch(err){
            globalError(err, res);
        }
    },
    async update(req, res) {
        try{
            const { id } = req.params;
            const [result] = await connection.query(`SELECT * FROM cars WHERE id = ?`, [id]);
            if (result.length == 0) {
                throw new ClientError("Car not found");
            }
            const [resultUpdate] = await connection.query(`UPDATE cars SET ? WHERE id = ?`, [req.body, id]);
            res.json({
                message: "Car updated",
                data: {
                    id: resultUpdate.insertId,
                    ...req.body
                }
            })
        }catch(err){
            globalError(err, res);
        }
    },
    async delete(req, res) {
        try{
            const { id } = req.params;
            const [result] = await connection.query(`SELECT * FROM cars WHERE id = ?`, [id]);
            if (result.length == 0) {
                throw new ClientError("Car not found");
            }
            const [resultDelete] = await connection.query(`DELETE FROM cars WHERE id = ?`, [id]);
            res.json({
                message: "Car deleted",
                data: {
                    id: resultDelete.insertId,
                    ...req.body
                }
            })
        }catch(err){
            globalError(err, res);
        }
    }
}