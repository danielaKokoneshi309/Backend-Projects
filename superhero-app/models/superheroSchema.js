const mongoose = require('mongoose');

const superheroSchema = new mongoose.Schema({
    name: String,
    power: String,
});

const Superhero = mongoose.model('Superhero', superheroSchema);

module.exports = Superhero;
