const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Hotel Booking API',
    version: '1.0.0',
    description: 'API documentation for the Hotel Booking System',
    
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    }
  ]
 
};

const options = {
  swaggerDefinition,
  apis: ['./swaggerSchema.js','./routes/room/*.js','./routes/signup/*.js', './routes/manager/*.js','./routes/login.js','./routes/booking.js']
  
  
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
