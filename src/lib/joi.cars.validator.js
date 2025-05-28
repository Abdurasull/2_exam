import Joi from "joi";

export class CarValidator {
    constructor(body){
        this.name = body.name;
        this.price = body.price;
        this.model = body.model;
        this.count = body.count;
        this.year = body.year;
        this.mileage = body.mileage;
    }
}
const name = Joi.string().min(3).max(30).required().messages({
    "string.base": "Name must be string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name min length 3",
    "string.max": "Name max length 30",
    "any.required": "Name is required",
});

const price = Joi.number().min(1000).required().messages({
    "number.base": "Price must be number",
    "number.empty": "Price cannot be empty",
    "number.min": "Price min length 1000",
    "any.required": "Price is required",
});

const model = Joi.string().min(3).max(30).required().messages({
    "string.base": "Model must be string",
    "string.empty": "Model cannot be empty",
    "string.min": "Model min length 3",
    "string.max": "Model max length 30",
    "any.required": "Model is required",
});

const count = Joi.number().min(0).required().messages({
    "number.base": "Count must be number",
    "number.empty": "Count cannot be empty",
    "number.min": "Count min length 0",
    "any.required": "Count is required",
});

const year = Joi.number().min(1900).max(2025).required().messages({
    "number.base": "Year must be number",
    "number.empty": "Year cannot be empty",
    "number.min": "Year min length 1900",
    "number.max": "Year max length 2025",
    "any.required": "Year is required",
});
const mileage = Joi.number().min(0).required().messages({
    "number.base": "Mileage must be number",
    "number.empty": "Mileage cannot be empty",
    "number.min": "Mileage min length 0",
    "any.required": "Mileage is required",
});


export const carSchema = Joi.object({
    name,
    price,
    model,
    count,
    year,
    mileage
});