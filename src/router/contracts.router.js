import { Router } from "express";
import { changeToken } from "../utils/changToken.js";
import { contractsController } from "../controller/contracts.controller.js";

export const contractsRouter = Router();

contractsRouter.post("/", changeToken, contractsController.create);
contractsRouter.get("/all", changeToken, contractsController.getAll);

contractsRouter.route("/:id")
    .get(changeToken, contractsController.getById)
    .put(changeToken, contractsController.update)
    .delete(changeToken, contractsController.delete);