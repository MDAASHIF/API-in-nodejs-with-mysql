const joi = require('@hapi/joi');

module.exports = {
    categoryValidation : data =>{
        const schema = joi.object({
            name : joi.string().min(3).required()
        });
        return schema.validate(data);
    }
}