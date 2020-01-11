import Joi from '@hapi/joi';

const registerValidation = data => {
    const schema = Joi.object({
        employeeName: Joi.string().required(),
        idNumber: Joi.string().required().min(16).max(16),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        position: Joi.string().required(),
        status: Joi.string(),
        birthDate: Joi.string()
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;