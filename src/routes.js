const express = require('express');

const ongsController = require('./controllers/ongsController');
const incidentsController = require('./controllers/incidentsController');
const profileOngController = require('./controllers/profileOngController')
const sessionController = require('./controllers/SessionController')

const routes = express.Router();

// login

routes.post('/sessions/', sessionController.store)

// ongs

routes.get('/ongs', ongsController.index);

routes.post('/ongs', ongsController.store);

//incidents

routes.get('/incidents', incidentsController.index);

routes.post('/incidents', incidentsController.store);

routes.delete('/incidents/:id', incidentsController.delete)

//profile incidents

routes.get('/incidents/:id', profileOngController.index);
module.exports = routes;
