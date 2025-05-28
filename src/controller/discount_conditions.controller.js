import { connection } from "../lib/db.js";
import { ClientError, globalError } from "../utils/error.js";

export const discount_conditionsController = {
    async create(req, res) {
        try{       
            await connection.query(`INSERT INTO discount_conditions SET ?`, [req.body]);
            
            res.status(201).json({
                message: "Discount condition created",
                status: 201,
                data: req.body
            });
        }catch(err) {        
            globalError(err, res);
        }
    },
    async getAll(req, res){
        try{
            const [discount_conditions] = await connection.query(`SELECT * FROM discount_conditions`);
            res.status(200).json({
                message: "Discount conditions found",
                status: 200,
                data: discount_conditions
            });

        }catch(err) {
            globalError(err, res);
    }
    },
    async getById(req, res){
        try{
            const [discount_condition] = await connection.query(`SELECT * FROM discount_conditions WHERE id = ?`, [req.params.id]);
            if(discount_condition.length === 0) throw new ClientError("Discount condition not found", 404);
            res.status(200).json({
                message: "Discount condition found",
                status: 200,
                data: discount_condition
            });
        }catch(err) {
            globalError(err, res);
        }
    },
    async update(req, res){
        try{
            await connection.query(`UPDATE discount_conditions SET ? WHERE id = ?`, [req.body, req.params.id]);
            res.status(200).json({
                message: "Discount condition updated",
                status: 200,
                data: req.body
            });
        }catch(err) {
            globalError(err, res);
        }
    },
    async delete(req, res){
        try{            
            const { id } = req.params;
            const [discount_condition] = await connection.query(`SELECT * FROM discount_conditions WHERE id = ?`, [id]);
            console.log(discount_condition);
            
            if(discount_condition.length === 0) throw new ClientError("Discount condition not found", 404);

            await connection.query(`DELETE FROM discount_conditions WHERE id = ?`, [req.params.id]);
            res.status(200).json({
                message: "Discount condition deleted",
                status: 200,
            });
        }catch(err) {
            globalError(err, res);
        }
    }

}