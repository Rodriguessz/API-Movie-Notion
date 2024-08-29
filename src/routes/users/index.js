const { Router } =  require('express')
const routes = Router();

const UserController = require("../../controllers/User")
const usercontroller = new UserController();

//#region Users Resources Routes
routes.post("/create", usercontroller.create)

//#endregion


module.exports = routes;

