const express = require('express');
const Superhero = require('../models/superheroSchema');
const validateSuperhero = require('../middlewear/validateSuperhero');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const superheroes = await Superhero.find();
        res.send(superheroes);
    } catch (err) {
        res.status(500).send('Error retrieving data');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const superhero = await Superhero.findById(req.params.id);
        if (!superhero) return res.status(404).send('The superhero was not found');
        res.send(superhero);
    } catch (err) {
        res.status(400).send('Invalid ID format');
    }
});

router.post('/', async (req, res) => {
    try {
        
        const { error } = validateSuperhero(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const superhero = new Superhero({
            name: req.body.name,
            power: req.body.power,
        });

        const savedSuperhero = await superhero.save();
        
        res.send(savedSuperhero);
    } catch (err) {
        res.status(500).send('An error occurred while saving the superhero.');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const superhero = await Superhero.findById(req.params.id);
        if (!superhero) return res.status(404).send('The superhero was not found');

        const { error } = validateSuperhero(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        superhero.name = req.body.name;
        superhero.power = req.body.power;
        const updatedSuperhero = await superhero.save();
        res.send(updatedSuperhero);
    } catch (err) {
        res.status(500).send('An error occurred while updating the superhero.');
    }
});

router.delete('/:id', async (req, res) => {
    try {
       const superhero= await Superhero.findByIdAndDelete(req.params.id);
        if (!superhero) return res.status(404).send('The superhero with this ID was not found');

        
        res.send(superhero);
    } catch (err) {
        res.status(500).send('An error occurred while deleting the superhero.');
    }
});

module.exports = router;
