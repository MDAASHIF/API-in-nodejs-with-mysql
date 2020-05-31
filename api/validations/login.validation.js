const joi = require('@hapi/joi');

module.exports = {
    loginValidation : data =>{
        const schema = joi.object({
            email: joi.string().min(6).required().email(),
            password : joi.string().min(6).required()
        });
        return schema.validate(data);
    }
}