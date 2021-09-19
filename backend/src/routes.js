const express = require('express');
const passport = require('passport');
const routes = new express.Router();

const userController = require('./controllers/UserController');
const barbecueController = require('./controllers/BarbecueController');

routes.post('/createUser', userController.create);

routes.post('/login', passport.authenticate('local'), userController.login);

// todas as rotas daqui pra baixo passarão por autenticação pelo token
routes.use(passport.authenticate('jwt', { session: true }));

routes.get('/details/:id', barbecueController.getById);

routes.get('/barbecue/list', barbecueController.list);

routes.post('/barbecue/create', barbecueController.create);

routes.put('/barbecue/update', barbecueController.update);

module.exports = routes;
