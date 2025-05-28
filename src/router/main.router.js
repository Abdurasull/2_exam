import { Router } from "express";
import { authRouter } from "./auth.router.js";
import { carsRouter } from "./cars.router.js";
import { costumersRouter } from "./costumers.router.js";
import { statusRouter } from "./status.router.js";
import { discount_conditionsRouter } from "./discount_conditions.router.js";
import { contractsRouter } from "./contracts.router.js";
import { paymentsRouter } from "./payments.router.js";

export const mainRouter = Router();

mainRouter.use("/auth",  authRouter);
mainRouter.use("/cars", carsRouter);
mainRouter.use("/costumer", costumersRouter);
mainRouter.use("/status", statusRouter);
mainRouter.use("/discount_conditions", discount_conditionsRouter);
mainRouter.use("/contract", contractsRouter);
mainRouter.use("/payments", paymentsRouter);
