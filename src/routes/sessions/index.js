const { Router } = require('express');
const routes = Router();

const SessionsController = require("../../controllers/Sessions/SessionsController");
const sessionsController = new SessionsController();


routes.post("/", sessionsController.create);


module.exports = routes;