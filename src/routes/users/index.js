const { Router } =  require('express')
const routes = Router();

const UserController = require("../../controllers/User")
const usercontroller = new UserController();

const userAuthentication  = require("../../middleware/authentication/userAuthentication")

//#region Users Resources Routes

routes.post("/create", usercontroller.create);

routes.put("/update/:user_id", userAuthentication, usercontroller.update);

//#endregion


module.exports = routes;

