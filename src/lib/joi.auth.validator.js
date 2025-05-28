import Joi from "joi";

let phoneNumber = /^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/;

const firstName = Joi.string().min(3).max(30).required().messages({
    "string.base": "Firstname must be string",
    "string.empty": "Firstname cannot be empty",
    "string.min": "Firstname min length 3",
    "string.max": "Firstname max length 30",
    "any.required": "Firstname is required",
});
const lastName = Joi.string().min(3).max(30).required().messages({
    "string.base": "Lastname must be string",
    "string.empty": "Lastname cannot be empty",
    "string.min": "Lastname min length 3",
    "string.max": "Lastname max length 30",
    "any.required": "Lastname is required",
});
const passport_number = Joi.string().min(9).max(15).required().messages({
    "string.base": "Pasport number must be string",
    "string.empty": "Pasport number cannot be empty",
    "string.min": "Pasport number min length 9",
    "string.max": "Pasport number max length 15",
    "any.required": "Pasport number is required",
});

const email = Joi.string().email().required().messages({
    "string.base": "Email must be string",
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be valid",
    "any.required": "Email is required",
});

const password = Joi.string().min(3).max(20).required().messages({
    "string.base": "Password must be string",
    "string.empty": "Password cannot be empty",
    "string.min": "Password min length 3",
    "string.max": "Password max length 20",
    "any.required": "Password is required",
});

export const customerRegisterSchema = Joi.object({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    passport_number
});
export const customerLoginSchema = Joi.object({
    email,
    password
});


