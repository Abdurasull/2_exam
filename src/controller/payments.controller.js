import { connection } from "../lib/db.js";
import { ClientError, globalError } from "../utils/error.js";

export const paymentsController = {
    async create(req, res) {
        try{
            const [result] = await connection.query(`INSERT INTO payments SET ?`, [req.body]);
            res.status(201).json({
                message: "Payment created",
                data: result
            })
        }catch(err){
            globalError(err, res);
        }
    },
    async getAll(req, res){
        try{
            const [result] = await connection.query(`SELECT * FROM payments`);
            if(result.length == 0) throw new ClientError("Payments not found", 404);
            res.status(200).json({
                message: "Payments found",
                data: result
            })
        }catch(err){
            globalError(err, res);
        }
    },
    async getOne(req, res){
        try{
            const [result] = await connection.query(`SELECT * FROM payments WHERE id = ?`, [req.params.id]);
            if(result.length == 0) throw new ClientError("Payment not found", 404);
            res.status(200).json({
                message: "Payment found",
                data: result
            })
        }catch(err){
            globalError(err, res);
        }
    },
    async update(req, res){
        try{
            const [result] = await connection.query(`SELECT * FROM payments WHERE id = ?`, [req.params.id]);
            if(result.length == 0) throw new ClientError("Payment not found", 404);
            await connection.query(`UPDATE payments SET ? WHERE id = ?`, [req.body, req.params.id]);
            res.status(200).json({
                message: "Payment updated",
                data: req.body
            })
        }catch(err){
            globalError(err, res);
        }
    }
}