import { Router } from "express";
import { costumersController, getAllCostumers, updateCostumer } from "../controller/costumers.controller.js";
import { costumersValidator } from "../Middleware/costumers.validator.js";
import { changeToken } from "../utils/changToken.js";

export const costumersRouter = Router();

costumersRouter.get("/", costumersValidator, costumersController);
costumersRouter.put("/", costumersValidator, updateCostumer);
costumersRouter.get("/all", changeToken, getAllCostumers )