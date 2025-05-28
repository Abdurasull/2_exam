import { Router } from "express";
import { carsController } from "../controller/cars.controller.js";
import { statusValidator } from "../Middleware/status.validator.js";

export const carsRouter = Router();

carsRouter.post("/", 
   statusValidator,  carsController.create);
carsRouter.get("/all",
   statusValidator,  carsController.getAll);

carsRouter.route("/:id")
    .get(
       statusValidator, carsController.getOne)
    .put(
       statusValidator, carsController.update)
    .delete(
       statusValidator, carsController.delete);