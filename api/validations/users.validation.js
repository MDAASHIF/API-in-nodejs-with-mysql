const joi = require('@hapi/joi');
module.exports = {
    insertUserValidation : data =>{
        const schema = joi.object({
            name : joi.string().min(3).max(30).required(),
            email : joi.string().min(6).required().email(),
            password : joi.string().min(6).required(),
            mobile: joi.string().length(10).pattern(/^[0-9]+$/).required()
        });
        return schema.validate(data);
    },
    updateUserValidation : data =>{
        const schema = joi.object({
            name : joi.string().min(3).max(30).required(),
            email : joi.string().min(6).required().email(),
            mobile : joi.string().length(10).pattern(/^[0-9]+$/).required()
        });
        return schema.validate(data);
    }
}