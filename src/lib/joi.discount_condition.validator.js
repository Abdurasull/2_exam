import Joi from "joi";

export class DiscountConditionValidator {
    constructor(body) {
        this.term_months = body.term_months;
        this.interest_rate = body.interest_rate;
    }
}
const term_months = Joi.number().min(1).max(24).required().messages({
    "number.base": "Term month must be number",
    "number.empty": "Term month cannot be empty",
    "number.min": "Term month min length 1",
    "number.max": "Term month max length 24",
    "any.required": "Term month is required",
});

const interest_rate = Joi.number().min(0).max(100).required().messages({
    "number.base": "Interest rate must be number",
    "number.empty": "Interest rate cannot be empty",
    "number.min": "Interest rate min length 0",
    "number.max": "Interest rate max length 100",
    "any.required": "Interest rate is required",
});


export const discount_conditionSchema = Joi.object({
    term_months,
    interest_rate,
});