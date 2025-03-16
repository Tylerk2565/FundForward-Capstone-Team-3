import Joi from "joi"

const userSchema = Joi.object({
    user: Joi.string()
      .trim()                               // Removes leading/trailing spaces
      .alphanum()                           // Ensures only letters/numbers
      .min(3).required()
      .messages({
        'string.min': 'Username must be at least 3 characters long.',
        'string.alphanum': 'Username can only contain letters and numbers.'
      }),
  
    pwd: Joi.string()
      .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)
      .required()
      .messages({
        'string.pattern.base': 'Password must be strong (8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol).'
      }),
  
    email: Joi.string()
      .trim()
      .email()                              // Ensures valid email
      .lowercase()                          // Normalizes email
      .required(),
  
    firstname: Joi.string().trim().pattern(/^[A-Za-z]+$/).required(),
    lastname: Joi.string().trim().pattern(/^[A-Za-z]+$/).required(),
    }
)  

export default userSchema;