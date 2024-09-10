const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('app:startup');
const superheroRoutes = require('./routes/superheros');
const users= require('./routes/users');


const app = express();
app.use(express.json());
app.use('/api/superhero', superheroRoutes);
app.use('/api/users', users);


async function connectToDatabase() {
    try {
         await mongoose.connect('mongodb://localhost/superhero');
    
        debug('Connected to MongoDB...');
    } catch (err) {
        debug('Could not connect to MongoDB', err);
    }
}

connectToDatabase();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));


