const { Router } =  require('express')
const routes = Router();

const UserController = require("../../controllers/UserController")
const controller = new UserController()

//#region Users Resources Routes

routes.get("/", () => controller.index)



//#endregion


module.exports = routes;

