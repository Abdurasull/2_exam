import { connection } from "../lib/db.js"
import { ClientError, globalError } from "../utils/error.js";

export const statusController = async (req, res) => {
    try{
        const [result] = await connection.query(`SELECT * FROM status`);
    
        const isStatus = result.some(status => status.name == req.body.name);
        if (isStatus) throw new ClientError("Status already exists", 400);
        const result1 = await connection.query(`INSERT INTO status SET ?`, [req.body]);
        
        res.status(201).json({
            message: "Status created",
            data: req.body
        });

    }catch(err){
        globalError(err, res);
    }
};

export const statusGetAll = async (req, res) => {
    try{
        const [result] = await connection.query(`SELECT * FROM status`);
        res.status(200).json({
            message: "Status found",
            data: result
        });
    }catch(err){
        globalError(err, res);
    }
};

export const statusGetById = async (req, res) => {
    try {
        const [result] = await connection.query(`SELECT * FROM status WHERE id = ?`, [req.params.id]);
        if (!result.length) throw new ClientError("Status not found", 404);
        res.status(200).json({
            message: "Status found",
            data: result
        });
    } catch (err) {
        globalError(err, res);
    }
};


export const statusUpdate = async (req, res) => {
    try {
        const { id } = req.params;

        const [isStatus] = await connection.query(`SELECT * FROM status WHERE id = ?`, [id]);
        
        if (!isStatus.length) throw new ClientError("Status not found", 404);
        const [result] = await connection.query(`UPDATE status SET ? WHERE id = ?`, [req.body, req.params.id]);
        res.status(200).json({
            message: "Status updated",
            status: 200
        });
    } catch (err) {
        globalError(err, res);
    }
};

export const statusDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const  [isStatus] = await connection.query(`SELECT * FROM status WHERE id = ?`, [id]);
        if (!isStatus.length) throw new ClientError("Status not found", 404);
        const [result] = await connection.query(`DELETE FROM status WHERE id = ?`, [id]);
        if (!result.affectedRows) throw new ClientError("Status not found", 404);
        res.status(200).json({
            message: "Status deleted",
            status: 200
        });
    } catch (err) {
        globalError(err, res);
    }
};