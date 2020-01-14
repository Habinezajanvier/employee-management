import Joi from '@hapi/joi';

export const registerValidation = (req, res, next) => {
    const schema = Joi.object({
        employeeName: Joi.string().required(),
        idNumber: Joi.number().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        position: Joi.string().required(),
        birthDate: Joi.string()
    });

    const {error} = schema.validate(req.body);
    if (error) return res.status(400).json({msg: error.details[0].message});
    next(); 
};

export const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        employeeName: Joi.string().required(),
        password: Joi.string().required()
    });
    const {error} = schema.validate(req.body);
    if (error) return res.status(400).json({msg: error.details[0].message});
    next();
};

export const employeeValidation = (req, res, next) => {
    const schema = Joi.object({
        employeeName: Joi.string().required(),
        idNumber: Joi.number().required(),
        email: Joi.string().required().email(),
        phoneNumber: Joi.string().min(12).max(13),
        position: Joi.string().required(),
        status: Joi.string(),
        date: Joi.string().required(),
        month: Joi.string().required(),
        year: Joi.string().required()
    });
    const {error} = schema.validate(req.body);
    if (error) return res.status(400).json({msg: error.details[0].message});
    next();
};

export const editValidation = (req, res, next) =>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().min(12).max(13).required(),
        position: Joi.string().required(),
        date: Joi.string().required(),
        month: Joi.string().required(),
        year: Joi.string().required()
    });
    const {error} = schema.validate(req.body);
    if (error) return res.status(400).json({msg: error.details[0].message});
    next();
};