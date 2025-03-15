import Joi from 'joi';

const loginSchema = Joi.object({
    user: Joi.string()
        .trim()                 // Removes leading and trailing spaces
        .alphanum()             // Allows only letters and numbers
        .required()
        .replace(/[<>\/\\]/g, '')
        .messages({
            'string.empty': 'Username is required.',
            'string.alphanum': 'Username must contain only letters and numbers.',
        }),

    pwd: Joi.string()
        .trim()                 // Removes leading and trailing spaces
        .pattern(/^[\w!@#$%^&*()-_+=]+$/) // Allows common special characters
        .required()
        .replace(/[<>\/\\]/g, '')
        .messages({
            'string.empty': 'Password is required.',
            'string.pattern.base': 'Password contains invalid characters.'
        })
});

export default loginSchema;