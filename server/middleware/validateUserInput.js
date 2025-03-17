const validateUserInput = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    console.log(error)

    if (error) {
      return res.status(400).json({ errors: error.details.map(err => err.error) });
    }
  
    req.body = value; // Use the sanitized data
    next();
};

export default validateUserInput;
  