import express from 'express';
import { changeToken } from '../utils/changToken.js';
import { paymentsController } from '../controller/payments.controller.js';

export const paymentsRouter = express.Router();

paymentsRouter.post("/", changeToken, paymentsController.create);
paymentsRouter.get("/", changeToken, paymentsController.getAll);

paymentsRouter.route("/:id")
    .get(changeToken, paymentsController.getOne)
    .put(changeToken, paymentsController.update)
