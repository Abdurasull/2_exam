import { connection } from "../lib/db.js";
import { ClientError, globalError } from "../utils/error.js";

export const contractsController = {
    async create(req, res){
        try{
            await connection.query(`UPDATE cars SET count = count - 1 WHERE id = ?`, [req.body.car_id]);
            const [contract] = await connection.query(`INSERT INTO contract SET ?`, [req.body]);
            res.status(201).json({
                message: "Contract created",
                status: 201,
                data: contract
            })
        }catch(err){            
            globalError(err, res);
        }
    },
    async getAll(req, res){
        try{
            const [contracts] = await connection.query(`SELECT * FROM contract`);
            res.status(200).json({
                message: "Contracts",
                status: 200,
                data: contracts
            })
        }catch(err){
            globalError(err, res);
        }
    },
    async getById(req, res){
        try{
            const [contract] = await connection.query(`SELECT * FROM contract WHERE id = ?`, [req.params.id]);
            if(contract.length === 0){
                throw new ClientError("Contract not found", 404);
            }
            res.status(200).json({
                message: "Contract",
                status: 200,
                data: contract
            })
        }catch(err){
            globalError(err, res);
        }
    },
    async update(req, res){
        try{
            const isContract = await connection.query(`SELECT * FROM contract WHERE id = ?`, [req.params.id]);
            if(isContract.length === 0){
                throw new ClientError("Contract not found", 404);
            }
            const [contract] = await connection.query(`UPDATE contract SET ? WHERE id = ?`, [req.body, req.params.id]);
            res.status(200).json({
                message: "Contract updated",
                status: 200,
                data: contract
            })
        }catch(err){
            if (err.code == "ER_NO_REFERENCED_ROW_2"){
                return res.status(404).json({
                    message: "There is a value that does not exist in other columns",
                    status: 404,
                    data: null
                })
            }
            
            globalError(err, res);
        }
    },
    async delete(req, res){
        try{
            const isContract = await connection.query(`SELECT * FROM contract WHERE id = ?`, [req.params.id]);
            if(isContract.length === 0){
                throw new ClientError("Contract not found", 404);
            }
            const [contract] = await connection.query(`DELETE FROM contract WHERE id = ?`, [req.params.id]);
            res.status(200).json({
                message: "Contract deleted",
                status: 200,
                data: contract
            })
        }catch(err){
            globalError(err, res);
        }
    }   
}