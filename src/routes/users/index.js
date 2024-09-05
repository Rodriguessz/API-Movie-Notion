const { Router } =  require('express')
const routes = Router();

const UserController = require("../../controllers/User")
const usercontroller = new UserController();

//#region Users Resources Routes
routes.get("/index", usercontroller.index);
routes.get("/show/:user_id", usercontroller.show);
routes.post("/create", usercontroller.create);
routes.put("/update/:user_id", usercontroller.update);
routes.delete("/delete/:user_id", usercontroller.delete);
//#endregion


module.exports = routes;

