import { discount_conditionSchema, DiscountConditionValidator } from "../lib/joi.discount_condition.validator.js";
import { ClientError, globalError } from "../utils/error.js";

export const discount_conditionValidator = (req, res, next) => {
    try{        
        const validator = discount_conditionSchema.validate(new DiscountConditionValidator(req.body), { abortEarly: false });
        if (validator.error) throw new ClientError(validator.error.message, 400);
        next();
    }catch(err){
        globalError(err, res);
    }
};