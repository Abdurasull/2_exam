import { Router } from "express";
import { statusController, statusDelete, statusGetAll, statusGetById, statusUpdate } from "../controller/status.controller.js";
import { statusValidator } from "../Middleware/status.validator.js";

export const statusRouter = Router();

statusRouter.post("/", statusValidator, statusController);
statusRouter.get("/all", statusValidator, statusGetAll);

statusRouter.route("/:id")
    .get(statusValidator, statusGetById)
    .put(statusValidator, statusUpdate)
    .delete(statusValidator, statusDelete);