const Joi = require('joi');

function validateSuperhero(superhero){
   
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        power: Joi.string().min(3).required()
    });
    
    return  schema.validate(superhero);
    }

module.exports = validateSuperhero;
