const Joi = require('joi');

function validateRoom(room){
   
    const schema = Joi.object({


        type: Joi.string().required(),
        number:Joi.number().required(),
        description:Joi.string().min(5).max(500).required(),
        numberOfBeds:Joi.number().min(1).max(5).required(),
    });
    
    return  schema.validate(room);
    }

module.exports = validateRoom;