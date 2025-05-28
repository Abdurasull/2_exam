import { Router } from "express";
import { discount_conditionsController } from "../controller/discount_conditions.controller.js";
import { discount_conditionValidator } from "../Middleware/discount_condition.validator.js";
import { changeToken } from "../utils/changToken.js";

export const discount_conditionsRouter = Router();

discount_conditionsRouter.post("/", changeToken, discount_conditionValidator,  discount_conditionsController.create);
discount_conditionsRouter.get("/all", changeToken, discount_conditionsController.getAll);

discount_conditionsRouter.route("/:id")
    .get(changeToken, discount_conditionsController.getById)
    .put(changeToken, discount_conditionValidator, discount_conditionsController.update)
    .delete(changeToken, discount_conditionsController.delete);